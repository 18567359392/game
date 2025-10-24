<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTechStore } from '@/stores/tech'
import { useGameStore } from '@/stores/game'
import { getTechnologiesByEra } from '@/config/technologies'
import { Era } from '@/types'
import TechNode from './TechNode.vue'

const techStore = useTechStore()
const gameStore = useGameStore()

// 当前选择的时代
const selectedEra = ref<Era>(gameStore.currentEra)

// 所有可用时代
const eras = [
  { id: Era.STONE, name: '石器时代', icon: 'game-icons:stone-axe' },
  { id: Era.BRONZE, name: '青铜时代', icon: 'game-icons:metal-bar' },
  { id: Era.IRON, name: '铁器时代', icon: 'game-icons:anvil' },
  { id: Era.INDUSTRIAL, name: '工业时代', icon: 'game-icons:factory' },
  { id: Era.INFORMATION, name: '信息时代', icon: 'mdi:desktop-classic' },
  { id: Era.SPACE, name: '太空时代', icon: 'game-icons:rocket' },
  { id: Era.INTERSTELLAR, name: '星际时代', icon: 'game-icons:space-station' },
  { id: Era.HYPERDIMENSIONAL, name: '超维时代', icon: 'game-icons:wormhole' }
]

// 当前时代的科技列表
const currentEraTechs = computed(() => {
  return getTechnologiesByEra(selectedEra.value)
})

// 已研究的科技数量
const researchedCount = computed(() => {
  const allTechs = getTechnologiesByEra(selectedEra.value)
  return allTechs.filter(tech => techStore.isTechResearched(tech.id)).length
})

// 总科技数量
const totalCount = computed(() => {
  return getTechnologiesByEra(selectedEra.value).length
})

// 当前研究
const currentResearch = computed(() => techStore.currentResearch)

// 研究速度倍率
const researchSpeedMultiplier = computed(() => techStore.getResearchSpeedMultiplier())

function selectEra(era: Era) {
  selectedEra.value = era
}
</script>

<template>
  <div class="tech-tree">
    <!-- 标题栏 -->
    <div class="tech-header">
      <div class="flex items-center gap-2">
        <Icon icon="game-icons:tech-tree" width="24" height="24" />
        <h2 class="text-2xl font-bold">科技树</h2>
      </div>
      
      <div class="research-info">
        <div v-if="currentResearch" class="flex items-center gap-2">
          <Icon icon="mdi:flask" width="20" height="20" class="text-blue-500" />
          <span>正在研究科技...</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="mdi:speedometer" width="20" height="20" />
          <span>研究速度: {{ researchSpeedMultiplier.toFixed(2) }}x</span>
        </div>
      </div>
    </div>

    <!-- 时代选择器 -->
    <div class="era-selector">
      <button
        v-for="era in eras"
        :key="era.id"
        class="era-button"
        :class="{ active: selectedEra === era.id }"
        @click="selectEra(era.id)"
      >
        <Icon :icon="era.icon" width="24" height="24" />
        <span>{{ era.name }}</span>
        <span v-if="selectedEra === era.id" class="era-progress">
          ({{ researchedCount }}/{{ totalCount }})
        </span>
      </button>
    </div>

    <!-- 科技节点网格 -->
    <div class="tech-grid">
      <TechNode
        v-for="tech in currentEraTechs"
        :key="tech.id"
        :tech-id="tech.id"
      />
    </div>

    <!-- 空状态 -->
    <div v-if="currentEraTechs.length === 0" class="empty-state">
      <Icon icon="mdi:flask-empty-outline" width="64" height="64" class="text-gray-400" />
      <p class="text-gray-500 mt-4">该时代暂无科技</p>
    </div>
  </div>
</template>

<style scoped>
.tech-tree {
  @apply flex flex-col gap-4 p-4 h-full overflow-auto;
}

.tech-header {
  @apply flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700;
}

.research-info {
  @apply flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400;
}

.era-selector {
  @apply flex flex-wrap gap-2;
}

.era-button {
  @apply flex items-center gap-2 px-4 py-2 rounded-lg;
  @apply bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600;
  @apply border-2 border-transparent transition-all;
}

.era-button.active {
  @apply bg-blue-50 dark:bg-blue-900/30 border-blue-500;
  @apply text-blue-700 dark:text-blue-300 font-semibold;
}

.era-progress {
  @apply text-xs text-gray-500 dark:text-gray-400;
}

.tech-grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4;
}

.empty-state {
  @apply flex flex-col items-center justify-center py-12;
}
</style>
