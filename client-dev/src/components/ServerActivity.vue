<template>
  <div>
    <q-icon :name="iconName.name" :class="iconName.class" size="md" />
  </div>
</template>
<script setup lang="ts">
import { useSocketStore } from 'src/stores/socket'
import { computed } from 'vue'

const socketStore = useSocketStore()

const iconName = computed(() => {
  switch (socketStore.getActivity) {
    case 'idle':
      return { name: 'mdi-wifi', class: 'text-grey' }
    case 'both':
      return { name: 'mdi-wifi-arrow-up-down', class: 'text-blue' }
    case 'sent':
      return { name: 'mdi-wifi-arrow-up', class: 'text-green' }
    case 'received':
      return { name: 'mdi-wifi-arrow-down', class: 'text-green' }
    case 'not-connected':
      return { name: 'mdi-wifi-off', class: 'text-red' }
    default:
      return { name: 'mdi-wifi-off', class: 'text-grey' }
  }
})
</script>
