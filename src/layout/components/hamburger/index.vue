<template>
  <div class="hamburger-container" @click="toggleClick">
    <svg-icon class="hamburger" :icon="icon"></svg-icon>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useAppStoreHook } from '@/store/modules/app';

const store = useAppStoreHook();
const toggleClick = () => {
  store.triggerSidebarOpened();
};

const icon = computed(() => (store.sidebarOpened ? 'hamburger-opened' : 'hamburger-closed'));
</script>

<style lang="scss" scoped>
.hamburger-container {
  padding: 0 16px;
  .hamburger {
    display: inline-block;
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
}
</style>
