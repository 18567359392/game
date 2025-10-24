<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { TechnologyStatus, type ResourceType } from '@/types'
import { useTechStore } from '@/stores/tech'
import { useResourceStore } from '@/stores/resource'
import { getTechnology } from '@/config/technologies'
import GameButton from '@/components/ui/GameButton.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import { getResourceIcon } from '@/config/resources'

const props = defineProps<{
  techId: string
}>()

const techStore = useTechStore()
const resourceStore = useResourceStore()

const tech = computed(() => getTechnology(props.techId))
const instance = computed(() => techStore.getTechInstance(props.techId))
const status = computed(() => instance.value?.status || TechnologyStatus.LOCKED)

const isResearched = computed(() => status.value === TechnologyStatus.RESEARCHED)
const isResearching = computed(() => status.value === TechnologyStatus.RESEARCHING)
const isAvailable = computed(() => status.value === TechnologyStatus.AVAILABLE)
const isLocked = computed(() => status.value === TechnologyStatus.LOCKED)

const canResearch = computed(() => {
  if (!tech.value) return false
  const result = techStore.canResearch(props.techId)
  return result.can
})

const researchProgress = computed(() => {
  if (!isResearching.value) return 0
  return instance.value?.researchProgress || 0
})

const remainingTime = computed(() => {
  if (!isResearching.value) return 0
  return techStore.getRemainingTime(props.techId)
})

const statusColor = computed(() => {
  switch (status.value) {
    case TechnologyStatus.RESEARCHED:
      return 'bg-green-500'
    case TechnologyStatus.RESEARCHING:
      return 'bg-blue-500'
    case TechnologyStatus.AVAILABLE:
      return 'bg-yellow-500'
    default:
      return 'bg-gray-400'
  }
})

const statusText = computed(() => {
  switch (status.value) {
    case TechnologyStatus.RESEARCHED:
      return '已研究'
    case TechnologyStatus.RESEARCHING:
      return '研究中'
    case TechnologyStatus.AVAILABLE:
      return '可研究'
    default:
      return '已锁定'
  }
})


function handleResearch() {
  if (!tech.value) return
  
  if (isResearching.value) {
    // 取消研究
    techStore.cancelResearch(props.techId)
  } else {
    // 开始研究
    techStore.startResearch(props.techId)
  }
}

function formatTime(seconds: number): string {
  if (seconds < 60) return `${Math.ceil(seconds)}秒`
  const minutes = Math.floor(seconds / 60)
  const secs = Math.ceil(seconds % 60)
  return `${minutes}分${secs}秒`
}
</script>

<template>
  <div
    v-if="tech"
    class="tech-node"
    :class="{
      'tech-researched': isResearched,
      'tech-researching': isResearching,
      'tech-available': isAvailable,
      'tech-locked': isLocked
    }"
  >
    <!-- 科技图标 -->
    <div class="tech-icon" :class="statusColor">
      <Icon :icon="tech.icon" width="32" height="32" />
    </div>

    <!-- 科技信息 -->
    <div class="tech-info">
      <div class="tech-header">
        <h3 class="tech-name">{{ tech.name }}</h3>
        <span class="tech-status" :class="statusColor">{{ statusText }}</span>
      </div>
      
      <p class="tech-description">{{ tech.description }}</p>

      <!-- 研究成本 -->
      <div v-if="!isResearched" class="tech-cost">
        <div v-for="(amount, resourceId) in tech.researchCost" :key="resourceId" class="cost-item">
          <Icon :icon="getResourceIcon(resourceId as string)" width="16" height="16" />
          <span 
            :class="{
              'text-green-600': resourceStore.hasResource(resourceId as ResourceType, amount || 0),
              'text-red-600': !resourceStore.hasResource(resourceId as ResourceType, amount || 0)
            }"
          >
            {{ amount }}
          </span>
        </div>
      </div>

      <!-- 研究时间 -->
      <div v-if="!isResearched" class="tech-time">
        <Icon icon="mdi:clock-outline" width="16" height="16" />
        <span>{{ formatTime(tech.researchTime) }}</span>
      </div>

      <!-- 研究进度 -->
      <ProgressBar
        v-if="isResearching"
        :percentage="researchProgress"
        :estimated-time="remainingTime"
        class="mt-2"
      />

      <!-- 效果列表 -->
      <div v-if="tech.effects.length > 0" class="tech-effects">
        <h4>效果:</h4>
        <ul>
          <li v-for="(effect, index) in tech.effects" :key="index">
            <template v-if="effect.type === 'resourceMultiplier'">
              {{ effect.target }} 产出 +{{ ((effect.value - 1) * 100).toFixed(0) }}%
            </template>
            <template v-else-if="effect.type === 'researchSpeedBonus'">
              研究速度 +{{ ((effect.value - 1) * 100).toFixed(0) }}%
            </template>
            <template v-else-if="effect.type === 'buildSpeedBonus'">
              建造速度 +{{ ((effect.value - 1) * 100).toFixed(0) }}%
            </template>
            <template v-else-if="effect.type === 'populationGrowth'">
              人口增长 +{{ ((effect.value - 1) * 100).toFixed(0) }}%
            </template>
          </li>
        </ul>
      </div>

      <!-- 解锁建筑 -->
      <div v-if="tech.unlocks.length > 0" class="tech-unlocks">
        <h4>解锁:</h4>
        <ul>
          <li v-for="unlock in tech.unlocks" :key="unlock">{{ unlock }}</li>
        </ul>
      </div>

      <!-- 研究按钮 -->
      <GameButton
        v-if="!isResearched"
        :disabled="!canResearch && !isResearching"
        :variant="isResearching ? 'secondary' : 'primary'"
        class="mt-3"
        @click="handleResearch"
      >
        {{ isResearching ? '取消研究' : '开始研究' }}
      </GameButton>
    </div>
  </div>
</template>

<style scoped>
.tech-node {
  @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-all;
  @apply border-2 border-transparent;
}

.tech-node:hover {
  @apply shadow-lg;
}

.tech-researched {
  @apply border-green-500 bg-green-50 dark:bg-green-900/20;
}

.tech-researching {
  @apply border-blue-500 bg-blue-50 dark:bg-blue-900/20;
}

.tech-available {
  @apply border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20;
}

.tech-locked {
  @apply opacity-60 cursor-not-allowed;
}

.tech-icon {
  @apply w-16 h-16 rounded-full flex items-center justify-center mb-3;
  @apply text-white;
}

.tech-info {
  @apply flex flex-col gap-2;
}

.tech-header {
  @apply flex items-center justify-between;
}

.tech-name {
  @apply text-lg font-bold text-gray-800 dark:text-gray-100;
}

.tech-status {
  @apply px-2 py-1 rounded text-xs text-white font-semibold;
}

.tech-description {
  @apply text-sm text-gray-600 dark:text-gray-400;
}

.tech-cost {
  @apply flex flex-wrap gap-2;
}

.cost-item {
  @apply flex items-center gap-1 text-sm;
}

.tech-time {
  @apply flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400;
}

.tech-effects,
.tech-unlocks {
  @apply text-sm;
}

.tech-effects h4,
.tech-unlocks h4 {
  @apply font-semibold text-gray-700 dark:text-gray-300 mb-1;
}

.tech-effects ul,
.tech-unlocks ul {
  @apply list-disc list-inside text-gray-600 dark:text-gray-400;
}
</style>
