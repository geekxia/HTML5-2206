const mongoose = require('mongoose')

module.exports =  mongoose.model('goods', mongoose.Schema({
  name: String,
  desc: String,
  img: String,
  price: Number,
  cate: String,
  hot: { type: Boolean, default: false },
  rank: { type: Number, default: 0 },
  create_time: Number,
  status: { type: Number, default: 1 },  // 1-正常 2-已删除
  check_status: { type: Number, default: 0 },  // 0-未审核  1-审核通过  -1=驳回
  store_status: { type: Number, default: 0 },   //  0-未上架  1-已上架
  user_id: String   // 商家（每个商品，都有身份）
}))
