module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "~@/variables.scss";`
      }
    }
  },
  configureWebpack: {
    devtool: "source-map",

  },
  devServer: {
    // host: "132.72.65.211"
    host: "localhost",
    port: 3000
  }
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
