const PROXY_CONFIG = [
  {
    context: ["/v1"],
    target: "https://receitaws.com.br",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/": "",
    },
  },
  {
    context: ["/ws"],
    target: "https://viacep.com.br",
    secure: false,
    changeOrigin: true,
    pathRewrite: {
      "^/": "",
    },
  },
  {
    context: {
      target: "http://localhost:3000",
      secure: false,
      changeOrigin: true,
      logLevel: "debug",
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Methods': "GET, POST, PUT, DELETE, OPTIONS",
        'Access-Control-Allow-Headers': "Content-Type, Authorization"
      }
    }
  }
];

module.exports = PROXY_CONFIG;
