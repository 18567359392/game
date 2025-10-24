import { type Building, Era, BuildingType } from '@/types'

export const buildings: Building[] = [
  // ========== 石器时代建筑 ==========
  {
    id: 'camp',
    name: '营地',
    description: '原始的居住地,可以容纳更多人口',
    icon: 'game-icons:campfire',
    type: BuildingType.POPULATION,
    era: Era.STONE,
    level: 1,
    maxLevel: 5,
    buildCost: {
      wood: 10
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 5,
    upgradeTime: 10,
    population: 5,
    requirements: []
  },
  
  {
    id: 'gathering_post',
    name: '采集站',
    description: '派遣族人采集食物',
    icon: 'game-icons:fruit-bowl',
    type: BuildingType.PRODUCTION,
    era: Era.STONE,
    level: 1,
    maxLevel: 5,
    buildCost: {
      wood: 20,
      stone: 10
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 10,
    upgradeTime: 15,
    production: {
      food: 2
    },
    requirements: []
  },
  
  {
    id: 'lumber_camp',
    name: '伐木场',
    description: '砍伐树木获取木材',
    icon: 'game-icons:wood-axe',
    type: BuildingType.PRODUCTION,
    era: Era.STONE,
    level: 1,
    maxLevel: 5,
    buildCost: {
      stone: 15
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 8,
    upgradeTime: 12,
    production: {
      wood: 1
    },
    requirements: []
  },
  
  {
    id: 'quarry',
    name: '采石场',
    description: '开采石头资源',
    icon: 'game-icons:stone-pile',
    type: BuildingType.PRODUCTION,
    era: Era.STONE,
    level: 1,
    maxLevel: 5,
    buildCost: {
      wood: 15
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 8,
    upgradeTime: 12,
    production: {
      stone: 0.8
    },
    requirements: []
  },
  
  {
    id: 'bonfire',
    name: '篝火',
    description: '温暖的火焰减少食物消耗',
    icon: 'game-icons:fire',
    type: BuildingType.FUNCTIONAL,
    era: Era.STONE,
    level: 1,
    maxLevel: 3,
    buildCost: {
      wood: 5,
      stone: 5
    },
    upgradeCostMultiplier: 1.5,
    buildTime: 5,
    upgradeTime: 8,
    requirements: [],
    effects: [
      {
        type: 'resourceMultiplier',
        target: 'food',
        value: -0.1 // 减少10%食物消耗
      }
    ]
  },

  // ========== 青铜时代建筑 ==========
  {
    id: 'farm',
    name: '农田',
    description: '种植作物,稳定的食物来源',
    icon: 'game-icons:wheat',
    type: BuildingType.PRODUCTION,
    era: Era.BRONZE,
    level: 1,
    maxLevel: 10,
    buildCost: {
      wood: 50,
      stone: 30
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 30,
    upgradeTime: 45,
    production: {
      food: 5
    },
    requirements: [
      { type: 'technology', id: 'agriculture' }
    ]
  },

  {
    id: 'copper_mine',
    name: '铜矿场',
    description: '开采铜矿石',
    icon: 'game-icons:ore',
    type: BuildingType.PRODUCTION,
    era: Era.BRONZE,
    level: 1,
    maxLevel: 10,
    buildCost: {
      wood: 60,
      stone: 40
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 40,
    upgradeTime: 60,
    production: {
      copper: 1
    },
    requirements: [
      { type: 'technology', id: 'mining' }
    ]
  },

  {
    id: 'workshop',
    name: '作坊',
    description: '制作工具和器具',
    icon: 'game-icons:anvil',
    type: BuildingType.FUNCTIONAL,
    era: Era.BRONZE,
    level: 1,
    maxLevel: 5,
    buildCost: {
      wood: 80,
      copper: 20
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 50,
    upgradeTime: 75,
    requirements: [
      { type: 'technology', id: 'smelting' }
    ],
    effects: [
      {
        type: 'resourceMultiplier',
        target: 'production',
        value: 0.15 // 提升15%生产效率
      }
    ]
  },

  {
    id: 'house',
    name: '房屋',
    description: '更大更舒适的居所',
    icon: 'game-icons:wooden-cabin',
    type: BuildingType.POPULATION,
    era: Era.BRONZE,
    level: 1,
    maxLevel: 10,
    buildCost: {
      wood: 100,
      stone: 50,
      clay: 30
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 60,
    upgradeTime: 90,
    population: 20,
    requirements: [
      { type: 'era', id: 'bronze' }
    ]
  },

  {
    id: 'granary',
    name: '粮仓',
    description: '储存更多食物',
    icon: 'game-icons:barn',
    type: BuildingType.STORAGE,
    era: Era.BRONZE,
    level: 1,
    maxLevel: 10,
    buildCost: {
      wood: 70,
      stone: 50
    },
    upgradeCostMultiplier: 1.8,
    buildTime: 40,
    upgradeTime: 60,
    capacity: {
      food: 1000
    },
    requirements: []
  },

  {
    id: 'market',
    name: '市场',
    description: '交易货物,产生金币',
    icon: 'game-icons:shop',
    type: BuildingType.PRODUCTION,
    era: Era.BRONZE,
    level: 1,
    maxLevel: 8,
    buildCost: {
      wood: 80,
      stone: 60,
      copper: 40
    },
    upgradeCostMultiplier: 2.2,
    buildTime: 50,
    upgradeTime: 75,
    production: {
      gold: 0.5
    },
    requirements: [
      { type: 'technology', id: 'trade' }
    ]
  },

  {
    id: 'library',
    name: '图书馆',
    description: '积累知识,加速研究',
    icon: 'mdi:library',
    type: BuildingType.TECHNOLOGY,
    era: Era.BRONZE,
    level: 1,
    maxLevel: 10,
    buildCost: {
      wood: 100,
      stone: 80,
      clay: 50
    },
    upgradeCostMultiplier: 2.5,
    buildTime: 70,
    upgradeTime: 100,
    production: {
      knowledge: 1
    },
    requirements: [
      { type: 'technology', id: 'writing' }
    ]
  },

  // ========== 铁器时代建筑 ==========
  {
    id: 'iron_mine',
    name: '铁矿场',
    description: '开采铁矿石',
    icon: 'game-icons:mining',
    type: BuildingType.PRODUCTION,
    era: Era.IRON,
    level: 1,
    maxLevel: 10,
    buildCost: {
      wood: 120,
      stone: 100,
      copper: 60
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 80,
    upgradeTime: 120,
    production: {
      iron: 1.5
    },
    requirements: [
      { type: 'technology', id: 'ironWorking' }
    ]
  },

  {
    id: 'coal_mine',
    name: '煤矿',
    description: '开采煤炭',
    icon: 'game-icons:coal',
    type: BuildingType.PRODUCTION,
    era: Era.IRON,
    level: 1,
    maxLevel: 10,
    buildCost: {
      wood: 100,
      stone: 120,
      iron: 40
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 70,
    upgradeTime: 105,
    production: {
      coal: 2
    },
    requirements: [
      { type: 'era', id: 'iron' }
    ]
  },

  {
    id: 'forge',
    name: '锻造厂',
    description: '将铁矿石锻造成铁',
    icon: 'game-icons:hammer-drop',
    type: BuildingType.PRODUCTION,
    era: Era.IRON,
    level: 1,
    maxLevel: 8,
    buildCost: {
      wood: 150,
      stone: 100,
      iron: 80
    },
    upgradeCostMultiplier: 2.2,
    buildTime: 90,
    upgradeTime: 135,
    production: {
      iron: 2
    },
    consumption: {
      coal: 1
    },
    requirements: [
      { type: 'technology', id: 'ironWorking' }
    ]
  },

  {
    id: 'temple',
    name: '神庙',
    description: '提升文化产出',
    icon: 'game-icons:temple',
    type: BuildingType.PRODUCTION,
    era: Era.IRON,
    level: 1,
    maxLevel: 10,
    buildCost: {
      stone: 200,
      iron: 100,
      gold: 50
    },
    upgradeCostMultiplier: 2.5,
    buildTime: 120,
    upgradeTime: 180,
    production: {
      culture: 2
    },
    requirements: [
      { type: 'technology', id: 'philosophy' }
    ]
  },

  {
    id: 'academy',
    name: '学院',
    description: '高级研究机构,大幅提升知识产出',
    icon: 'mdi:school',
    type: BuildingType.TECHNOLOGY,
    era: Era.IRON,
    level: 1,
    maxLevel: 10,
    buildCost: {
      wood: 150,
      stone: 200,
      iron: 80,
      gold: 100
    },
    upgradeCostMultiplier: 2.8,
    buildTime: 150,
    upgradeTime: 225,
    production: {
      knowledge: 3
    },
    requirements: [
      { type: 'technology', id: 'mathematics' }
    ]
  },

  {
    id: 'bank',
    name: '银行',
    description: '积累财富,增加金币产出',
    icon: 'game-icons:coins',
    type: BuildingType.PRODUCTION,
    era: Era.IRON,
    level: 1,
    maxLevel: 10,
    buildCost: {
      stone: 180,
      iron: 120,
      gold: 200
    },
    upgradeCostMultiplier: 2.5,
    buildTime: 100,
    upgradeTime: 150,
    production: {
      gold: 2
    },
    requirements: [
      { type: 'technology', id: 'currency' }
    ]
  },

  {
    id: 'apartment',
    name: '公寓',
    description: '现代化的居住建筑',
    icon: 'mdi:office-building',
    type: BuildingType.POPULATION,
    era: Era.IRON,
    level: 1,
    maxLevel: 15,
    buildCost: {
      wood: 200,
      stone: 250,
      iron: 150
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 120,
    upgradeTime: 180,
    population: 50,
    requirements: [
      { type: 'technology', id: 'engineering' }
    ]
  },

  {
    id: 'warehouse',
    name: '仓库',
    description: '大型储存设施',
    icon: 'game-icons:warehouse',
    type: BuildingType.STORAGE,
    era: Era.IRON,
    level: 1,
    maxLevel: 10,
    buildCost: {
      wood: 200,
      stone: 150,
      iron: 100
    },
    upgradeCostMultiplier: 2.0,
    buildTime: 90,
    upgradeTime: 135,
    capacity: {
      wood: 2000,
      stone: 2000,
      copper: 1000,
      iron: 1000,
      coal: 1000
    },
    requirements: [
      { type: 'technology', id: 'engineering' }
    ]
  },

  // ========== 工业时代建筑 ==========
  {
    id: 'factory',
    name: '工厂',
    description: '机械化生产设施,大幅提升生产效率',
    icon: 'game-icons:factory',
    type: BuildingType.PRODUCTION,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 15,
    buildCost: {
      stone: 500,
      iron: 300,
      coal: 200,
      gold: 300
    },
    upgradeCostMultiplier: 2.5,
    buildTime: 200,
    upgradeTime: 300,
    production: {
      steel: 3
    },
    consumption: {
      iron: 2,
      coal: 1.5
    },
    requirements: [
      { type: 'technology', id: 'steamEngine' }
    ]
  },

  {
    id: 'power_plant',
    name: '发电厂',
    description: '将煤炭转化为电力',
    icon: 'game-icons:power-generator',
    type: BuildingType.PRODUCTION,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 12,
    buildCost: {
      stone: 400,
      iron: 350,
      steel: 200,
      gold: 400
    },
    upgradeCostMultiplier: 2.8,
    buildTime: 250,
    upgradeTime: 375,
    production: {
      electricity: 5
    },
    consumption: {
      coal: 3
    },
    requirements: [
      { type: 'technology', id: 'electricity' }
    ]
  },

  {
    id: 'oil_refinery',
    name: '炼油厂',
    description: '提炼石油获取能源',
    icon: 'game-icons:oil-rig',
    type: BuildingType.PRODUCTION,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 12,
    buildCost: {
      steel: 250,
      iron: 200,
      gold: 500
    },
    upgradeCostMultiplier: 2.6,
    buildTime: 220,
    upgradeTime: 330,
    production: {
      oil: 2
    },
    requirements: [
      { type: 'technology', id: 'oilDrilling' }
    ]
  },

  {
    id: 'steel_mill',
    name: '钢铁厂',
    description: '将铁矿和煤炭冶炼成钢铁',
    icon: 'game-icons:foundry',
    type: BuildingType.PRODUCTION,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 12,
    buildCost: {
      stone: 350,
      iron: 400,
      coal: 250,
      gold: 350
    },
    upgradeCostMultiplier: 2.4,
    buildTime: 180,
    upgradeTime: 270,
    production: {
      steel: 4
    },
    consumption: {
      iron: 3,
      coal: 2
    },
    requirements: [
      { type: 'technology', id: 'steelProduction' }
    ]
  },

  {
    id: 'university',
    name: '大学',
    description: '高等教育机构,加速知识积累',
    icon: 'mdi:school-outline',
    type: BuildingType.TECHNOLOGY,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 15,
    buildCost: {
      stone: 400,
      steel: 250,
      gold: 600
    },
    upgradeCostMultiplier: 3.0,
    buildTime: 300,
    upgradeTime: 450,
    production: {
      knowledge: 5
    },
    requirements: [
      { type: 'technology', id: 'scientificMethod' }
    ]
  },

  {
    id: 'stock_exchange',
    name: '证券交易所',
    description: '资本市场,大幅增加金币产出',
    icon: 'mdi:chart-line',
    type: BuildingType.PRODUCTION,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 12,
    buildCost: {
      stone: 500,
      steel: 300,
      gold: 1000
    },
    upgradeCostMultiplier: 3.2,
    buildTime: 280,
    upgradeTime: 420,
    production: {
      gold: 5
    },
    requirements: [
      { type: 'technology', id: 'capitalism' }
    ]
  },

  {
    id: 'museum',
    name: '博物馆',
    description: '文化传承,增加文化产出',
    icon: 'mdi:bank',
    type: BuildingType.PRODUCTION,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 10,
    buildCost: {
      stone: 450,
      steel: 200,
      gold: 500
    },
    upgradeCostMultiplier: 2.8,
    buildTime: 250,
    upgradeTime: 375,
    production: {
      culture: 4
    },
    requirements: [
      { type: 'technology', id: 'archaeology' }
    ]
  },

  {
    id: 'railroad_station',
    name: '火车站',
    description: '提升运输效率,加快建造速度',
    icon: 'mdi:train',
    type: BuildingType.FUNCTIONAL,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 8,
    buildCost: {
      stone: 600,
      steel: 400,
      coal: 300,
      gold: 700
    },
    upgradeCostMultiplier: 2.6,
    buildTime: 320,
    upgradeTime: 480,
    requirements: [
      { type: 'technology', id: 'railroad' }
    ],
    effects: [
      {
        type: 'buildSpeedBonus',
        value: 0.2 // 提升20%建造速度
      }
    ]
  },

  {
    id: 'hospital',
    name: '医院',
    description: '提升人口增长率',
    icon: 'mdi:hospital-building',
    type: BuildingType.FUNCTIONAL,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 10,
    buildCost: {
      stone: 350,
      steel: 250,
      gold: 400
    },
    upgradeCostMultiplier: 2.5,
    buildTime: 200,
    upgradeTime: 300,
    requirements: [
      { type: 'technology', id: 'medicine' }
    ],
    effects: [
      {
        type: 'populationGrowth',
        value: 0.15 // 提升15%人口增长率
      }
    ]
  },

  {
    id: 'skyscraper',
    name: '摩天大楼',
    description: '现代化高层建筑,容纳大量人口',
    icon: 'mdi:office-building-outline',
    type: BuildingType.POPULATION,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 20,
    buildCost: {
      stone: 800,
      steel: 600,
      gold: 800
    },
    upgradeCostMultiplier: 2.2,
    buildTime: 300,
    upgradeTime: 450,
    population: 100,
    requirements: [
      { type: 'technology', id: 'steelFrame' }
    ]
  },

  {
    id: 'chemical_plant',
    name: '化工厂',
    description: '化学工业设施,生产多种资源',
    icon: 'game-icons:chemical-drop',
    type: BuildingType.PRODUCTION,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 10,
    buildCost: {
      steel: 400,
      oil: 200,
      gold: 600
    },
    upgradeCostMultiplier: 2.7,
    buildTime: 260,
    upgradeTime: 390,
    production: {
      oil: 1.5,
      culture: 1
    },
    consumption: {
      coal: 2,
      electricity: 1
    },
    requirements: [
      { type: 'technology', id: 'chemistry' }
    ]
  },

  {
    id: 'industrial_warehouse',
    name: '工业仓库',
    description: '大型工业储存设施',
    icon: 'mdi:warehouse',
    type: BuildingType.STORAGE,
    era: Era.INDUSTRIAL,
    level: 1,
    maxLevel: 12,
    buildCost: {
      steel: 350,
      stone: 300,
      gold: 400
    },
    upgradeCostMultiplier: 2.3,
    buildTime: 180,
    upgradeTime: 270,
    capacity: {
      steel: 3000,
      oil: 2000,
      coal: 3000,
      electricity: 5000
    },
    requirements: [
      { type: 'era', id: 'industrial' }
    ]
  },

  // ========== 信息时代建筑 ==========
  {
    id: 'computer_center',
    name: '计算中心',
    description: '计算机处理中心,生产数据',
    icon: 'mdi:desktop-tower-monitor',
    type: BuildingType.PRODUCTION,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 15,
    buildCost: {
      steel: 600,
      chip: 100,
      electricity: 300,
      gold: 1200
    },
    upgradeCostMultiplier: 3.0,
    buildTime: 350,
    upgradeTime: 525,
    production: {
      data: 8
    },
    consumption: {
      electricity: 4,
      chip: 0.5
    },
    requirements: [
      { type: 'technology', id: 'computer' }
    ]
  },

  {
    id: 'chip_factory',
    name: '芯片工厂',
    description: '生产计算机芯片',
    icon: 'mdi:chip',
    type: BuildingType.PRODUCTION,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 15,
    buildCost: {
      steel: 700,
      oil: 300,
      electricity: 400,
      gold: 1500
    },
    upgradeCostMultiplier: 3.2,
    buildTime: 400,
    upgradeTime: 600,
    production: {
      chip: 3
    },
    consumption: {
      electricity: 5,
      steel: 1
    },
    requirements: [
      { type: 'technology', id: 'semiconductor' }
    ]
  },

  {
    id: 'nuclear_power_plant',
    name: '核电站',
    description: '核能发电,提供大量电力',
    icon: 'game-icons:nuclear-plant',
    type: BuildingType.PRODUCTION,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 10,
    buildCost: {
      steel: 1000,
      chip: 200,
      gold: 2000
    },
    upgradeCostMultiplier: 3.5,
    buildTime: 500,
    upgradeTime: 750,
    production: {
      electricity: 20
    },
    requirements: [
      { type: 'technology', id: 'nuclearFission' }
    ]
  },

  {
    id: 'research_lab',
    name: '研究实验室',
    description: '现代科研设施,极大提升知识产出',
    icon: 'mdi:flask',
    type: BuildingType.TECHNOLOGY,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 15,
    buildCost: {
      steel: 800,
      chip: 300,
      electricity: 400,
      gold: 1800
    },
    upgradeCostMultiplier: 3.5,
    buildTime: 450,
    upgradeTime: 675,
    production: {
      knowledge: 10
    },
    consumption: {
      electricity: 3,
      data: 2
    },
    requirements: [
      { type: 'technology', id: 'quantumMechanics' }
    ]
  },

  {
    id: 'internet_hub',
    name: '互联网中心',
    description: '网络枢纽,加速信息传播',
    icon: 'mdi:web',
    type: BuildingType.FUNCTIONAL,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 12,
    buildCost: {
      steel: 600,
      chip: 250,
      electricity: 500,
      gold: 1500
    },
    upgradeCostMultiplier: 3.0,
    buildTime: 380,
    upgradeTime: 570,
    requirements: [
      { type: 'technology', id: 'internet' }
    ],
    effects: [
      {
        type: 'researchSpeedBonus',
        value: 0.25 // 提升25%研究速度
      }
    ]
  },

  {
    id: 'satellite_station',
    name: '卫星站',
    description: '卫星通讯站,增加文化和知识产出',
    icon: 'mdi:satellite-variant',
    type: BuildingType.PRODUCTION,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 10,
    buildCost: {
      steel: 900,
      chip: 400,
      electricity: 600,
      gold: 2000
    },
    upgradeCostMultiplier: 3.3,
    buildTime: 480,
    upgradeTime: 720,
    production: {
      culture: 6,
      knowledge: 4
    },
    consumption: {
      electricity: 4
    },
    requirements: [
      { type: 'technology', id: 'satellites' }
    ]
  },

  {
    id: 'biotech_lab',
    name: '生物科技实验室',
    description: '生物技术研究,提升人口增长',
    icon: 'mdi:dna',
    type: BuildingType.FUNCTIONAL,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 10,
    buildCost: {
      steel: 700,
      chip: 300,
      electricity: 400,
      gold: 1600
    },
    upgradeCostMultiplier: 3.1,
    buildTime: 400,
    upgradeTime: 600,
    requirements: [
      { type: 'technology', id: 'genetics' }
    ],
    effects: [
      {
        type: 'populationGrowth',
        value: 0.25 // 提升25%人口增长率
      },
      {
        type: 'resourceMultiplier',
        target: 'food',
        value: 0.2 // 提升20%食物产出
      }
    ]
  },

  {
    id: 'data_center',
    name: '数据中心',
    description: '大规模数据处理和存储',
    icon: 'mdi:server',
    type: BuildingType.PRODUCTION,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 15,
    buildCost: {
      steel: 800,
      chip: 400,
      electricity: 600,
      gold: 2000
    },
    upgradeCostMultiplier: 3.4,
    buildTime: 450,
    upgradeTime: 675,
    production: {
      data: 12
    },
    consumption: {
      electricity: 6,
      chip: 1
    },
    requirements: [
      { type: 'technology', id: 'cloudComputing' }
    ]
  },

  {
    id: 'ai_research_center',
    name: 'AI研究中心',
    description: '人工智能研究,大幅提升研究速度',
    icon: 'mdi:robot',
    type: BuildingType.TECHNOLOGY,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 12,
    buildCost: {
      steel: 1000,
      chip: 500,
      data: 500,
      gold: 2500
    },
    upgradeCostMultiplier: 3.8,
    buildTime: 600,
    upgradeTime: 900,
    production: {
      knowledge: 15,
      data: 5
    },
    consumption: {
      electricity: 8,
      chip: 2
    },
    requirements: [
      { type: 'technology', id: 'artificialIntelligence' }
    ],
    effects: [
      {
        type: 'researchSpeedBonus',
        value: 0.3 // 提升30%研究速度
      }
    ]
  },

  {
    id: 'smart_city',
    name: '智慧城市',
    description: '智能化城市管理,容纳大量人口',
    icon: 'mdi:city',
    type: BuildingType.POPULATION,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 25,
    buildCost: {
      steel: 1200,
      chip: 600,
      electricity: 800,
      gold: 3000
    },
    upgradeCostMultiplier: 2.5,
    buildTime: 500,
    upgradeTime: 750,
    population: 200,
    requirements: [
      { type: 'technology', id: 'smartTechnology' }
    ]
  },

  {
    id: 'renewable_energy_plant',
    name: '可再生能源发电厂',
    description: '清洁能源,无需消耗资源',
    icon: 'mdi:solar-power',
    type: BuildingType.PRODUCTION,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 12,
    buildCost: {
      steel: 900,
      chip: 300,
      gold: 1800
    },
    upgradeCostMultiplier: 2.8,
    buildTime: 420,
    upgradeTime: 630,
    production: {
      electricity: 12
    },
    requirements: [
      { type: 'technology', id: 'renewableEnergy' }
    ]
  },

  {
    id: 'digital_warehouse',
    name: '数字化仓库',
    description: '智能仓储系统',
    icon: 'mdi:package-variant-closed',
    type: BuildingType.STORAGE,
    era: Era.INFORMATION,
    level: 1,
    maxLevel: 15,
    buildCost: {
      steel: 600,
      chip: 200,
      electricity: 300,
      gold: 1200
    },
    upgradeCostMultiplier: 2.6,
    buildTime: 300,
    upgradeTime: 450,
    capacity: {
      steel: 5000,
      chip: 2000,
      data: 10000,
      electricity: 8000
    },
    requirements: [
      { type: 'era', id: 'information' }
    ]
  },

  // ========== 太空时代建筑 (14个) ==========
  {
    id: 'launch_pad',
    name: '发射台',
    description: '火箭发射设施',
    icon: 'game-icons:rocket',
    type: BuildingType.PRODUCTION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 15,
    buildCost: {
      steel: 2000,
      chip: 1000,
      data: 800,
      gold: 5000
    },
    upgradeCostMultiplier: 3.5,
    buildTime: 800,
    upgradeTime: 1200,
    production: {
      rocketFuel: 2
    },
    consumption: {
      oil: 3,
      electricity: 5
    },
    requirements: [
      { type: 'technology', id: 'rocketry' }
    ]
  },

  {
    id: 'space_station',
    name: '轨道空间站',
    description: '地球轨道空间站',
    icon: 'game-icons:space-station',
    type: BuildingType.PRODUCTION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 12,
    buildCost: {
      steel: 3000,
      alloy: 500,
      chip: 1500,
      gold: 8000
    },
    upgradeCostMultiplier: 4.0,
    buildTime: 1000,
    upgradeTime: 1500,
    production: {
      knowledge: 20,
      data: 15
    },
    consumption: {
      electricity: 8
    },
    requirements: [
      { type: 'technology', id: 'orbitalStation' }
    ]
  },

  {
    id: 'helium3_extractor',
    name: '氦-3提取机',
    description: '从月球提取氦-3',
    icon: 'game-icons:gas-pump',
    type: BuildingType.PRODUCTION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 800,
      chip: 1000,
      rocketFuel: 300,
      gold: 6000
    },
    upgradeCostMultiplier: 3.8,
    buildTime: 900,
    upgradeTime: 1350,
    production: {
      helium3: 1.5
    },
    requirements: [
      { type: 'technology', id: 'lunarMining' }
    ]
  },

  {
    id: 'fusion_reactor',
    name: '核聚变反应堆',
    description: '氦-3核聚变能源',
    icon: 'game-icons:nuclear',
    type: BuildingType.PRODUCTION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 10,
    buildCost: {
      steel: 2500,
      alloy: 1000,
      chip: 1200,
      gold: 10000
    },
    upgradeCostMultiplier: 4.5,
    buildTime: 1200,
    upgradeTime: 1800,
    production: {
      electricity: 50
    },
    consumption: {
      helium3: 0.5
    },
    requirements: [
      { type: 'technology', id: 'fusionPower' }
    ]
  },

  {
    id: 'alloy_foundry',
    name: '合金铸造厂',
    description: '生产高级合金',
    icon: 'game-icons:metal-bar',
    type: BuildingType.PRODUCTION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 15,
    buildCost: {
      steel: 2000,
      chip: 800,
      electricity: 1000,
      gold: 5000
    },
    upgradeCostMultiplier: 3.2,
    buildTime: 700,
    upgradeTime: 1050,
    production: {
      alloy: 4
    },
    consumption: {
      steel: 6,
      electricity: 10
    },
    requirements: [
      { type: 'technology', id: 'advancedMaterials' }
    ]
  },

  {
    id: 'asteroid_base',
    name: '小行星基地',
    description: '小行星带采矿基地',
    icon: 'game-icons:asteroid',
    type: BuildingType.PRODUCTION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 1500,
      chip: 1000,
      rocketFuel: 500,
      gold: 8000
    },
    upgradeCostMultiplier: 3.8,
    buildTime: 1000,
    upgradeTime: 1500,
    production: {
      steel: 10,
      alloy: 3
    },
    requirements: [
      { type: 'technology', id: 'asteroidMining' }
    ]
  },

  {
    id: 'terraforming_station',
    name: '行星改造站',
    description: '改造行星环境',
    icon: 'game-icons:planet-conquest',
    type: BuildingType.FUNCTIONAL,
    era: Era.SPACE,
    level: 1,
    maxLevel: 10,
    buildCost: {
      alloy: 2000,
      helium3: 500,
      chip: 1500,
      gold: 12000
    },
    upgradeCostMultiplier: 4.0,
    buildTime: 1500,
    upgradeTime: 2250,
    requirements: [
      { type: 'technology', id: 'terraforming' }
    ],
    effects: [
      {
        type: 'populationGrowth',
        value: 0.3
      },
      {
        type: 'resourceMultiplier',
        target: 'food',
        value: 0.5
      }
    ]
  },

  {
    id: 'quantum_lab',
    name: '量子实验室',
    description: '量子科技研究设施',
    icon: 'game-icons:atom-core',
    type: BuildingType.TECHNOLOGY,
    era: Era.SPACE,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 1800,
      chip: 2000,
      data: 1500,
      gold: 10000
    },
    upgradeCostMultiplier: 4.2,
    buildTime: 1200,
    upgradeTime: 1800,
    production: {
      knowledge: 25,
      data: 20
    },
    consumption: {
      electricity: 15,
      helium3: 0.3
    },
    requirements: [
      { type: 'technology', id: 'quantumComputing' }
    ]
  },

  {
    id: 'space_elevator',
    name: '太空电梯',
    description: '地球到轨道的运输系统',
    icon: 'game-icons:tower',
    type: BuildingType.FUNCTIONAL,
    era: Era.SPACE,
    level: 1,
    maxLevel: 5,
    buildCost: {
      steel: 5000,
      alloy: 3000,
      chip: 2000,
      gold: 20000
    },
    upgradeCostMultiplier: 5.0,
    buildTime: 2000,
    upgradeTime: 3000,
    requirements: [
      { type: 'technology', id: 'spaceElevator' }
    ],
    effects: [
      {
        type: 'buildSpeedBonus',
        value: 0.3
      },
      {
        type: 'resourceMultiplier',
        target: 'rocketFuel',
        value: 0.5
      }
    ]
  },

  {
    id: 'orbital_factory',
    name: '轨道工厂',
    description: '零重力制造设施',
    icon: 'game-icons:factory',
    type: BuildingType.PRODUCTION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 2500,
      chip: 1500,
      rocketFuel: 400,
      gold: 9000
    },
    upgradeCostMultiplier: 3.6,
    buildTime: 1100,
    upgradeTime: 1650,
    production: {
      chip: 8,
      alloy: 5
    },
    consumption: {
      electricity: 12,
      steel: 4
    },
    requirements: [
      { type: 'technology', id: 'zeroGravityManufacturing' }
    ]
  },

  {
    id: 'solar_array',
    name: '太阳能阵列',
    description: '轨道太阳能发电',
    icon: 'game-icons:solar-power',
    type: BuildingType.PRODUCTION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 1500,
      chip: 1000,
      gold: 7000
    },
    upgradeCostMultiplier: 3.0,
    buildTime: 800,
    upgradeTime: 1200,
    production: {
      electricity: 30
    },
    requirements: [
      { type: 'technology', id: 'solarPower' }
    ]
  },

  {
    id: 'space_habitat',
    name: '太空居住区',
    description: '轨道居住设施',
    icon: 'game-icons:space-capsule',
    type: BuildingType.POPULATION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 20,
    buildCost: {
      alloy: 2000,
      chip: 1000,
      rocketFuel: 300,
      gold: 8000
    },
    upgradeCostMultiplier: 3.5,
    buildTime: 1000,
    upgradeTime: 1500,
    population: 300,
    requirements: [
      { type: 'technology', id: 'spaceHabitation' }
    ]
  },

  {
    id: 'mars_colony',
    name: '火星殖民地',
    description: '火星上的永久居住地',
    icon: 'game-icons:mars-pathfinder',
    type: BuildingType.POPULATION,
    era: Era.SPACE,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 3000,
      helium3: 400,
      chip: 2000,
      gold: 15000
    },
    upgradeCostMultiplier: 4.0,
    buildTime: 1500,
    upgradeTime: 2250,
    population: 500,
    requirements: [
      { type: 'technology', id: 'marsColonization' }
    ]
  },

  {
    id: 'space_storage',
    name: '轨道仓库',
    description: '太空储存设施',
    icon: 'game-icons:cargo-crate',
    type: BuildingType.STORAGE,
    era: Era.SPACE,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 1500,
      chip: 800,
      gold: 5000
    },
    upgradeCostMultiplier: 3.0,
    buildTime: 700,
    upgradeTime: 1050,
    capacity: {
      alloy: 5000,
      rocketFuel: 3000,
      helium3: 1000
    },
    requirements: [
      { type: 'era', id: 'space' }
    ]
  },

  // ========== 星际时代建筑 (14个) ==========
  {
    id: 'warp_drive_factory',
    name: '曲速引擎工厂',
    description: '制造星际飞船引擎',
    icon: 'game-icons:warp-pipe',
    type: BuildingType.PRODUCTION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 5000,
      helium3: 1000,
      chip: 3000,
      gold: 25000
    },
    upgradeCostMultiplier: 4.5,
    buildTime: 2000,
    upgradeTime: 3000,
    production: {
      antimatter: 0.5
    },
    consumption: {
      helium3: 2,
      electricity: 30
    },
    requirements: [
      { type: 'technology', id: 'warpDrive' }
    ]
  },

  {
    id: 'antimatter_reactor',
    name: '反物质反应堆',
    description: '利用反物质产生巨大能量',
    icon: 'game-icons:nuclear-plant',
    type: BuildingType.PRODUCTION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 6000,
      antimatter: 50,
      chip: 4000,
      gold: 30000
    },
    upgradeCostMultiplier: 5.0,
    buildTime: 2500,
    upgradeTime: 3750,
    production: {
      electricity: 100
    },
    consumption: {
      antimatter: 0.1
    },
    requirements: [
      { type: 'technology', id: 'antimatterPower' }
    ]
  },

  {
    id: 'dark_matter_collector',
    name: '暗物质收集器',
    description: '从宇宙空间收集暗物质',
    icon: 'game-icons:black-hole-bolas',
    type: BuildingType.PRODUCTION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 10,
    buildCost: {
      alloy: 8000,
      antimatter: 100,
      chip: 5000,
      gold: 40000
    },
    upgradeCostMultiplier: 6.0,
    buildTime: 3000,
    upgradeTime: 4500,
    production: {
      darkMatter: 0.3
    },
    consumption: {
      electricity: 50
    },
    requirements: [
      { type: 'technology', id: 'darkMatterHarvesting' }
    ]
  },

  {
    id: 'interstellar_shipyard',
    name: '星际船坞',
    description: '建造大型星际飞船',
    icon: 'game-icons:spacesuit',
    type: BuildingType.PRODUCTION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 7000,
      antimatter: 80,
      chip: 4000,
      gold: 35000
    },
    upgradeCostMultiplier: 4.8,
    buildTime: 2800,
    upgradeTime: 4200,
    production: {
      alloy: 15,
      chip: 10
    },
    consumption: {
      electricity: 40,
      darkMatter: 0.1
    },
    requirements: [
      { type: 'technology', id: 'interstellarShips' }
    ]
  },

  {
    id: 'dyson_sphere_segment',
    name: '戴森球组件',
    description: '戴森球的一部分,提供巨大能量',
    icon: 'game-icons:planet-core',
    type: BuildingType.PRODUCTION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 20,
    buildCost: {
      alloy: 10000,
      antimatter: 150,
      darkMatter: 50,
      gold: 50000
    },
    upgradeCostMultiplier: 5.5,
    buildTime: 4000,
    upgradeTime: 6000,
    production: {
      electricity: 200
    },
    requirements: [
      { type: 'technology', id: 'dysonSphere' }
    ]
  },

  {
    id: 'galactic_research_hub',
    name: '银河研究中心',
    description: '跨星系科研网络',
    icon: 'mdi:telescope',
    type: BuildingType.TECHNOLOGY,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 6000,
      antimatter: 100,
      chip: 5000,
      gold: 40000
    },
    upgradeCostMultiplier: 5.0,
    buildTime: 3000,
    upgradeTime: 4500,
    production: {
      knowledge: 50,
      data: 40
    },
    consumption: {
      electricity: 35,
      darkMatter: 0.2
    },
    requirements: [
      { type: 'technology', id: 'galacticNetwork' }
    ]
  },

  {
    id: 'alien_biolab',
    name: '外星生物实验室',
    description: '研究外星生命形态',
    icon: 'game-icons:alien-stare',
    type: BuildingType.TECHNOLOGY,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 5000,
      antimatter: 80,
      chip: 4000,
      gold: 30000
    },
    upgradeCostMultiplier: 4.5,
    buildTime: 2500,
    upgradeTime: 3750,
    production: {
      knowledge: 30,
      culture: 20
    },
    requirements: [
      { type: 'technology', id: 'xenobiology' }
    ],
    effects: [
      {
        type: 'populationGrowth',
        value: 0.4
      }
    ]
  },

  {
    id: 'star_forge',
    name: '恒星熔炉',
    description: '利用恒星能量进行超级制造',
    icon: 'game-icons:star-gate',
    type: BuildingType.PRODUCTION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 10,
    buildCost: {
      alloy: 12000,
      antimatter: 200,
      darkMatter: 80,
      gold: 60000
    },
    upgradeCostMultiplier: 6.0,
    buildTime: 4500,
    upgradeTime: 6750,
    production: {
      alloy: 30,
      antimatter: 1
    },
    consumption: {
      electricity: 80
    },
    requirements: [
      { type: 'technology', id: 'stellarEngineering' }
    ]
  },

  {
    id: 'planet_cracker',
    name: '行星粉碎机',
    description: '分解整个行星获取资源',
    icon: 'game-icons:meteor-impact',
    type: BuildingType.PRODUCTION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 8,
    buildCost: {
      alloy: 15000,
      antimatter: 250,
      darkMatter: 100,
      gold: 80000
    },
    upgradeCostMultiplier: 7.0,
    buildTime: 5000,
    upgradeTime: 7500,
    production: {
      alloy: 50,
      steel: 100
    },
    requirements: [
      { type: 'technology', id: 'planetaryDestruction' }
    ]
  },

  {
    id: 'wormhole_station',
    name: '虫洞中转站',
    description: '建立虫洞网络,加速科技进步',
    icon: 'game-icons:wormhole',
    type: BuildingType.FUNCTIONAL,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 10,
    buildCost: {
      alloy: 10000,
      antimatter: 200,
      darkMatter: 150,
      gold: 70000
    },
    upgradeCostMultiplier: 6.5,
    buildTime: 4000,
    upgradeTime: 6000,
    requirements: [
      { type: 'technology', id: 'wormholeTechnology' }
    ],
    effects: [
      {
        type: 'researchSpeedBonus',
        value: 0.5
      },
      {
        type: 'buildSpeedBonus',
        value: 0.4
      }
    ]
  },

  {
    id: 'colony_ship',
    name: '殖民飞船',
    description: '建立新的星际殖民地',
    icon: 'game-icons:spaceship',
    type: BuildingType.POPULATION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 8000,
      antimatter: 150,
      chip: 5000,
      gold: 50000
    },
    upgradeCostMultiplier: 5.0,
    buildTime: 3500,
    upgradeTime: 5250,
    population: 1000,
    requirements: [
      { type: 'technology', id: 'colonyShips' }
    ]
  },

  {
    id: 'ringworld_segment',
    name: '环世界区段',
    description: '巨型环状人造世界',
    icon: 'game-icons:ring',
    type: BuildingType.POPULATION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 20,
    buildCost: {
      alloy: 20000,
      antimatter: 300,
      darkMatter: 200,
      gold: 100000
    },
    upgradeCostMultiplier: 7.0,
    buildTime: 6000,
    upgradeTime: 9000,
    population: 2000,
    requirements: [
      { type: 'technology', id: 'megastructures' }
    ]
  },

  {
    id: 'galactic_bank',
    name: '银河银行',
    description: '跨星系金融中心',
    icon: 'mdi:bank',
    type: BuildingType.PRODUCTION,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 7000,
      antimatter: 120,
      chip: 6000,
      gold: 50000
    },
    upgradeCostMultiplier: 5.5,
    buildTime: 3000,
    upgradeTime: 4500,
    production: {
      gold: 100
    },
    requirements: [
      { type: 'technology', id: 'galacticEconomy' }
    ]
  },

  {
    id: 'interstellar_storage',
    name: '星际仓储中心',
    description: '跨星系物资储存',
    icon: 'mdi:warehouse',
    type: BuildingType.STORAGE,
    era: Era.INTERSTELLAR,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 6000,
      antimatter: 80,
      chip: 3000,
      gold: 30000
    },
    upgradeCostMultiplier: 4.5,
    buildTime: 2500,
    upgradeTime: 3750,
    capacity: {
      alloy: 20000,
      antimatter: 500,
      darkMatter: 300,
      helium3: 5000
    },
    requirements: [
      { type: 'era', id: 'interstellar' }
    ]
  },

  // ========== 超维时代建筑 (14个) ==========
  {
    id: 'quantum_gateway',
    name: '量子门',
    description: '跨维度传送装置',
    icon: 'game-icons:portal',
    type: BuildingType.FUNCTIONAL,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 30000,
      antimatter: 500,
      darkMatter: 400,
      gold: 150000
    },
    upgradeCostMultiplier: 8.0,
    buildTime: 8000,
    upgradeTime: 12000,
    requirements: [
      { type: 'technology', id: 'quantumTeleportation' }
    ],
    effects: [
      {
        type: 'buildSpeedBonus',
        value: 0.6
      },
      {
        type: 'researchSpeedBonus',
        value: 0.7
      }
    ]
  },

  {
    id: 'dimension_reactor',
    name: '维度反应堆',
    description: '从高维空间提取能量',
    icon: 'game-icons:energy-breath',
    type: BuildingType.PRODUCTION,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 25000,
      antimatter: 400,
      darkMatter: 350,
      gold: 120000
    },
    upgradeCostMultiplier: 7.5,
    buildTime: 7000,
    upgradeTime: 10500,
    production: {
      quantumEnergy: 5
    },
    consumption: {
      darkMatter: 1
    },
    requirements: [
      { type: 'technology', id: 'dimensionalEngineering' }
    ]
  },

  {
    id: 'spacetime_crystal_mine',
    name: '时空晶体矿场',
    description: '开采时空晶体',
    icon: 'game-icons:crystal-cluster',
    type: BuildingType.PRODUCTION,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 28000,
      antimatter: 450,
      darkMatter: 380,
      gold: 140000
    },
    upgradeCostMultiplier: 8.0,
    buildTime: 7500,
    upgradeTime: 11250,
    production: {
      spacetimeCrystal: 0.5
    },
    consumption: {
      quantumEnergy: 2
    },
    requirements: [
      { type: 'technology', id: 'spacetimeMining' }
    ]
  },

  {
    id: 'reality_manipulator',
    name: '现实操纵器',
    description: '改变物理规则',
    icon: 'game-icons:magic-swirl',
    type: BuildingType.PRODUCTION,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 10,
    buildCost: {
      alloy: 35000,
      antimatter: 600,
      darkMatter: 500,
      spacetimeCrystal: 100,
      gold: 200000
    },
    upgradeCostMultiplier: 10.0,
    buildTime: 10000,
    upgradeTime: 15000,
    production: {
      alloy: 100,
      antimatter: 5
    },
    consumption: {
      quantumEnergy: 5,
      spacetimeCrystal: 0.2
    },
    requirements: [
      { type: 'technology', id: 'realityManipulation' }
    ]
  },

  {
    id: 'time_accelerator',
    name: '时间加速器',
    description: '局部加速时间流逝',
    icon: 'game-icons:time-trap',
    type: BuildingType.FUNCTIONAL,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 8,
    buildCost: {
      alloy: 40000,
      antimatter: 700,
      spacetimeCrystal: 200,
      gold: 250000
    },
    upgradeCostMultiplier: 12.0,
    buildTime: 12000,
    upgradeTime: 18000,
    requirements: [
      { type: 'technology', id: 'timeManipulation' }
    ],
    effects: [
      {
        type: 'buildSpeedBonus',
        value: 1.0
      },
      {
        type: 'researchSpeedBonus',
        value: 1.0
      }
    ]
  },

  {
    id: 'multiversal_observatory',
    name: '多元宇宙观测站',
    description: '观测平行宇宙',
    icon: 'game-icons:galaxy',
    type: BuildingType.TECHNOLOGY,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 30000,
      antimatter: 500,
      darkMatter: 450,
      gold: 180000
    },
    upgradeCostMultiplier: 9.0,
    buildTime: 9000,
    upgradeTime: 13500,
    production: {
      knowledge: 100,
      data: 80
    },
    consumption: {
      quantumEnergy: 8
    },
    requirements: [
      { type: 'technology', id: 'multiverseTheory' }
    ]
  },

  {
    id: 'singularity_engine',
    name: '奇点引擎',
    description: '利用黑洞能量',
    icon: 'game-icons:black-hole',
    type: BuildingType.PRODUCTION,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 50000,
      antimatter: 800,
      darkMatter: 600,
      spacetimeCrystal: 150,
      gold: 300000
    },
    upgradeCostMultiplier: 15.0,
    buildTime: 15000,
    upgradeTime: 22500,
    production: {
      quantumEnergy: 20
    },
    consumption: {
      darkMatter: 2
    },
    requirements: [
      { type: 'technology', id: 'singularityHarnessing' }
    ]
  },

  {
    id: 'consciousness_network',
    name: '意识网络',
    description: '全文明思维共享',
    icon: 'game-icons:brain',
    type: BuildingType.TECHNOLOGY,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 12,
    buildCost: {
      alloy: 35000,
      antimatter: 600,
      darkMatter: 500,
      gold: 200000
    },
    upgradeCostMultiplier: 10.0,
    buildTime: 10000,
    upgradeTime: 15000,
    production: {
      knowledge: 150,
      culture: 100
    },
    requirements: [
      { type: 'technology', id: 'collectiveConsciousness' }
    ],
    effects: [
      {
        type: 'researchSpeedBonus',
        value: 0.8
      }
    ]
  },

  {
    id: 'matter_synthesizer',
    name: '物质合成器',
    description: '从能量直接合成物质',
    icon: 'game-icons:cryo-chamber',
    type: BuildingType.PRODUCTION,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 15,
    buildCost: {
      alloy: 32000,
      antimatter: 550,
      darkMatter: 450,
      gold: 160000
    },
    upgradeCostMultiplier: 8.5,
    buildTime: 8500,
    upgradeTime: 12750,
    production: {
      alloy: 80,
      chip: 50
    },
    consumption: {
      quantumEnergy: 10
    },
    requirements: [
      { type: 'technology', id: 'matterCreation' }
    ]
  },

  {
    id: 'dimensional_city',
    name: '维度城市',
    description: '跨维度超级城市',
    icon: 'game-icons:city',
    type: BuildingType.POPULATION,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 25,
    buildCost: {
      alloy: 45000,
      antimatter: 750,
      spacetimeCrystal: 250,
      gold: 280000
    },
    upgradeCostMultiplier: 9.0,
    buildTime: 11000,
    upgradeTime: 16500,
    population: 5000,
    requirements: [
      { type: 'technology', id: 'dimensionalArchitecture' }
    ]
  },

  {
    id: 'ascension_chamber',
    name: '飞升密室',
    description: '将意识提升到更高维度',
    icon: 'game-icons:enlightenment',
    type: BuildingType.SPECIAL,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 5,
    buildCost: {
      alloy: 100000,
      antimatter: 1500,
      darkMatter: 1000,
      spacetimeCrystal: 500,
      gold: 1000000
    },
    upgradeCostMultiplier: 20.0,
    buildTime: 20000,
    upgradeTime: 30000,
    requirements: [
      { type: 'technology', id: 'transcendence' }
    ],
    effects: [
      {
        type: 'resourceMultiplier',
        target: 'knowledge',
        value: 2.0
      },
      {
        type: 'resourceMultiplier',
        target: 'culture',
        value: 2.0
      }
    ]
  },

  {
    id: 'universe_forge',
    name: '宇宙熔炉',
    description: '创造新宇宙',
    icon: 'game-icons:big-bang',
    type: BuildingType.SPECIAL,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 3,
    buildCost: {
      alloy: 200000,
      antimatter: 3000,
      darkMatter: 2000,
      spacetimeCrystal: 1000,
      gold: 5000000
    },
    upgradeCostMultiplier: 50.0,
    buildTime: 50000,
    upgradeTime: 75000,
    production: {
      gold: 1000,
      knowledge: 500
    },
    requirements: [
      { type: 'technology', id: 'universeCreation' }
    ]
  },

  {
    id: 'infinity_vault',
    name: '无限宝库',
    description: '跨维度无限存储',
    icon: 'game-icons:treasure-map',
    type: BuildingType.STORAGE,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 20,
    buildCost: {
      alloy: 40000,
      antimatter: 700,
      spacetimeCrystal: 200,
      gold: 250000
    },
    upgradeCostMultiplier: 10.0,
    buildTime: 10000,
    upgradeTime: 15000,
    capacity: {
      alloy: 100000,
      antimatter: 5000,
      darkMatter: 3000,
      quantumEnergy: 10000,
      spacetimeCrystal: 2000
    },
    requirements: [
      { type: 'era', id: 'hyperdimensional' }
    ]
  },

  {
    id: 'eternal_monument',
    name: '永恒纪念碑',
    description: '文明成就的永恒见证',
    icon: 'game-icons:obelisk',
    type: BuildingType.PRODUCTION,
    era: Era.HYPERDIMENSIONAL,
    level: 1,
    maxLevel: 10,
    buildCost: {
      alloy: 50000,
      antimatter: 1000,
      spacetimeCrystal: 500,
      gold: 500000
    },
    upgradeCostMultiplier: 15.0,
    buildTime: 15000,
    upgradeTime: 22500,
    production: {
      culture: 200,
      gold: 500
    },
    requirements: [
      { type: 'technology', id: 'eternalLegacy' }
    ]
  }
]

// 建筑映射表
export const buildingMap = new Map(buildings.map(b => [b.id, b]))

// 根据时代获取建筑
export function getBuildingsByEra(era: Era): Building[] {
  return buildings.filter(b => b.era === era)
}

// 根据类型获取建筑
export function getBuildingsByType(type: BuildingType): Building[] {
  return buildings.filter(b => b.type === type)
}
