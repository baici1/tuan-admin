import { defineStore } from 'pinia';
import store from '@/store/index';
export const useAppStore = defineStore({
  id: 'app', // id必填，且需要唯一
  state: () => {
    return {
      sidebarOpened: false,
    };
  },
  getters: {},
  actions: {
    triggerSidebarOpened() {
      this.sidebarOpened = !this.sidebarOpened;
    },
  },
});

export function useAppStoreHook() {
  return useAppStore(store);
}
