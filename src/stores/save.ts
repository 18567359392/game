import { defineStore } from 'pinia'
import { type SaveData } from '@/types'
import { useGameStore } from './game'
import { useResourceStore } from './resource'
import { useBuildingStore } from './building'
import { useTechStore } from './tech'
import { useAchievementStore } from './achievement'
import { STORAGE_KEYS, GAME_VERSION } from '@/config/constants'

export const useSaveStore = defineStore('save', () => {
  const gameStore = useGameStore()
  const resourceStore = useResourceStore()
  const buildingStore = useBuildingStore()
  const techStore = useTechStore()
  const achievementStore = useAchievementStore()

  // 压缩存档数据
  function compressSaveData(data: SaveData): string {
    // 移除不必要的字段,只保留关键数据
    const compressed = {
      v: data.version,
      c: data.createdAt,
      l: data.lastSaved,
      g: {
        e: data.gameState.currentEra,
        t: data.gameState.gameTime,
        p: {
          c: Math.floor(data.gameState.population.current),
          m: data.gameState.population.max,
          g: data.gameState.population.growthRate
        },
        lp: data.gameState.lastPlayTime
      },
      r: Object.fromEntries(
        Object.entries(data.resources)
          .filter(([_, amount]) => amount > 0.01) // 过滤掉极小值
          .map(([id, amount]) => [id, Math.floor(amount as number * 10) / 10]) // 保留1位小数
      ),
      b: data.buildings.map(b => ({
        i: b.buildingId,
        l: b.level,
        s: b.status
      })),
      t: data.technologies.map(t => ({
        i: t.technologyId,
        s: t.status,
        p: t.researchProgress ? Math.floor(t.researchProgress * 100) / 100 : undefined
      })),
      a: data.achievements
        .filter(a => a.unlocked || (a.progress && a.progress > 0))
        .map(a => ({
          i: a.achievementId,
          u: a.unlocked,
          p: a.progress ? Math.floor(a.progress * 100) / 100 : undefined
        }))
    }
    
    return JSON.stringify(compressed)
  }
  
  // 解压存档数据
  function decompressSaveData(compressedData: string): SaveData {
    const c = JSON.parse(compressedData)
    
    // 兼容旧版本未压缩的存档
    if (c.version) {
      return c as SaveData
    }
    
    // 解压新版本压缩存档
    return {
      version: c.v,
      createdAt: c.c,
      lastSaved: c.l,
      gameState: {
        currentEra: c.g.e,
        gameTime: c.g.t,
        population: {
          current: c.g.p.c,
          max: c.g.p.m,
          growthRate: c.g.p.g
        },
        lastPlayTime: c.g.lp,
        lastSaveTime: c.l
      },
      resources: c.r,
      buildings: c.b.map((b: any) => ({
        buildingId: b.i,
        level: b.l,
        status: b.s
      })),
      technologies: c.t.map((t: any) => ({
        technologyId: t.i,
        status: t.s,
        researchProgress: t.p
      })),
      achievements: c.a.map((a: any) => ({
        achievementId: a.i,
        unlocked: a.u,
        progress: a.p
      }))
    }
  }
  function saveGame(): boolean {
    try {
      const saveData: SaveData = {
        version: GAME_VERSION,
        createdAt: Date.now(),
        lastSaved: Date.now(),
        gameState: gameStore.getGameState,
        resources: resourceStore.resourceAmounts as any,
        buildings: buildingStore.buildingInstances,
        technologies: techStore.exportTechData(),
        achievements: achievementStore.exportAchievementData()
      }

      // 使用压缩后的数据
      const compressedData = compressSaveData(saveData)
      localStorage.setItem(STORAGE_KEYS.saveData, compressedData)
      gameStore.updateLastSaveTime()
      
      // 计算压缩率
      const originalSize = JSON.stringify(saveData).length
      const compressedSize = compressedData.length
      const ratio = ((1 - compressedSize / originalSize) * 100).toFixed(1)
      console.log(`游戏已保存 (压缩率: ${ratio}%, ${originalSize}B → ${compressedSize}B)`)
      
      return true
    } catch (error) {
      console.error('保存失败:', error)
      return false
    }
  }

  // 加载游戏
  function loadGame(): boolean {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.saveData)
      if (!data) {
        console.log('没有找到存档')
        return false
      }

      // 解压存档数据
      const saveData = decompressSaveData(data)
      
      // 版本检查
      if (saveData.version !== GAME_VERSION) {
        console.warn('存档版本不匹配,可能需要迁移')
      }

      // 计算离线时间
      const now = Date.now()
      const offlineTime = (now - saveData.gameState.lastPlayTime) / 1000 // 转换为秒
      
      if (offlineTime > 60) { // 离线超过1分钟才计算收益
        console.log(`离线时间: ${(offlineTime / 60).toFixed(1)}分钟`)
        gameStore.setOfflineTime(offlineTime)
      }

      // 加载游戏状态
      gameStore.loadGameState(saveData.gameState)
      
      // 加载资源
      resourceStore.loadResources(saveData.resources)
      
      // 加载建筑
      buildingStore.loadBuildings(saveData.buildings)
      
      // 加载科技
      if (saveData.technologies && saveData.technologies.length > 0) {
        techStore.loadTechData(saveData.technologies)
      } else {
        techStore.initializeTechs()
      }
      
      // 加载成就
      if (saveData.achievements && saveData.achievements.length > 0) {
        achievementStore.loadAchievementData(saveData.achievements)
      } else {
        achievementStore.initializeAchievements()
      }

      console.log('游戏已加载')
      return true
    } catch (error) {
      console.error('加载失败:', error)
      return false
    }
  }

  // 删除存档
  function deleteSave(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEYS.saveData)
      console.log('存档已删除')
      return true
    } catch (error) {
      console.error('删除存档失败:', error)
      return false
    }
  }

  // 检查是否存在存档
  function hasSave(): boolean {
    return localStorage.getItem(STORAGE_KEYS.saveData) !== null
  }

  // 导出存档
  function exportSave(): string | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.saveData)
      if (!data) return null
      
      const blob = new Blob([data], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = `civilization-save-${Date.now()}.json`
      a.click()
      
      URL.revokeObjectURL(url)
      console.log('存档已导出')
      return data
    } catch (error) {
      console.error('导出失败:', error)
      return null
    }
  }

  // 导入存档
  function importSave(data: string): boolean {
    try {
      // 验证数据
      const saveData: SaveData = JSON.parse(data)
      if (!saveData.version || !saveData.gameState) {
        throw new Error('无效的存档数据')
      }

      // 保存到 localStorage
      localStorage.setItem(STORAGE_KEYS.saveData, data)
      
      // 加载游戏
      return loadGame()
    } catch (error) {
      console.error('导入失败:', error)
      return false
    }
  }

  // 新游戏
  function newGame(): void {
    gameStore.resetGame()
    resourceStore.resetResources()
    buildingStore.resetBuildings()
    techStore.resetTechs()
    achievementStore.resetAchievements()
    
    // 初始化资源
    resourceStore.initializeResources()
    // 初始化科技
    techStore.initializeTechs()
    // 初始化成就
    achievementStore.initializeAchievements()
    
    console.log('开始新游戏')
  }

  return {
    saveGame,
    loadGame,
    deleteSave,
    hasSave,
    exportSave,
    importSave,
    newGame
  }
})
