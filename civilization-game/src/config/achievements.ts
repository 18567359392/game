import { type Achievement, Era } from '@/types'

/**
 * 成就配置数据
 * 30个基础成就
 */
export const achievements: Achievement[] = [
  // ========== 进度类成就 (10个) ==========
  {
    id: 'first_step',
    name: '第一步',
    description: '建造你的第一个建筑',
    icon: 'mdi:home',
    category: 'progress',
    condition: {
      type: 'building',
      value: 1
    },
    reward: { knowledge: 10 },
    permanentEffect: {
      type: 'resourceMultiplier',
      target: 'knowledge',
      value: 1.05
    }
  },
  
  {
    id: 'bronze_age',
    name: '青铜时代',
    description: '进入青铜时代',
    icon: 'game-icons:metal-bar',
    category: 'progress',
    condition: {
      type: 'era',
      value: 1
    },
    reward: { gold: 50, knowledge: 50 }
  },
  
  {
    id: 'iron_age',
    name: '铁器时代',
    description: '进入铁器时代',
    icon: 'game-icons:anvil',
    category: 'progress',
    condition: {
      type: 'era',
      value: 2
    },
    reward: { gold: 100, knowledge: 100 }
  },
  
  {
    id: 'industrial_age',
    name: '工业革命',
    description: '进入工业时代',
    icon: 'game-icons:factory',
    category: 'progress',
    condition: {
      type: 'era',
      value: 3
    },
    reward: { gold: 200, knowledge: 200 }
  },
  
  {
    id: 'information_age',
    name: '信息时代',
    description: '进入信息时代',
    icon: 'mdi:desktop-classic',
    category: 'progress',
    condition: {
      type: 'era',
      value: 4
    },
    reward: { gold: 500, knowledge: 500 }
  },
  
  {
    id: 'space_age',
    name: '太空探索',
    description: '进入太空时代',
    icon: 'game-icons:rocket',
    category: 'progress',
    condition: {
      type: 'era',
      value: 5
    },
    reward: { gold: 1000, knowledge: 1000 }
  },
  
  {
    id: 'tech_novice',
    name: '科技新手',
    description: '研究5个科技',
    icon: 'mdi:flask',
    category: 'progress',
    condition: {
      type: 'technology',
      value: 5
    },
    reward: { knowledge: 25 }
  },
  
  {
    id: 'tech_expert',
    name: '科技专家',
    description: '研究15个科技',
    icon: 'mdi:flask-outline',
    category: 'progress',
    condition: {
      type: 'technology',
      value: 15
    },
    reward: { knowledge: 100 },
    permanentEffect: {
      type: 'researchSpeedBonus',
      value: 1.1
    }
  },
  
  {
    id: 'tech_master',
    name: '科技大师',
    description: '研究30个科技',
    icon: 'game-icons:beaker',
    category: 'progress',
    condition: {
      type: 'technology',
      value: 30
    },
    reward: { knowledge: 300 },
    permanentEffect: {
      type: 'researchSpeedBonus',
      value: 1.2
    }
  },
  
  {
    id: 'long_journey',
    name: '漫长旅程',
    description: '游玩4小时',
    icon: 'mdi:clock',
    category: 'progress',
    condition: {
      type: 'time',
      value: 14400 // 4小时 = 14400秒
    },
    reward: { gold: 200, knowledge: 200 }
  },

  // ========== 资源类成就 (8个) ==========
  {
    id: 'food_collector',
    name: '食物收集者',
    description: '累计收集1000食物',
    icon: 'game-icons:fruit-bowl',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'food',
      value: 1000
    },
    reward: { food: 100 }
  },
  
  {
    id: 'wood_gatherer',
    name: '木材采集者',
    description: '累计收集500木材',
    icon: 'game-icons:wood-axe',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'wood',
      value: 500
    },
    reward: { wood: 50 }
  },
  
  {
    id: 'stone_miner',
    name: '石材开采者',
    description: '累计收集500石材',
    icon: 'game-icons:stone-pile',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'stone',
      value: 500
    },
    reward: { stone: 50 }
  },
  
  {
    id: 'copper_king',
    name: '铜矿大亨',
    description: '累计收集300铜矿',
    icon: 'game-icons:ore',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'copper',
      value: 300
    },
    reward: { copper: 30, gold: 50 }
  },
  
  {
    id: 'iron_baron',
    name: '钢铁男爵',
    description: '累计收集500铁矿',
    icon: 'game-icons:mining',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'iron',
      value: 500
    },
    reward: { iron: 50, gold: 100 }
  },
  
  {
    id: 'gold_tycoon',
    name: '黄金富豪',
    description: '累计收集1000金币',
    icon: 'game-icons:coins',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'gold',
      value: 1000
    },
    reward: { gold: 200 },
    permanentEffect: {
      type: 'resourceMultiplier',
      target: 'gold',
      value: 1.1
    }
  },
  
  {
    id: 'knowledge_seeker',
    name: '知识追求者',
    description: '累计收集500知识',
    icon: 'mdi:book-open',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'knowledge',
      value: 500
    },
    reward: { knowledge: 100 }
  },
  
  {
    id: 'culture_lover',
    name: '文化爱好者',
    description: '累计收集200文化',
    icon: 'mdi:palette',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'culture',
      value: 200
    },
    reward: { culture: 50 }
  },

  // ========== 建筑类成就 (7个) ==========
  {
    id: 'builder',
    name: '建造者',
    description: '建造10个建筑',
    icon: 'game-icons:castle',
    category: 'building',
    condition: {
      type: 'building',
      value: 10
    },
    reward: { wood: 100, stone: 100 }
  },
  
  {
    id: 'architect',
    name: '建筑师',
    description: '建造20个建筑',
    icon: 'mdi:office-building',
    category: 'building',
    condition: {
      type: 'building',
      value: 20
    },
    reward: { gold: 150 },
    permanentEffect: {
      type: 'buildSpeedBonus',
      value: 1.1
    }
  },
  
  {
    id: 'max_level',
    name: '极致追求',
    description: '将任意建筑升到最高等级',
    icon: 'mdi:star',
    category: 'building',
    condition: {
      type: 'building',
      target: 'max_level',
      value: 1
    },
    reward: { gold: 300, knowledge: 200 }
  },
  
  {
    id: 'population_100',
    name: '百人部落',
    description: '人口达到100',
    icon: 'game-icons:people',
    category: 'population',
    condition: {
      type: 'population',
      value: 100
    },
    reward: { food: 200 }
  },
  
  {
    id: 'population_500',
    name: '繁荣城市',
    description: '人口达到500',
    icon: 'mdi:city',
    category: 'population',
    condition: {
      type: 'population',
      value: 500
    },
    reward: { gold: 200 }
  },
  
  {
    id: 'production_master',
    name: '生产大师',
    description: '拥有5个生产建筑',
    icon: 'game-icons:factory-arm',
    category: 'building',
    condition: {
      type: 'building',
      target: 'production',
      value: 5
    },
    reward: { gold: 100 }
  },
  
  {
    id: 'storage_expert',
    name: '仓储专家',
    description: '拥有3个存储建筑',
    icon: 'game-icons:warehouse',
    category: 'building',
    condition: {
      type: 'building',
      target: 'storage',
      value: 3
    },
    reward: { wood: 150, stone: 150 }
  },

  // ========== 特殊成就 (5个) ==========
  {
    id: 'speed_runner',
    name: '速通者',
    description: '30分钟内进入青铜时代',
    icon: 'mdi:speedometer',
    category: 'special',
    condition: {
      type: 'era',
      value: 1
    },
    reward: { gold: 500, knowledge: 300 }
  },
  
  {
    id: 'perfectionist',
    name: '完美主义者',
    description: '在石器时代完成所有科技研究',
    icon: 'mdi:seal',
    category: 'special',
    condition: {
      type: 'technology',
      target: Era.STONE,
      value: 5
    },
    reward: { knowledge: 150 }
  },
  
  {
    id: 'renaissance',
    name: '文艺复兴',
    description: '同时拥有图书馆、神庙和学院',
    icon: 'mdi:book-multiple',
    category: 'special',
    condition: {
      type: 'building',
      target: 'culture',
      value: 3
    },
    reward: { culture: 100, knowledge: 100 }
  },
  
  {
    id: 'industrialist',
    name: '工业家',
    description: '同时拥有5个工业建筑',
    icon: 'game-icons:gears',
    category: 'special',
    condition: {
      type: 'building',
      target: 'industrial',
      value: 5
    },
    reward: { gold: 300 }
  },
  
  {
    id: 'first_save',
    name: '未雨绸缪',
    description: '第一次保存游戏',
    icon: 'mdi:content-save',
    category: 'special',
    condition: {
      type: 'resource',
      target: 'save',
      value: 1
    },
    reward: { gold: 50 }
  },

  // ========== 工业时代成就 (10个) ==========
  {
    id: 'steel_production',
    name: '钢铁生产',
    description: '累计生产500钢铁',
    icon: 'game-icons:steel-claws',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'steel',
      value: 500
    },
    reward: { steel: 100, gold: 150 }
  },

  {
    id: 'electricity_expert',
    name: '电力专家',
    description: '累计生产1000电力',
    icon: 'mdi:lightning-bolt',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'electricity',
      value: 1000
    },
    reward: { electricity: 200, gold: 200 },
    permanentEffect: {
      type: 'resourceMultiplier',
      target: 'electricity',
      value: 1.1
    }
  },

  {
    id: 'oil_tycoon',
    name: '石油大亨',
    description: '累计生产300石油',
    icon: 'game-icons:oil-drum',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'oil',
      value: 300
    },
    reward: { oil: 60, gold: 250 }
  },

  {
    id: 'factory_owner',
    name: '工厂主',
    description: '建造第一个工厂',
    icon: 'game-icons:factory',
    category: 'building',
    condition: {
      type: 'building',
      target: 'factory',
      value: 1
    },
    reward: { steel: 50, gold: 100 }
  },

  {
    id: 'power_grid',
    name: '电网大亨',
    description: '拥有发电厂和核电站',
    icon: 'game-icons:power-generator',
    category: 'building',
    condition: {
      type: 'building',
      target: 'power',
      value: 2
    },
    reward: { electricity: 300, gold: 300 }
  },

  {
    id: 'railroad_builder',
    name: '铁路大亨',
    description: '建造火车站',
    icon: 'mdi:train',
    category: 'building',
    condition: {
      type: 'building',
      target: 'railroad_station',
      value: 1
    },
    reward: { steel: 100, gold: 200 }
  },

  {
    id: 'skyscraper_city',
    name: '摩天大楼',
    description: '建造摩天大楼',
    icon: 'mdi:office-building-outline',
    category: 'building',
    condition: {
      type: 'building',
      target: 'skyscraper',
      value: 1
    },
    reward: { gold: 300, culture: 100 }
  },

  {
    id: 'university_founder',
    name: '大学创办人',
    description: '建造大学',
    icon: 'mdi:school-outline',
    category: 'building',
    condition: {
      type: 'building',
      target: 'university',
      value: 1
    },
    reward: { knowledge: 200, culture: 100 }
  },

  {
    id: 'stock_market',
    name: '资本家',
    description: '建造证券交易所',
    icon: 'mdi:chart-line',
    category: 'building',
    condition: {
      type: 'building',
      target: 'stock_exchange',
      value: 1
    },
    reward: { gold: 500 }
  },

  {
    id: 'industrial_empire',
    name: '工业帝国',
    description: '同时拥有工厂、发电厂、炼油厂和钢铁厂',
    icon: 'game-icons:gears',
    category: 'special',
    condition: {
      type: 'building',
      target: 'industrial',
      value: 4
    },
    reward: { gold: 600, knowledge: 300 },
    permanentEffect: {
      type: 'resourceMultiplier',
      target: 'steel',
      value: 1.15
    }
  },

  // ========== 信息时代成就 (10个) ==========
  {
    id: 'chip_producer',
    name: '芯片制造商',
    description: '累计生产200芯片',
    icon: 'mdi:chip',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'chip',
      value: 200
    },
    reward: { chip: 40, gold: 300 }
  },

  {
    id: 'data_master',
    name: '数据大师',
    description: '累计生产2000数据',
    icon: 'mdi:database',
    category: 'resource',
    condition: {
      type: 'resource',
      target: 'data',
      value: 2000
    },
    reward: { data: 400, knowledge: 300 },
    permanentEffect: {
      type: 'resourceMultiplier',
      target: 'data',
      value: 1.1
    }
  },

  {
    id: 'computer_age',
    name: '计算机时代',
    description: '建造计算机中心',
    icon: 'mdi:desktop-tower-monitor',
    category: 'building',
    condition: {
      type: 'building',
      target: 'computer_center',
      value: 1
    },
    reward: { data: 200, knowledge: 200 }
  },

  {
    id: 'chip_factory_owner',
    name: '芯片工厂主',
    description: '建造芯片工厂',
    icon: 'mdi:chip',
    category: 'building',
    condition: {
      type: 'building',
      target: 'chip_factory',
      value: 1
    },
    reward: { chip: 50, gold: 400 }
  },

  {
    id: 'nuclear_power',
    name: '核能时代',
    description: '建造核电站',
    icon: 'game-icons:nuclear-plant',
    category: 'building',
    condition: {
      type: 'building',
      target: 'nuclear_power_plant',
      value: 1
    },
    reward: { electricity: 500, knowledge: 400 }
  },

  {
    id: 'research_facility',
    name: '科研机构',
    description: '建造研究实验室',
    icon: 'mdi:flask',
    category: 'building',
    condition: {
      type: 'building',
      target: 'research_lab',
      value: 1
    },
    reward: { knowledge: 500 }
  },

  {
    id: 'internet_connected',
    name: '互联网时代',
    description: '建造互联网中心',
    icon: 'mdi:web',
    category: 'building',
    condition: {
      type: 'building',
      target: 'internet_hub',
      value: 1
    },
    reward: { data: 300, knowledge: 300 }
  },

  {
    id: 'ai_researcher',
    name: 'AI研究员',
    description: '建造AI研究中心',
    icon: 'mdi:robot',
    category: 'building',
    condition: {
      type: 'building',
      target: 'ai_research_center',
      value: 1
    },
    reward: { data: 500, knowledge: 500 }
  },

  {
    id: 'smart_city_builder',
    name: '智慧城市建设者',
    description: '建造智慧城市',
    icon: 'mdi:city',
    category: 'building',
    condition: {
      type: 'building',
      target: 'smart_city',
      value: 1
    },
    reward: { gold: 800, culture: 200 }
  },

  {
    id: 'information_empire',
    name: '信息帝国',
    description: '同时拥有计算机中心、芯片工厂、数据中心和AI研究中心',
    icon: 'mdi:network',
    category: 'special',
    condition: {
      type: 'building',
      target: 'information',
      value: 4
    },
    reward: { gold: 1000, knowledge: 600 },
    permanentEffect: {
      type: 'resourceMultiplier',
      target: 'data',
      value: 1.2
    }
  }
]

/**
 * 根据ID获取成就
 */
export function getAchievement(id: string): Achievement | undefined {
  return achievements.find(a => a.id === id)
}

/**
 * 根据类别获取成就
 */
export function getAchievementsByCategory(category: string): Achievement[] {
  return achievements.filter(a => a.category === category)
}
