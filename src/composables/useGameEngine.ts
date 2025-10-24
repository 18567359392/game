import { onUnmounted } from 'vue'
import { useGameStore } from '@/stores/game'
import { useResourceStore } from '@/stores/resource'
import { useBuildingStore } from '@/stores/building'
import { useTechStore } from '@/stores/tech'
import { useAchievementStore } from '@/stores/achievement'
import { GAME_TICK_INTERVAL } from '@/config/constants'

export function useGameEngine() {
  const gameStore = useGameStore()
  const resourceStore = useResourceStore()
  const buildingStore = useBuildingStore()
  const techStore = useTechStore()
  const achievementStore = useAchievementStore()
  
  let animationFrameId: number | null = null
  let lastUpdateTime = 0
  let accumulator = 0
  let achievementCheckCounter = 0
  
  // 性能监控
  let frameCount = 0
  let fpsLastTime = 0
  let currentFPS = 60

  function gameLoop(currentTime: number) {
    if (lastUpdateTime === 0) {
      lastUpdateTime = currentTime
      fpsLastTime = currentTime
    }

    const deltaTime = currentTime - lastUpdateTime
    lastUpdateTime = currentTime
    accumulator += deltaTime
    
    // FPS计算
    frameCount++
    if (currentTime - fpsLastTime >= 1000) {
      currentFPS = frameCount
      frameCount = 0
      fpsLastTime = currentTime
      
      // 如果FPS低于50，进行性能调整
      if (currentFPS < 50) {
        console.warn(`Low FPS detected: ${currentFPS}, consider performance optimization`)
      }
    }

    // 每秒更新一次游戏逻辑，但限制积累时间避免卡顿
    const maxAccumulator = GAME_TICK_INTERVAL * 3 // 最多积累3秒
    if (accumulator > maxAccumulator) {
      console.warn(`Frame skip: accumulator ${accumulator}ms exceeded limit`)
      accumulator = maxAccumulator
    }
    
    while (accumulator >= GAME_TICK_INTERVAL) {
      updateGame(1) // 更新1秒
      accumulator -= GAME_TICK_INTERVAL
    }

    animationFrameId = requestAnimationFrame(gameLoop)
  }

  function updateGame(deltaTime: number) {
    if (gameStore.isPaused) return

    // 更新游戏时间
    gameStore.updateTime(deltaTime)

    // 更新资源产出
    resourceStore.updateResources(deltaTime)

    // 更新人口
    updatePopulation(deltaTime)

    // 更新人口增长(使用gameStore的方法)
    gameStore.updatePopulationGrowth(deltaTime)

    // 更新建筑建造进度
    buildingStore.updateBuildingProgress()

    // 更新科技研究进度
    techStore.updateResearchProgress()

    // 检查成就(每10秒检查一次，优化性能)
    achievementCheckCounter += deltaTime
    if (achievementCheckCounter >= 10) {
      achievementStore.checkAchievements()
      achievementCheckCounter = 0
    }
  }

  function updatePopulation(deltaTime: number) {
    const { current, max, growthRate } = gameStore.population
    
    // 检查食物是否充足
    const foodConsumption = current * 0.5 * deltaTime // 每人口消耗0.5食物/秒
    const currentFood = resourceStore.getResourceAmount('food')
    
    if (currentFood >= foodConsumption) {
      // 消耗食物
      resourceStore.consumeResource('food', foodConsumption)
      
      // 人口增长(如果未达到上限)
      if (current < max) {
        const growth = growthRate * deltaTime
        gameStore.updatePopulation(current + growth)
      }
    } else {
      // 食物不足,人口减少
      const decrease = growthRate * deltaTime * 0.5
      gameStore.updatePopulation(Math.max(0, current - decrease))
    }
  }

  function startEngine() {
    if (animationFrameId === null) {
      lastUpdateTime = 0
      accumulator = 0
      animationFrameId = requestAnimationFrame(gameLoop)
      console.log('Game engine started')
    }
  }

  function stopEngine() {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
      console.log('Game engine stopped')
    }
  }

  // 组件卸载时自动停止
  onUnmounted(() => {
    stopEngine()
  })

  return {
    startEngine,
    stopEngine
  }
}
