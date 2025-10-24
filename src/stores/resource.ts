import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type ResourceType, type ResourceAmount } from '@/types'
import { resources } from '@/config/resources'

export const useResourceStore = defineStore('resource', () => {
  // 资源数量
  const resourceAmounts = ref<Record<ResourceType, number>>({} as Record<ResourceType, number>)
  
  // 资源存储上限
  const resourceLimits = ref<Record<ResourceType, number>>({} as Record<ResourceType, number>)
  
  // 资源产出速率(每秒)
  const productionRates = ref<Record<ResourceType, number>>({} as Record<ResourceType, number>)
  
  // 资源消耗速率(每秒)
  const consumptionRates = ref<Record<ResourceType, number>>({} as Record<ResourceType, number>)

  // 资源产出倍率(用于科技和成就加成)
  const resourceMultipliers = ref<Record<string, number>>({})

  // 初始化资源
  function initializeResources() {
    resources.forEach(resource => {
      resourceAmounts.value[resource.id] = 0
      resourceLimits.value[resource.id] = resource.baseStorage
      productionRates.value[resource.id] = 0
      consumptionRates.value[resource.id] = 0
    })
    
    // 设置初始资源
    resourceAmounts.value.food = 100
    resourceAmounts.value.wood = 50
    resourceAmounts.value.stone = 50
  }

  // 获取资源数量
  function getResourceAmount(resourceId: ResourceType): number {
    return resourceAmounts.value[resourceId] || 0
  }

  // 获取资源上限
  function getResourceLimit(resourceId: ResourceType): number {
    return resourceLimits.value[resourceId] || 0
  }

  // 添加资源
  function addResource(resourceId: ResourceType, amount: number) {
    const current = resourceAmounts.value[resourceId] || 0
    const limit = resourceLimits.value[resourceId] || Infinity
    resourceAmounts.value[resourceId] = Math.min(current + amount, limit)
  }

  // 批量添加资源
  function addResources(resources: ResourceAmount) {
    Object.entries(resources).forEach(([resourceId, amount]) => {
      addResource(resourceId as ResourceType, amount)
    })
  }

  // 消耗资源
  function consumeResource(resourceId: ResourceType, amount: number): boolean {
    const current = resourceAmounts.value[resourceId] || 0
    if (current >= amount) {
      resourceAmounts.value[resourceId] = current - amount
      return true
    }
    return false
  }

  // 检查是否有足够的资源
  function hasEnoughResources(costs: ResourceAmount): boolean {
    return Object.entries(costs).every(([resourceId, amount]) => {
      return getResourceAmount(resourceId as ResourceType) >= amount
    })
  }

  // 检查单个资源是否足够
  function hasResource(resourceId: string, amount: number): boolean {
    return getResourceAmount(resourceId as ResourceType) >= amount
  }

  // 批量消耗资源
  function consumeResources(costs: ResourceAmount): boolean {
    if (!hasEnoughResources(costs)) {
      return false
    }
    Object.entries(costs).forEach(([resourceId, amount]) => {
      consumeResource(resourceId as ResourceType, amount)
    })
    return true
  }

  // 设置资源上限
  function setResourceLimit(resourceId: ResourceType, limit: number) {
    resourceLimits.value[resourceId] = limit
  }

  // 增加资源上限
  function increaseResourceLimit(resourceId: ResourceType, amount: number) {
    const current = resourceLimits.value[resourceId] || 0
    resourceLimits.value[resourceId] = current + amount
  }

  // 设置资源产出速率
  function setProductionRate(resourceId: ResourceType, rate: number) {
    productionRates.value[resourceId] = rate
  }

  // 设置资源消耗速率
  function setConsumptionRate(resourceId: ResourceType, rate: number) {
    consumptionRates.value[resourceId] = rate
  }

  // 更新资源(每秒调用)
  function updateResources(deltaTime: number = 1) {
    Object.keys(resourceAmounts.value).forEach((resourceId) => {
      const id = resourceId as ResourceType
      const production = productionRates.value[id] || 0
      const consumption = consumptionRates.value[id] || 0
      const netProduction = (production - consumption) * deltaTime
      
      if (netProduction > 0) {
        addResource(id, netProduction)
      } else if (netProduction < 0) {
        // 只有在有足够资源时才消耗
        const currentAmount = getResourceAmount(id)
        const consumeAmount = Math.abs(netProduction)
        if (currentAmount >= consumeAmount) {
          consumeResource(id, consumeAmount)
        } else {
          // 资源不足,只消耗现有的
          resourceAmounts.value[id] = 0
        }
      }
    })
  }

  // 计算净产出
  const netProduction = computed(() => {
    const result: Record<ResourceType, number> = {} as Record<ResourceType, number>
    Object.keys(resourceAmounts.value).forEach((resourceId) => {
      const id = resourceId as ResourceType
      const production = productionRates.value[id] || 0
      const consumption = consumptionRates.value[id] || 0
      result[id] = production - consumption
    })
    return result
  })

  // 重新计算所有产出(从建筑中汇总)
  function recalculateProduction() {
    // 重置所有产出和消耗
    Object.keys(productionRates.value).forEach((resourceId) => {
      productionRates.value[resourceId as ResourceType] = 0
      consumptionRates.value[resourceId as ResourceType] = 0
    })
    // 这个方法会在建筑Store中调用,汇总所有建筑的产出
  }

  // 加载资源数据
  function loadResources(data: Record<ResourceType, number>) {
    Object.entries(data).forEach(([resourceId, amount]) => {
      resourceAmounts.value[resourceId as ResourceType] = amount
    })
  }

  // 重置资源
  function resetResources() {
    initializeResources()
  }

  return {
    // 状态
    resourceAmounts,
    resourceLimits,
    productionRates,
    consumptionRates,
    resourceMultipliers,
    // 计算属性
    netProduction,
    // 方法
    initializeResources,
    getResourceAmount,
    getResourceLimit,
    addResource,
    addResources,
    consumeResource,
    hasEnoughResources,
    hasResource,
    consumeResources,
    setResourceLimit,
    increaseResourceLimit,
    setProductionRate,
    setConsumptionRate,
    updateResources,
    recalculateProduction,
    loadResources,
    resetResources
  }
})
