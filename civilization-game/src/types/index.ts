// 游戏时代枚举
export const Era = {
  STONE: 'stone',
  BRONZE: 'bronze',
  IRON: 'iron',
  INDUSTRIAL: 'industrial',
  INFORMATION: 'information',
  SPACE: 'space',
  INTERSTELLAR: 'interstellar',
  HYPERDIMENSIONAL: 'hyperdimensional'
} as const

export type Era = typeof Era[keyof typeof Era]

// 资源类型
export type ResourceType = 
  // 基础资源
  | 'food' | 'wood' | 'stone' 
  // 中级资源
  | 'copper' | 'iron' | 'coal' | 'clay'
  // 高级资源
  | 'steel' | 'oil' | 'electricity' | 'chip' | 'data'
  // 太空资源
  | 'rocketFuel' | 'alloy' | 'helium3' | 'titaniumOre' | 'hydrogen'
  // 星际资源
  | 'antimatter' | 'darkMatter' | 'alienOre' | 'biomass' | 'stardust'
  // 超维资源
  | 'quantumEnergy' | 'spacetimeCrystal' | 'dimensionFragment' | 'singularityEnergy'
  // 特殊资源
  | 'gold' | 'knowledge' | 'culture' | 'prestige'

// 资源接口
export interface Resource {
  id: ResourceType
  name: string
  description: string
  icon: string
  category: 'basic' | 'intermediate' | 'advanced' | 'space' | 'interstellar' | 'hyperdimensional' | 'special'
  era: Era
  baseStorage: number // 基础存储上限
}

// 资源数量映射
export type ResourceAmount = Partial<Record<ResourceType, number>>

// 建筑类型
export const BuildingType = {
  PRODUCTION: 'production',  // 资源生产
  STORAGE: 'storage',        // 资源存储
  POPULATION: 'population',  // 人口
  TECHNOLOGY: 'technology',  // 科技
  FUNCTIONAL: 'functional',  // 功能
  SPECIAL: 'special'         // 特殊
} as const

export type BuildingType = typeof BuildingType[keyof typeof BuildingType]

// 建筑状态
export const BuildingStatus = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  BUILDING: 'building',
  BUILT: 'built',
  UPGRADING: 'upgrading'
} as const

export type BuildingStatus = typeof BuildingStatus[keyof typeof BuildingStatus]

// 建筑接口
export interface Building {
  id: string
  name: string
  description: string
  icon: string
  type: BuildingType
  era: Era
  level: number
  maxLevel: number
  buildCost: ResourceAmount
  upgradeCostMultiplier: number // 升级成本倍数
  buildTime: number // 建造时间(秒)
  upgradeTime: number // 升级时间(秒)
  production?: ResourceAmount // 每秒生产
  consumption?: ResourceAmount // 每秒消耗
  capacity?: ResourceAmount // 存储容量
  population?: number // 人口上限
  requirements: Requirement[] // 解锁条件
  effects?: Effect[] // 特殊效果
}

// 建筑实例
export interface BuildingInstance {
  buildingId: string
  level: number
  status: BuildingStatus
  buildStartTime?: number // 建造开始时间
  upgradeStartTime?: number // 升级开始时间
}

// 解锁条件
export interface Requirement {
  type: 'era' | 'building' | 'technology' | 'resource' | 'population'
  id?: string
  value?: number
}

// 效果
export interface Effect {
  type: 'resourceMultiplier' | 'buildSpeedBonus' | 'researchSpeedBonus' | 'populationGrowth'
  target?: ResourceType | string
  value: number
}

// 科技状态
export const TechnologyStatus = {
  LOCKED: 'locked',
  AVAILABLE: 'available',
  RESEARCHING: 'researching',
  RESEARCHED: 'researched'
} as const

export type TechnologyStatus = typeof TechnologyStatus[keyof typeof TechnologyStatus]

// 科技接口
export interface Technology {
  id: string
  name: string
  description: string
  icon: string
  era: Era
  category: 'production' | 'military' | 'culture' | 'economy'
  researchCost: ResourceAmount
  researchTime: number // 研究时间(秒)
  prerequisites: string[] // 前置科技ID
  effects: Effect[]
  unlocks: string[] // 解锁的建筑ID
}

// 科技实例
export interface TechnologyInstance {
  technologyId: string
  status: TechnologyStatus
  researchStartTime?: number
  researchProgress?: number // 0-100
}

// 成就接口
export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  category: 'progress' | 'resource' | 'building' | 'technology' | 'population' | 'special'
  condition: AchievementCondition
  reward: ResourceAmount
  permanentEffect?: Effect
}

// 成就条件
export interface AchievementCondition {
  type: 'era' | 'resource' | 'building' | 'technology' | 'population' | 'time'
  target?: string | ResourceType
  value: number
}

// 成就实例
export interface AchievementInstance {
  achievementId: string
  unlocked: boolean
  unlockedAt?: number
  progress: number
}

// 游戏状态
export interface GameState {
  currentEra: Era
  gameTime: number // 游戏总时长(秒)
  lastSaveTime: number // 上次保存时间戳
  lastPlayTime: number // 上次游玩时间戳
  population: {
    current: number
    max: number
    growthRate: number
  }
}

// 存档数据
export interface SaveData {
  version: string
  createdAt: number
  lastSaved: number
  gameState: GameState
  resources: Record<ResourceType, number>
  buildings: BuildingInstance[]
  technologies: TechnologyInstance[]
  achievements: AchievementInstance[]
}
