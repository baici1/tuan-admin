import { defineStore } from 'pinia';
import store from '@/store/index';
import variables from '@/styles/variables.module.scss';
export const useSettingStore = defineStore({
  id: 'setting', // id必填，且需要唯一
  state: () => {
    return {
      cssVar: variables,
    };
  },
});

export function useSettingStoreHook() {
  return useSettingStore(store);
}
