const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const U = require('../controllers/antd/user')
const G = require('../controllers/antd/good')
const UP = require('../controllers/upload')

const v = '/api/v1/react'

// RESTful API 规范（一种需要鉴权，一种不需要鉴权）
// 举例：http://localhost:9999/api/v1/react/user/login
router
.post(`${v}/user/login`, U.login)
.get(`${v}/user/info`, checkToken, U.getUserInfo)
.get(`${v}/good/cates`, checkToken, G.getAllCate)
.get(`${v}/good/list`, checkToken, G.getGoodList)
.post(`${v}/good/delete`, checkToken, G.delGood)
.get(`${v}/good/info`, checkToken, G.getGoodInfo)
.post(`${v}/good/update`, checkToken, G.updateGood)
.post(`${v}/upload/img`, checkToken, UP.uploadImg)

module.exports = router
