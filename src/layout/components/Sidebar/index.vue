<template>
  <div class="">
    <div class="logo-container">
      <el-avatar :size="logoHeight" shape="square" src="http://project.yangdiy.cn/tuan.png" />
      <h1 v-if="appStore.sidebarOpened" class="logo-title">tuan-admin</h1>
    </div>
    <el-scrollbar>
      <sidebar-menu></sidebar-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import SidebarMenu from './SidebarMenu.vue';
import { useAppStoreHook } from '@/store/modules/app';
const appStore = useAppStoreHook();
const logoHeight = 44;
</script>
<style lang="scss" scoped>
.logo-container {
  height: 54px;
  padding: 10px 0 22px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .logo-title {
    margin-left: 10px;
    color: #fff;
    font-weight: 600;
    line-height: 50px;
    font-size: 16px;
    white-space: nowrap;
  }
}
</style>
