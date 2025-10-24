<template>
  <div class="building-panel">
    <!-- 筛选器 -->
    <div class="mb-4 md:mb-6 flex flex-col sm:flex-row gap-2 md:gap-3">
      <select 
        v-model="filterType" 
        class="px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm md:text-base rounded-lg border-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">所有建筑</option>
        <option value="production">生产类</option>
        <option value="storage">存储类</option>
        <option value="population">人口类</option>
        <option value="functional">功能类</option>
      </select>

      <select 
        v-model="filterEra"
        class="px-3 md:px-4 py-2 bg-gray-100 dark:bg-gray-700 text-sm md:text-base rounded-lg border-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">所有时代</option>
        <option value="stone">石器时代</option>
        <option value="bronze">青铜时代</option>
        <option value="iron">铁器时代</option>
        <option value="industrial">工业时代</option>
        <option value="information">信息时代</option>
        <option value="space">太空时代</option>
        <option value="interstellar">星际时代</option>
        <option value="hyperdimensional">超维时代</option>
      </select>

      <div class="flex-1 hidden sm:block"></div>
      
      <div class="text-xs md:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
        <Icon icon="mdi:information-outline" />
        共 {{ filteredBuildings.length }} 个建筑
      </div>
    </div>

    <!-- 建筑网格 -->
    <div v-if="filteredBuildings.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <BuildingCard
        v-for="building in filteredBuildings"
        :key="building.id"
        :building="building"
      />
    </div>

    <!-- 空状态 -->
    <div v-else class="text-center py-8 md:py-12">
      <Icon icon="mdi:home-search-outline" class="text-5xl md:text-6xl text-gray-400 mb-3 md:mb-4" />
      <p class="text-sm md:text-base text-gray-500 dark:text-gray-400">没有符合条件的建筑</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'
import { buildings } from '@/config/buildings'
import { BuildingType, Era } from '@/types'
import BuildingCard from './BuildingCard.vue'

const filterType = ref<'all' | BuildingType>('all')
const filterEra = ref<'all' | Era>('all')

const filteredBuildings = computed(() => {
  return buildings.filter(building => {
    if (filterType.value !== 'all' && building.type !== filterType.value) {
      return false
    }
    if (filterEra.value !== 'all' && building.era !== filterEra.value) {
      return false
    }
    return true
  })
})
</script>
