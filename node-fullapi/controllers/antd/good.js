const fs = require('fs')
const path = require('path')
const socket = require('../../utils/socket')

// 这些model就是用于操作指令的集合的
const goodModel = require('../../models/goods')
const cateModel = require('../../models/cates')

class GoodController {
  // 查询商品列表
  static async getGoodList(ctx) {
    let { _id } = ctx.user
    // 默认给商家使用的
    let { name, cate, page, size, min_price, max_price } = ctx.request.query
    page = parseInt(page || 1)
    size = parseInt(size || 10)
    const params = {
      name: new RegExp(name, 'img'),
      cate: cate || '',
      status: 1,  // 只查询正常的商品，那些删除的商品不查询
      // user_id: _id
    }
    if(!params.cate) delete params.cate
    const total = await goodModel.find(params).count()
    const list = await goodModel.find(params).limit(size).skip((page-1)*size).sort({create_time:-1})
    ctx.body = { err:0, msg:'success',data:{total,list}}
  }

  // 获取商品品类
  static async getAllCate(ctx) {
    const list = await cateModel.find({})
    ctx.body = { err:0, msg:'success',data:{list}}
  }

  // 新增商品或编辑商品
  static async updateGood(ctx) {
    let { name, desc, img, price, cate, hot, id } = ctx.request.body
    console.log('---当前用户', ctx.user)
    let { _id } = ctx.user
    // 数据校验
    const ele = {
      name,
      desc,
      price,
      cate,
      img: img || '',
      hot: hot || false,
      create_time: Date.now(),
      user_id: _id,
      check_status: 0  // 无论是新增还是编辑，都得重新审核
    }
    let info = null
	// 有id，表示编辑；没有id，表示新增。
    if(id) {
      info = await goodModel.updateOne({_id:id}, ele)
    }else{
      info =await goodModel.insertMany([ele])
    }
    // 当商品变化时，通过socket服务向管理员角色发一条消息
    socket.emit('server', {user_id:'admin', msg:'你有新消息了'})
    ctx.body = { err: 0, msg: 'success', data: { info }}
  }

  // 图片上传
  static async uploadImg(ctx) {
    // 接收图片（form-data）
    const file = ctx.request.files.good
    const readStream = fs.createReadStream(file.path)
    const filePath = `/cdn/${Date.now()}_${file.name}`
    const writeStream = fs.createWriteStream(path.resolve(__dirname, `../../public${filePath}`))
    await readStream.pipe(writeStream)
    // writeStream.on('close', fn)
    ctx.body = {err:0,msg:'success',data: {img: filePath}}
  }

  // 商品详情
  static async getGoodInfo(ctx) {
    let { id } = ctx.request.query
    const info= await goodModel.findOne({_id: id})
    ctx.body = {err:0,msg:'success',data: {info}}
  }

  // 商品删除（支持批量删除）
  static async delGood(ctx) {
    let { ids } = ctx.request.body
    // ids += ';'
    console.log('ids', ids)
    let arr = ids.split(';').filter(e=>e)
    for (let i=0; i<arr.length; i++) {
      await goodModel.deleteOne({_id: arr[i]})
    }
    ctx.body = { err: 0, msg: 'success', data: {}}
  }

  static async addCate (ctx) {
    // 一、接收入参并做各种校验
    // 二、增查改查
    // 三、拿到数据，处理后响应给前端
    const { cate, cate_zh, pid } = ctx.request.body
    // 校验，你自己写一下
    // 判断是否有重复
    const doc = await cateModel.findOne({cate})
    if (doc && doc._id) {
      return ctx.body = { err: 1, msg: '不能添加重复的品类', data: {} }
    }
    // 入库
    const ele = { cate, cate_zh, pid: pid || 0 }
    const res = await cateModel.insertMany([ele])
    ctx.body = { err: 0, msg: 'success', data: res }
  }
}

module.exports = GoodController
