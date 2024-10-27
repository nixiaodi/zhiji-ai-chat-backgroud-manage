import { request, normalRequest } from '../request';

/** get role list */
export function fetchGetRoleList(params?: Api.SystemManage.RoleSearchParams) {
  return request<Api.SystemManage.RoleList>({
    url: '/systemManage/getRoleList',
    method: 'get',
    params
  });
}

/**
 * get all roles
 *
 * these roles are all enabled
 */
export function fetchGetAllRoles() {
  return request<Api.SystemManage.AllRole[]>({
    url: '/systemManage/getAllRoles',
    method: 'get'
  });
}

/** get user list */
export function fetchGetUserList(params?: Api.SystemManage.UserSearchParams) {
  return normalRequest<Api.SystemManage.UserList>({
    url: '/manage/user/pageList',
    method: 'get',
    params
  });
}

/** update user */
export function fetchUpdateUser(data: Api.SystemManage.UserSearchParams) {
  return normalRequest({
    url: '/manage/user/update',
    method: 'post',
    data
  });
}

/** update user status */
export function fetchUpdateUserStatus(data: { id: string, status: Api.Common.EnableStatus }) {
  return normalRequest({
    url: '/manage/user/status',
    method: 'post',
    data
  });
}

/** delete user */
export function fetchDeleteUserById(id: number) {
  return normalRequest({
    url: '/manage/user/delete',
    method: 'get',
    params: {
      id
    }
  });
}

/** get menu list */
export function fetchGetMenuList() {
  return request<Api.SystemManage.MenuList>({
    url: '/systemManage/getMenuList/v2',
    method: 'get'
  });
}

/** get all pages */
export function fetchGetAllPages() {
  return request<string[]>({
    url: '/systemManage/getAllPages',
    method: 'get'
  });
}

/** get menu tree */
export function fetchGetMenuTree() {
  return request<Api.SystemManage.MenuTree[]>({
    url: '/systemManage/getMenuTree',
    method: 'get'
  });
}
