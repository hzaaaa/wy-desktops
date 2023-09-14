<template>
	<div class="common-layout-system">
		<el-table
			class="common-table"
			v-loading="tableLoading"
			:data="tableDataList"
			cell-class-name="table-cell"
			header-cell-class-name="header-cell"
			border
		>
			<el-table-column prop="username" label="用户名" />
			<el-table-column prop="state" label="操作">
				<template #default="scope">
					{{ scope.row.state === 1 ? "登录" : scope.row.state === 2 ? "登出" : "--" }}
				</template>
			</el-table-column>
			<el-table-column prop="platformType" label="平台类型">
				<template #default="scope">
					{{ scope.row.platformType === 1 ? "等保" : scope.row.platformType === 2 ? "订阅" : "--" }}
				</template>
			</el-table-column>

			<el-table-column prop="createTime" label="创建记录时间">
				<template #default="scope">
					{{ scope.row.createTime ? scope.row.createTime : "--" }}
				</template>
			</el-table-column>
		</el-table>
		<div class="pagination-block">
			<el-pagination
				:page-sizes="pageParams.pageSizesList"
				background
				layout="total,sizes,prev, pager, next,jumper"
				@size-change="handleSizeChange"
				@current-change="handleCurrentPageChange"
				:current-page="pageParams.pageNum"
				:page-size="pageParams.pageSize"
				:total="pageParams.total"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, reactive, ref, onMounted } from "vue";
import type { ElTable } from "element-plus";
import { Search, Plus } from "@element-plus/icons-vue";
import { getLogListApi, deleteRoleApi } from "@/api/system/role";

import useListPageHook from "@/hooks/listPage";

import { ElMessage, ElMessageBox } from "element-plus";

const queryFormRaw = {
	name: "",
	enabled: null,
};

const beanInfo = {};

let {
	tableLoading,
	tableMaxHeight,
	pageParams,
	tableDataList,
	handleCurrentPageChange,
	handleSizeChange,
	resetPageToOne,
	refreshData, //刷新按钮

	drawer,
	employeeRow,
	onAddDrawer,
	onEditDrawer,
	searchByQueryForm,
	subData,

	queryForm,
	doReset,
} = useListPageHook(
	// getCompanyListApi,
	getLogListApi,

	beanInfo,
	queryFormRaw
);
</script>

<style lang="scss" scoped>
// 表单页面通用布局
.common-layout-system {
	display: flex;
	flex-direction: column;
	flex: 1;
	padding-left: 35px;
	padding-right: 28px;
	padding-top: 22px;
	border-radius: 10px;

	// display: flex;
	// height: fit-content;
	height: calc(100%  );
	background: #fff;

	.el-form {
		margin-bottom: 0;

		.wrap {
			flex-wrap: wrap;

			.el-form-item {
				margin-bottom: 0;

				.el-input {
					width: 320px;
				}
			}

			.el-button {
				margin-left: 10px;
				width: 72px;

				&:first-of-type {
					margin-left: 20px;
				}
			}
		}
	}

	.el-select {
		width: 100%;
	}

	.search-buttons {
		display: flex;
		flex-direction: row-reverse;
		margin-bottom: 20px;
	}

	.operat-buttons {
		display: flex;
		// margin-top: 26px;
		margin-bottom: 12px;
		background-color: #fff;

		.space {
			flex: 1;
		}
	}

	.pagination-block {
		display: flex;
		flex-direction: row-reverse;
		margin: 29px 0;

		// margin-left: 30px;
		// margin-right: 30px;
	}

	:deep(.el-card__body) {
		padding: 0;
		padding-top: 0;
		padding-bottom: 0;
	}
}
</style>
