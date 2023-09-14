<template>
	<div class="platformManagement">
		

		
			<iframe ref="iframeRef" width="100%" height="100%" src="http://fltest2.weiyankeji.cn:9057" frameborder="0"></iframe>
		
	</div>
</template>

<script setup lang="ts">
let router = useRouter();
defineOptions({
	name: "api",
});






</script>

<style lang="scss" scoped>
.platformManagement{
	height: 100%;
	border: 1px solid #e5e5e5;
}
:deep(.el-row) {
	margin-bottom: 20px;
}

:deep(.el-row:last-child) {
	margin-bottom: 0;
}

:deep(.el-col) {
	border-radius: 4px;
}

.grid-content {
	border-radius: 4px;
	min-height: 100px;
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
