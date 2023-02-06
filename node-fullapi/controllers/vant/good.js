const goodModel = require('../../models/goods')
const cateModel = require('../../models/cates')

class GoodController {
  static async getGoodList(ctx) {
  	// let { hot, cate, name, min_price, max_price } = ctx.request.query
    let { page, size, cate } = ctx.request.query
  	size = parseInt(size || 10)
  	page = parseInt(page || 1)
  	// 查询条件
  	const params = {
  		cate,
			check_status: 1  // 只查询审核成功的
  	}
  	if (!params.cate) delete params.cate
  	const total = await goodModel.find(params).count()
  	const list = await goodModel.find(params).limit(size).skip((page-1)*size).sort({create_time: -1})
  	ctx.body = { err: 0, msg:'success' ,data: {total, list}}
  }

  static async getAllCates(ctx) {
	  let list = await cateModel.find({})
	  ctx.body = { err:0, msg:'success', data: {list} }
  }
  static async getGoodInfo(ctx) {
	  let { id } = ctx.request.query
	  if(!id) return ctx.body = { err: 1, msg:'id是必填入参', data: {} }
	  const info = await goodModel.findOne({_id: id})
	  // 商家信息查询
	  // 商品评论查询
	  ctx.body = { err: 0, msg: 'success', data: { info }}
  }
}

module.exports = GoodController
