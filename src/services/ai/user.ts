import { request } from '@umijs/max';

// 用户列表
export async function getUserList(params: {
  name?: string;
  pageNumber: number;
  pageSize: number;
  phone: string;
}) {
  return request<API.UserListResult>('/user/pageList', {
    method: 'GET',
    params,
  });
}

// 获取用户信息
export async function getUserInfo(params: { accountId: string }) {
  return request<API.UserItem>('/user/detail', {
    method: 'GET',
    params,
  });
}
