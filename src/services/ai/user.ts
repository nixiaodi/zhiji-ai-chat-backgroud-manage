import { request } from '@umijs/max';

// 用户列表
export async function getUserList(params: {
  name?: string;
  pageNumber: number;
  pageSize: number;
  phone: string;
}) {
  return request<API.UserListResult>('/manage/user/pageList', {
    method: 'GET',
    params,
  });
}
