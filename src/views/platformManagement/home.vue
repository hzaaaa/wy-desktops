<template>
	<div class="system" id="system">
		
	</div>
</template>

<script setup >
import {reactFn } from './react/index.jsx';

defineOptions({
	name: "home",
});

let router = useRouter();

onMounted(()=>{
	// debugger
	nextTick(()=>{
		
		reactFn();
	})
})

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
