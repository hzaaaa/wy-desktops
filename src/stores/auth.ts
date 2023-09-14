import { defineStore } from "pinia";
import { getAuthButtonListApi } from "@/api/login";
import { getFlatRouteList, getShowMenuList, getAllBreadcrumbList, menuFormat ,getSubMenuList} from "@/routers/backEnd";
import { getMenuTreeApi } from "@/api/system/menu";

// AuthStore 菜单、权限相关存储
export const useAuthStore = defineStore({
  id: "AuthStore",
  state: (): any => ({
    // 按钮权限列表
    authButtonList: [],
    // 菜单权限列表 ==> 符合前端需求的树状结构路由
    authRouteList: [],

    showAuthMenuList: [],
		activeTopMenuPath: "",
  }),
  getters: {
    // 按钮权限列表
    authButtonListGet: (state) => state.authButtonList,
    // 菜单权限列表
    authRouteListGet: (state) => state.authRouteList,
    // 扁平化后一维数组菜单，用于添加动态路由
    flatRouteListGet: (state) => getFlatRouteList(state.authRouteList),
    // 左侧菜单栏渲染，树状结构，剔除 isHide == true
    showMenuListGet: (state) => getShowMenuList(state.authRouteList),
    // 面包屑导航列表，树状结构
    breadcrumbListGet: (state) => getAllBreadcrumbList(state.authRouteList),
    // 顶部导航path
		activeTopMenuPathGet: (state) => state.activeTopMenuPath,
		// 左侧菜单渲染
		subShowMenuListGet: (state) => getSubMenuList(state.authRouteList, state.activeTopMenuPath),
    // 后端返回的菜单列表 ==> 这里没有经过任何处理
		authMenuListGet: (state) => state.authRouteList,
  },
  actions: {
    // 获取按钮权限列表
    async getAuthButtonList() {
      const { data } = await getAuthButtonListApi();
      this.authButtonList = data;
    },
    // 设置菜单列表
    async getAuthRouteList(roleId: number) {
      const { data } = await<any> getMenuTreeApi({ roleId });
      this.authRouteList = menuFormat(data);
      
      
    },
    // set activeTopMenu
		async setActiveTopMenu(menuPath: string) {
			this.activeTopMenuPath = menuPath;
		},
  },
  persist: { key: "AuthStore", storage: localStorage, paths: ["authButtonList"] },
});
