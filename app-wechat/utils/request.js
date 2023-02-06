const baseURL = 'https://cnodejs.org'
const version = '/api/v1'

function fetch (url, method, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + version + url,
      method,
      data,
      headers: {
        'X-Token': wx.getStorageSync('token')
      },
      success: (response) => {
        // console.log('---调接口成功', response)
        // 数据过滤一下
        if (response.data && response.data.success) {
          resolve(response.data.data)
        }        
      },
      fail: (err) => {
        console.log('---调接口失败', err)
        reject(err)
      }
    })
  })
}

module.exports = fetch