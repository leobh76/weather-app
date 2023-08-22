const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/weather',
    createProxyMiddleware({
      target: 'http://localhost:5000', // Your server's URL
      changeOrigin: true,
    })
  );
};
