<template>
  <div class="resource-item flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <Icon :icon="icon" class="text-lg md:text-xl flex-shrink-0" :class="iconColor" />
    
    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-1 md:gap-2">
        <span class="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 truncate">
          {{ name }}
        </span>
        <span 
          v-if="showChange && change !== 0" 
          :class="changeClass"
          class="text-xs font-semibold flex-shrink-0"
        >
          {{ changeText }}
        </span>
      </div>
      
      <div class="flex items-center gap-1 md:gap-2 mt-0.5 md:mt-1">
        <span class="text-base md:text-lg font-bold truncate" :class="amountColor">
          {{ formattedAmount }}
        </span>
        <span v-if="showLimit" class="text-xs md:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">
          / {{ formattedLimit }}
        </span>
      </div>
      
      <div v-if="showProgressBar && limit > 0" class="mt-1">
        <div class="w-full h-1 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden">
          <div 
            class="h-full bg-blue-500 transition-all duration-300"
            :style="{ width: `${percentage}%` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { formatNumber, formatRate } from '@/utils/formatNumber'

interface Props {
  name: string
  icon: string
  amount: number
  limit?: number
  change?: number // 每秒变化量
  showLimit?: boolean
  showChange?: boolean
  showProgressBar?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  limit: 0,
  change: 0,
  showLimit: true,
  showChange: true,
  showProgressBar: false
})

const formattedAmount = computed(() => {
  return formatNumber(props.amount, 1)
})

const formattedLimit = computed(() => {
  return formatNumber(props.limit, 1)
})

const percentage = computed(() => {
  if (props.limit <= 0) return 0
  return Math.min(100, (props.amount / props.limit) * 100)
})

const amountColor = computed(() => {
  if (!props.showLimit || props.limit <= 0) {
    return 'text-gray-900 dark:text-white'
  }
  
  const percent = percentage.value
  if (percent >= 90) return 'text-red-600 dark:text-red-400'
  if (percent >= 70) return 'text-yellow-600 dark:text-yellow-400'
  return 'text-gray-900 dark:text-white'
})

const iconColor = computed(() => {
  if (props.change > 0) return 'text-green-500'
  if (props.change < 0) return 'text-red-500'
  return 'text-gray-500'
})

const changeClass = computed(() => {
  return props.change > 0 
    ? 'text-green-600 dark:text-green-400' 
    : 'text-red-600 dark:text-red-400'
})

const changeText = computed(() => {
  return formatRate(props.change)
})
</script>
