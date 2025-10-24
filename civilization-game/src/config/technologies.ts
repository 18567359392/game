import { type Technology, Era } from '@/types'

/**
 * 科技配置数据
 * 涵盖所有8个时代的科技树
 */
export const technologies: Technology[] = [
  // ========== 石器时代科技 (5个) ==========
  {
    id: 'fire',
    name: '火的使用',
    description: '学会使用火焰,提高食物生产效率',
    icon: 'fluent:fire-24-filled',
    era: Era.STONE,
    category: 'production',
    researchCost: { food: 50, wood: 20 },
    researchTime: 10,
    prerequisites: [],
    effects: [
      { type: 'resourceMultiplier', target: 'food', value: 1.2 }
    ],
    unlocks: ['bonfire', 'kiln']
  },
  {
    id: 'stoneTools',
    name: '石器工具',
    description: '制作更高效的石器工具,提升采集效率',
    icon: 'game-icons:stone-axe',
    era: Era.STONE,
    category: 'production',
    researchCost: { stone: 30, wood: 15 },
    researchTime: 15,
    prerequisites: [],
    effects: [
      { type: 'resourceMultiplier', target: 'wood', value: 1.3 },
      { type: 'resourceMultiplier', target: 'stone', value: 1.3 }
    ],
    unlocks: ['quarry']
  },
  {
    id: 'hunting',
    name: '狩猎技术',
    description: '改进狩猎方法,提高食物获取效率',
    icon: 'game-icons:hunting-horn',
    era: Era.STONE,
    category: 'production',
    researchCost: { food: 40, wood: 25 },
    researchTime: 12,
    prerequisites: [],
    effects: [
      { type: 'resourceMultiplier', target: 'food', value: 1.5 }
    ],
    unlocks: []
  },
  {
    id: 'shelter',
    name: '住所建造',
    description: '学会建造稳固的住所,增加人口上限',
    icon: 'mdi:home',
    era: Era.STONE,
    category: 'production',
    researchCost: { wood: 50, stone: 30 },
    researchTime: 20,
    prerequisites: [],
    effects: [
      { type: 'populationGrowth', value: 1.2 }
    ],
    unlocks: ['hut']
  },
  {
    id: 'pottery',
    name: '陶器制作',
    description: '学会制作陶器,解锁存储建筑',
    icon: 'game-icons:amphora',
    era: Era.STONE,
    category: 'production',
    researchCost: { stone: 40, wood: 20 },
    researchTime: 18,
    prerequisites: ['fire'],
    effects: [],
    unlocks: ['storageHouse']
  },

  // ========== 青铜时代科技 (7个) ==========
  {
    id: 'mining',
    name: '采矿技术',
    description: '学会开采矿石',
    icon: 'game-icons:pickaxe',
    era: Era.BRONZE,
    category: 'production',
    researchCost: { stone: 60, wood: 40 },
    researchTime: 22,
    prerequisites: ['stoneTools'],
    effects: [],
    unlocks: ['copper_mine']
  },

  {
    id: 'smelting',
    name: '冶炼技术',
    description: '学会冶炼矿石',
    icon: 'game-icons:fire-bowl',
    era: Era.BRONZE,
    category: 'production',
    researchCost: { copper: 80, coal: 40 },
    researchTime: 25,
    prerequisites: ['fire', 'mining'],
    effects: [],
    unlocks: ['workshop']
  },
  {
    id: 'bronzeWorking',
    name: '青铜冶炼',
    description: '掌握青铜冶炼技术,解锁青铜时代',
    icon: 'game-icons:metal-bar',
    era: Era.BRONZE,
    category: 'production',
    researchCost: { copper: 100, stone: 80, wood: 50 },
    researchTime: 30,
    prerequisites: ['fire', 'stoneTools'],
    effects: [
      { type: 'resourceMultiplier', target: 'copper', value: 1.5 }
    ],
    unlocks: ['bronzeMine', 'bronzeWorkshop']
  },
  {
    id: 'agriculture',
    name: '农业技术',
    description: '发展农业,大幅提高食物产出',
    icon: 'game-icons:wheat',
    era: Era.BRONZE,
    category: 'production',
    researchCost: { food: 150, wood: 80 },
    researchTime: 25,
    prerequisites: ['shelter'],
    effects: [
      { type: 'resourceMultiplier', target: 'food', value: 2.0 }
    ],
    unlocks: ['farm']
  },
  {
    id: 'writing',
    name: '文字书写',
    description: '发明文字,提升研究速度',
    icon: 'mdi:script-text',
    era: Era.BRONZE,
    category: 'culture',
    researchCost: { knowledge: 50, clay: 30 },
    researchTime: 35,
    prerequisites: ['pottery'],
    effects: [
      { type: 'researchSpeedBonus', value: 1.15 }
    ],
    unlocks: ['library']
  },
  {
    id: 'trade',
    name: '贸易体系',
    description: '建立贸易网络,获得金币收入',
    icon: 'game-icons:trade',
    era: Era.BRONZE,
    category: 'economy',
    researchCost: { gold: 20, copper: 50 },
    researchTime: 28,
    prerequisites: ['bronzeWorking'],
    effects: [],
    unlocks: ['market']
  },
  {
    id: 'construction',
    name: '建筑学',
    description: '改进建筑技术,提高建造速度',
    icon: 'mdi:hammer-wrench',
    era: Era.BRONZE,
    category: 'production',
    researchCost: { stone: 120, wood: 80, copper: 40 },
    researchTime: 32,
    prerequisites: ['shelter', 'bronzeWorking'],
    effects: [
      { type: 'buildSpeedBonus', value: 1.2 }
    ],
    unlocks: []
  },

  // ========== 铁器时代科技 (5个) ==========
  {
    id: 'ironWorking',
    name: '铁器冶炼',
    description: '掌握铁器冶炼技术,进入铁器时代',
    icon: 'game-icons:anvil',
    era: Era.IRON,
    category: 'production',
    researchCost: { iron: 200, coal: 150, copper: 100 },
    researchTime: 45,
    prerequisites: ['bronzeWorking'],
    effects: [
      { type: 'resourceMultiplier', target: 'iron', value: 1.5 }
    ],
    unlocks: ['ironMine', 'forge']
  },
  {
    id: 'engineering',
    name: '工程学',
    description: '发展工程技术,解锁大型建筑',
    icon: 'mdi:engineering',
    era: Era.IRON,
    category: 'production',
    researchCost: { iron: 150, stone: 200, knowledge: 80 },
    researchTime: 50,
    prerequisites: ['construction', 'ironWorking'],
    effects: [
      { type: 'buildSpeedBonus', value: 1.3 }
    ],
    unlocks: ['aqueduct', 'granary']
  },
  {
    id: 'mathematics',
    name: '数学',
    description: '发展数学理论,提升研究效率',
    icon: 'mdi:math-compass',
    era: Era.IRON,
    category: 'culture',
    researchCost: { knowledge: 120, clay: 60 },
    researchTime: 40,
    prerequisites: ['writing'],
    effects: [
      { type: 'researchSpeedBonus', value: 1.25 }
    ],
    unlocks: ['academy']
  },
  {
    id: 'currency',
    name: '货币制度',
    description: '建立货币体系,增加金币收入',
    icon: 'game-icons:gold-stack',
    era: Era.IRON,
    category: 'economy',
    researchCost: { gold: 80, iron: 100 },
    researchTime: 38,
    prerequisites: ['trade'],
    effects: [
      { type: 'resourceMultiplier', target: 'gold', value: 1.5 }
    ],
    unlocks: ['bank']
  },
  {
    id: 'philosophy',
    name: '哲学',
    description: '发展哲学思想,提升文化产出',
    icon: 'game-icons:wisdom',
    era: Era.IRON,
    category: 'culture',
    researchCost: { knowledge: 150, culture: 50 },
    researchTime: 55,
    prerequisites: ['mathematics', 'writing'],
    effects: [
      { type: 'resourceMultiplier', target: 'culture', value: 1.5 }
    ],
    unlocks: ['temple']
  },

  // ========== 工业时代科技 (12个) ==========
  {
    id: 'steamEngine',
    name: '蒸汽机',
    description: '发明蒸汽机,开启工业革命',
    icon: 'game-icons:steam',
    era: Era.INDUSTRIAL,
    category: 'production',
    researchCost: { iron: 400, coal: 350, knowledge: 180 },
    researchTime: 55,
    prerequisites: ['ironWorking', 'engineering'],
    effects: [
      { type: 'buildSpeedBonus', value: 0.2 }
    ],
    unlocks: ['factory']
  },
  {
    id: 'steelProduction',
    name: '钢铁生产',
    description: '掌握钢铁冶炼,进入工业时代',
    icon: 'game-icons:steel-claws',
    era: Era.INDUSTRIAL,
    category: 'production',
    researchCost: { iron: 500, coal: 400, knowledge: 200 },
    researchTime: 60,
    prerequisites: ['ironWorking', 'engineering'],
    effects: [
      { type: 'resourceMultiplier', target: 'steel', value: 1.5 }
    ],
    unlocks: ['steelMill', 'factory']
  },
  {
    id: 'oilDrilling',
    name: '石油钻探',
    description: '开采石油资源',
    icon: 'game-icons:oil-rig',
    era: Era.INDUSTRIAL,
    category: 'production',
    researchCost: { steel: 450, knowledge: 300 },
    researchTime: 65,
    prerequisites: ['steelProduction'],
    effects: [],
    unlocks: ['oil_refinery']
  },
  {
    id: 'scientificMethod',
    name: '科学方法',
    description: '发展现代科学方法,提升研究效率',
    icon: 'mdi:flask-outline',
    era: Era.INDUSTRIAL,
    category: 'culture',
    researchCost: { knowledge: 400, culture: 150, steel: 200 },
    researchTime: 80,
    prerequisites: ['mathematics', 'chemistry'],
    effects: [
      { type: 'researchSpeedBonus', value: 0.2 }
    ],
    unlocks: ['university']
  },
  {
    id: 'capitalism',
    name: '资本主义',
    description: '建立资本市场体系',
    icon: 'game-icons:gold-stack',
    era: Era.INDUSTRIAL,
    category: 'economy',
    researchCost: { gold: 300, knowledge: 250, culture: 100 },
    researchTime: 70,
    prerequisites: ['currency'],
    effects: [
      { type: 'resourceMultiplier', target: 'gold', value: 0.3 }
    ],
    unlocks: ['stock_exchange']
  },
  {
    id: 'archaeology',
    name: '考古学',
    description: '研究古代文明,提升文化产出',
    icon: 'mdi:brush',
    era: Era.INDUSTRIAL,
    category: 'culture',
    researchCost: { knowledge: 350, culture: 200, gold: 150 },
    researchTime: 75,
    prerequisites: ['scientificMethod'],
    effects: [
      { type: 'resourceMultiplier', target: 'culture', value: 0.25 }
    ],
    unlocks: ['museum']
  },
  {
    id: 'railroad',
    name: '铁路',
    description: '建造铁路网络,加快运输速度',
    icon: 'mdi:train',
    era: Era.INDUSTRIAL,
    category: 'production',
    researchCost: { steel: 600, coal: 400, knowledge: 300 },
    researchTime: 85,
    prerequisites: ['steamEngine', 'steelProduction'],
    effects: [
      { type: 'buildSpeedBonus', value: 0.15 }
    ],
    unlocks: ['railroad_station']
  },
  {
    id: 'medicine',
    name: '现代医学',
    description: '发展现代医疗技术',
    icon: 'mdi:medical-bag',
    era: Era.INDUSTRIAL,
    category: 'culture',
    researchCost: { knowledge: 400, culture: 150, steel: 250 },
    researchTime: 80,
    prerequisites: ['chemistry', 'scientificMethod'],
    effects: [
      { type: 'populationGrowth', value: 0.2 }
    ],
    unlocks: ['hospital']
  },
  {
    id: 'steelFrame',
    name: '钢结构建筑',
    description: '钢结构建筑技术,建造高楼',
    icon: 'mdi:office-building',
    era: Era.INDUSTRIAL,
    category: 'production',
    researchCost: { steel: 700, knowledge: 350, gold: 400 },
    researchTime: 90,
    prerequisites: ['steelProduction', 'engineering'],
    effects: [],
    unlocks: ['skyscraper']
  },
  {
    id: 'steamPower',
    name: '蒸汽动力',
    description: '发明蒸汽机,大幅提升生产效率',
    icon: 'game-icons:steam',
    era: Era.INDUSTRIAL,
    category: 'production',
    researchCost: { steel: 300, coal: 500, knowledge: 250 },
    researchTime: 70,
    prerequisites: ['steelProduction'],
    effects: [
      { type: 'resourceMultiplier', target: 'steel', value: 0.2 },
      { type: 'buildSpeedBonus', value: 0.15 }
    ],
    unlocks: ['power_plant']
  },
  {
    id: 'chemistry',
    name: '化学',
    description: '发展化学科学,解锁化工产业',
    icon: 'game-icons:round-bottom-flask',
    era: Era.INDUSTRIAL,
    category: 'production',
    researchCost: { knowledge: 300, coal: 200 },
    researchTime: 65,
    prerequisites: ['mathematics', 'steelProduction'],
    effects: [],
    unlocks: ['chemicalPlant']
  },
  {
    id: 'electricity',
    name: '电力学',
    description: '掌握电力技术,解锁电力资源',
    icon: 'mdi:lightning-bolt',
    era: Era.INDUSTRIAL,
    category: 'production',
    researchCost: { steel: 400, knowledge: 350 },
    researchTime: 75,
    prerequisites: ['steamPower', 'chemistry'],
    effects: [
      { type: 'resourceMultiplier', target: 'electricity', value: 1.3 }
    ],
    unlocks: ['electricGrid']
  },
  {
    id: 'massProduction',
    name: '大规模生产',
    description: '建立流水线生产,提升所有资源产出',
    icon: 'game-icons:conveyor-belt',
    era: Era.INDUSTRIAL,
    category: 'production',
    researchCost: { steel: 500, electricity: 300, knowledge: 400 },
    researchTime: 80,
    prerequisites: ['electricity', 'steamPower'],
    effects: [
      { type: 'resourceMultiplier', target: 'steel', value: 1.2 },
      { type: 'resourceMultiplier', target: 'coal', value: 1.2 },
      { type: 'buildSpeedBonus', value: 1.5 }
    ],
    unlocks: []
  },

  // ========== 信息时代科技 (12个) ==========
  {
    id: 'computer',
    name: '计算机技术',
    description: '发明计算机,进入信息时代',
    icon: 'mdi:desktop-classic',
    era: Era.INFORMATION,
    category: 'production',
    researchCost: { electricity: 600, steel: 500, knowledge: 500 },
    researchTime: 90,
    prerequisites: ['electricity', 'massProduction'],
    effects: [
      { type: 'researchSpeedBonus', value: 0.2 }
    ],
    unlocks: ['computer_center']
  },
  {
    id: 'semiconductor',
    name: '半导体技术',
    description: '掌握半导体制造,生产芯片',
    icon: 'mdi:chip',
    era: Era.INFORMATION,
    category: 'production',
    researchCost: { electricity: 700, steel: 600, knowledge: 600 },
    researchTime: 100,
    prerequisites: ['computer'],
    effects: [
      { type: 'resourceMultiplier', target: 'chip', value: 0.25 }
    ],
    unlocks: ['chip_factory']
  },
  {
    id: 'nuclearFission',
    name: '核裂变',
    description: '掌握核能技术,获得强大能源',
    icon: 'game-icons:nuclear',
    era: Era.INFORMATION,
    category: 'production',
    researchCost: { knowledge: 800, electricity: 600, steel: 700 },
    researchTime: 120,
    prerequisites: ['scientificMethod', 'electricity'],
    effects: [
      { type: 'resourceMultiplier', target: 'electricity', value: 0.5 }
    ],
    unlocks: ['nuclear_power_plant']
  },
  {
    id: 'quantumMechanics',
    name: '量子力学',
    description: '研究量子现象,大幅提升科研效率',
    icon: 'mdi:atom',
    era: Era.INFORMATION,
    category: 'culture',
    researchCost: { knowledge: 900, data: 400, chip: 300 },
    researchTime: 130,
    prerequisites: ['computer', 'nuclearFission'],
    effects: [
      { type: 'researchSpeedBonus', value: 0.3 }
    ],
    unlocks: ['research_lab']
  },
  {
    id: 'internet',
    name: '互联网',
    description: '建立全球网络,大幅提升数据产出',
    icon: 'mdi:web',
    era: Era.INFORMATION,
    category: 'production',
    researchCost: { data: 500, chip: 300, electricity: 600 },
    researchTime: 110,
    prerequisites: ['computer'],
    effects: [
      { type: 'resourceMultiplier', target: 'data', value: 0.4 }
    ],
    unlocks: ['internet_hub']
  },
  {
    id: 'satellites',
    name: '卫星技术',
    description: '发射人造卫星,增强通讯能力',
    icon: 'mdi:satellite-variant',
    era: Era.INFORMATION,
    category: 'production',
    researchCost: { chip: 400, electricity: 700, knowledge: 600 },
    researchTime: 115,
    prerequisites: ['computer', 'nuclearFission'],
    effects: [
      { type: 'resourceMultiplier', target: 'culture', value: 0.3 }
    ],
    unlocks: ['satellite_station']
  },
  {
    id: 'genetics',
    name: '基因工程',
    description: '破解生命密码,提升人口增长',
    icon: 'mdi:dna',
    era: Era.INFORMATION,
    category: 'culture',
    researchCost: { knowledge: 800, data: 500, chip: 400 },
    researchTime: 125,
    prerequisites: ['quantumMechanics', 'medicine'],
    effects: [
      { type: 'populationGrowth', value: 0.25 }
    ],
    unlocks: ['biotech_lab']
  },
  {
    id: 'cloudComputing',
    name: '云计算',
    description: '分布式计算技术,提升数据处理能力',
    icon: 'mdi:cloud',
    era: Era.INFORMATION,
    category: 'production',
    researchCost: { data: 700, chip: 500, electricity: 800 },
    researchTime: 120,
    prerequisites: ['internet', 'semiconductor'],
    effects: [
      { type: 'resourceMultiplier', target: 'data', value: 0.35 }
    ],
    unlocks: ['data_center']
  },
  {
    id: 'artificialIntelligence',
    name: '人工智能',
    description: '发展AI技术,极大提升研究效率',
    icon: 'mdi:robot',
    era: Era.INFORMATION,
    category: 'culture',
    researchCost: { data: 1000, chip: 800, knowledge: 900 },
    researchTime: 140,
    prerequisites: ['internet', 'quantumMechanics'],
    effects: [
      { type: 'researchSpeedBonus', value: 0.4 },
      { type: 'resourceMultiplier', target: 'knowledge', value: 0.3 }
    ],
    unlocks: ['ai_research_center']
  },
  {
    id: 'smartTechnology',
    name: '智能技术',
    description: '智能化城市管理系统',
    icon: 'mdi:home-automation',
    era: Era.INFORMATION,
    category: 'production',
    researchCost: { chip: 700, data: 600, electricity: 900 },
    researchTime: 135,
    prerequisites: ['artificialIntelligence', 'internet'],
    effects: [
      { type: 'buildSpeedBonus', value: 0.25 }
    ],
    unlocks: ['smart_city']
  },
  {
    id: 'renewableEnergy',
    name: '可再生能源',
    description: '清洁能源技术,无污染发电',
    icon: 'mdi:solar-power',
    era: Era.INFORMATION,
    category: 'production',
    researchCost: { knowledge: 700, chip: 400, electricity: 800 },
    researchTime: 115,
    prerequisites: ['nuclearFission', 'computer'],
    effects: [
      { type: 'resourceMultiplier', target: 'electricity', value: 0.3 }
    ],
    unlocks: ['renewable_energy_plant']
  },
  {
    id: 'robotics',
    name: '机器人技术',
    description: '发展机器人,提升建造效率',
    icon: 'game-icons:robot-golem',
    era: Era.INFORMATION,
    category: 'production',
    researchCost: { chip: 600, steel: 600, knowledge: 600 },
    researchTime: 125,
    prerequisites: ['computer', 'semiconductor'],
    effects: [
      { type: 'buildSpeedBonus', value: 0.3 }
    ],
    unlocks: ['digital_warehouse']
  },

  // ========== 太空时代科技 (5个) ==========
  {
    id: 'rocketry',
    name: '火箭技术',
    description: '掌握火箭科技,进入太空时代',
    icon: 'game-icons:rocket',
    era: Era.SPACE,
    category: 'production',
    researchCost: { rocketFuel: 500, alloy: 400, data: 800 },
    researchTime: 120,
    prerequisites: ['artificialIntelligence', 'nanotechnology'],
    effects: [],
    unlocks: ['launchPad', 'fuelRefinery']
  },
  {
    id: 'orbitalStation',
    name: '轨道空间站',
    description: '建立空间站,开始太空资源开采',
    icon: 'game-icons:space-station',
    era: Era.SPACE,
    category: 'production',
    researchCost: { alloy: 800, rocketFuel: 600, data: 1000 },
    researchTime: 130,
    prerequisites: ['rocketry'],
    effects: [
      { type: 'resourceMultiplier', target: 'helium3', value: 1.5 }
    ],
    unlocks: ['spaceStation', 'helium3Extractor']
  },
  {
    id: 'fusionPower',
    name: '核聚变能源',
    description: '掌握核聚变,获得无限能源',
    icon: 'game-icons:nuclear',
    era: Era.SPACE,
    category: 'production',
    researchCost: { helium3: 500, alloy: 600, knowledge: 1000 },
    researchTime: 140,
    prerequisites: ['orbitalStation'],
    effects: [
      { type: 'resourceMultiplier', target: 'electricity', value: 3.0 }
    ],
    unlocks: ['fusionReactor']
  },
  {
    id: 'asteroidMining',
    name: '小行星采矿',
    description: '开采小行星资源,获得稀有矿产',
    icon: 'game-icons:asteroid',
    era: Era.SPACE,
    category: 'production',
    researchCost: { titaniumOre: 400, rocketFuel: 800, data: 700 },
    researchTime: 135,
    prerequisites: ['orbitalStation'],
    effects: [
      { type: 'resourceMultiplier', target: 'titaniumOre', value: 2.0 }
    ],
    unlocks: ['asteroidBase']
  },
  {
    id: 'terraforming',
    name: '星球改造',
    description: '改造其他星球,扩展生存空间',
    icon: 'game-icons:planet-conquest',
    era: Era.SPACE,
    category: 'production',
    researchCost: { alloy: 1000, helium3: 800, data: 1200 },
    researchTime: 150,
    prerequisites: ['fusionPower', 'asteroidMining'],
    effects: [
      { type: 'populationGrowth', value: 2.0 }
    ],
    unlocks: ['terraformingStation']
  },

  // 新增太空时代科技 (扩充到9个)
  {
    id: 'lunarMining',
    name: '月球采矿',
    description: '在月球开采氦-3',
    icon: 'game-icons:moon',
    era: Era.SPACE,
    category: 'production',
    researchCost: { alloy: 700, chip: 900, knowledge: 1000 },
    researchTime: 170,
    prerequisites: ['orbitalStation'],
    effects: [],
    unlocks: ['helium3_extractor']
  },
  {
    id: 'advancedMaterials',
    name: '高级材料',
    description: '研发新型合金材料',
    icon: 'game-icons:metal-bar',
    era: Era.SPACE,
    category: 'production',
    researchCost: { steel: 1000, chip: 800, knowledge: 1000 },
    researchTime: 165,
    prerequisites: ['rocketry'],
    effects: [
      { type: 'resourceMultiplier', target: 'alloy', value: 0.3 }
    ],
    unlocks: ['alloy_foundry']
  },
  {
    id: 'quantumComputing',
    name: '量子计算',
    description: '量子计算机技术',
    icon: 'game-icons:atom-core',
    era: Era.SPACE,
    category: 'production',
    researchCost: { chip: 1200, data: 1500, knowledge: 1400 },
    researchTime: 190,
    prerequisites: ['quantumMechanics', 'orbitalStation'],
    effects: [
      { type: 'researchSpeedBonus', value: 0.4 }
    ],
    unlocks: ['quantum_lab']
  },
  {
    id: 'spaceElevator',
    name: '太空电梯',
    description: '地球到轨道的高效运输',
    icon: 'game-icons:tower',
    era: Era.SPACE,
    category: 'production',
    researchCost: { alloy: 1500, chip: 1000, knowledge: 1200 },
    researchTime: 220,
    prerequisites: ['advancedMaterials', 'orbitalStation'],
    effects: [
      { type: 'buildSpeedBonus', value: 0.25 }
    ],
    unlocks: ['space_elevator']
  },
  {
    id: 'zeroGravityManufacturing',
    name: '零重力制造',
    description: '在太空中生产高精度产品',
    icon: 'game-icons:orbital',
    era: Era.SPACE,
    category: 'production',
    researchCost: { alloy: 1100, chip: 1300, knowledge: 1250 },
    researchTime: 185,
    prerequisites: ['orbitalStation', 'advancedMaterials'],
    effects: [
      { type: 'resourceMultiplier', target: 'chip', value: 0.3 }
    ],
    unlocks: ['orbital_factory']
  },
  {
    id: 'solarPower',
    name: '轨道太阳能',
    description: '在太空中收集太阳能',
    icon: 'game-icons:solar-power',
    era: Era.SPACE,
    category: 'production',
    researchCost: { alloy: 900, chip: 800, knowledge: 1000 },
    researchTime: 170,
    prerequisites: ['orbitalStation', 'renewableEnergy'],
    effects: [
      { type: 'resourceMultiplier', target: 'electricity', value: 0.4 }
    ],
    unlocks: ['solar_array']
  },
  {
    id: 'spaceHabitation',
    name: '太空居住',
    description: '在太空中建造居住区',
    icon: 'game-icons:space-capsule',
    era: Era.SPACE,
    category: 'production',
    researchCost: { alloy: 1000, chip: 900, knowledge: 1100 },
    researchTime: 175,
    prerequisites: ['orbitalStation'],
    effects: [],
    unlocks: ['space_habitat']
  },
  {
    id: 'marsColonization',
    name: '火星殖民',
    description: '在火星建立永久殖民地',
    icon: 'game-icons:mars-pathfinder',
    era: Era.SPACE,
    category: 'production',
    researchCost: { alloy: 1500, helium3: 400, knowledge: 1400 },
    researchTime: 210,
    prerequisites: ['terraforming', 'spaceHabitation'],
    effects: [
      { type: 'populationGrowth', value: 0.4 }
    ],
    unlocks: ['mars_colony']
  },
  {
    id: 'deepSpaceExploration',
    name: '深空探索',
    description: '探索太阳系外的星系',
    icon: 'game-icons:space-shuttle',
    era: Era.SPACE,
    category: 'production',
    researchCost: { alloy: 1600, helium3: 600, knowledge: 1500 },
    researchTime: 230,
    prerequisites: ['fusionPower', 'quantumComputing'],
    effects: [
      { type: 'researchSpeedBonus', value: 0.3 }
    ],
    unlocks: []
  }
]

/**
 * 根据ID获取科技配置
 */
export function getTechnology(id: string): Technology | undefined {
  return technologies.find(tech => tech.id === id)
}

/**
 * 根据时代获取科技列表
 */
export function getTechnologiesByEra(era: Era): Technology[] {
  return technologies.filter(tech => tech.era === era)
}

/**
 * 获取科技的所有前置科技(递归)
 */
export function getAllPrerequisites(techId: string): string[] {
  const tech = getTechnology(techId)
  if (!tech) return []
  
  const prerequisites = new Set<string>()
  
  function addPrerequisites(id: string) {
    const currentTech = getTechnology(id)
    if (!currentTech) return
    
    currentTech.prerequisites.forEach(prereq => {
      if (!prerequisites.has(prereq)) {
        prerequisites.add(prereq)
        addPrerequisites(prereq)
      }
    })
  }
  
  addPrerequisites(techId)
  return Array.from(prerequisites)
}
