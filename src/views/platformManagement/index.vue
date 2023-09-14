<!-- 暂未未使用此文件 -->
<template>
	<div class="platformManagement">
		<el-row :gutter="20">
			<el-col :span="12">
				<div style="background-color: aqua" class="grid-content" @click="dialogVisible = true">订阅平台</div>
			</el-col>
			<el-col :span="12">
				<div style="background-color: antiquewhite" class="grid-content" />
			</el-col>
		</el-row>
		<el-row :gutter="20">
			<el-col :span="12">
				<div style="background-color: blueviolet" class="grid-content" />
			</el-col>
			<el-col :span="12">
				<div style="background-color: gold" class="grid-content" />
			</el-col>
		</el-row>

		<el-dialog
			@close="CloseEvent"
			v-model="dialogVisible"
			title=""
			width="80%"
			:fullscreen="false"
			@open="OpenEvent"
			draggable
			:modal="false"
		>
			<iframe ref="iframeRef" width="100%" height="100%" src="http://172.16.2.56:5501/#/login" frameborder="0"></iframe>
		</el-dialog>
	</div>
</template>

<script setup lang="ts">
// import { ref ,onBeforeMount,onBeforeUnmount} from "vue"
const dialogVisible = ref(false);
const CloseEvent = () => {
	dialogVisible.value = false;
};
let send = <any>null;
const iframeRef = <any>ref(null);
let isFirstOpen = true;
window.name = "equal";
const OpenEvent = () => {
	if (isFirstOpen) {
		console.log("iframeRef", iframeRef.value);
		let iframe = iframeRef.value;

		iframe.onload = function () {
			// 获取iframe的window对象
			const iWindow = iframe.contentWindow;

			send = function () {
				console.log("window at equal", window);
				iWindow.postMessage(
					{
						name: "hza1234",
						pwd: "hza1234",
					},
					"http://172.16.2.56:5501"
				);
			};
		};
		isFirstOpen = false;
	}
};
const receiveMessage = (event: any) => {
	if (window == event.source) {
		// 页面初始化的时候会被浏览器触发一次message，在这里根据发送方地址进行过滤
		return;
	}
	console.log("等保 收到的数据 " + event.data);
	send();
};

onBeforeMount(() => {
	window.addEventListener("message", receiveMessage);
	// debugger
});

onBeforeUnmount(() => {
	window.removeEventListener("message", receiveMessage);
});
</script>

<style lang="scss" scoped>
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
