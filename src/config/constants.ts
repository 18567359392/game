// 游戏常量配置

// 游戏版本
export const GAME_VERSION = '0.1.0-alpha'

// 时间相关
export const GAME_TICK_INTERVAL = 1000 // 游戏循环间隔(毫秒)
export const AUTO_SAVE_INTERVAL = 30000 // 自动保存间隔(毫秒)
export const ACHIEVEMENT_CHECK_INTERVAL = 5000 // 成就检测间隔(毫秒)

// 离线收益
export const MAX_OFFLINE_TIME = 24 * 60 * 60 // 最大离线时间(秒) - 24小时
export const OFFLINE_EFFICIENCY = {
  tier1: { maxTime: 2 * 60 * 60, efficiency: 1.0 },    // 前2小时: 100%
  tier2: { maxTime: 8 * 60 * 60, efficiency: 0.75 },   // 2-8小时: 75%
  tier3: { maxTime: 24 * 60 * 60, efficiency: 0.5 },   // 8-24小时: 50%
  tier4: { maxTime: Infinity, efficiency: 0.25 }       // 超过24小时: 25%
}

// 人口系统
export const POPULATION = {
  baseGrowthRate: 1 / 60, // 基础增长率: 1人口/60秒
  foodConsumptionPerPop: 0.5, // 每人口消耗食物/秒
  initialPopulation: 10, // 初始人口
  initialMaxPopulation: 20 // 初始人口上限
}

// 建筑升级
export const BUILDING = {
  costMultiplier: 2.0, // 升级成本倍数
  timeMultiplier: 1.8, // 升级时间倍数
  productionIncreasePerLevel: 0.15, // 每级产出提升15%
  storageIncreasePerLevel: 0.12 // 每级存储提升12%
}

// 时代系数
export const ERA_MULTIPLIER = {
  stone: 1.0,
  bronze: 1.5,
  iron: 2.0,
  industrial: 3.0,
  information: 4.0,
  space: 6.0,
  interstellar: 10.0,
  hyperdimensional: 15.0
}

// 本地存储键
export const STORAGE_KEYS = {
  saveData: 'civilization_game_save',
  settings: 'civilization_game_settings'
}

// 游戏速度
export const GAME_SPEED = {
  CASUAL: 0.5,    // 休闲模式
  NORMAL: 1.0,    // 标准模式
  FAST: 2.0,      // 快速模式
  TURBO: 4.0      // 极速模式
}
