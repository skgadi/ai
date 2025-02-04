<template>
  <div style="height: 100%; overflow: hidden">
    <div ref="header">
      <slot name="header" />
    </div>
    <div ref="body" :style="bodyStyle">
      <slot name="body" />
    </div>
    <div ref="footer">
      <slot name="footer" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'

const header = ref(<HTMLElement | null>null)
const body = ref(<HTMLElement | null>null)
const footer = ref(<HTMLElement | null>null)
const bodyStyle = computed(() => ({
  height: `calc(100% - ${(header.value?.clientHeight ?? 0) + (footer.value?.clientHeight ?? 0)}px)`,
  overflow: 'auto',
}))
</script>
