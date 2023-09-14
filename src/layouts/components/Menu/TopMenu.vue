<template>
	<el-menu-item v-for="subItem in topMenuList" :key="subItem.path" :index="subItem.path" @click="handleClickTopMenu(subItem)">
		<!-- <el-icon size="12" v-if="subItem.meta.icon" color="#ffffff">
			<component :is="subItem.meta.icon"></component>
		</el-icon> -->
		<template #title>
			<span>{{ subItem.meta.title }}</span>
		</template>
	</el-menu-item>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth";
defineProps<{ topMenuList: any }>();

const authStore = useAuthStore();
const router = useRouter();
const handleClickTopMenu = (subItem: any) => {
	// authStore.setActiveTopMenu()
	if (subItem.meta.isLink) return window.open(subItem.meta.isLink, "_blank");
	if (authStore.activeTopMenuPathGet != subItem.path) {
		router.push(subItem.path);
	}
};
</script>

<style lang="scss" scoped>
.el-menu {
	.el-menu-item {
		position: relative;
		align-items: flex-start;
		border-bottom: none;
		height: 80px;
		background-color: #112625;
		vertical-align: top;
		color: #adb7b7;
		span {
			margin-top: 24px;
			height: 22px;
			line-height: 22px;
			font-size: 16px;
		}
		&:hover {
			background-color: #112625 !important;

			// span {
			// 	color: #000000;
			// }
			color: #fff;
		}
		&:focus {
			background-color: #112625 !important;

			// span {
			// 	color: #000000;
			// }
			color: #fff;
		}
		&::before {
			// display: none;
			position: absolute;
			bottom: 23px;
			width: 0;
			height: 0;
			background: #fff;
			content: "";
			transition: all 0.5s ease;
		}
	}
	.el-menu-item.is-active {
		color: #fff !important;
		&::before {
			display: block;
			width: 24px;
			height: 4px;
		}
	}
}
</style>
