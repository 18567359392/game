<template>
  <div class="tooltip-wrapper inline-block" @mouseenter="show" @mouseleave="hide">
    <slot />
    
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="isVisible"
          ref="tooltipRef"
          :class="tooltipClass"
          :style="tooltipStyle"
          role="tooltip"
        >
          <div class="tooltip-content">
            <slot name="content">
              {{ content }}
            </slot>
          </div>
          <div :class="arrowClass" :style="arrowStyle"></div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

type Placement = 'top' | 'bottom' | 'left' | 'right'

interface Props {
  content?: string
  placement?: Placement
  disabled?: boolean
  delay?: number
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  disabled: false,
  delay: 200,
  maxWidth: '300px'
})

const isVisible = ref(false)
const tooltipRef = ref<HTMLElement | null>(null)
const position = ref({ x: 0, y: 0 })
const arrowPosition = ref({ x: 0, y: 0 })

let showTimeout: number | null = null
let hideTimeout: number | null = null

const tooltipClass = computed(() => {
  return [
    'fixed z-[100] px-3 py-2 text-sm text-white bg-gray-900 dark:bg-gray-700',
    'rounded-lg shadow-lg pointer-events-none'
  ].join(' ')
})

const tooltipStyle = computed(() => {
  return {
    left: `${position.value.x}px`,
    top: `${position.value.y}px`,
    maxWidth: props.maxWidth
  }
})

const arrowClass = computed(() => {
  const base = 'absolute w-2 h-2 bg-gray-900 dark:bg-gray-700 transform rotate-45'
  
  const placementClasses = {
    top: '-bottom-1',
    bottom: '-top-1',
    left: '-right-1',
    right: '-left-1'
  }
  
  return [base, placementClasses[props.placement]].join(' ')
})

const arrowStyle = computed(() => {
  return {
    left: `${arrowPosition.value.x}px`,
    top: `${arrowPosition.value.y}px`
  }
})

function show(event: MouseEvent) {
  if (props.disabled) return
  
  if (hideTimeout) {
    clearTimeout(hideTimeout)
    hideTimeout = null
  }
  
  showTimeout = window.setTimeout(async () => {
    isVisible.value = true
    
    await nextTick()
    
    if (tooltipRef.value) {
      const triggerEl = event.target as HTMLElement
      const triggerRect = triggerEl.getBoundingClientRect()
      const tooltipRect = tooltipRef.value.getBoundingClientRect()
      
      calculatePosition(triggerRect, tooltipRect)
    }
  }, props.delay)
}

function hide() {
  if (showTimeout) {
    clearTimeout(showTimeout)
    showTimeout = null
  }
  
  hideTimeout = window.setTimeout(() => {
    isVisible.value = false
  }, 100)
}

function calculatePosition(triggerRect: DOMRect, tooltipRect: DOMRect) {
  const gap = 8 // 间距
  let x = 0
  let y = 0
  
  switch (props.placement) {
    case 'top':
      x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      y = triggerRect.top - tooltipRect.height - gap
      arrowPosition.value = {
        x: tooltipRect.width / 2 - 4,
        y: 0
      }
      break
    
    case 'bottom':
      x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
      y = triggerRect.bottom + gap
      arrowPosition.value = {
        x: tooltipRect.width / 2 - 4,
        y: 0
      }
      break
    
    case 'left':
      x = triggerRect.left - tooltipRect.width - gap
      y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      arrowPosition.value = {
        x: 0,
        y: tooltipRect.height / 2 - 4
      }
      break
    
    case 'right':
      x = triggerRect.right + gap
      y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
      arrowPosition.value = {
        x: 0,
        y: tooltipRect.height / 2 - 4
      }
      break
  }
  
  // 边界检测
  const padding = 8
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // 水平边界
  if (x < padding) {
    x = padding
  } else if (x + tooltipRect.width > viewportWidth - padding) {
    x = viewportWidth - tooltipRect.width - padding
  }
  
  // 垂直边界
  if (y < padding) {
    y = padding
  } else if (y + tooltipRect.height > viewportHeight - padding) {
    y = viewportHeight - tooltipRect.height - padding
  }
  
  position.value = { x, y }
}
</script>

<style scoped>
.tooltip-wrapper {
  display: inline-block;
}
</style>
