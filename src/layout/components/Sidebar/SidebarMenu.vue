<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    uniqueOpened="true"
    :default-active="activeMenu"
    :background-color="settingStore.cssVar.menuBg"
    :text-color="settingStore.cssVar.menuText"
    :active-text-color="settingStore.cssVar.menuActiveText"
    :collapse="!appStore.sidebarOpened"
    router
  >
    <sidebar-item v-for="item in routes" :key="item.path" :route="item"></sidebar-item>
  </el-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { filterRouters, generateMenus } from '@/utils/route';
import SidebarItem from './SidebarItem.vue';
import { useSettingStoreHook } from '@/store/modules/setting';
import { useAppStoreHook } from '@/store/modules/app';
const settingStore = useSettingStoreHook();
const appStore = useAppStoreHook();
const router = useRouter();
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes());
  console.log('%c Line:29 🍅 filterRoutes', 'color:#ffdd4d', filterRoutes);
  return generateMenus(filterRoutes);
});
// 计算高亮 menu 的方法
const route = useRoute();
const activeMenu = computed(() => {
  const { path } = route;
  return path;
});
</script>
