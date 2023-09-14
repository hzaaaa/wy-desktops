<template>
	<div class="platformManagement">
		<el-row :gutter="20">
			<el-col :span="12">
				<div class="grid-content apiManageBg" @click="router.push('api')"></div>

				<div class="title">订阅平台</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content marketManageBg" @click="router.push('api2')"></div>

				<div class="title">运营平台</div>
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<div class="grid-content autoInsuranceManageBg"></div>

				<div class="title">车险风控</div>
			</el-col>
			<el-col :span="12">
				<div class="grid-content strategyManageBg"></div>

				<div class="title">策略平台</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
defineOptions({
	name: "home",
});

let router = useRouter();
</script>

<style lang="scss" scoped>
.platformManagement {
	height: 100%;
	display: flex;
	flex-direction: column;
	background: #fff;
}
:deep(.el-row) {
	margin-bottom: 20px;
	flex: 1;
}

:deep(.el-row:last-child) {
	margin-bottom: 0;
}

:deep(.el-col) {
	border-radius: 4px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	.title{
		font-size: 30px;
	}
}

.grid-content {
	border-radius: 4px;
	width: 240px;
	height: 240px;
	
}
// :deep(.el-col:hover){
// 	.title{
// 		display: block;
// 	}
// }
.apiManageBg {
	background: url("@/assets/images/logo/apiManage.png") no-repeat;
	background-size: 100%;
}
.marketManageBg {
	background: url("@/assets/images/logo/marketManage.png") no-repeat;
	background-size: 100%;
}
.autoInsuranceManageBg {
	background: url("@/assets/images/logo/autoInsuranceManage.png") no-repeat;
	background-size: 100%;
}
.strategyManageBg {
	background: url("@/assets/images/logo/strategyManage.png") no-repeat;
	background-size: 100%;
}
:deep(.el-dialog__body) {
	flex: 1;
	padding-left: 0;
	padding-right: 0;
	padding-bottom: 0;
}
:deep(.el-dialog.is-fullscreen) {
	padding: 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}
:deep(.el-dialog.is-draggable) {
	padding: 0;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	height: 80%;
}
</style>
