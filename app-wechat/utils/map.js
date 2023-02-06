const QQMapWX = require('./qqmap.js')

const map = new QQMapWX({
  key: 'NY3BZ-C52WW-JCRRK-RDY4X-VCH6J-DCFNS'
})

function calDis (from, list) {
  return new Promise((resolve)=>{
    map.calculateDistance({
      mode: 'straight',
      from,
      to: list,  // 带有经纬度的商家列表
      success: res => {
        console.log('---距离计算成功', res)
        resolve(res.result.elements)  // .then()
      }
    })
  })  
}

module.exports = {
  calDis
}