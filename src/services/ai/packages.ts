
import { request } from '@umijs/max';

// 套餐列表
export async function getPackagesList(params: {
  name?: string;
  pageNumber: number;
  pageSize: number;
}) {
  return request<API.PackageListResult>('/package/pageList', {
    method: 'GET',
    params,
  });
}
