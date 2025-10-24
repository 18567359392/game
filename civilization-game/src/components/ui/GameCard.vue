<template>
  <div :class="cardClass">
    <div v-if="$slots.header" class="card-header mb-3 pb-3 border-b border-gray-200 dark:border-gray-700">
      <slot name="header" />
    </div>
    
    <div class="card-body">
      <slot />
    </div>
    
    <div v-if="$slots.footer" class="card-footer mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  hoverable: false
})

const cardClass = computed(() => {
  const baseClass = 'rounded-lg transition-all duration-200'
  
  const variantClasses = {
    default: 'bg-white dark:bg-gray-800 shadow-md',
    outlined: 'bg-transparent border-2 border-gray-300 dark:border-gray-600',
    elevated: 'bg-white dark:bg-gray-800 shadow-lg'
  }
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-4',
    lg: 'p-6'
  }
  
  const hoverClass = props.hoverable 
    ? 'hover:shadow-xl hover:scale-105 cursor-pointer' 
    : ''
  
  return [
    baseClass,
    variantClasses[props.variant],
    paddingClasses[props.padding],
    hoverClass
  ].join(' ')
})
</script>
