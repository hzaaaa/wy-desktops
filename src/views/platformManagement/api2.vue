<template>
	<div class="platformManagement">
		

		
			<iframe ref="iframeRef" width="100%" height="100%" src="http://172.16.1.44:9057/#/login" frameborder="0"></iframe>
		
	</div>
</template>

<script setup lang="ts">
let router = useRouter();
defineOptions({
	name: "api2",
});
// const getComponentName = () => {
// 	let currentMatched = router.currentRoute.value.matched;
// 	let currentComponent = currentMatched[currentMatched.length - 1].components!.default;
// 	let componentName = currentComponent.name || (currentComponent as { __name: string }).__name;
// 	// 如果组件内的 script 没有内容，并且没有自定义组件name，就会返回 undefined
// 	console.log("componentName", componentName);

// 	return componentName;
// };


let send = <any>null;
const iframeRef = <any>ref(null);
let isFirstOpen = true;
window.name = "equal";
onMounted(()=>{
	OpenEvent()
})
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
						name: "hzaTest",
						pwd: "123qwer",
					},
					"http://172.16.1.44:9057"
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
