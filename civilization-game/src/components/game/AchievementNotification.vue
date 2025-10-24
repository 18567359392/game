<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useAchievementStore } from '@/stores/achievement'
import { getAchievement } from '@/config/achievements'

const achievementStore = useAchievementStore()

interface Notification {
  id: string
  achievementId: string
  timestamp: number
}

const notifications = ref<Notification[]>([])
const NOTIFICATION_DURATION = 5000 // 5秒后自动消失

// 监听成就解锁
achievementStore.$subscribe((_mutation, state) => {
  // 检查是否有新解锁的成就
  state.recentUnlocks.forEach(achievementId => {
    // 检查是否已经在通知列表中
    const exists = notifications.value.some(n => n.achievementId === achievementId)
    if (!exists) {
      const notification: Notification = {
        id: `${achievementId}-${Date.now()}`,
        achievementId,
        timestamp: Date.now()
      }
      notifications.value.push(notification)
      
      // 5秒后自动移除
      setTimeout(() => {
        removeNotification(notification.id)
      }, NOTIFICATION_DURATION)
    }
  })
})

function removeNotification(id: string) {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

function getAchievementInfo(achievementId: string) {
  return getAchievement(achievementId)
}
</script>

<template>
  <div class="notification-container">
    <TransitionGroup name="notification">
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="notification-card"
        @click="removeNotification(notification.id)"
      >
        <div class="notification-icon">
          <Icon
            :icon="getAchievementInfo(notification.achievementId)?.icon || 'mdi:trophy'"
            width="32"
            height="32"
            class="text-yellow-500"
          />
        </div>
        
        <div class="notification-content">
          <div class="notification-header">
            <Icon icon="mdi:trophy" width="16" height="16" class="text-yellow-500" />
            <span class="notification-title">成就解锁!</span>
          </div>
          <div class="notification-name">
            {{ getAchievementInfo(notification.achievementId)?.name || '未知成就' }}
          </div>
          <div class="notification-description">
            {{ getAchievementInfo(notification.achievementId)?.description || '' }}
          </div>
        </div>
        
        <button
          class="notification-close"
          @click.stop="removeNotification(notification.id)"
        >
          <Icon icon="mdi:close" width="20" height="20" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.notification-container {
  @apply fixed top-20 right-4 z-40;
  @apply flex flex-col gap-2;
  @apply max-w-md;
}

.notification-card {
  @apply flex items-start gap-3 p-4;
  @apply bg-gradient-to-br from-yellow-50 to-orange-50;
  @apply dark:from-yellow-900/30 dark:to-orange-900/30;
  @apply border-2 border-yellow-500/50;
  @apply rounded-xl shadow-2xl;
  @apply backdrop-blur-sm;
  @apply cursor-pointer;
  @apply transition-all duration-300;
  @apply hover:shadow-yellow-500/20 hover:scale-105;
  animation: slideIn 0.5s ease-out, glow 2s ease-in-out infinite;
}

.notification-icon {
  @apply flex-shrink-0;
  @apply w-12 h-12 rounded-full;
  @apply bg-gradient-to-br from-yellow-400 to-orange-500;
  @apply flex items-center justify-center;
  @apply shadow-lg;
  animation: bounce 1s ease-in-out infinite;
}

.notification-content {
  @apply flex-1 min-w-0;
}

.notification-header {
  @apply flex items-center gap-1 mb-1;
}

.notification-title {
  @apply text-sm font-bold text-yellow-700 dark:text-yellow-400;
}

.notification-name {
  @apply text-base font-bold text-gray-900 dark:text-white mb-1;
}

.notification-description {
  @apply text-sm text-gray-600 dark:text-gray-300;
  @apply line-clamp-2;
}

.notification-close {
  @apply flex-shrink-0 p-1 rounded-lg;
  @apply text-gray-400 hover:text-gray-600;
  @apply dark:text-gray-500 dark:hover:text-gray-300;
  @apply hover:bg-gray-200 dark:hover:bg-gray-700;
  @apply transition-colors;
}

/* 动画 */
.notification-enter-active {
  transition: all 0.5s ease-out;
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(50px) scale(0.8);
}

.notification-move {
  transition: transform 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

@keyframes glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(234, 179, 8, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(234, 179, 8, 0.5);
  }
}
</style>
