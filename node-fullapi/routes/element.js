const KoaRouter = require('@koa/router')
const router = new KoaRouter()
const checkToken = require('../middlewares/checkToken')

const U = require('../controllers/element/user')
const G = require('../controllers/element/good')
const C = require('../controllers/element/check')

const v = '/api/v1/element'

router
.post(`${v}/login`, U.login)
.get(`${v}/userinfo`, checkToken, U.getUserInfo)
.get(`${v}/good/list`, checkToken, G.getGoodList)
.get(`${v}/cate/all`, checkToken, G.getAllCate)
.post(`${v}/cate/add`, checkToken, G.addCate)   // 添加接口
.post(`${v}/good/update`, checkToken, G.updateGood)
.post(`${v}/upload/img`, G.uploadImg)   // 暂时，这个接口不校验Token
.get(`${v}/good/info`, checkToken, G.getGoodInfo)
.post(`${v}/good/del`, checkToken, G.delGood)
.get(`${v}/check/good/list`, checkToken, C.getCheckGoodList)
.post(`${v}/check/good`, checkToken, C.checkGood)

module.exports = router
