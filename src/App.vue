<template>
  <el-config-provider :locale="locale">
    <RouterView ></RouterView>
  </el-config-provider>
</template>

<script setup lang="ts">
import { computed } from "vue";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import router from "@/routers";
import { ElMessage } from "element-plus";

const locale = computed(() => {
  return zhCn;
});


const atIframe = window.top !== window;
if(!atIframe){
  window.addEventListener('storage', function (e:any) {
    if (e.key === 'login') {
        const data = (e.newValue);
        // const text = '[receive] ' + data.msg + ' —— tab ' + data.from;
        // console.log('[Storage I] receive message:', text);
        // debugger
        if(data==='1'){
          // 子页面过期
          router.replace("/login");
          ElMessage.error('login expire');
          localStorage.clear();
          this.location.reload();
        }
        console.log('addEventListener',data)
    }
});

}

</script>

<style scoped></style>
