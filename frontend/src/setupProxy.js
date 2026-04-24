const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/analyze',
    createProxyMiddleware({
      target: 'https://api.groq.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api/analyze': '/openai/v1/chat/completions'
      },
      onProxyReq: function(proxyReq, req, res) {
        proxyReq.setHeader('Authorization', `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`);
      }
    })
  );
};
