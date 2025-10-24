import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type BuildingInstance, type ResourceAmount, type Building, type ResourceType, BuildingStatus } from '@/types'
import { buildingMap } from '@/config/buildings'
import { useResourceStore } from './resource'
import { useGameStore } from './game'
import { BUILDING } from '@/config/constants'

export const useBuildingStore = defineStore('building', () => {
  const resourceStore = useResourceStore()
  const gameStore = useGameStore()
  
  // 已建造的建筑实例
  const buildingInstances = ref<BuildingInstance[]>([])
  
  // 建造队列
  const buildQueue = ref<string[]>([])
  
  // 升级队列
  const upgradeQueue = ref<string[]>([])

  // 获取建筑实例
  function getBuildingInstance(buildingId: string): BuildingInstance | undefined {
    return buildingInstances.value.find(b => b.buildingId === buildingId)
  }

  // 获取建筑配置
  function getBuildingConfig(buildingId: string): Building | undefined {
    return buildingMap.get(buildingId)
  }

  // 检查建筑是否已建造
  function isBuilt(buildingId: string): boolean {
    return buildingInstances.value.some(b => b.buildingId === buildingId)
  }

  // 检查建筑是否可建造
  function canBuild(buildingId: string): { can: boolean; reason?: string } {
    const config = getBuildingConfig(buildingId)
    if (!config) {
      return { can: false, reason: '建筑不存在' }
    }

    // 检查是否已达到最大数量
    const instance = getBuildingInstance(buildingId)
    if (instance && instance.level >= config.maxLevel) {
      return { can: false, reason: '已达到最大等级' }
    }

    // 检查解锁条件
    for (const req of config.requirements) {
      if (req.type === 'era') {
        if (gameStore.currentEra !== req.id) {
          return { can: false, reason: `需要${req.id}时代` }
        }
      }
      // 其他条件检查(科技、建筑等)待实现
    }

    // 检查资源
    const cost = instance ? calculateUpgradeCost(buildingId) : config.buildCost
    if (!resourceStore.hasEnoughResources(cost)) {
      return { can: false, reason: '资源不足' }
    }

    return { can: true }
  }

  // 计算升级成本
  function calculateUpgradeCost(buildingId: string): ResourceAmount {
    const config = getBuildingConfig(buildingId)
    const instance = getBuildingInstance(buildingId)
    if (!config || !instance) return {}

    const multiplier = Math.pow(config.upgradeCostMultiplier, instance.level)
    const cost: ResourceAmount = {}
    
    Object.entries(config.buildCost).forEach(([resource, amount]) => {
      cost[resource as keyof ResourceAmount] = Math.ceil(amount * multiplier)
    })
    
    return cost
  }

  // 计算建筑当前产出
  function calculateProduction(buildingId: string): ResourceAmount {
    const config = getBuildingConfig(buildingId)
    const instance = getBuildingInstance(buildingId)
    if (!config || !instance || !config.production) return {}

    const production: ResourceAmount = {}
    const levelBonus = 1 + BUILDING.productionIncreasePerLevel * (instance.level - 1)
    
    Object.entries(config.production).forEach(([resource, amount]) => {
      production[resource as keyof ResourceAmount] = amount * levelBonus
    })
    
    return production
  }

  // 建造建筑
  function buildBuilding(buildingId: string): boolean {
    const check = canBuild(buildingId)
    if (!check.can) {
      console.warn('无法建造:', check.reason)
      return false
    }

    const config = getBuildingConfig(buildingId)!
    const instance = getBuildingInstance(buildingId)

    if (instance) {
      // 升级现有建筑
      const cost = calculateUpgradeCost(buildingId)
      if (!resourceStore.consumeResources(cost)) {
        return false
      }

      instance.status = BuildingStatus.UPGRADING
      instance.upgradeStartTime = Date.now()
      upgradeQueue.value.push(buildingId)
    } else {
      // 建造新建筑
      if (!resourceStore.consumeResources(config.buildCost)) {
        return false
      }

      const newInstance: BuildingInstance = {
        buildingId,
        level: 1,
        status: BuildingStatus.BUILDING,
        buildStartTime: Date.now()
      }

      buildingInstances.value.push(newInstance)
      buildQueue.value.push(buildingId)
    }

    return true
  }

  // 更新建造/升级进度
  function updateBuildingProgress() {
    const now = Date.now()

    // 检查建造队列
    buildQueue.value.forEach((buildingId, index) => {
      const instance = getBuildingInstance(buildingId)
      const config = getBuildingConfig(buildingId)
      if (!instance || !config || !instance.buildStartTime) return

      const elapsed = (now - instance.buildStartTime) / 1000
      if (elapsed >= config.buildTime) {
        // 建造完成
        instance.status = BuildingStatus.BUILT
        delete instance.buildStartTime
        buildQueue.value.splice(index, 1)
        
        // 应用建筑效果
        applyBuildingEffects(buildingId)
        
        console.log(`建筑完成: ${config.name}`)
      }
    })

    // 检查升级队列
    upgradeQueue.value.forEach((buildingId, index) => {
      const instance = getBuildingInstance(buildingId)
      const config = getBuildingConfig(buildingId)
      if (!instance || !config || !instance.upgradeStartTime) return

      const elapsed = (now - instance.upgradeStartTime) / 1000
      const upgradeTime = config.upgradeTime * Math.pow(BUILDING.timeMultiplier, instance.level - 1)
      
      if (elapsed >= upgradeTime) {
        // 升级完成
        instance.level++
        instance.status = BuildingStatus.BUILT
        delete instance.upgradeStartTime
        upgradeQueue.value.splice(index, 1)
        
        // 重新计算建筑效果
        recalculateAllEffects()
        
        console.log(`建筑升级完成: ${config.name} Lv.${instance.level}`)
      }
    })
  }

  // 应用建筑效果
  function applyBuildingEffects(buildingId: string) {
    const config = getBuildingConfig(buildingId)
    const instance = getBuildingInstance(buildingId)
    if (!config || !instance) return

    // 增加人口上限
    if (config.population) {
      gameStore.increasePopulationMax(config.population)
    }

    // 增加存储容量
    if (config.capacity) {
      Object.entries(config.capacity).forEach(([resource, amount]) => {
        resourceStore.increaseResourceLimit(resource as any, amount)
      })
    }

    // 重新计算资源产出
    recalculateAllEffects()
  }

  // 重新计算所有建筑效果
  function recalculateAllEffects() {
    // 重置所有产出
    resourceStore.recalculateProduction()

    // 遍历所有已建造的建筑
    buildingInstances.value.forEach(instance => {
      if (instance.status !== BuildingStatus.BUILT) return

      const config = getBuildingConfig(instance.buildingId)
      if (!config) return

      // 计算产出
      if (config.production) {
        const production = calculateProduction(instance.buildingId)
        Object.entries(production).forEach(([resource, amount]) => {
          const current = resourceStore.productionRates[resource as ResourceType] || 0
          resourceStore.setProductionRate(resource as ResourceType, current + amount)
        })
      }

      // 计算消耗
      if (config.consumption) {
        Object.entries(config.consumption).forEach(([resource, amount]) => {
          const levelBonus = 1 + BUILDING.productionIncreasePerLevel * (instance.level - 1)
          const consumption = (amount || 0) * levelBonus
          const current = resourceStore.consumptionRates[resource as ResourceType] || 0
          resourceStore.setConsumptionRate(resource as ResourceType, current + consumption)
        })
      }
    })
  }

  // 获取建筑进度百分比
  function getBuildingProgress(buildingId: string): number {
    const instance = getBuildingInstance(buildingId)
    const config = getBuildingConfig(buildingId)
    if (!instance || !config) return 0

    if (instance.status === BuildingStatus.BUILDING && instance.buildStartTime) {
      const elapsed = (Date.now() - instance.buildStartTime) / 1000
      return Math.min(100, (elapsed / config.buildTime) * 100)
    }

    if (instance.status === BuildingStatus.UPGRADING && instance.upgradeStartTime) {
      const elapsed = (Date.now() - instance.upgradeStartTime) / 1000
      const upgradeTime = config.upgradeTime * Math.pow(BUILDING.timeMultiplier, instance.level - 1)
      return Math.min(100, (elapsed / upgradeTime) * 100)
    }

    return 0
  }

  // 获取剩余时间
  function getRemainingTime(buildingId: string): number {
    const instance = getBuildingInstance(buildingId)
    const config = getBuildingConfig(buildingId)
    if (!instance || !config) return 0

    if (instance.status === BuildingStatus.BUILDING && instance.buildStartTime) {
      const elapsed = (Date.now() - instance.buildStartTime) / 1000
      return Math.max(0, config.buildTime - elapsed)
    }

    if (instance.status === BuildingStatus.UPGRADING && instance.upgradeStartTime) {
      const elapsed = (Date.now() - instance.upgradeStartTime) / 1000
      const upgradeTime = config.upgradeTime * Math.pow(BUILDING.timeMultiplier, instance.level - 1)
      return Math.max(0, upgradeTime - elapsed)
    }

    return 0
  }

  // 加载建筑数据
  function loadBuildings(data: BuildingInstance[]) {
    buildingInstances.value = data
    recalculateAllEffects()
  }

  // 重置建筑
  function resetBuildings() {
    buildingInstances.value = []
    buildQueue.value = []
    upgradeQueue.value = []
  }

  return {
    // 状态
    buildingInstances,
    buildQueue,
    upgradeQueue,
    // 方法
    getBuildingInstance,
    getBuildingConfig,
    isBuilt,
    canBuild,
    calculateUpgradeCost,
    calculateProduction,
    buildBuilding,
    updateBuildingProgress,
    applyBuildingEffects,
    recalculateAllEffects,
    getBuildingProgress,
    getRemainingTime,
    loadBuildings,
    resetBuildings
  }
})
