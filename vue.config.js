const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
module.exports = {
  publicPath: './',
  productionSourceMap: true,
  lintOnSave: false,
  devServer: {
    open: true,
    port: 8889,
    host: "he.gamersky.com",
  },
  chainWebpack (config) {
    config.optimization.minimize(false)
  },
  // css: {
  //   extract: false,
  //   loaderOptions: {
  //     sass: {
  //       additionalData: `@import "@/assets/scss/variable.scss";`
  //     }
  //   }
  // },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 4096 }))
  },
  
}
