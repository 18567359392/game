<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-50" @close="handleClose">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4">
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel :class="panelClass">
              <!-- 标题栏 -->
              <div v-if="title || $slots.header" class="modal-header flex items-center justify-between mb-4">
                <DialogTitle v-if="title" class="text-xl font-bold text-gray-900 dark:text-white">
                  {{ title }}
                </DialogTitle>
                <slot v-else name="header" />
                
                <button
                  v-if="showClose"
                  @click="handleClose"
                  class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                >
                  <Icon icon="mdi:close" class="text-2xl" />
                </button>
              </div>

              <!-- 内容 -->
              <div class="modal-body">
                <slot />
              </div>

              <!-- 底部按钮 -->
              <div v-if="$slots.footer || showDefaultFooter" class="modal-footer flex justify-end gap-3 mt-6">
                <slot name="footer">
                  <GameButton
                    v-if="showDefaultFooter"
                    variant="secondary"
                    @click="handleClose"
                  >
                    {{ cancelText }}
                  </GameButton>
                  <GameButton
                    v-if="showDefaultFooter"
                    variant="primary"
                    @click="handleConfirm"
                    :loading="confirming"
                  >
                    {{ confirmText }}
                  </GameButton>
                </slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { Icon } from '@iconify/vue'
import GameButton from './GameButton.vue'

interface Props {
  isOpen: boolean
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  showClose?: boolean
  showDefaultFooter?: boolean
  confirmText?: string
  cancelText?: string
  closeOnClickOutside?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
  size: 'md',
  showClose: true,
  showDefaultFooter: false,
  confirmText: '确认',
  cancelText: '取消',
  closeOnClickOutside: true
})

const emit = defineEmits<{
  close: []
  confirm: []
}>()

const confirming = ref(false)

const panelClass = computed(() => {
  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4'
  }
  
  return [
    'w-full rounded-xl bg-white dark:bg-gray-800 p-6 shadow-2xl',
    'transform transition-all',
    sizeClasses[props.size]
  ].join(' ')
})

function handleClose() {
  if (props.closeOnClickOutside) {
    emit('close')
  }
}

async function handleConfirm() {
  confirming.value = true
  try {
    emit('confirm')
  } finally {
    setTimeout(() => {
      confirming.value = false
    }, 300)
  }
}
</script>
