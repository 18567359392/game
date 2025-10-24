<template>
  <button
    :class="buttonClass"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <span v-if="loading" class="i-game-icons:rolling-dices animate-spin mr-2"></span>
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success'
  disabled?: boolean
  loading?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  disabled: false,
  loading: false,
  size: 'md'
})

const emit = defineEmits<{
  click: []
}>()

const buttonClass = computed(() => {
  const baseClass = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  }
  
  const variantClasses = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500',
    secondary: 'bg-purple-500 hover:bg-purple-600 text-white focus:ring-purple-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
    success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-500'
  }
  
  const disabledClass = props.disabled || props.loading 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer'
  
  return [
    baseClass,
    sizeClasses[props.size],
    variantClasses[props.variant],
    disabledClass
  ].join(' ')
})

function handleClick() {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}
</script>
