const goodModel = require('../../models/goods')
const userModel = require('../../models/users')

const socket = require('../../utils/socket')

class CheckController {
  static async getCheckGoodList (ctx) {
    let { page, size, check } = ctx.request.query  // 字符串
    page = Number(page || 1)
    size = Number(size || 10)
    check = Number(check || 0)
    const params = {
      check_status: check
    }
    const total = await goodModel.find(params).count()
    const list = await goodModel.find(params).limit(size).skip((page-1)*size)
    ctx.body = { err:0, msg: 'success', data: { total, list }}
  }

  static async checkGood (ctx) {
    let { good_id, check, content } = ctx.request.body
    check = Number(check || 0)
    if (!good_id) return ctx.body = { err: 1, msg:'good_id是必填参数', data: {}}
    if (check === 0) return ctx.body = { err: 1, msg:'check字段有误', data: {}}
    if (check===-1 && !content) return ctx.body = { err: 1, msg:'请填写审核失败原因', data: {}}
    const info = await goodModel.findOneAndUpdate({_id:good_id}, {check_status: check})
    // 存储审核消息到审核集合 ？？
    // 通过socket服务告诉商家，审核完成了 {user_id, msg}
    socket.emit('server', {user_id: info.user_id, msg:content} )
    ctx.body = { err: 0, msg: 'success', data: {info} }
  }
}

module.exports = CheckController
