import request from '@/utils/request'

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}


export function fetchList(params: any) {
  return request({
    url: '/topics',
    method: "GET",
    params
  })
}
