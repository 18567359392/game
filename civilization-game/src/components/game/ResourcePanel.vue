<template>
  <div class="resource-panel grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3">
    <ResourceItem
      v-for="resource in displayedResources"
      :key="resource.id"
      :name="resource.name"
      :icon="resource.icon"
      :amount="getAmount(resource.id)"
      :limit="getLimit(resource.id)"
      :change="getChange(resource.id)"
      :show-limit="resource.category !== 'special'"
      :show-progress-bar="resource.category !== 'special'"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useResourceStore } from '@/stores/resource'
import { resources } from '@/config/resources'
import ResourceItem from '@/components/ui/ResourceItem.vue'
import { type ResourceType } from '@/types'

const resourceStore = useResourceStore()

// 根据当前时代筛选应该显示的资源
const displayedResources = computed(() => {
  return resources.filter(resource => {
    const amount = resourceStore.getResourceAmount(resource.id)
    // 显示有数量的资源,或者基础资源始终显示
    return amount > 0 || resource.category === 'basic' || resource.category === 'special'
  })
})

function getAmount(resourceId: ResourceType): number {
  return resourceStore.getResourceAmount(resourceId)
}

function getLimit(resourceId: ResourceType): number {
  return resourceStore.getResourceLimit(resourceId)
}

function getChange(resourceId: ResourceType): number {
  const production = resourceStore.productionRates[resourceId] || 0
  const consumption = resourceStore.consumptionRates[resourceId] || 0
  return production - consumption
}
</script>
