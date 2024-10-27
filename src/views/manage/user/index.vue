<script setup lang="tsx">
import { NButton, NPopconfirm, NTag } from 'naive-ui';
import { fetchGetUserList, fetchUpdateUserStatus, fetchDeleteUserById } from '@/service/api';
import { $t } from '@/locales';
import { useAppStore } from '@/store/modules/app';
import { enableStatusRecord, userGenderRecord } from '@/constants/business';
import { useTable, useTableOperate } from '@/hooks/common/table';
import UserOperateDrawer from './modules/user-operate-drawer.vue';
import UserSearch from './modules/user-search.vue';

const appStore = useAppStore();

const {
  columns,
  columnChecks,
  data,
  getData,
  getDataByPage,
  loading,
  mobilePagination,
  searchParams,
  resetSearchParams
} = useTable({
  apiFn: fetchGetUserList,
  showTotal: true,
  apiParams: {
    current: 1,
    size: 10,
    // if you want to use the searchParams in Form, you need to define the following properties, and the value is null
    // the value can not be undefined, otherwise the property in Form will not be reactive
  },
  columns: () => [
    {
      type: 'selection',
      align: 'center',
      width: 48
    },
    {
      key: 'index',
      title: $t('common.index'),
      align: 'center',
      width: 64
    },
    {
      key: 'name',
      title: $t('page.manage.user.userName'),
      align: 'center',
      minWidth: 100
    },
    // {
    //   key: 'userGender',
    //   title: $t('page.manage.user.userGender'),
    //   align: 'center',
    //   width: 100,
    //   render: row => {
    //     if (row.userGender === null) {
    //       return null;
    //     }

    //     const tagMap: Record<Api.SystemManage.UserGender, NaiveUI.ThemeColor> = {
    //       1: 'primary',
    //       2: 'error'
    //     };

    //     const label = $t(userGenderRecord[row.userGender]);

    //     return <NTag type={tagMap[row.userGender]}>{label}</NTag>;
    //   }
    // },
    {
      key: 'phone',
      title: $t('page.manage.user.userPhone'),
      align: 'center',
      minWidth: 120
    },
    {
      key: 'email',
      title: $t('page.manage.user.userEmail'),
      align: 'center',
      minWidth: 200
    },
    {
      key: 'source',
      title: '用户来源',
      align: 'center',
      width: 120
    },
    {
      key: 'status',
      title: $t('page.manage.user.userStatus'),
      align: 'center',
      width: 100,
      render: row => {
        if (row.status === null) {
          return null;
        }

        const tagMap: Record<Api.Common.EnableStatus, NaiveUI.ThemeColor> = {
          1: 'success',
          2: 'warning',
          3: 'info'
        };

        const label = $t(enableStatusRecord[row.status]);

        return <NTag type={tagMap[row.status]}>{label}</NTag>;
      }
    },
    {
      key: 'operate',
      title: $t('common.operate'),
      align: 'center',
      width: 180,
      render: row => (
        <div class="flex-center gap-8px">
          <NButton type="primary" ghost disabled={row.name === 'admin'} size="small" onClick={() => edit(row.id)} >
            {$t('common.edit')}
          </NButton>
          <NPopconfirm
            onPositiveClick={() => toggleStatus(row)}
          >
            {{
              default: `确认要${row.status === 1 ? '禁用' : '启用'}${row.name}账号吗？`,
              trigger() {
                return (
                  <NButton type="warning" ghost disabled={row.name === 'admin'} size="small">
                    {row.status === 1 ? '禁用' : '启用'}
                  </NButton>
                )
              }
            }}
          </NPopconfirm>
          <NPopconfirm onPositiveClick={() => handleDelete(row.id)}>
            {{
              default: () => $t('common.confirmDelete'),
              trigger: () => (
                <NButton type="error" ghost disabled={row.name === 'admin'} size="small">
                  {$t('common.delete')}
                </NButton>
              )
            }}
          </NPopconfirm>
        </div>
      )
    }
  ]
});

const {
  drawerVisible,
  operateType,
  editingData,
  handleAdd,
  handleEdit,
  checkedRowKeys,
  onBatchDeleted,
  onDeleted
  // closeDrawer
} = useTableOperate(data, getData);

async function handleBatchDelete() {
  // request
  console.log(checkedRowKeys.value);

  onBatchDeleted();
}

async function handleDelete(id: number) {
  try {
    await fetchDeleteUserById(id)
    onDeleted();
  }catch(error){}
}

function edit(id: number) {
  handleEdit(id);
}

async function toggleStatus(row: any) {
  console.log(row)
  try {
    await fetchUpdateUserStatus({
      id: row.id,
      status: row.status === 1 ? 2 : 1
    })
    getData()
  }catch(error){}
}
</script>

<template>
  <div class="min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
    <UserSearch v-model:model="searchParams" @reset="resetSearchParams" @search="getDataByPage" />
    <NCard :title="$t('page.manage.user.title')" :bordered="false" size="small" class="sm:flex-1-hidden card-wrapper">
      <!-- <template #header-extra>
        <TableHeaderOperation
          v-model:columns="columnChecks"
          :disabled-delete="checkedRowKeys.length === 0"
          :loading="loading"
          @add="handleAdd"
          @delete="handleBatchDelete"
          @refresh="getData"
        />
      </template> -->
      <NDataTable
        v-model:checked-row-keys="checkedRowKeys"
        :columns="columns"
        :data="data"
        size="small"
        :flex-height="!appStore.isMobile"
        :scroll-x="962"
        :loading="loading"
        remote
        :row-key="row => row.id"
        :pagination="mobilePagination"
        class="sm:h-full"
      />
      <UserOperateDrawer
        v-model:visible="drawerVisible"
        :operate-type="operateType"
        :row-data="editingData"
        @submitted="getDataByPage"
      />
    </NCard>
  </div>
</template>

<style scoped></style>
