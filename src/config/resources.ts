import { type Resource, Era } from '@/types'

export const resources: Resource[] = [
  // 基础资源 - 石器时代
  {
    id: 'food',
    name: '食物',
    description: '维持人口生存的基本资源',
    icon: 'game-icons:meal',
    category: 'basic',
    era: Era.STONE,
    baseStorage: 1000
  },
  {
    id: 'wood',
    name: '木材',
    description: '建造建筑的基础材料',
    icon: 'game-icons:wood-pile',
    category: 'basic',
    era: Era.STONE,
    baseStorage: 800
  },
  {
    id: 'stone',
    name: '石头',
    description: '建造建筑和工具的基础材料',
    icon: 'game-icons:stone-pile',
    category: 'basic',
    era: Era.STONE,
    baseStorage: 800
  },

  // 中级资源 - 青铜时代
  {
    id: 'copper',
    name: '铜矿',
    description: '制作工具和武器的重要材料',
    icon: 'game-icons:ore',
    category: 'intermediate',
    era: Era.BRONZE,
    baseStorage: 500
  },
  {
    id: 'clay',
    name: '黏土',
    description: '制作陶器和砖块',
    icon: 'game-icons:clay-brick',
    category: 'intermediate',
    era: Era.BRONZE,
    baseStorage: 500
  },

  // 中级资源 - 铁器时代
  {
    id: 'iron',
    name: '铁矿',
    description: '制作武器和高级建筑的材料',
    icon: 'game-icons:metal-bar',
    category: 'intermediate',
    era: Era.IRON,
    baseStorage: 500
  },
  {
    id: 'coal',
    name: '煤炭',
    description: '燃料和冶炼材料',
    icon: 'game-icons:coal',
    category: 'intermediate',
    era: Era.IRON,
    baseStorage: 500
  },

  // 高级资源 - 工业时代
  {
    id: 'steel',
    name: '钢铁',
    description: '工业建筑和机械的核心材料',
    icon: 'game-icons:metal-bar',
    category: 'advanced',
    era: Era.INDUSTRIAL,
    baseStorage: 300
  },
  {
    id: 'oil',
    name: '石油',
    description: '能源和化工原料',
    icon: 'game-icons:oil-drum',
    category: 'advanced',
    era: Era.INDUSTRIAL,
    baseStorage: 300
  },
  {
    id: 'electricity',
    name: '电力',
    description: '驱动工业设备',
    icon: 'game-icons:lightning-trio',
    category: 'advanced',
    era: Era.INDUSTRIAL,
    baseStorage: 500
  },

  // 高级资源 - 信息时代
  {
    id: 'chip',
    name: '芯片',
    description: '计算机和电子设备',
    icon: 'game-icons:processor',
    category: 'advanced',
    era: Era.INFORMATION,
    baseStorage: 200
  },
  {
    id: 'data',
    name: '数据',
    description: 'AI研发和科技突破',
    icon: 'game-icons:database',
    category: 'advanced',
    era: Era.INFORMATION,
    baseStorage: 1000
  },

  // 太空资源
  {
    id: 'rocketFuel',
    name: '火箭燃料',
    description: '发射航天器',
    icon: 'game-icons:rocket',
    category: 'space',
    era: Era.SPACE,
    baseStorage: 100
  },
  {
    id: 'alloy',
    name: '合金',
    description: '太空设备制造',
    icon: 'game-icons:metal-bar',
    category: 'space',
    era: Era.SPACE,
    baseStorage: 200
  },
  {
    id: 'helium3',
    name: '氦-3',
    description: '核聚变燃料',
    icon: 'game-icons:atomic-slashes',
    category: 'space',
    era: Era.SPACE,
    baseStorage: 50
  },

  // 星际资源
  {
    id: 'antimatter',
    name: '反物质',
    description: '曲速引擎燃料',
    icon: 'game-icons:molecule',
    category: 'interstellar',
    era: Era.INTERSTELLAR,
    baseStorage: 10
  },
  {
    id: 'darkMatter',
    name: '暗物质',
    description: '高级能源核心',
    icon: 'game-icons:black-hole-bolas',
    category: 'interstellar',
    era: Era.INTERSTELLAR,
    baseStorage: 5
  },

  // 超维资源
  {
    id: 'quantumEnergy',
    name: '量子能量',
    description: '维度设备驱动',
    icon: 'game-icons:quantum-entanglement',
    category: 'hyperdimensional',
    era: Era.HYPERDIMENSIONAL,
    baseStorage: 100
  },
  {
    id: 'spacetimeCrystal',
    name: '时空晶体',
    description: '虫洞建造材料',
    icon: 'game-icons:crystal-cluster',
    category: 'hyperdimensional',
    era: Era.HYPERDIMENSIONAL,
    baseStorage: 10
  },

  // 特殊资源
  {
    id: 'gold',
    name: '黄金',
    description: '加速建造和购买特殊物品',
    icon: 'game-icons:gold-bar',
    category: 'special',
    era: Era.IRON,
    baseStorage: 10000
  },
  {
    id: 'knowledge',
    name: '知识点',
    description: '研究科技',
    icon: 'game-icons:bookshelf',
    category: 'special',
    era: Era.BRONZE,
    baseStorage: 10000
  },
  {
    id: 'culture',
    name: '文化值',
    description: '解锁特殊建筑',
    icon: 'game-icons:scroll-unfurled',
    category: 'special',
    era: Era.IRON,
    baseStorage: 5000
  },
  {
    id: 'prestige',
    name: '声望值',
    description: '解锁隐藏内容',
    icon: 'game-icons:crown',
    category: 'special',
    era: Era.BRONZE,
    baseStorage: 1000
  }
]

// 资源映射表
export const resourceMap = new Map(resources.map(r => [r.id, r]))

// 获取资源信息
export function getResource(resourceId: string) {
  return resourceMap.get(resourceId as any)
}

// 获取资源图标
export function getResourceIcon(resourceId: string): string {
  return getResource(resourceId)?.icon || 'mdi:help-circle'
}

// 获取资源名称
export function getResourceName(resourceId: string): string {
  return getResource(resourceId)?.name || resourceId
}
