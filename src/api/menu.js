import request from '@/utils/request'
// 获取菜单
export function getMenu(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
