<template>
  <div class="progress-bar-container">
    <div class="flex justify-between items-center mb-1" v-if="showLabel">
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ label }}
      </span>
      <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ displayPercentage }}%
      </span>
    </div>
    
    <div :class="containerClass">
      <div
        :class="barClass"
        :style="barStyle"
      >
        <span v-if="showText && percentage >= 10" class="text-xs font-semibold text-white px-2">
          {{ displayPercentage }}%
        </span>
      </div>
    </div>
    
    <div v-if="showTime && estimatedTime" class="text-xs text-gray-500 dark:text-gray-400 mt-1">
      剩余时间: {{ formatTime(estimatedTime) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  percentage: number
  label?: string
  showLabel?: boolean
  showText?: boolean
  showTime?: boolean
  estimatedTime?: number // 剩余时间(秒)
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple'
  height?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  percentage: 0,
  showLabel: true,
  showText: true,
  showTime: false,
  color: 'blue',
  height: 'md',
  animated: true
})

const displayPercentage = computed(() => {
  return Math.min(100, Math.max(0, Math.round(props.percentage)))
})

const containerClass = computed(() => {
  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  }
  
  return [
    'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
    heightClasses[props.height]
  ].join(' ')
})

const barClass = computed(() => {
  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500'
  }
  
  return [
    'h-full flex items-center justify-center transition-all duration-500 ease-out',
    colorClasses[props.color],
    props.animated ? 'animate-pulse' : ''
  ].join(' ')
})

const barStyle = computed(() => ({
  width: `${displayPercentage.value}%`
}))

function formatTime(seconds: number): string {
  if (seconds < 60) {
    return `${Math.floor(seconds)}秒`
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes}分${secs}秒`
  } else {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}小时${minutes}分`
  }
}
</script>
