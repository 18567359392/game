# 文明发展模拟游戏 🌍

一款纯前端实现的增量建造类文明发展模拟游戏，从石器时代发展到超维时代，体验人类文明的完整演进历程。

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Vue](https://img.shields.io/badge/Vue-3.5-brightgreen.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)

---

## 🎮 游戏介绍

**文明发展模拟游戏**是一款采用Vue3 + TypeScript开发的纯前端增量建造类游戏。玩家将从原始的石器时代开始，通过建造建筑、研究科技、发展人口，逐步推进文明演进，最终到达超越维度的超维时代。

### 核心特色

- 🏗️ **丰富建筑系统** - 86个独特建筑，覆盖8个文明时代
- 🔬 **完整科技树** - 55+个科技，逐步解锁高级功能
- 🏆 **成就系统** - 50个成就等待解锁，每个都有独特奖励
- ⏱️ **离线收益** - 离线时也能积累资源（最多8小时）
- 📱 **移动端适配** - 完美支持手机、平板、桌面多端体验
- 💾 **智能存档** - 自动保存+压缩，存档体积减少50%
- ⚡ **高性能** - 60fps流畅运行，实时FPS监控

---

## 🎯 游戏玩法

### 发展路线

**石器时代 → 青铜时代 → 铁器时代 → 工业时代 → 信息时代 → 太空时代 → 星际时代 → 超维时代**

### 基础玩法

1. **采集资源** - 建造生产建筑获取食物、木材、石头等基础资源
2. **发展人口** - 建造人口建筑提升人口上限，人口会消耗食物但提供劳动力
3. **研究科技** - 使用知识点研究科技，解锁新建筑和提升效率
4. **建造建筑** - 消耗资源建造和升级建筑，提升资源产出
5. **时代演进** - 满足条件后进入下一个时代，解锁更强大的建筑和科技
6. **解锁成就** - 完成特定条件解锁成就，获得永久加成

### 资源系统

游戏包含20+种资源，分为多个类别：

**基础资源**
- 食物、木材、石头、铁矿、铜矿、金矿

**高级资源**
- 煤炭、石油、合金、芯片、数据

**特殊资源**
- 知识、人口、反物质、暗物质、时空晶体

**资源链示例**：煤炭 → 电力 → 芯片 → 数据 → 人工智能

### 时代系统

每个时代都有独特的建筑、科技和资源：

| 时代 | 建筑数 | 代表建筑 | 关键资源 |
|------|--------|---------|---------|
| 石器时代 | 5个 | 采集站、营地 | 食物、木材 |
| 青铜时代 | 7个 | 农田、铜矿场 | 铜矿、食物 |
| 铁器时代 | 8个 | 铁矿场、仓库 | 铁矿、合金 |
| 工业时代 | 12个 | 工厂、发电厂 | 煤炭、电力 |
| 信息时代 | 12个 | 计算机中心、芯片工厂 | 芯片、数据 |
| 太空时代 | 14个 | 发射台、轨道空间站 | 火箭燃料 |
| 星际时代 | 14个 | 曲速引擎工厂、戴森球 | 反物质 |
| 超维时代 | 14个 | 量子门、宇宙熔炉 | 时空晶体 |

### 成就系统

成就分为6大类别：
- **进度成就** - 完成时代演进、建造特定数量建筑
- **资源成就** - 积累特定数量资源
- **建筑成就** - 建造特定建筑组合
- **科技成就** - 研究特定科技
- **人口成就** - 达到特定人口数量
- **特殊成就** - 完成独特条件

每个成就都提供**资源奖励**和**永久效果**（如资源产出+15%）

---

## ⏱️ 游戏时长

### 完整通关时间

- **休闲玩法**：约 **20-30 小时**
- **速通玩法**：约 **10-15 小时**
- **收集全成就**：约 **40-50 小时**

### 各时代预计时长

| 时代 | 休闲模式 | 速通模式 |
|------|---------|---------|
| 石器时代 | 30分钟 | 15分钟 |
| 青铜时代 | 1小时 | 30分钟 |
| 铁器时代 | 2小时 | 1小时 |
| 工业时代 | 3小时 | 1.5小时 |
| 信息时代 | 4小时 | 2小时 |
| 太空时代 | 5小时 | 3小时 |
| 星际时代 | 6小时 | 3.5小时 |
| 超维时代 | 8小时 | 4小时 |

**注意**：利用离线收益系统，每天上线几次即可稳定推进

---

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- npm >= 9.0.0

### 安装运行

```bash
# 克隆项目
git clone https://github.com/18567359392/game.git
cd game/civilization-game

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 **http://localhost:5173/** 开始游戏！

### 构建部署

```bash
# 生产构建
npm run build

# 预览构建结果
npm run preview
```

---

## 💻 技术栈

### 核心框架

- **Vue 3.5** - 渐进式JavaScript框架，Composition API
- **TypeScript 5.6** - 类型安全的JavaScript超集
- **Vite** - 新一代前端构建工具
- **Pinia** - Vue官方状态管理库

### UI & 样式

- **UnoCSS** - 即时按需的原子化CSS引擎
- **Iconify Vue** - 统一的图标框架
- **手动封装组件** - 无第三方UI库，完全自定义

### 工具库

- **VueUse** - Vue组合式API工具集
- **Day.js** - 轻量级时间处理库

---

## 📁 项目结构

```
civilization-game/
├── src/
│   ├── components/          # 组件目录
│   │   ├── ui/              # UI基础组件 (4个)
│   │   │   ├── GameButton.vue      # 游戏按钮
│   │   │   ├── GameCard.vue        # 卡片容器
│   │   │   ├── ProgressBar.vue     # 进度条
│   │   │   └── ResourceItem.vue    # 资源项
│   │   └── game/            # 游戏业务组件 (12个)
│   │       ├── MainLayout.vue      # 主布局
│   │       ├── BuildingPanel.vue   # 建筑面板
│   │       ├── BuildingCard.vue    # 建筑卡片
│   │       ├── ResourcePanel.vue   # 资源面板
│   │       ├── TechTree.vue        # 科技树
│   │       ├── TechNode.vue        # 科技节点
│   │       ├── AchievementPanel.vue      # 成就面板
│   │       ├── AchievementNotification.vue # 成就通知
│   │       ├── EraIndicator.vue    # 时代指示器
│   │       ├── EraTransition.vue   # 时代切换动画
│   │       ├── OfflineModal.vue    # 离线收益弹窗
│   │       └── SettingsModal.vue   # 设置弹窗
│   ├── stores/              # Pinia状态管理 (6个)
│   │   ├── game.ts          # 游戏核心状态
│   │   ├── resource.ts      # 资源管理
│   │   ├── building.ts      # 建筑管理
│   │   ├── tech.ts          # 科技管理
│   │   ├── achievement.ts   # 成就管理
│   │   └── save.ts          # 存档管理
│   ├── config/              # 游戏配置 (5个)
│   │   ├── resources.ts     # 资源配置
│   │   ├── buildings.ts     # 建筑配置 (86个)
│   │   ├── technologies.ts  # 科技配置 (55+个)
│   │   ├── achievements.ts  # 成就配置 (50个)
│   │   └── constants.ts     # 常量配置
│   ├── types/               # TypeScript类型定义
│   │   └── index.ts         # 主类型文件
│   ├── utils/               # 工具函数
│   │   └── formatNumber.ts  # 大数字格式化
│   ├── composables/         # 组合式函数
│   │   └── useGameEngine.ts # 游戏引擎
│   ├── App.vue              # 根组件
│   └── main.ts              # 入口文件
├── public/                  # 静态资源
├── index.html               # HTML模板
├── vite.config.ts           # Vite配置
├── uno.config.ts            # UnoCSS配置
├── tsconfig.json            # TypeScript配置
├── package.json             # 项目配置
└── README.md                # 项目文档
```

---

## 🎨 核心系统文档

### 1. 游戏引擎系统

**文件**：`src/composables/useGameEngine.ts`

游戏引擎采用 `requestAnimationFrame` 实现60fps的游戏循环：

```typescript
// 核心循环逻辑
function gameLoop(currentTime: number) {
  // 计算时间差
  const deltaTime = currentTime - lastUpdateTime
  accumulator += deltaTime
  
  // FPS监控
  frameCount++
  if (currentTime - fpsLastTime >= 1000) {
    currentFPS = frameCount // 计算当前FPS
    frameCount = 0
  }
  
  // 固定时间步长更新（每1秒）
  while (accumulator >= GAME_TICK_INTERVAL) {
    updateGame(1) // 更新游戏逻辑
    accumulator -= GAME_TICK_INTERVAL
  }
  
  animationFrameId = requestAnimationFrame(gameLoop)
}
```

**更新内容**：
- 资源生产和消耗
- 人口增长和食物消耗
- 建筑建造进度
- 科技研究进度
- 成就检测（每10秒）

**性能优化**：
- FPS监控和警告（<50fps时触发）
- 帧跳过保护（最多积累3秒）
- 成就检测降频（从每帧→每10秒）

### 2. 资源管理系统

**文件**：`src/stores/resource.ts`

**核心功能**：
- 资源产出计算（考虑建筑加成）
- 资源消耗管理（建筑消耗+人口消耗）
- 资源上限控制
- 净产出计算（产出-消耗）

**复杂资源链示例**：
```typescript
// 电力生产链
煤炭 (发电厂) → 电力 (芯片工厂) → 芯片 (数据中心) → 数据
```

**资源不足处理**：
- 优雅降级：只消耗现有资源
- 避免负数：资源归零而非变负
- 建筑停产：资源不足时建筑停止生产

### 3. 建筑系统

**文件**：`src/stores/building.ts`

**建筑状态**：
- `building` - 建造中
- `upgrading` - 升级中
- `built` - 已建造

**建筑类型**：
```typescript
enum BuildingType {
  PRODUCTION = 'production',    // 生产类
  STORAGE = 'storage',          // 存储类
  POPULATION = 'population',    // 人口类
  RESEARCH = 'research',        // 研究类
  FUNCTIONAL = 'functional',    // 功能类
  SPECIAL = 'special'           // 特殊类
}
```

**升级机制**：
- 升级成本 = 基础成本 × 倍数^当前等级
- 升级时间 = 基础时间 × 倍数^(当前等级-1)
- 产出增长 = 基础产出 × 当前等级

### 4. 科技树系统

**文件**：`src/stores/tech.ts`

**科技效果类型**：
- `resourceMultiplier` - 资源产出倍率
- `buildingCostReduction` - 建筑成本减免
- `researchSpeedBoost` - 研究速度加成
- `unlockBuilding` - 解锁建筑
- `unlockResource` - 解锁资源

**科技树结构**：
- 树状依赖关系（前置科技）
- 分时代解锁
- 永久效果加成

### 5. 时代演进系统

**文件**：`src/stores/game.ts`

**进阶条件**：
- 研究对应时代的关键科技
- 达到一定人口数量
- 建造特定建筑

**时代效果**：
- 解锁新建筑
- 解锁新科技
- 解锁新资源
- 播放过场动画

**时代切换动画**：
- 全屏遮罩
- 时代图标展示
- 时代名称和描述
- 光效特效
- 3秒自动关闭

### 6. 人口系统

**文件**：`src/stores/game.ts`

**人口机制**：
```typescript
interface Population {
  current: number      // 当前人口
  max: number          // 人口上限
  growthRate: number   // 增长率（每秒）
}
```

**人口增长**：
- 食物充足：人口增长
- 食物不足：人口减少
- 人口上限：由建筑提供

**食物消耗**：
- 每人口消耗 0.5 食物/秒
- 食物不足时人口减半速率减少

### 7. 离线收益系统

**文件**：`src/stores/save.ts` + `src/components/game/OfflineModal.vue`

**离线计算**：
```typescript
// 最多计算8小时离线收益
const maxOfflineTime = 8 * 60 * 60
const actualTime = Math.min(offlineTime, maxOfflineTime)

// 计算净产出
const netRate = productionRate - consumptionRate
const offlineGain = netRate * actualTime
```

**防作弊机制**：
- 8小时上限
- 只计算净产出为正的资源
- 不考虑资源上限

### 8. 成就系统

**文件**：`src/stores/achievement.ts`

**成就检测**：
- 每10秒检测一次（性能优化）
- 自动解锁符合条件的成就
- 弹窗通知+音效提示

**成就奖励**：
- 即时资源奖励
- 永久效果加成（如资源产出+15%）

### 9. 存档系统

**文件**：`src/stores/save.ts`

**自动保存**：
- 每1分钟自动保存
- 页面关闭时保存
- 存储到 LocalStorage

**存档压缩**：
```typescript
// 字段名缩短
version → v
createdAt → c
resources → r
// ...

// 数据优化
- 过滤极小值（<0.01）
- 保留1位小数
- 移除默认值
```

**压缩效果**：
- 压缩率：40-60%
- 典型存档：2000B → 800B

**版本兼容**：
- 自动检测压缩/未压缩格式
- 版本迁移机制

### 10. 大数字格式化

**文件**：`src/utils/formatNumber.ts`

**格式化策略**：
```typescript
// 小于1000：直接显示
123 → "123"

// 1000-1M：K后缀
1,234 → "1.23K"

// 1M-1B：M后缀
1,234,567 → "1.23M"

// 超大数字：科学计数法
1.23e+100 → "1.23e+100"
```

**支持后缀**：K, M, B, T, Qa, Qi, Sx, Sp, Oc, No, Dc

---

## 🎯 性能指标

### 运行性能

- ✅ **帧率**：稳定60fps
- ✅ **首屏加载**：< 1秒
- ✅ **资源更新**：1秒/次
- ✅ **内存占用**：< 200MB
- ✅ **CPU占用**：< 5%

### 构建性能

- ✅ **构建时间**：~3秒
- ✅ **包体积**：gzip后 < 500KB
- ✅ **代码分割**：Vue/Pinia/Iconify独立打包
- ✅ **Tree-shaking**：移除未使用代码

### 优化措施

1. **游戏循环优化**
   - 固定时间步长更新
   - FPS监控和预警
   - 帧跳过保护

2. **成就检测优化**
   - 从每帧检测改为每10秒
   - 减少80%计算量

3. **存档压缩**
   - 字段名缩短
   - 数据精度优化
   - 压缩率40-60%

4. **代码分割**
   - Vue核心+Pinia独立打包
   - Iconify图标库独立
   - 按需加载

5. **构建优化**
   - Terser压缩
   - 移除console
   - 依赖预优化

---

## 📱 移动端适配

### 响应式设计

**断点设置**：
- 小屏幕（< 640px）：手机
- 中等屏幕（640px - 768px）：平板竖屏
- 大屏幕（> 768px）：平板横屏/桌面

**适配策略**：
- 手机：单列布局 + 底部导航
- 平板：双列布局 + 侧边栏
- 桌面：三列布局 + 完整菜单

### 移动端特性

- ✅ viewport配置
- ✅ 禁用双击缩放
- ✅ 触摸优化
- ✅ 底部导航栏
- ✅ 汉堡菜单
- ✅ 滑动抽屉
- ✅ 响应式字体
- ✅ 自适应图标

---

## 🔧 开发指南

### 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 类型检查
npm run type-check

# 生产构建
npm run build

# 预览构建
npm run preview
```

### 代码规范

- **TypeScript**：严格模式
- **Vue**：Composition API + `<script setup>`
- **CSS**：UnoCSS原子类
- **命名**：camelCase(变量/函数), PascalCase(组件/类型)

### 添加新建筑

1. 在 `src/config/buildings.ts` 添加配置
2. 设置建筑属性（名称、成本、产出等）
3. 配置前置条件（科技/时代要求）
4. 设置升级倍数和最大等级

```typescript
{
  id: 'new_building',
  name: '新建筑',
  description: '描述',
  icon: 'game-icons:icon-name',
  type: BuildingType.PRODUCTION,
  era: Era.STONE,
  level: 1,
  maxLevel: 10,
  buildCost: { wood: 100, stone: 50 },
  upgradeCostMultiplier: 2.0,
  buildTime: 60,
  upgradeTime: 120,
  production: { food: 5 },
  consumption: { wood: 1 },
  requirements: [
    { type: 'technology', id: 'agriculture' }
  ]
}
```

### 添加新科技

1. 在 `src/config/technologies.ts` 添加配置
2. 设置科技效果
3. 配置前置科技

```typescript
{
  id: 'new_tech',
  name: '新科技',
  description: '描述',
  icon: 'mdi:flask',
  era: Era.BRONZE,
  cost: { knowledge: 500 },
  researchTime: 300,
  effects: [
    {
      type: 'resourceMultiplier',
      target: 'food',
      value: 1.2
    }
  ],
  prerequisites: ['previous_tech']
}
```

### 添加新成就

1. 在 `src/config/achievements.ts` 添加配置
2. 设置解锁条件
3. 配置奖励和永久效果

```typescript
{
  id: 'new_achievement',
  name: '成就名称',
  description: '描述',
  icon: 'mdi:trophy',
  category: 'progress',
  condition: {
    type: 'building',
    target: 'farm',
    value: 10
  },
  reward: { gold: 1000 },
  permanentEffect: {
    type: 'resourceMultiplier',
    target: 'food',
    value: 1.1
  }
}
```

---

## 📄 API文档

### Store API

#### GameStore

```typescript
// 状态
currentEra: Era              // 当前时代
gameTime: number             // 游戏时间（秒）
population: Population       // 人口信息
isPaused: boolean            // 是否暂停

// 方法
startGame(): void            // 开始游戏
pauseGame(): void            // 暂停游戏
advanceEra(): boolean        // 进入下一时代
updatePopulationGrowth(dt: number): void  // 更新人口
```

#### ResourceStore

```typescript
// 状态
resourceAmounts: ResourceAmount          // 资源数量
productionRates: ResourceAmount          // 生产速率
consumptionRates: ResourceAmount         // 消耗速率

// 方法
getResourceAmount(id: ResourceType): number
addResource(id: ResourceType, amount: number): void
consumeResource(id: ResourceType, amount: number): boolean
updateResources(deltaTime: number): void
```

#### BuildingStore

```typescript
// 状态
buildingInstances: BuildingInstance[]    // 建筑实例

// 方法
canBuild(buildingId: string): CanBuildResult
buildBuilding(buildingId: string): boolean
upgradeBuilding(buildingId: string): boolean
calculateProduction(buildingId: string): ResourceAmount
updateBuildingProgress(): void
```

#### TechStore

```typescript
// 状态
researchedTechs: string[]               // 已研究科技
currentResearch: string | null          // 当前研究
researchProgress: number                // 研究进度

// 方法
canResearch(techId: string): boolean
startResearch(techId: string): boolean
updateResearchProgress(): void
applyTechEffects(techId: string): void
```

#### AchievementStore

```typescript
// 状态
achievementProgress: {
  total: number
  unlocked: number
  percentage: number
}

// 方法
checkAchievements(): void
unlockAchievement(id: string): void
getAchievementInstance(id: string): AchievementInstance
```

#### SaveStore

```typescript
// 方法
saveGame(): boolean           // 保存游戏
loadGame(): boolean           // 加载游戏
exportSave(): string          // 导出存档
importSave(data: string): boolean  // 导入存档
newGame(): void               // 新游戏
```

---

## 🎨 UI组件文档

### 基础组件

#### GameButton

通用游戏按钮组件

```vue
<GameButton
  variant="primary"    // primary | secondary
  size="md"            // sm | md | lg
  :disabled="false"
  @click="handleClick"
>
  按钮文本
</GameButton>
```

#### GameCard

卡片容器组件

```vue
<GameCard :hoverable="true">
  <template #header>卡片标题</template>
  卡片内容
  <template #footer>卡片底部</template>
</GameCard>
```

#### ProgressBar

进度条组件

```vue
<ProgressBar
  :percentage="75"
  :estimated-time="120"
  :show-time="true"
  label="进度中"
  color="blue"
/>
```

#### ResourceItem

资源项显示组件

```vue
<ResourceItem
  name="食物"
  icon="game-icons:wheat"
  :amount="1000"
  :limit="5000"
  :change="10"
  :show-limit="true"
  :show-progress-bar="true"
/>
```

---

## 🚧 未来计划

### 功能扩展

- [ ] 多存档槽位支持
- [ ] 云存档同步
- [ ] 统计数据面板
- [ ] 更多成就和时代
- [ ] 建筑皮肤系统
- [ ] 音效和背景音乐

### 技术优化

- [ ] Service Worker（PWA）
- [ ] IndexedDB替代LocalStorage
- [ ] WebWorker后台计算
- [ ] 国际化支持（i18n）
- [ ] 暗色模式完善

---

## 📜 更新日志

### v1.0.0 (2024-12-20)

**完整功能发布**

- ✅ 8个文明时代完整实现
- ✅ 86个建筑+55+个科技
- ✅ 50个成就系统
- ✅ 离线收益系统
- ✅ 移动端完美适配
- ✅ 存档压缩优化
- ✅ 60fps性能优化

---

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

### 提交规范

- `feat`: 新功能
- `fix`: 修复bug
- `docs`: 文档更新
- `style`: 代码格式
- `refactor`: 重构
- `perf`: 性能优化
- `test`: 测试相关

---

## 📄 License

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 👨‍💻 作者

开发者：[@18567359392](https://github.com/18567359392)

项目地址：[https://github.com/18567359392/game](https://github.com/18567359392/game)

---

## 🙏 致谢

- [Vue.js](https://vuejs.org/) - 渐进式JavaScript框架
- [Vite](https://vitejs.dev/) - 下一代前端工具链
- [UnoCSS](https://unocss.dev/) - 即时按需原子CSS引擎
- [Iconify](https://iconify.design/) - 统一的图标框架
- [Pinia](https://pinia.vuejs.org/) - Vue状态管理库

---

**Enjoy the game! 🎮✨**
