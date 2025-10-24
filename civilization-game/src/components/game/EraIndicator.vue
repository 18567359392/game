<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGameStore } from '@/stores/game'
import { useTechStore } from '@/stores/tech'
import { Era } from '@/types'

const gameStore = useGameStore()
const techStore = useTechStore()

const eraInfo = computed(() => {
  const info: Record<Era, { name: string; icon: string; color: string; description: string }> = {
    [Era.STONE]: {
      name: '石器时代',
      icon: 'game-icons:stone-axe',
      color: 'bg-gray-600',
      description: '使用石制工具的原始时代'
    },
    [Era.BRONZE]: {
      name: '青铜时代',
      icon: 'game-icons:metal-bar',
      color: 'bg-amber-600',
      description: '掌握金属冶炼的文明黎明'
    },
    [Era.IRON]: {
      name: '铁器时代',
      icon: 'game-icons:anvil',
      color: 'bg-slate-600',
      description: '铁器的使用带来生产力飞跃'
    },
    [Era.INDUSTRIAL]: {
      name: '工业时代',
      icon: 'game-icons:factory',
      color: 'bg-orange-600',
      description: '蒸汽与机械的革命时代'
    },
    [Era.INFORMATION]: {
      name: '信息时代',
      icon: 'mdi:desktop-classic',
      color: 'bg-blue-600',
      description: '数字化与网络化的现代社会'
    },
    [Era.SPACE]: {
      name: '太空时代',
      icon: 'game-icons:rocket',
      color: 'bg-purple-600',
      description: '探索星辰大海的征途'
    },
    [Era.INTERSTELLAR]: {
      name: '星际时代',
      icon: 'game-icons:space-station',
      color: 'bg-indigo-600',
      description: '跨越星系的宇宙文明'
    },
    [Era.HYPERDIMENSIONAL]: {
      name: '超维时代',
      icon: 'game-icons:wormhole',
      color: 'bg-pink-600',
      description: '超越维度的终极文明'
    }
  }
  return info[gameStore.currentEra]
})

const canAdvance = computed(() => {
  const result = gameStore.canAdvanceEra()
  return result.can
})

const nextEraInfo = computed(() => {
  const result = gameStore.canAdvanceEra()
  if (!result.can || !result.nextEra) return null
  
  const info: Record<Era, { name: string; icon: string }> = {
    [Era.STONE]: { name: '石器时代', icon: 'game-icons:stone-axe' },
    [Era.BRONZE]: { name: '青铜时代', icon: 'game-icons:metal-bar' },
    [Era.IRON]: { name: '铁器时代', icon: 'game-icons:anvil' },
    [Era.INDUSTRIAL]: { name: '工业时代', icon: 'game-icons:factory' },
    [Era.INFORMATION]: { name: '信息时代', icon: 'mdi:desktop-classic' },
    [Era.SPACE]: { name: '太空时代', icon: 'game-icons:rocket' },
    [Era.INTERSTELLAR]: { name: '星际时代', icon: 'game-icons:space-station' },
    [Era.HYPERDIMENSIONAL]: { name: '超维时代', icon: 'game-icons:wormhole' }
  }
  return info[result.nextEra]
})

function handleAdvanceEra() {
  if (gameStore.advanceEra()) {
    // 成功进入新时代
    console.log('进入新时代!')
  }
}
</script>

<template>
  <div class="era-indicator">
    <!-- 当前时代显示 -->
    <div class="current-era" :class="eraInfo.color">
      <Icon :icon="eraInfo.icon" width="32" height="32" class="text-white" />
      <div class="era-info">
        <h3 class="text-lg font-bold text-white">{{ eraInfo.name }}</h3>
        <p class="text-sm text-white/80">{{ eraInfo.description }}</p>
      </div>
    </div>

    <!-- 进阶按钮 -->
    <div v-if="canAdvance && nextEraInfo" class="advance-era">
      <button
        class="advance-button"
        @click="handleAdvanceEra"
      >
        <Icon icon="mdi:arrow-right-bold" width="20" height="20" />
        <span>进入{{ nextEraInfo.name }}</span>
        <Icon :icon="nextEraInfo.icon" width="20" height="20" />
      </button>
    </div>

    <!-- 时代进度 -->
    <div class="era-progress">
      <div class="progress-item">
        <Icon icon="mdi:flask" width="16" height="16" />
        <span class="text-sm">科技: {{ techStore.researchedTechs.length }}</span>
      </div>
      <div class="progress-item">
        <Icon icon="game-icons:people" width="16" height="16" />
        <span class="text-sm">人口: {{ Math.floor(gameStore.population.current) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.era-indicator {
  @apply flex flex-col gap-2 md:gap-3 p-3 md:p-4 bg-gray-900/80 backdrop-blur-sm rounded-lg border border-gray-700;
}

.current-era {
  @apply flex items-center gap-2 md:gap-3 p-2 md:p-3 rounded-lg;
}

.era-info {
  @apply flex flex-col;
}

.era-info h3 {
  @apply text-base md:text-lg;
}

.era-info p {
  @apply text-xs md:text-sm;
}

.advance-era {
  @apply flex justify-center;
}

.advance-button {
  @apply flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg;
  @apply bg-gradient-to-r from-blue-600 to-purple-600;
  @apply text-sm md:text-base text-white font-semibold;
  @apply hover:from-blue-700 hover:to-purple-700;
  @apply transition-all duration-300;
  @apply shadow-lg hover:shadow-xl;
  @apply animate-pulse;
}

.era-progress {
  @apply flex items-center gap-3 md:gap-4 text-gray-300 text-xs md:text-sm;
}

.progress-item {
  @apply flex items-center gap-1;
}
</style>
