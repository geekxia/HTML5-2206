const KoaRouter = require('@koa/router')
const router = new KoaRouter()

// 用于鉴权的
const checkToken = require('../middlewares/checkToken')

// 指定接口的版本
const v = '/api/v1/vant'

// 接口的业务逻辑
const U = require('../controllers/vant/user')
const G = require('../controllers/vant/good')
const C = require('../controllers/vant/cart')

// RESTful API 规范（一种需要鉴权，一种不需要鉴权）
// 接口访问示例：localhost:9999/api/v1/vant/user/regist
router
.get(`${v}/good/list`, G.getGoodList)   // http://localhost:9999/api/v1/vant/good/list
.get(`${v}/good/cates`, G.getAllCates)  // http://localhost:9999/api/v1/vant/good/cates
.get(`${v}/good/info`, G.getGoodInfo)   

.post(`${v}/user/regist`, U.regist)
.post(`${v}/user/login`, U.login)

.post(`${v}/cart/add`, checkToken, C.addToCart)
.get(`${v}/cart/list`, checkToken, C.getCartList)
.get(`${v}/cart/delete`, checkToken, C.delCartItem)
.get(`${v}/cart/update`, checkToken, C.updCartCount)
.post(`${v}/cart/submit`, checkToken, C.submitCart)

module.exports = router
