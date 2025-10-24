import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { technologies, getTechnology } from '@/config/technologies'
import { type TechnologyInstance, type Technology, type ResourceAmount, TechnologyStatus } from '@/types'
import { useResourceStore } from './resource'
import { useGameStore } from './game'

export const useTechStore = defineStore('tech', () => {
  // ========== 状态 ==========
  const techInstances = ref<Map<string, TechnologyInstance>>(new Map())
  const researchQueue = ref<string[]>([]) // 研究队列
  const currentResearch = ref<string | null>(null) // 当前正在研究的科技
  const researchSpeedMultiplier = ref<number>(1.0) // 研究速度加成

  // ========== Computed ==========
  /**
   * 所有已研究的科技ID列表
   */
  const researchedTechs = computed(() => {
    const researched: string[] = []
    techInstances.value.forEach((instance, techId) => {
      if (instance.status === TechnologyStatus.RESEARCHED) {
        researched.push(techId)
      }
    })
    return researched
  })

  /**
   * 当前可研究的科技列表(满足前置条件)
   */
  const availableTechs = computed(() => {
    return technologies.filter(tech => {
      const instance = techInstances.value.get(tech.id)
      // 已研究或正在研究的不显示
      if (instance?.status === TechnologyStatus.RESEARCHED || 
          instance?.status === TechnologyStatus.RESEARCHING) {
        return false
      }
      
      // 检查前置条件
      const canResearch = checkPrerequisites(tech.id)
      return canResearch
    })
  })

  /**
   * 当前研究进度(0-100)
   */
  const currentResearchProgress = computed(() => {
    if (!currentResearch.value) return 0
    const instance = techInstances.value.get(currentResearch.value)
    return instance?.researchProgress || 0
  })

  // ========== 初始化 ==========
  /**
   * 初始化所有科技状态
   */
  function initializeTechs() {
    technologies.forEach(tech => {
      if (!techInstances.value.has(tech.id)) {
        techInstances.value.set(tech.id, {
          technologyId: tech.id,
          status: TechnologyStatus.LOCKED,
          researchProgress: 0
        })
      }
    })
    updateTechStatus()
  }

  /**
   * 更新所有科技的可用状态
   */
  function updateTechStatus() {
    techInstances.value.forEach((instance, techId) => {
      if (instance.status === TechnologyStatus.LOCKED) {
        const canResearch = checkPrerequisites(techId)
        if (canResearch) {
          instance.status = TechnologyStatus.AVAILABLE
        }
      }
    })
  }

  // ========== 研究逻辑 ==========
  /**
   * 检查科技的前置条件是否满足
   */
  function checkPrerequisites(techId: string): boolean {
    const tech = getTechnology(techId)
    if (!tech) return false

    // 检查所有前置科技是否已研究
    return tech.prerequisites.every(prereqId => {
      const prereq = techInstances.value.get(prereqId)
      return prereq?.status === TechnologyStatus.RESEARCHED
    })
  }

  /**
   * 检查是否可以研究某个科技
   */
  function canResearch(techId: string): { can: boolean; reason?: string } {
    const tech = getTechnology(techId)
    if (!tech) {
      return { can: false, reason: '科技不存在' }
    }

    const instance = techInstances.value.get(techId)
    if (!instance) {
      return { can: false, reason: '科技未初始化' }
    }

    // 检查状态
    if (instance.status === TechnologyStatus.RESEARCHED) {
      return { can: false, reason: '已经研究完成' }
    }

    if (instance.status === TechnologyStatus.RESEARCHING) {
      return { can: false, reason: '正在研究中' }
    }

    if (instance.status === TechnologyStatus.LOCKED) {
      return { can: false, reason: '前置条件不满足' }
    }

    // 检查是否有正在研究的科技
    if (currentResearch.value && currentResearch.value !== techId) {
      return { can: false, reason: '已有科技正在研究' }
    }

    // 检查资源
    const resourceStore = useResourceStore()
    if (!resourceStore.hasEnoughResources(tech.researchCost)) {
      return { can: false, reason: '资源不足' }
    }

    return { can: true }
  }

  /**
   * 开始研究科技
   */
  function startResearch(techId: string): boolean {
    const check = canResearch(techId)
    if (!check.can) {
      console.warn(`无法研究科技 ${techId}: ${check.reason}`)
      return false
    }

    const tech = getTechnology(techId)
    if (!tech) return false

    // 消耗资源
    const resourceStore = useResourceStore()
    if (!resourceStore.consumeResources(tech.researchCost)) {
      return false
    }

    // 更新状态
    const instance = techInstances.value.get(techId)
    if (instance) {
      instance.status = TechnologyStatus.RESEARCHING
      instance.researchStartTime = Date.now()
      instance.researchProgress = 0
      currentResearch.value = techId
    }

    return true
  }

  /**
   * 取消研究(退还部分资源)
   */
  function cancelResearch(techId: string): boolean {
    const instance = techInstances.value.get(techId)
    if (!instance || instance.status !== TechnologyStatus.RESEARCHING) {
      return false
    }

    const tech = getTechnology(techId)
    if (!tech) return false

    // 退还50%的资源
    const resourceStore = useResourceStore()
    const refundAmount: ResourceAmount = {}
    Object.entries(tech.researchCost).forEach(([resourceId, amount]) => {
      refundAmount[resourceId as keyof ResourceAmount] = amount * 0.5
    })
    resourceStore.addResources(refundAmount)

    // 重置状态
    instance.status = TechnologyStatus.AVAILABLE
    instance.researchProgress = 0
    instance.researchStartTime = undefined
    
    if (currentResearch.value === techId) {
      currentResearch.value = null
    }

    return true
  }

  /**
   * 更新研究进度
   */
  function updateResearchProgress() {
    if (!currentResearch.value) return

    const instance = techInstances.value.get(currentResearch.value)
    if (!instance || instance.status !== TechnologyStatus.RESEARCHING) {
      currentResearch.value = null
      return
    }

    const tech = getTechnology(currentResearch.value)
    if (!tech || !instance.researchStartTime) return

    const now = Date.now()
    const elapsed = (now - instance.researchStartTime) / 1000 // 转换为秒
    const totalTime = tech.researchTime / researchSpeedMultiplier.value
    const progress = Math.min((elapsed / totalTime) * 100, 100)

    instance.researchProgress = progress

    // 研究完成
    if (progress >= 100) {
      completeResearch(currentResearch.value)
    }
  }

  /**
   * 完成研究
   */
  function completeResearch(techId: string) {
    const instance = techInstances.value.get(techId)
    if (!instance) return

    instance.status = TechnologyStatus.RESEARCHED
    instance.researchProgress = 100
    currentResearch.value = null

    const tech = getTechnology(techId)
    if (tech) {
      applyTechEffects(tech)
      console.log(`✅ 研究完成: ${tech.name}`)
    }

    // 更新可用科技状态
    updateTechStatus()
  }

  /**
   * 应用科技效果
   */
  function applyTechEffects(tech: Technology) {
    const resourceStore = useResourceStore()
    const gameStore = useGameStore()

    tech.effects.forEach(effect => {
      switch (effect.type) {
        case 'resourceMultiplier':
          if (effect.target) {
            // 更新资源生产倍率
            const currentMultiplier = resourceStore.resourceMultipliers[effect.target] || 1.0
            resourceStore.resourceMultipliers[effect.target] = currentMultiplier * effect.value
          }
          break

        case 'researchSpeedBonus':
          // 累加研究速度加成
          researchSpeedMultiplier.value *= effect.value
          break

        case 'buildSpeedBonus':
          // 这个效果需要在建筑系统中应用
          // 通过事件系统通知建筑系统
          gameStore.emitEvent('techEffectApplied', {
            type: 'buildSpeedBonus',
            value: effect.value
          })
          break

        case 'populationGrowth':
          // 人口增长加成
          gameStore.emitEvent('techEffectApplied', {
            type: 'populationGrowth',
            value: effect.value
          })
          break
      }
    })
  }

  /**
   * 获取科技实例
   */
  function getTechInstance(techId: string): TechnologyInstance | undefined {
    return techInstances.value.get(techId)
  }

  /**
   * 获取科技状态
   */
  function getTechStatus(techId: string): TechnologyStatus {
    const instance = techInstances.value.get(techId)
    return instance?.status || TechnologyStatus.LOCKED
  }

  /**
   * 检查科技是否已研究
   */
  function isTechResearched(techId: string): boolean {
    return getTechStatus(techId) === TechnologyStatus.RESEARCHED
  }

  /**
   * 计算科技剩余时间(秒)
   */
  function getRemainingTime(techId: string): number {
    const instance = techInstances.value.get(techId)
    const tech = getTechnology(techId)
    
    if (!instance || !tech || instance.status !== TechnologyStatus.RESEARCHING || !instance.researchStartTime) {
      return 0
    }

    const now = Date.now()
    const elapsed = (now - instance.researchStartTime) / 1000
    const totalTime = tech.researchTime / researchSpeedMultiplier.value
    const remaining = Math.max(totalTime - elapsed, 0)

    return remaining
  }

  /**
   * 获取研究速度倍率
   */
  function getResearchSpeedMultiplier(): number {
    return researchSpeedMultiplier.value
  }

  // ========== 存档系统 ==========
  /**
   * 导出科技数据用于存档
   */
  function exportTechData(): TechnologyInstance[] {
    return Array.from(techInstances.value.values())
  }

  /**
   * 从存档加载科技数据
   */
  function loadTechData(data: TechnologyInstance[]) {
    techInstances.value.clear()
    data.forEach(instance => {
      techInstances.value.set(instance.technologyId, { ...instance })
    })
    
    // 恢复当前研究
    techInstances.value.forEach((instance, techId) => {
      if (instance.status === TechnologyStatus.RESEARCHING) {
        currentResearch.value = techId
      }
    })

    updateTechStatus()
  }

  /**
   * 重置科技系统
   */
  function resetTechs() {
    techInstances.value.clear()
    researchQueue.value = []
    currentResearch.value = null
    researchSpeedMultiplier.value = 1.0
    initializeTechs()
  }

  return {
    // 状态
    techInstances,
    researchQueue,
    currentResearch,
    researchSpeedMultiplier,
    
    // Computed
    researchedTechs,
    availableTechs,
    currentResearchProgress,
    
    // 方法
    initializeTechs,
    updateTechStatus,
    checkPrerequisites,
    canResearch,
    startResearch,
    cancelResearch,
    updateResearchProgress,
    completeResearch,
    applyTechEffects,
    getTechInstance,
    getTechStatus,
    isTechResearched,
    getRemainingTime,
    getResearchSpeedMultiplier,
    
    // 存档
    exportTechData,
    loadTechData,
    resetTechs
  }
})
