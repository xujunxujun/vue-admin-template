import request from '@/utils/request'
// 职务
export function JobApi(data) {
  return request({
    url: '/api/job',
    method: 'post',
    data
  })
}
// 部门
export function DepartmentApi(data) {
  return request({
    url: '/api/department',
    method: 'post',
    data
  })
}
