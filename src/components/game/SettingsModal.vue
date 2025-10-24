<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGameStore } from '@/stores/game'
import { useSaveStore } from '@/stores/save'
import GameButton from '@/components/ui/GameButton.vue'
import { GAME_SPEED } from '@/config/constants'

const gameStore = useGameStore()
const saveStore = useSaveStore()

const show = ref(false)
const activeTab = ref<'general' | 'save' | 'about'>('general')

const currentSpeed = computed(() => gameStore.gameSpeed)

const speedOptions = [
  { value: GAME_SPEED.CASUAL, label: '休闲', icon: 'mdi:tortoise' },
  { value: GAME_SPEED.NORMAL, label: '标准', icon: 'mdi:walk' },
  { value: GAME_SPEED.FAST, label: '快速', icon: 'mdi:run-fast' },
  { value: GAME_SPEED.TURBO, label: '极速', icon: 'mdi:rocket-launch' }
]

function open() {
  show.value = true
}

function close() {
  show.value = false
}

function setSpeed(speed: number) {
  gameStore.setGameSpeed(speed)
}

function handleSave() {
  if (saveStore.saveGame()) {
    alert('保存成功!')
  }
}

function handleLoad() {
  if (confirm('确定要加载存档吗？当前进度将被覆盖！')) {
    if (saveStore.loadGame()) {
      alert('加载成功!')
      close()
    }
  }
}

function handleExport() {
  saveStore.exportSave()
}

function handleImport() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const data = event.target?.result as string
        if (saveStore.importSave(data)) {
          alert('导入成功!')
          close()
        } else {
          alert('导入失败,请检查文件格式!')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

function handleNewGame() {
  if (confirm('确定要开始新游戏吗？当前进度将丢失！')) {
    saveStore.newGame()
    alert('新游戏已开始!')
    close()
  }
}

defineExpose({ open, close })
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click.self="close">
        <div class="modal-content">
          <!-- 标题栏 -->
          <div class="modal-header">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white">
              游戏设置
            </h2>
            <button @click="close" class="close-button">
              <Icon icon="mdi:close" width="24" height="24" />
            </button>
          </div>

          <!-- 标签页 -->
          <div class="tabs">
            <button
              v-for="tab in [
                { id: 'general', label: '常规', icon: 'mdi:cog' },
                { id: 'save', label: '存档', icon: 'mdi:content-save' },
                { id: 'about', label: '关于', icon: 'mdi:information' }
              ]"
              :key="tab.id"
              :class="['tab', { active: activeTab === tab.id }]"
              @click="activeTab = tab.id as any"
            >
              <Icon :icon="tab.icon" width="20" height="20" />
              <span>{{ tab.label }}</span>
            </button>
          </div>

          <!-- 内容区 -->
          <div class="modal-body">
            <!-- 常规设置 -->
            <div v-if="activeTab === 'general'" class="settings-section">
              <h3 class="section-title">游戏速度</h3>
              <div class="speed-options">
                <button
                  v-for="option in speedOptions"
                  :key="option.value"
                  :class="['speed-option', { active: currentSpeed === option.value }]"
                  @click="setSpeed(option.value)"
                >
                  <Icon :icon="option.icon" width="24" height="24" />
                  <span>{{ option.label }}</span>
                  <span class="speed-multiplier">{{ option.value }}x</span>
                </button>
              </div>

              <h3 class="section-title mt-6">游戏信息</h3>
              <div class="info-grid">
                <div class="info-item">
                  <span class="info-label">游戏时间:</span>
                  <span class="info-value">{{ gameStore.formattedGameTime }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">当前时代:</span>
                  <span class="info-value">{{ gameStore.currentEra }}</span>
                </div>
                <div class="info-item">
                  <span class="info-label">人口:</span>
                  <span class="info-value">{{ Math.floor(gameStore.population.current) }} / {{ gameStore.population.max }}</span>
                </div>
              </div>
            </div>

            <!-- 存档管理 -->
            <div v-if="activeTab === 'save'" class="settings-section">
              <div class="save-actions">
                <GameButton variant="primary" class="w-full" @click="handleSave">
                  <Icon icon="mdi:content-save" width="20" height="20" />
                  <span>保存游戏</span>
                </GameButton>

                <GameButton variant="secondary" class="w-full" @click="handleLoad">
                  <Icon icon="mdi:folder-open" width="20" height="20" />
                  <span>加载存档</span>
                </GameButton>

                <GameButton variant="secondary" class="w-full" @click="handleExport">
                  <Icon icon="mdi:export" width="20" height="20" />
                  <span>导出存档</span>
                </GameButton>

                <GameButton variant="secondary" class="w-full" @click="handleImport">
                  <Icon icon="mdi:import" width="20" height="20" />
                  <span>导入存档</span>
                </GameButton>

                <GameButton variant="danger" class="w-full" @click="handleNewGame">
                  <Icon icon="mdi:refresh" width="20" height="20" />
                  <span>新游戏</span>
                </GameButton>
              </div>
            </div>

            <!-- 关于 -->
            <div v-if="activeTab === 'about'" class="settings-section">
              <div class="about-content">
                <h3 class="text-xl font-bold mb-2">文明发展模拟</h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  一个放置类文明发展模拟游戏
                </p>
                <div class="info-grid">
                  <div class="info-item">
                    <span class="info-label">版本:</span>
                    <span class="info-value">0.1.0-alpha</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">技术栈:</span>
                    <span class="info-value">Vue 3 + TypeScript + Vite</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  @apply fixed inset-0 bg-black/50 backdrop-blur-sm;
  @apply flex items-center justify-center z-50;
}

.modal-content {
  @apply bg-white dark:bg-gray-800 rounded-2xl shadow-2xl;
  @apply max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden;
  @apply flex flex-col;
}

.modal-header {
  @apply flex items-center justify-between;
  @apply p-6 border-b border-gray-200 dark:border-gray-700;
}

.close-button {
  @apply p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700;
  @apply text-gray-500 dark:text-gray-400;
  @apply transition-colors;
}

.tabs {
  @apply flex border-b border-gray-200 dark:border-gray-700;
  @apply px-6;
}

.tab {
  @apply flex items-center gap-2 px-4 py-3;
  @apply text-gray-600 dark:text-gray-400;
  @apply border-b-2 border-transparent;
  @apply transition-all;
}

.tab:hover {
  @apply text-gray-900 dark:text-white;
  @apply bg-gray-50 dark:bg-gray-700/50;
}

.tab.active {
  @apply text-blue-600 dark:text-blue-400;
  @apply border-blue-600 dark:border-blue-400;
}

.modal-body {
  @apply p-6 overflow-y-auto flex-1;
}

.settings-section {
  @apply space-y-4;
}

.section-title {
  @apply text-lg font-semibold text-gray-800 dark:text-white mb-3;
}

.speed-options {
  @apply grid grid-cols-2 gap-3;
}

.speed-option {
  @apply flex flex-col items-center gap-2 p-4 rounded-lg;
  @apply bg-gray-100 dark:bg-gray-700;
  @apply border-2 border-transparent;
  @apply transition-all;
}

.speed-option:hover {
  @apply bg-gray-200 dark:bg-gray-600;
}

.speed-option.active {
  @apply border-blue-600 bg-blue-50 dark:bg-blue-900/20;
  @apply text-blue-600 dark:text-blue-400;
}

.speed-multiplier {
  @apply text-sm font-semibold;
}

.info-grid {
  @apply grid grid-cols-1 gap-3;
}

.info-item {
  @apply flex justify-between items-center;
  @apply p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg;
}

.info-label {
  @apply text-gray-600 dark:text-gray-400;
}

.info-value {
  @apply font-semibold text-gray-900 dark:text-white;
}

.save-actions {
  @apply flex flex-col gap-3;
}

.about-content {
  @apply text-center;
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
