const mongoose = require('mongoose')

// users 集合
module.exports =  mongoose.model('users', mongoose.Schema({
  username: String,
  password: String,
  create_time: { type: Number, default: Date.now() },
  role: { type: String, default: '' },
  role_name: { type: String, default: '' },
  status: { type: Number, default: 1 }
}))
