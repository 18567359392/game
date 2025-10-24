import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { achievements, getAchievement } from '@/config/achievements'
import { type AchievementInstance, type Achievement, type ResourceType } from '@/types'
import { useGameStore } from './game'
import { useResourceStore } from './resource'
import { useBuildingStore } from './building'
import { useTechStore } from './tech'

export const useAchievementStore = defineStore('achievement', () => {
  // ========== 状态 ==========
  const achievementInstances = ref<Map<string, AchievementInstance>>(new Map())
  const recentUnlocks = ref<string[]>([]) // 最近解锁的成就ID列表
  
  // ========== Computed ==========
  const unlockedAchievements = computed(() => {
    const unlocked: Achievement[] = []
    achievementInstances.value.forEach((instance, id) => {
      if (instance.unlocked) {
        const achievement = getAchievement(id)
        if (achievement) unlocked.push(achievement)
      }
    })
    return unlocked
  })
  
  const lockedAchievements = computed(() => {
    return achievements.filter(achievement => {
      const instance = achievementInstances.value.get(achievement.id)
      return !instance?.unlocked
    })
  })
  
  const achievementProgress = computed(() => {
    const total = achievements.length
    const unlocked = unlockedAchievements.value.length
    return {
      unlocked,
      total,
      percentage: (unlocked / total) * 100
    }
  })
  
  // ========== 初始化 ==========
  function initializeAchievements() {
    achievements.forEach(achievement => {
      if (!achievementInstances.value.has(achievement.id)) {
        achievementInstances.value.set(achievement.id, {
          achievementId: achievement.id,
          unlocked: false,
          progress: 0
        })
      }
    })
  }
  
  // ========== 成就检测 ==========
  /**
   * 检查所有成就条件
   */
  function checkAchievements() {
    const gameStore = useGameStore()
    const resourceStore = useResourceStore()
    const buildingStore = useBuildingStore()
    const techStore = useTechStore()
    
    achievements.forEach(achievement => {
      const instance = achievementInstances.value.get(achievement.id)
      if (!instance || instance.unlocked) return
      
      let progress = 0
      let condition = achievement.condition
      
      switch (condition.type) {
        case 'era':
          // 检查时代进度
          const eraOrder = ['stone', 'bronze', 'iron', 'industrial', 'information', 'space', 'interstellar', 'hyperdimensional']
          const currentEraIndex = eraOrder.indexOf(gameStore.currentEra)
          progress = currentEraIndex >= condition.value ? 100 : (currentEraIndex / condition.value) * 100
          break
          
        case 'resource':
          // 检查资源累计量(需要追踪系统,这里简化为当前量)
          if (condition.target) {
            const current = resourceStore.getResourceAmount(condition.target as ResourceType)
            progress = Math.min((current / condition.value) * 100, 100)
          }
          break
          
        case 'building':
          // 检查建筑数量
          const buildings = buildingStore.buildingInstances
          let count = 0
          
          if (condition.target === 'max_level') {
            // 检查是否有满级建筑
            count = buildings.filter(b => {
              const config = buildingStore.getBuildingConfig(b.buildingId)
              return config && b.level >= config.maxLevel
            }).length
          } else if (condition.target) {
            // 检查特定类型建筑
            count = buildings.filter(b => {
              const config = buildingStore.getBuildingConfig(b.buildingId)
              return config && config.type === condition.target
            }).length
          } else {
            // 检查总建筑数
            count = buildings.length
          }
          
          progress = Math.min((count / condition.value) * 100, 100)
          break
          
        case 'technology':
          // 检查科技数量
          const techs = techStore.researchedTechs
          progress = Math.min((techs.length / condition.value) * 100, 100)
          break
          
        case 'population':
          // 检查人口
          const current = gameStore.population.current
          progress = Math.min((current / condition.value) * 100, 100)
          break
          
        case 'time':
          // 检查游戏时间
          progress = Math.min((gameStore.gameTime / condition.value) * 100, 100)
          break
      }
      
      instance.progress = progress
      
      // 如果达成条件,解锁成就
      if (progress >= 100) {
        unlockAchievement(achievement.id)
      }
    })
  }
  
  /**
   * 解锁成就
   */
  function unlockAchievement(achievementId: string) {
    const instance = achievementInstances.value.get(achievementId)
    if (!instance || instance.unlocked) return
    
    const achievement = getAchievement(achievementId)
    if (!achievement) return
    
    // 标记为已解锁
    instance.unlocked = true
    instance.unlockedAt = Date.now()
    instance.progress = 100
    
    // 发放奖励
    const resourceStore = useResourceStore()
    if (achievement.reward) {
      resourceStore.addResources(achievement.reward)
    }
    
    // 应用永久效果
    if (achievement.permanentEffect) {
      applyPermanentEffect(achievement)
    }
    
    // 添加到最近解锁列表
    recentUnlocks.value.unshift(achievementId)
    if (recentUnlocks.value.length > 5) {
      recentUnlocks.value.pop()
    }
    
    console.log(`🏆 成就解锁: ${achievement.name}`)
  }
  
  /**
   * 应用成就的永久效果
   */
  function applyPermanentEffect(achievement: Achievement) {
    if (!achievement.permanentEffect) return
    
    const effect = achievement.permanentEffect
    const resourceStore = useResourceStore()
    const gameStore = useGameStore()
    
    switch (effect.type) {
      case 'resourceMultiplier':
        if (effect.target) {
          const current = resourceStore.resourceMultipliers[effect.target] || 1.0
          resourceStore.resourceMultipliers[effect.target] = current * effect.value
        }
        break
        
      case 'researchSpeedBonus':
        gameStore.emitEvent('achievementEffect', {
          type: 'researchSpeedBonus',
          value: effect.value
        })
        break
        
      case 'buildSpeedBonus':
        gameStore.emitEvent('achievementEffect', {
          type: 'buildSpeedBonus',
          value: effect.value
        })
        break
    }
  }
  
  /**
   * 获取成就实例
   */
  function getAchievementInstance(achievementId: string): AchievementInstance | undefined {
    return achievementInstances.value.get(achievementId)
  }
  
  /**
   * 清除最近解锁通知
   */
  function clearRecentUnlock(achievementId: string) {
    const index = recentUnlocks.value.indexOf(achievementId)
    if (index > -1) {
      recentUnlocks.value.splice(index, 1)
    }
  }
  
  /**
   * 清除所有最近解锁通知
   */
  function clearAllRecentUnlocks() {
    recentUnlocks.value = []
  }
  
  // ========== 存档系统 ==========
  function exportAchievementData(): AchievementInstance[] {
    return Array.from(achievementInstances.value.values())
  }
  
  function loadAchievementData(data: AchievementInstance[]) {
    achievementInstances.value.clear()
    data.forEach(instance => {
      achievementInstances.value.set(instance.achievementId, { ...instance })
    })
  }
  
  function resetAchievements() {
    achievementInstances.value.clear()
    recentUnlocks.value = []
    initializeAchievements()
  }
  
  return {
    // 状态
    achievementInstances,
    recentUnlocks,
    
    // Computed
    unlockedAchievements,
    lockedAchievements,
    achievementProgress,
    
    // 方法
    initializeAchievements,
    checkAchievements,
    unlockAchievement,
    applyPermanentEffect,
    getAchievementInstance,
    clearRecentUnlock,
    clearAllRecentUnlocks,
    
    // 存档
    exportAchievementData,
    loadAchievementData,
    resetAchievements
  }
})
