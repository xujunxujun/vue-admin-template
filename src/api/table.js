import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}
export function JobApi(data) {
  return request({
    url: '/api/job',
    method: 'post',
    data
  })
}
