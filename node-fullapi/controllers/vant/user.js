// userModel 是用于操作数据库中的users集合（表）
const userModel = require('../../models/users')
const jwt = require('../../utils/jwt')

class UserController {
  // 注册接口逻辑
  static async regist(ctx) {
    // 接收前端传递过来的入参
    let { username, password } = ctx.request.body
    // 如果这两个参数没有传递，报业务错误
    const user = await userModel.findOne({username})
    if (user) return ctx.body = { err: 1, msg: `${username}已被占用` }
    await userModel.insertMany([{username, password}])
    ctx.body = { err: 0, msg: '注册成功', data: { username } }
  }

  // 登录接口逻辑
  static async login(ctx) {
    // 接收前端的入参
    let { username, password } = ctx.request.body
    const user = await userModel.findOne({username, password})
    if(user) {
      // 生成token
      const token = jwt.creataToken(user)
      ctx.body = { err: 0, msg: '登录成功', data: { token }}
    }else{
      ctx.body = { err: 1, msg: '用户名和密码不匹配', data: {}}
    }
  }
}

module.exports = UserController
