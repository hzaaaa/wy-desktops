<template>
	<div class="tool-bar-lf" style="    flex: 1;display: flex;justify-content: center;">
		<el-menu :default-active="activeTopMenu" mode="horizontal" :router="false" style="    background-color: rgb(17, 38, 37);">
			<TopMenu :topMenuList="topMenuList" />
		</el-menu>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import TopMenu from "@/layouts/components/Menu/TopMenu.vue";

const route = useRoute();
const authStore = useAuthStore();

const topMenuList = computed(() => {
	console.log(authStore.showMenuListGet);
	return authStore.showMenuListGet;
});
const activeTopMenu = computed(() => {
	const activeTopMenuPath = authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path]
		? authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path][0].path
		: "";
	if (activeTopMenuPath.length) authStore.setActiveTopMenu(activeTopMenuPath);
	// console.log(authStore.activeTopMenuPathGet);
	return activeTopMenuPath;
});
</script>

<style lang="scss" scoped></style>
