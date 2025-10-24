<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import MainLayout from './components/game/MainLayout.vue'
import { useGameStore } from './stores/game'
import { useResourceStore } from './stores/resource'
import { useTechStore } from './stores/tech'
import { useAchievementStore } from './stores/achievement'
import { useSaveStore } from './stores/save'
import { useGameEngine } from '@/composables/useGameEngine'
import { AUTO_SAVE_INTERVAL } from '@/config/constants'

const gameStore = useGameStore()
const resourceStore = useResourceStore()
const techStore = useTechStore()
const achievementStore = useAchievementStore()
const saveStore = useSaveStore()
const { startEngine, stopEngine } = useGameEngine()

let autoSaveInterval: number | null = null

onMounted(() => {
  // 尝试加载存档
  if (saveStore.hasSave()) {
    saveStore.loadGame()
    console.log('存档加载成功')
  } else {
    // 初始化资源
    resourceStore.initializeResources()
    // 初始化科技
    techStore.initializeTechs()
    // 初始化成就
    achievementStore.initializeAchievements()
    console.log('开始新游戏')
  }
  
  // 开始游戏
  gameStore.startGame()
  
  // 启动游戏引擎
  startEngine()
  
  // 启动自动保存
  autoSaveInterval = window.setInterval(() => {
    saveStore.saveGame()
  }, AUTO_SAVE_INTERVAL)
  
  console.log('游戏启动完成')
})

// 页面卸载时保存并停止游戏引擎
onUnmounted(() => {
  saveStore.saveGame()
  stopEngine()
  if (autoSaveInterval) {
    clearInterval(autoSaveInterval)
  }
})
</script>

<template>
  <MainLayout />
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 移动端适配 */
@media (max-width: 768px) {
  body {
    font-size: 14px;
  }
  
  /* 禁止移动端双击缩放 */
  * {
    touch-action: manipulation;
  }
}

/* 防止移动端滑动弹性 */
html, body {
  overscroll-behavior: none;
}
</style>
