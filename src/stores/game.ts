import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { type GameState, Era } from '@/types'
import { POPULATION } from '@/config/constants'

export const useGameStore = defineStore('game', () => {
  // 状态
  const currentEra = ref<Era>(Era.STONE)
  const gameTime = ref(0)
  const lastSaveTime = ref(Date.now())
  const lastPlayTime = ref(Date.now())
  const isPaused = ref(false)
  const gameSpeed = ref(1.0)

  // 人口
  const population = ref({
    current: POPULATION.initialPopulation,
    max: POPULATION.initialMaxPopulation,
    growthRate: POPULATION.baseGrowthRate
  })

  // 事件监听器
  const eventListeners = new Map<string, Array<(data: any) => void>>()

  // 离线时间追踪
  const offlineTime = ref<number>(0)
  const showOfflineModal = ref<boolean>(false)

  // 计算属性
  const formattedGameTime = computed(() => {
    const hours = Math.floor(gameTime.value / 3600)
    const minutes = Math.floor((gameTime.value % 3600) / 60)
    const seconds = Math.floor(gameTime.value % 60)
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  })

  // 获取游戏状态
  const getGameState = computed((): GameState => ({
    currentEra: currentEra.value,
    gameTime: gameTime.value,
    lastSaveTime: lastSaveTime.value,
    lastPlayTime: lastPlayTime.value,
    population: { ...population.value }
  }))

  // 方法
  function startGame() {
    isPaused.value = false
    lastPlayTime.value = Date.now()
  }

  function pauseGame() {
    isPaused.value = true
  }

  function updateTime(deltaTime: number) {
    if (!isPaused.value) {
      gameTime.value += deltaTime * gameSpeed.value
    }
  }

  function updateLastPlayTime() {
    lastPlayTime.value = Date.now()
  }

  function updateLastSaveTime() {
    lastSaveTime.value = Date.now()
  }

  function setEra(era: Era) {
    const oldEra = currentEra.value
    currentEra.value = era
    
    // 触发时代变化事件
    emitEvent('eraChanged', { oldEra, newEra: era })
    
    console.log(`✨ 进入新时代: ${era}`)
  }

  /**
   * 更新人口增长
   */
  function updatePopulationGrowth(deltaTime: number) {
    if (isPaused.value) return
    
    // 只有当前人口小于上限时才增长
    if (population.value.current < population.value.max) {
      const growth = population.value.growthRate * deltaTime
      population.value.current = Math.min(
        population.value.current + growth,
        population.value.max
      )
    }
  }

  /**
   * 设置人口增长率
   */
  function setPopulationGrowthRate(rate: number) {
    population.value.growthRate = rate
  }

  /**
   * 检查是否可以进入下一个时代
   */
  function canAdvanceEra(): { can: boolean; nextEra?: Era; reason?: string } {
    const eraOrder = [
      Era.STONE,
      Era.BRONZE,
      Era.IRON,
      Era.INDUSTRIAL,
      Era.INFORMATION,
      Era.SPACE,
      Era.INTERSTELLAR,
      Era.HYPERDIMENSIONAL
    ]
    
    const currentIndex = eraOrder.indexOf(currentEra.value)
    if (currentIndex === -1) {
      return { can: false, reason: '当前时代无效' }
    }
    
    if (currentIndex >= eraOrder.length - 1) {
      return { can: false, reason: '已达到最高时代' }
    }
    
    const nextEra = eraOrder[currentIndex + 1]
    
    // 时代进阶条件:
    // 1. 需要研究对应时代的关键科技
    // 2. 需要达到一定人口数量
    // 3. 需要建造特定建筑
    // 这些条件将由外部Store(tech, building)检查
    
    return { can: true, nextEra }
  }

  /**
   * 进入下一个时代
   */
  function advanceEra(): boolean {
    const check = canAdvanceEra()
    if (!check.can || !check.nextEra) {
      console.warn(`无法进入下一时代: ${check.reason}`)
      return false
    }
    
    setEra(check.nextEra)
    return true
  }

  function setGameSpeed(speed: number) {
    gameSpeed.value = speed
  }

  function updatePopulation(current: number, max?: number) {
    population.value.current = Math.max(0, current)
    if (max !== undefined) {
      population.value.max = max
    }
    // 确保当前人口不超过上限
    if (population.value.current > population.value.max) {
      population.value.current = population.value.max
    }
  }

  function increasePopulationMax(amount: number) {
    population.value.max += amount
  }

  function loadGameState(state: GameState) {
    currentEra.value = state.currentEra
    gameTime.value = state.gameTime
    lastSaveTime.value = state.lastSaveTime
    lastPlayTime.value = state.lastPlayTime
    population.value = { ...state.population }
  }

  function resetGame() {
    currentEra.value = Era.STONE
    gameTime.value = 0
    lastSaveTime.value = Date.now()
    lastPlayTime.value = Date.now()
    isPaused.value = false
    gameSpeed.value = 1.0
    population.value = {
      current: POPULATION.initialPopulation,
      max: POPULATION.initialMaxPopulation,
      growthRate: POPULATION.baseGrowthRate
    }
  }

  // 事件系统
  function emitEvent(eventName: string, data?: any) {
    const listeners = eventListeners.get(eventName)
    if (listeners) {
      listeners.forEach(listener => listener(data))
    }
  }

  function addEventListener(eventName: string, callback: (data: any) => void) {
    if (!eventListeners.has(eventName)) {
      eventListeners.set(eventName, [])
    }
    eventListeners.get(eventName)!.push(callback)
  }

  function removeEventListener(eventName: string, callback: (data: any) => void) {
    const listeners = eventListeners.get(eventName)
    if (listeners) {
      const index = listeners.indexOf(callback)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }

  // 离线收益系统
  function setOfflineTime(time: number) {
    offlineTime.value = time
    if (time > 60) { // 超过1分钟
      showOfflineModal.value = true
    }
  }

  function closeOfflineModal() {
    showOfflineModal.value = false
    offlineTime.value = 0
  }

  return {
    // 状态
    currentEra,
    gameTime,
    lastSaveTime,
    lastPlayTime,
    isPaused,
    gameSpeed,
    population,
    offlineTime,
    showOfflineModal,
    // 计算属性
    formattedGameTime,
    getGameState,
    // 方法
    startGame,
    pauseGame,
    updateTime,
    updateLastPlayTime,
    updateLastSaveTime,
    setEra,
    canAdvanceEra,
    advanceEra,
    setGameSpeed,
    updatePopulation,
    increasePopulationMax,
    updatePopulationGrowth,
    setPopulationGrowthRate,
    loadGameState,
    resetGame,
    emitEvent,
    addEventListener,
    removeEventListener,
    setOfflineTime,
    closeOfflineModal
  }
})
