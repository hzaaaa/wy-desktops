<template>
	<Tabs v-if="themeStore.tabs && route.meta.atTabs" />
	<el-main>
		<router-view v-slot="{ Component, route }" v-if="routeName!=='platformManagement'">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="keepAliveStore.keepAliveName">
					<component :is="Component" :key="route.fullPath" />
				</keep-alive>
			</transition>
		</router-view>
		<!-- iframe页 -->

	</el-main>
	<component
		
		:key="hasOpenComponentsArr[0].name"
		:is="hasOpenComponentsArr[0].component"
		v-if="routeName==='platformManagement'"
	></component>
</template>

<script setup lang="ts">
import Tabs from "@/layouts/components/Tabs/Tabs.vue";
import { useThemeStore } from "@/stores/theme";
import { useKeepAliveStore } from "@/stores/keepAlive";
import api2 from "@/views/platformManagement/api2.vue";
import api from "@/views/platformManagement/api.vue";
import home from "@/views/platformManagement/home.vue";
import { useAuthStore } from "@/stores/auth";

const route = useRoute();
const themeStore = useThemeStore();
const keepAliveStore = useKeepAliveStore();
const authStore = useAuthStore();
console.log("authStore", authStore.subShowMenuListGet);

const hasOpenComponentsArr = [
	{
		"path": "/platformManagement",
		"name": "platformManagement",
		component: home,
		meta: {
			title: "首页",
			isKeepAlive: true,
			isHide: true,
			atTabs: true,
		},
	},
	// {
	// 	path: "/platformManagement/api",
	// 	name: "api",
	// 	component: api,
	// 	meta: {
	// 		title: "订阅平台",
	// 		isKeepAlive: true,
	// 		isHide: true,
	// 		atTabs: true,
	// 	},
	// },
	// {
	// 	path: "/platformManagement/api2",
	// 	name: "api2",
	// 	component: api2,
	// 	meta: {
	// 		title: "订阅平台2",
	// 		isKeepAlive: true,
	// 		isHide: true,
	// 		atTabs: true,
	// 	},
	// },
];
const routeName = computed(()=>{
  return route.name;
})
const pathAtArr = computed(() => {
	let flag = false;
	hasOpenComponentsArr.forEach((item: any) => {
		if (item.path === route.path) {
			flag = true;
		}
	});
	// debugger
	return flag;
});
</script>

<style scoped lang="scss">
.el-main {
	overflow: hidden;
	box-sizing: border-box;
	// background-color: #f0f2f5;
	padding: 0;
	border-radius: 10px;
	// :deep(.el-card) {
	//   border: none;
	// }

	&::-webkit-scrollbar {
		background-color: #f0f2f5;
	}
}
</style>
