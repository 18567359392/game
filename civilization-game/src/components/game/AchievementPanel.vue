<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useAchievementStore } from '@/stores/achievement'
import { achievements } from '@/config/achievements'

const achievementStore = useAchievementStore()

const progress = computed(() => achievementStore.achievementProgress)

const categories = [
  { id: 'all', name: '全部', icon: 'mdi:trophy' },
  { id: 'progress', name: '进度', icon: 'mdi:flag' },
  { id: 'resource', name: '资源', icon: 'game-icons:ore' },
  { id: 'building', name: '建筑', icon: 'game-icons:castle' },
  { id: 'technology', name: '科技', icon: 'mdi:flask' },
  { id: 'population', name: '人口', icon: 'game-icons:people' },
  { id: 'special', name: '特殊', icon: 'mdi:star' }
]

const selectedCategory = ref('all')

const filteredAchievements = computed(() => {
  if (selectedCategory.value === 'all') {
    return achievements
  }
  return achievements.filter(a => a.category === selectedCategory.value)
})

function getAchievementInstance(id: string) {
  return achievementStore.getAchievementInstance(id)
}
</script>

<template>
  <div class="achievement-panel">
    <div class="achievement-header">
      <div class="flex items-center gap-2 md:gap-3">
        <Icon icon="mdi:trophy" width="24" height="24" class="md:w-8 md:h-8 text-yellow-500" />
        <div>
          <h2 class="text-xl md:text-2xl font-bold text-white">成就系统</h2>
          <p class="text-xs md:text-sm text-gray-400">
            已解锁 {{ progress.unlocked }} / {{ progress.total }} ({{ progress.percentage.toFixed(1) }}%)
          </p>
        </div>
      </div>
      
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: `${progress.percentage}%` }"></div>
      </div>
    </div>

    <div class="category-tabs">
      <button
        v-for="cat in categories"
        :key="cat.id"
        class="category-tab"
        :class="{ active: selectedCategory === cat.id }"
        @click="selectedCategory = cat.id"
      >
        <Icon :icon="cat.icon" width="16" height="16" class="md:w-5 md:h-5" />
        <span class="text-xs md:text-sm">{{ cat.name }}</span>
      </button>
    </div>

    <div class="achievements-grid">
      <div
        v-for="achievement in filteredAchievements"
        :key="achievement.id"
        class="achievement-card"
        :class="{ unlocked: getAchievementInstance(achievement.id)?.unlocked }"
      >
        <div class="achievement-icon">
          <Icon :icon="achievement.icon" width="36" height="36" class="md:w-12 md:h-12" />
        </div>
        
        <div class="achievement-info">
          <h3 class="achievement-name">{{ achievement.name }}</h3>
          <p class="achievement-desc">{{ achievement.description }}</p>
          
          <div v-if="!getAchievementInstance(achievement.id)?.unlocked" class="achievement-progress">
            <div class="progress-bar-small">
              <div 
                class="progress-fill" 
                :style="{ width: `${getAchievementInstance(achievement.id)?.progress || 0}%` }"
              ></div>
            </div>
            <span class="progress-text">
              {{ (getAchievementInstance(achievement.id)?.progress || 0).toFixed(0) }}%
            </span>
          </div>
          
          <div v-else class="unlocked-badge">
            <Icon icon="mdi:check-circle" width="14" height="14" class="md:w-4 md:h-4" />
            <span class="text-xs md:text-sm">已解锁</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.achievement-panel {
  @apply flex flex-col gap-4 md:gap-6 p-3 md:p-6;
}

.achievement-header {
  @apply flex flex-col gap-3 md:gap-4 pb-4 md:pb-6 border-b border-gray-700;
}

.progress-bar-container {
  @apply w-full h-2 md:h-3 bg-gray-700 rounded-full overflow-hidden;
}

.progress-bar {
  @apply h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-500;
}

.category-tabs {
  @apply flex gap-1 md:gap-2 flex-wrap;
}

.category-tab {
  @apply flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg;
  @apply bg-gray-800 hover:bg-gray-700 transition-colors;
  @apply text-gray-300;
}

.category-tab.active {
  @apply bg-blue-600 text-white;
}

.achievements-grid {
  @apply grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-4;
}

.achievement-card {
  @apply flex gap-2 md:gap-4 p-3 md:p-4 rounded-lg bg-gray-800 border-2 border-gray-700;
  @apply transition-all duration-300;
}

.achievement-card.unlocked {
  @apply border-yellow-500 bg-yellow-900/20;
}

.achievement-card:hover {
  @apply shadow-lg;
}

@media (min-width: 768px) {
  .achievement-card:hover {
    @apply scale-105;
  }
}

.achievement-icon {
  @apply flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full;
  @apply bg-gray-700 text-gray-400 flex-shrink-0;
}

.achievement-card.unlocked .achievement-icon {
  @apply bg-yellow-500/20 text-yellow-500;
}

.achievement-info {
  @apply flex-1 flex flex-col gap-1.5 md:gap-2 min-w-0;
}

.achievement-name {
  @apply text-base md:text-lg font-bold text-white truncate;
}

.achievement-desc {
  @apply text-xs md:text-sm text-gray-400 line-clamp-2;
}

.achievement-progress {
  @apply flex items-center gap-2;
}

.progress-bar-small {
  @apply flex-1 h-1.5 md:h-2 bg-gray-700 rounded-full overflow-hidden;
}

.progress-fill {
  @apply h-full bg-blue-500 transition-all duration-300;
}

.progress-text {
  @apply text-xs text-gray-400 flex-shrink-0;
}

.unlocked-badge {
  @apply flex items-center gap-1 text-yellow-500 font-semibold;
}
</style>
