<template>
	<div>
		<!-- :before-close="handleClose" -->
		<!-- <el-dialog -->
		<el-drawer
			v-model="showDrawer"
			:close-on-click-modal="false"
			:title="(userStore.behaviorGet === 'add' ? '添加' : '编辑') + '角色'"
			width="434px"
			@close="isClose"
		>
			<el-form ref="queryFormRef" :model="props.employeeRow" :label-width="80" :rules="rules">
				<el-row>
					<el-col :span="24">
						<el-form-item label="角色名称" prop="name">
							<el-input
								v-model="props.employeeRow.name"
								autocomplete="off"
								maxlength="10"
								placeholder="请输入角色名称"
								clearable
								size="default"
							></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="备注" prop="description">
							<el-input
								v-model="props.employeeRow.description"
								type="textarea"
								maxlength="100"
								placeholder="请输入..."
								style="width: 450px"
								size="default"
							></el-input>
						</el-form-item>
					</el-col>

					<el-col :span="24">
						<el-form-item label="菜单权限">
							<el-checkbox-group v-model="props.employeeRow.menuIdList">
								<el-checkbox v-for="item in platformAllList" :label="item.id">{{ item.title }}</el-checkbox>
							</el-checkbox-group>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
			<template #footer>
				<div class="drawer_footer">
					<el-button @click="isClose">取消</el-button>
					<el-button type="primary" :loading="loading" v-throttle="() => onSave(queryFormRef)">{{
						loading ? "保存中 ..." : "确定"
					}}</el-button>
				</div>
			</template>
		</el-drawer>
	</div>
</template>
<script lang="ts" setup>
// import { ref,  reactive, onMounted, getCurrentInstance, nextTick ,watch} from "vue";
// import { useRouter } from "vue-router";
import { ElDrawer, ElMessage, ElMessageBox, ElTree } from "element-plus";
// import { Permission } from '/types'
import type { FormInstance, FormRules } from "element-plus";
import { Close } from "@element-plus/icons-vue";
import { getMenuTreeApi, getRoleDetailsApi, addRoleApi, updateRoleApi } from "@/api/system/role";
import { useUserStoreSessionStorage as useUserStore } from "@/stores/user";
import { getMenuListApi } from "@/api/system/menu";
import useDrawerhook from "@/hooks/drawerhook";
const userStore = useUserStore();

// 表单内容初始化
const props = defineProps({
	employeeRow: {
		type: Object,
		default: {},
	},
});

// 表单校验
const validateRoleName = (rule: any, value: string, callback: any) => {
	if (value.trim() === "") {
		return callback(new Error("请输入角色名称"));
	} else {
		callback();
	}
};

// 表单
const rules = reactive({
	name: [{ required: true, validator: validateRoleName, message: "请输入角色名称", trigger: "blur" }],
});
const platformAllList = <any>ref([]);
// getMenuListApi().then((res: any) => {
// 	console.log("getMenuListApi", res);
// 	let allList = res.data || [];
// 	platformAllList.value = allList.filter((item: any) => {
// 		return item.type === 7;
// 	});
// 	console.log("platformAllList.value", platformAllList.value);
// });
const getplatformAllList =()=>{
	let UserStore = <any>JSON.parse(<any>localStorage.getItem("UserStore"));
	let menuVoList = UserStore.userInfo.menuVoList;
	let type7Array = menuVoList.filter((item: any) => {
		return item.type === 7;
	});
	platformAllList.value= type7Array
	console.log('type7Array',type7Array);
}
getplatformAllList();
// 菜单节点初始化
const menuTree = ref<any[]>([]);
const defaultProps = {
	label: "name", // 对应接口节点名字
	children: "childrenList", // 对应接口树节点数组
	isLeaf: "leaf", // 将获取数组中的leaf作为判断是否是叶子节点（即没有子节点的最底层节点）
};

// el-tree 初始化
const treeRef = ref();

// 树组件重新加载
// const treeReloading = ref<boolean>(false);
// 当前选中的项
const setCurrentKey = ref<any[]>([]);

// 初始化加载 树
onMounted(() => {
	// getRoleMenusInitTree({});
});

let childrenIds: any = [];
const findChildId = (list: any) => {
	list.forEach((item: any) => {
		if (item.childrenList) {
			findChildId(item.childrenList);
		} else {
			//子节点
			childrenIds.push(item.id);
		}
	});
};

let validFormInfoList = <any>[];

let transRules = <any>[];

// 提交保存
const onSave = async (formEl: FormInstance | undefined) => {
	// 添加角色
	if (userStore.behavior !== "modify") {
		if (!formEl) return;
		await formEl.validate((valid, fields) => {
			if (valid) {
				let requestTempt = form2RequestParams(props.employeeRow);
				let isSubmitAble = validOfBeforeSubmit(requestTempt);
				if (!isSubmitAble) {
					return;
				}
				// requestTempt= {...requestTempt};
				requestTempt.menuIdList = requestTempt.menuIdList || [];
				requestTempt.menuIdList = [...requestTempt.menuIdList, ...rawTree2Array];
				addRoleApi(requestTempt).then((response) => {
					if (response.code === 200) {
						ElMessage.success("创建成功");
						showDrawer.value = false;
						loading.value = false;
						emit("confirmFunc");
					}
				});
			} else {
				console.log("error", fields);
			}
		});
	} else {
		// 修改角色
		if (!formEl) return;
		await formEl.validate((valid, fields) => {
			if (valid) {
				let requestTempt = form2RequestParams(props.employeeRow);
				let isSubmitAble = validOfBeforeSubmit(requestTempt);

				if (!isSubmitAble) {
					return;
				}
				let { id, name, description, menuIdList } = requestTempt;
				menuIdList = [...menuIdList, ...rawTree2Array];
				updateRoleApi({
					id,
					name,
					description,
					menuIdList,
				}).then((response) => {
					if (response.code === 200) {
						ElMessage.success("修改成功");
						showDrawer.value = false;
						loading.value = false;
						emit("confirmFunc");
					}
				});
			} else {
				console.log("error", fields);
			}
		});
	}
	// emit('onSave', '111');
};
let rawTree2Array = <any>[ 31 ];//修改密码的权限
let openCallBack = async () => {
	await nextTick();
	// debugger
	if (userStore.behavior !== "modify") {
		//新增
		let UserStore = <any>JSON.parse(<any>localStorage.getItem("UserStore"));
		let menuVoList = UserStore.userInfo.menuVoList;
		let typeNot7Array = menuVoList.filter((item: any) => {
			return item.type !== 7;
		});
		// rawTree2Array = [];
		// getRawTree2Array(typeNot7Array);
		// console.log("rawTree2Array", rawTree2Array);
	} else {
		//修改

		getRoleDetailsApi({ id: props.employeeRow.id }).then((res: any) => {
			console.log("getRoleDetailsApi", res);
			let type7Array = res.data.simpleMenuVoList.filter((item: any) => {
				return item.type === 7;
			});
			props.employeeRow.menuIdList = type7Array.map((item: any) => {
				return item.id;
			});
			console.log("props.employeeRow.menuIdList", props.employeeRow.menuIdList);
			let typeNot7Array = res.data.simpleMenuVoList.filter((item: any) => {
				return item.type !== 7;
			});
			// rawTree2Array = [];
			// getRawTree2Array(typeNot7Array);
			// console.log("rawTree2Array", rawTree2Array);
		});
	}
};
const getRawTree2Array = (list: any) => {
	for (let i = 0; i < list.length; i++) {
		let item = list[i];
		rawTree2Array.push(item.id);
		if (item.childrenList) {
			getRawTree2Array(item.childrenList);
		}
	}
};
let { handleClose, showDrawer, timer, loading, queryFormRef, isOpen, isClose, validOfBeforeSubmit, form2RequestParams } =
	useDrawerhook(props, openCallBack, validFormInfoList, transRules);
const emit = defineEmits(["confirmFunc"]);
// 子组件有<script setup>	需要defineExpose暴露，方法方可使用
defineExpose({
	isOpen,
	isClose,
});
//树相关
// watch(showDrawer, (newX) => {
//   // debugger
//   if(!newX){
//     treeRef.value!.setCheckedKeys([], false)
//   }
// })
</script>
<style lang="scss" scoped></style>
