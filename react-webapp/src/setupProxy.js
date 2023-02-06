const { createProxyMiddleware } = require('http-proxy-middleware');

// 脚手架官方推荐的配置代理的方式（改代码，要重启）
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://cnodejs.org',
      changeOrigin: true,
    })
  );
};