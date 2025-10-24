<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGameStore } from '@/stores/game'
import { useResourceStore } from '@/stores/resource'
import GameButton from '@/components/ui/GameButton.vue'
import { type ResourceAmount, type ResourceType } from '@/types'
import { getResourceName, getResourceIcon } from '@/config/resources'

const gameStore = useGameStore()
const resourceStore = useResourceStore()

const offlineTime = computed(() => gameStore.offlineTime)
const show = computed(() => gameStore.showOfflineModal)

// 计算离线收益
const offlineGains = computed((): ResourceAmount => {
  if (offlineTime.value <= 0) return {}
  
  // 最多计算8小时的离线收益(防止作弊)
  const maxOfflineTime = 8 * 60 * 60 // 8小时
  const actualTime = Math.min(offlineTime.value, maxOfflineTime)
  
  const gains: ResourceAmount = {}
  
  // 计算每种资源的产出
  Object.entries(resourceStore.productionRates).forEach(([resourceId, rate]) => {
    if (rate > 0) {
      const consumption = resourceStore.consumptionRates[resourceId as ResourceType] || 0
      const netRate = rate - consumption
      
      if (netRate > 0) {
        const amount = netRate * actualTime
        gains[resourceId as ResourceType] = amount
      }
    }
  })
  
  return gains
})

const formattedTime = computed(() => {
  const seconds = offlineTime.value
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  
  if (hours > 0) {
    return `${hours}小时${minutes}分钟`
  }
  return `${minutes}分钟`
})

const hasGains = computed(() => {
  return Object.keys(offlineGains.value).length > 0
})

function handleClaim() {
  // 添加离线收益到资源
  Object.entries(offlineGains.value).forEach(([resourceId, amount]) => {
    resourceStore.addResource(resourceId as ResourceType, amount as number)
  })
  
  // 关闭弹窗
  gameStore.closeOfflineModal()
}

function handleClose() {
  gameStore.closeOfflineModal()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click.self="handleClose">
        <div class="modal-content">
          <!-- 标题 -->
          <div class="modal-header">
            <Icon icon="mdi:clock-time-four" width="32" height="32" class="text-blue-500" />
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
              欢迎回来!
            </h2>
          </div>

          <!-- 离线时间 -->
          <div class="offline-time">
            <p class="text-gray-600 dark:text-gray-400">
              您离线了 <span class="font-bold text-blue-600">{{ formattedTime }}</span>
            </p>
          </div>

          <!-- 离线收益 -->
          <div v-if="hasGains" class="offline-gains">
            <h3 class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
              离线期间获得的资源:
            </h3>
            <div class="gains-grid">
              <div
                v-for="(amount, resourceId) in offlineGains"
                :key="resourceId"
                class="gain-item"
              >
                <Icon :icon="getResourceIcon(resourceId as string)" width="20" height="20" class="text-green-500" />
                <span class="font-medium">{{ getResourceName(resourceId as string) }}</span>
                <span class="text-green-600 font-bold">+{{ (amount || 0).toFixed(1) }}</span>
              </div>
            </div>
          </div>

          <!-- 无收益提示 -->
          <div v-else class="no-gains">
            <Icon icon="mdi:information-outline" width="24" height="24" class="text-gray-400" />
            <p class="text-gray-500">离线期间没有资源产出</p>
          </div>

          <!-- 提示信息 -->
          <div class="offline-tip">
            <Icon icon="mdi:lightbulb-outline" width="16" height="16" class="text-yellow-500" />
            <p class="text-sm text-gray-500">
              离线收益最多计算8小时,建议定期上线查看!
            </p>
          </div>

          <!-- 按钮 -->
          <div class="modal-actions">
            <GameButton
              variant="primary"
              size="lg"
              @click="handleClaim"
              class="w-full"
            >
              <Icon icon="mdi:check" width="20" height="20" />
              <span>领取收益</span>
            </GameButton>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm;
  @apply flex items-center justify-center;
  @apply z-50;
}

.modal-content {
  @apply bg-white dark:bg-gray-800 rounded-2xl shadow-2xl;
  @apply p-8 max-w-lg w-full mx-4;
  @apply flex flex-col gap-6;
}

.modal-header {
  @apply flex items-center gap-3;
}

.offline-time {
  @apply text-center py-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg;
}

.offline-gains {
  @apply flex flex-col;
}

.gains-grid {
  @apply grid grid-cols-2 gap-3;
}

.gain-item {
  @apply flex items-center gap-2;
  @apply p-3 bg-green-50 dark:bg-green-900/20 rounded-lg;
}

.no-gains {
  @apply flex flex-col items-center gap-2 py-8;
  @apply text-gray-400;
}

.offline-tip {
  @apply flex items-center gap-2;
  @apply p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg;
}

.modal-actions {
  @apply flex gap-3;
}

/* 动画 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-leave-to .modal-content {
  transform: scale(0.9);
}
</style>
