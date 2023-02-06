const mongoose = require('mongoose')

// 表结构
module.exports =  mongoose.model('cates', mongoose.Schema({
  cate: String,     // 品类的英文名
  cate_zh: String,  // 品类的中文名
  pid: { type: String, default: '0' }
}))
