<template>
  <div class="game-layout min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
    <!-- 时代过场动画 -->
    <EraTransition />
    
    <!-- 离线收益弹窗 -->
    <OfflineModal />
    
    <!-- 设置弹窗 -->
    <SettingsModal ref="settingsModal" />
    
    <!-- 成就通知 -->
    <AchievementNotification />
    
    <!-- 顶部导航栏 -->
    <header class="header bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 px-3 md:px-4 py-2 md:py-3">
      <div class="flex items-center justify-between">
        <!-- 移动端菜单按钮 -->
        <button 
          @click="toggleMobileMenu" 
          class="md:hidden text-white p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Icon icon="mdi:menu" class="text-2xl" />
        </button>
        
        <div class="flex items-center gap-2 md:gap-4">
          <h1 class="text-lg md:text-2xl font-bold text-white flex items-center gap-1 md:gap-2">
            <Icon icon="game-icons:ancient-columns" class="text-2xl md:text-3xl text-blue-400" />
            <span class="hidden sm:inline">文明发展模拟</span>
            <span class="sm:hidden">文明</span>
          </h1>
          <div class="px-2 md:px-3 py-0.5 md:py-1 bg-blue-600 rounded-full text-white text-xs md:text-sm font-semibold">
            {{ eraName }}
          </div>
        </div>
        
        <div class="flex items-center gap-2 md:gap-4">
          <div class="hidden sm:block text-gray-300 text-xs md:text-sm">
            {{ gameStore.formattedGameTime }}
          </div>
          <GameButton size="sm" variant="secondary" @click="toggleSettings">
            <Icon icon="mdi:cog" class="text-base md:text-lg" />
          </GameButton>
        </div>
      </div>
    </header>

    <div class="main-container flex h-[calc(100vh-57px)] sm:h-[calc(100vh-65px)] md:h-[calc(100vh-73px)]">
      <!-- 左侧菜单栏 - 桌面端 -->
      <aside class="sidebar hidden md:block w-64 bg-gray-900/60 backdrop-blur-sm border-r border-gray-700 overflow-y-auto">
        <nav class="p-4">
          <div
            v-for="item in menuItems"
            :key="item.id"
            @click="activeView = item.id"
            :class="[
              'menu-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all mb-2',
              activeView === item.id 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-300 hover:bg-gray-800'
            ]"
          >
            <Icon :icon="item.icon" class="text-xl" />
            <span class="font-medium">{{ item.name }}</span>
          </div>
        </nav>
      </aside>

      <!-- 移动端菜单抽屉 -->
      <Transition name="slide">
        <div 
          v-if="mobileMenuOpen" 
          class="fixed inset-0 z-40 md:hidden"
          @click="toggleMobileMenu"
        >
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <aside 
            class="absolute left-0 top-0 bottom-0 w-64 bg-gray-900 border-r border-gray-700 overflow-y-auto"
            @click.stop
          >
            <div class="p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 class="text-lg font-bold text-white">菜单</h3>
              <button @click="toggleMobileMenu" class="text-gray-400 hover:text-white">
                <Icon icon="mdi:close" class="text-2xl" />
              </button>
            </div>
            <nav class="p-4">
              <div
                v-for="item in menuItems"
                :key="item.id"
                @click="selectMenuItem(item.id)"
                :class="[
                  'menu-item flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all mb-2',
                  activeView === item.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-800'
                ]"
              >
                <Icon :icon="item.icon" class="text-xl" />
                <span class="font-medium">{{ item.name }}</span>
              </div>
            </nav>
          </aside>
        </div>
      </Transition>

      <!-- 中央内容区 -->
      <main class="content flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
        <div v-if="activeView === 'overview'" class="overview-panel">
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4 md:mb-6">概览</h2>
          
          <!-- 时代指示器 -->
          <EraIndicator class="mb-4 md:mb-6" />
          
          <!-- 资源面板 -->
          <GameCard class="mb-4 md:mb-6">
            <template #header>
              <h3 class="text-lg md:text-xl font-bold text-gray-800 dark:text-white">资源状态</h3>
            </template>
            <ResourcePanel />
          </GameCard>
          
          <!-- 人口信息 -->
          <GameCard>
            <template #header>
              <h3 class="text-lg md:text-xl font-bold text-gray-800 dark:text-white">人口</h3>
            </template>
            <div class="flex items-center gap-3 md:gap-4">
              <Icon icon="game-icons:people" class="text-3xl md:text-4xl text-blue-500" />
              <div>
                <div class="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {{ Math.floor(gameStore.population.current) }} / {{ gameStore.population.max }}
                </div>
                <div class="text-xs md:text-sm text-gray-500">
                  增长率: +{{ (gameStore.population.growthRate * 60).toFixed(2) }}/分钟
                </div>
              </div>
            </div>
          </GameCard>
        </div>

        <div v-if="activeView === 'buildings'" class="buildings-panel">
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4 md:mb-6">建筑</h2>
          <BuildingPanel />
        </div>

        <div v-if="activeView === 'technology'" class="technology-panel">
          <TechTree />
        </div>

        <div v-if="activeView === 'achievements'" class="achievements-panel">
          <AchievementPanel />
        </div>

        <div v-if="activeView === 'stats'" class="stats-panel">
          <h2 class="text-2xl sm:text-3xl font-bold text-white mb-4 md:mb-6">统计</h2>
          <div class="text-gray-300">统计数据开发中...</div>
        </div>
      </main>

      <!-- 移动端底部导航栏 -->
      <nav class="md:hidden fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 z-30">
        <div class="flex items-center justify-around py-2">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="activeView = item.id"
            :class="[
              'flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-all',
              activeView === item.id 
                ? 'text-blue-400' 
                : 'text-gray-400'
            ]"
          >
            <Icon :icon="item.icon" class="text-2xl" />
            <span class="text-xs font-medium">{{ item.name }}</span>
          </button>
        </div>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGameStore } from '@/stores/game'
import GameButton from '@/components/ui/GameButton.vue'
import GameCard from '@/components/ui/GameCard.vue'
import BuildingPanel from '@/components/game/BuildingPanel.vue'
import ResourcePanel from '@/components/game/ResourcePanel.vue'
import TechTree from '@/components/game/TechTree.vue'
import EraIndicator from '@/components/game/EraIndicator.vue'
import EraTransition from '@/components/game/EraTransition.vue'
import OfflineModal from '@/components/game/OfflineModal.vue'
import SettingsModal from '@/components/game/SettingsModal.vue'
import AchievementPanel from '@/components/game/AchievementPanel.vue'
import AchievementNotification from '@/components/game/AchievementNotification.vue'
import { Era } from '@/types'

const gameStore = useGameStore()

const activeView = ref('overview')
const settingsModal = ref<InstanceType<typeof SettingsModal>>()
const mobileMenuOpen = ref(false)

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function selectMenuItem(id: string) {
  activeView.value = id
  mobileMenuOpen.value = false
}

const menuItems = [
  { id: 'overview', name: '概览', icon: 'mdi:view-dashboard' },
  { id: 'buildings', name: '建筑', icon: 'game-icons:castle' },
  { id: 'technology', name: '科技', icon: 'mdi:flask' },
  { id: 'achievements', name: '成就', icon: 'mdi:trophy' },
  { id: 'stats', name: '统计', icon: 'mdi:chart-bar' }
]

const eraName = computed(() => {
  const eraNames: Record<Era, string> = {
    [Era.STONE]: '石器时代',
    [Era.BRONZE]: '青铜时代',
    [Era.IRON]: '铁器时代',
    [Era.INDUSTRIAL]: '工业时代',
    [Era.INFORMATION]: '信息时代',
    [Era.SPACE]: '太空时代',
    [Era.INTERSTELLAR]: '星际时代',
    [Era.HYPERDIMENSIONAL]: '超维时代'
  }
  return eraNames[gameStore.currentEra]
})

function toggleSettings() {
  settingsModal.value?.open()
}
</script>

<style scoped>
.game-layout {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

.menu-item {
  user-select: none;
}

/* 移动端菜单动画 */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}

.slide-enter-from aside,
.slide-leave-to aside {
  transform: translateX(-100%);
}

/* 移动端优化 */
@media (max-width: 768px) {
  .main-container {
    padding-bottom: 72px; /* 底部导航栏高度 */
  }
}
</style>
