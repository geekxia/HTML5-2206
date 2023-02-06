const fs = require('fs')
const path = require('path')

class UploadController {
	// 图片上传
	static async uploadImg(ctx) {
	  // 接收图片（form-data）
		// 后端用‘good’这个属性来接收图片数据的
	  const file = ctx.request.files.good
	  const readStream = fs.createReadStream(file.path)
	  const filePath = `/cdn/${Date.now()}_${file.name}`
	  const writeStream = fs.createWriteStream(path.resolve(__dirname, `../public${filePath}`))
	  await readStream.pipe(writeStream)
	  // writeStream.on('close', fn)
	  ctx.body = {err:0,msg:'success',data: {img: filePath}}
	}
}

module.exports = UploadController
