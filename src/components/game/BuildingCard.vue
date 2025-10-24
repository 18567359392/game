<template>
  <GameCard :hoverable="!isDisabled" class="building-card">
    <template #header>
      <div class="flex items-start md:items-center justify-between gap-2">
        <div class="flex items-start md:items-center gap-2 md:gap-3 flex-1 min-w-0">
          <Icon :icon="building.icon" class="text-2xl md:text-3xl text-blue-500 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <h3 class="text-base md:text-lg font-bold text-gray-900 dark:text-white truncate">
              {{ building.name }}
              <span v-if="instance" class="text-xs md:text-sm text-gray-500">Lv.{{ instance.level }}</span>
            </h3>
            <p class="text-xs md:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {{ building.description }}
            </p>
          </div>
        </div>
        
        <div v-if="instance" class="building-status flex-shrink-0">
          <span :class="statusClass" class="text-xs md:text-sm">{{ statusText }}</span>
        </div>
      </div>
    </template>

    <!-- 建筑信息 -->
    <div class="space-y-2 md:space-y-3 mb-3 md:mb-4">
      <!-- 产出信息 -->
      <div v-if="production && Object.keys(production).length > 0">
        <div class="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">产出:</div>
        <div class="flex flex-wrap gap-1 md:gap-2">
          <div
            v-for="(amount, resource) in production"
            :key="resource"
            class="flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 bg-green-100 dark:bg-green-900 rounded text-xs md:text-sm"
          >
            <Icon :icon="getResourceIcon(resource)" class="text-green-600 dark:text-green-400" />
            <span class="text-green-700 dark:text-green-300">+{{ (amount || 0).toFixed(1) }}/s</span>
          </div>
        </div>
      </div>

      <!-- 人口提供 -->
      <div v-if="building.population">
        <div class="flex items-center gap-1.5 md:gap-2">
          <Icon icon="game-icons:people" class="text-blue-500" />
          <span class="text-xs md:text-sm text-gray-700 dark:text-gray-300">
            人口上限: <span class="font-semibold">+{{ building.population }}</span>
          </span>
        </div>
      </div>

      <!-- 建造/升级成本 -->
      <div>
        <div class="text-xs md:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
          {{ instance ? '升级' : '建造' }}成本:
        </div>
        <div class="flex flex-wrap gap-1 md:gap-2">
          <div
            v-for="(amount, resource) in cost"
            :key="resource"
            :class="[
              'flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 rounded text-xs md:text-sm',
              hasEnoughResource(resource, amount || 0)
                ? 'bg-gray-100 dark:bg-gray-700'
                : 'bg-red-100 dark:bg-red-900'
            ]"
          >
            <Icon :icon="getResourceIcon(resource)" />
            <span :class="hasEnoughResource(resource, amount || 0) ? '' : 'text-red-600 dark:text-red-400'">
              {{ amount }}
            </span>
          </div>
        </div>
      </div>

      <!-- 建造/升级时间 -->
      <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400">
        <Icon icon="mdi:clock-outline" class="inline mr-1" />
        {{ instance ? '升级' : '建造' }}时间: {{ formattedTime }}
      </div>
    </div>

    <!-- 进度条 -->
    <div v-if="showProgress" class="mb-3 md:mb-4">
      <ProgressBar
        :percentage="progress"
        :estimated-time="remainingTime"
        :show-time="true"
        :label="instance?.status === 'building' ? '建造中' : '升级中'"
        color="blue"
      />
    </div>

    <!-- 操作按钮 -->
    <template #footer>
      <GameButton
        v-if="!instance || (instance.status === 'built' && instance.level < building.maxLevel)"
        :disabled="!canBuild"
        :variant="canBuild ? 'primary' : 'secondary'"
        size="sm"
        class="w-full text-xs md:text-sm"
        @click="handleBuild"
      >
        {{ instance ? `升级到 Lv.${instance.level + 1}` : '建造' }}
      </GameButton>
      
      <div v-else-if="instance?.level === building.maxLevel" class="text-center text-xs md:text-sm text-gray-500">
        已达到最大等级
      </div>
    </template>
  </GameCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { type Building, type BuildingInstance, type ResourceAmount } from '@/types'
import { useBuildingStore } from '@/stores/building'
import { useResourceStore } from '@/stores/resource'
import { resourceMap } from '@/config/resources'
import GameCard from '@/components/ui/GameCard.vue'
import GameButton from '@/components/ui/GameButton.vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'

interface Props {
  building: Building
}

const props = defineProps<Props>()

const buildingStore = useBuildingStore()
const resourceStore = useResourceStore()

const instance = computed<BuildingInstance | undefined>(() => 
  buildingStore.getBuildingInstance(props.building.id)
)

const cost = computed<ResourceAmount>(() => {
  if (instance.value) {
    return buildingStore.calculateUpgradeCost(props.building.id)
  }
  return props.building.buildCost
})

const production = computed<ResourceAmount | undefined>(() => {
  if (!instance.value) {
    return props.building.production
  }
  return buildingStore.calculateProduction(props.building.id)
})

const canBuild = computed(() => {
  const check = buildingStore.canBuild(props.building.id)
  return check.can
})

const isDisabled = computed(() => !canBuild.value)

const statusClass = computed(() => {
  if (!instance.value) return ''
  
  switch (instance.value.status) {
    case 'building':
      return 'text-blue-600 dark:text-blue-400 font-semibold'
    case 'upgrading':
      return 'text-purple-600 dark:text-purple-400 font-semibold'
    case 'built':
      return 'text-green-600 dark:text-green-400'
    default:
      return ''
  }
})

const statusText = computed(() => {
  if (!instance.value) return ''
  
  switch (instance.value.status) {
    case 'building':
      return '建造中'
    case 'upgrading':
      return '升级中'
    case 'built':
      return '已建造'
    default:
      return ''
  }
})

const showProgress = computed(() => {
  return instance.value && (instance.value.status === 'building' || instance.value.status === 'upgrading')
})

const progress = computed(() => {
  if (!instance.value) return 0
  return buildingStore.getBuildingProgress(props.building.id)
})

const remainingTime = computed(() => {
  if (!instance.value) return 0
  return buildingStore.getRemainingTime(props.building.id)
})

const formattedTime = computed(() => {
  const time = instance.value 
    ? props.building.upgradeTime 
    : props.building.buildTime
  
  if (time < 60) return `${time}秒`
  if (time < 3600) return `${Math.floor(time / 60)}分钟`
  return `${Math.floor(time / 3600)}小时`
})

function hasEnoughResource(resource: string, amount: number): boolean {
  return resourceStore.getResourceAmount(resource as any) >= amount
}

function getResourceIcon(resource: string): string {
  const res = resourceMap.get(resource as any)
  return res?.icon || 'mdi:help-circle'
}

function handleBuild() {
  if (canBuild.value) {
    buildingStore.buildBuilding(props.building.id)
  }
}
</script>

<style scoped>
.building-card {
  transition: all 0.3s ease;
}

.building-card:hover {
  transform: translateY(-4px);
}
</style>
