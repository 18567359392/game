<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { useGameStore } from '@/stores/game'

const gameStore = useGameStore()

const show = ref(false)
const currentEraName = ref('')
const eraIcon = ref('')
const eraDescription = ref('')

// 时代配置
const eraConfig = {
  stone: {
    name: '石器时代',
    icon: 'game-icons:stone-axe',
    description: '人类开始使用石器工具,学会使用火焰',
    color: 'from-gray-500 to-gray-700'
  },
  bronze: {
    name: '青铜时代',
    icon: 'game-icons:metal-bar',
    description: '掌握青铜冶炼技术,文明开始发展',
    color: 'from-yellow-600 to-orange-600'
  },
  iron: {
    name: '铁器时代',
    icon: 'game-icons:anvil',
    description: '铁器的使用带来生产力的飞跃',
    color: 'from-gray-600 to-gray-800'
  },
  industrial: {
    name: '工业时代',
    icon: 'game-icons:factory',
    description: '蒸汽机的发明开启工业革命',
    color: 'from-slate-600 to-slate-800'
  },
  information: {
    name: '信息时代',
    icon: 'game-icons:processor',
    description: '计算机和互联网改变世界',
    color: 'from-blue-500 to-cyan-500'
  },
  space: {
    name: '太空时代',
    icon: 'game-icons:rocket',
    description: '人类踏入太空,探索星辰大海',
    color: 'from-indigo-600 to-purple-600'
  },
  interstellar: {
    name: '星际时代',
    icon: 'game-icons:galaxy',
    description: '跨越星系,建立星际文明',
    color: 'from-purple-600 to-pink-600'
  },
  hyperdimensional: {
    name: '超维时代',
    icon: 'game-icons:quantum-entanglement',
    description: '超越维度,掌控时空',
    color: 'from-pink-600 to-red-600'
  }
}

const currentColor = computed(() => {
  const era = gameStore.currentEra
  return eraConfig[era as keyof typeof eraConfig]?.color || 'from-gray-500 to-gray-700'
})

// 监听时代变化事件
gameStore.addEventListener('eraChanged', (data: { oldEra: string; newEra: string }) => {
  const config = eraConfig[data.newEra as keyof typeof eraConfig]
  if (config) {
    currentEraName.value = config.name
    eraIcon.value = config.icon
    eraDescription.value = config.description
    show.value = true
    
    // 3秒后自动关闭
    setTimeout(() => {
      show.value = false
    }, 3000)
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="era-transition">
      <div v-if="show" class="era-transition-overlay">
        <div class="era-transition-content">
          <!-- 背景光效 -->
          <div class="era-glow" :class="currentColor"></div>
          
          <!-- 时代图标 -->
          <div class="era-icon-wrapper">
            <Icon :icon="eraIcon" class="era-icon" />
          </div>
          
          <!-- 时代名称 -->
          <h1 class="era-title">
            {{ currentEraName }}
          </h1>
          
          <!-- 时代描述 -->
          <p class="era-description">
            {{ eraDescription }}
          </p>
          
          <!-- 装饰线条 -->
          <div class="era-lines">
            <div class="era-line"></div>
            <div class="era-line"></div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.era-transition-overlay {
  @apply fixed inset-0 z-50;
  @apply flex items-center justify-center;
  @apply bg-black/80 backdrop-blur-md;
}

.era-transition-content {
  @apply relative flex flex-col items-center justify-center;
  @apply text-center;
  animation: fadeInScale 0.8s ease-out;
}

.era-glow {
  @apply absolute inset-0;
  @apply bg-gradient-to-br opacity-30;
  @apply blur-3xl;
  animation: pulse 2s ease-in-out infinite;
}

.era-icon-wrapper {
  @apply relative z-10 mb-8;
  animation: iconFloat 2s ease-in-out infinite;
}

.era-icon {
  @apply w-32 h-32 text-white;
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.5));
}

.era-title {
  @apply relative z-10 text-6xl font-bold text-white mb-4;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  animation: titleGlow 2s ease-in-out infinite;
}

.era-description {
  @apply relative z-10 text-xl text-gray-300 max-w-2xl;
  animation: fadeIn 1s ease-out 0.3s backwards;
}

.era-lines {
  @apply absolute inset-0 flex items-center justify-center;
  @apply pointer-events-none;
}

.era-line {
  @apply absolute h-px bg-gradient-to-r from-transparent via-white/50 to-transparent;
  @apply w-96;
}

.era-line:first-child {
  transform: rotate(45deg);
  animation: lineExpand 1s ease-out;
}

.era-line:last-child {
  transform: rotate(-45deg);
  animation: lineExpand 1s ease-out 0.1s backwards;
}

/* 动画 */
.era-transition-enter-active,
.era-transition-leave-active {
  transition: opacity 0.5s ease;
}

.era-transition-enter-from,
.era-transition-leave-to {
  opacity: 0;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes iconFloat {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes titleGlow {
  0%, 100% {
    text-shadow: 0 0 30px rgba(255, 255, 255, 0.8);
  }
  50% {
    text-shadow: 0 0 50px rgba(255, 255, 255, 1);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes lineExpand {
  from {
    width: 0;
  }
  to {
    width: 384px; /* w-96 */
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
