const CompressionPlugin = require('compression-webpack-plugin'); // 引入gzip压缩插件
const px2rem = require('postcss-px2rem');
const path = require('path');
const glob = require('glob');
const webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const config = require('./config/config.ts');
const cdn = require('./config/cdn.ts');
const isProduction = process.env.NODE_ENV === 'production';
const postcss = px2rem({
  remUnit: 37.5, // 设计图iphone 678 = 750 / 20
  remPrecision: 10
});
// 如果配置的打包单页为空，则打包全部(仅限本地开发时)
if (!isProduction && config.buildEntries.length === 0) {
  const globPath = ['./src/modules/**/*.html'];
  globPath.forEach((itemPath) => {
    const arr = [];
    glob.sync(itemPath).forEach(function (entry) {
      arr.push(/\.\/\w+\/\w+\/(\w+)\/\w+\.\w+/ig.exec(entry)[1]);
    });
    config.buildEntries = arr;
  });
}

// 编译配置的多页面
const modules = {};

// 初始化页面参数
function initPageParams (page) {
  console.log(cdn[`${page}`]);
  modules[page] = {
    entry: `src/modules/${page}/${page}.ts`, // page 的入口
    template: `src/modules/${page}/${page}.html`, // 模板来源
    filename: `${page}/index.html`, // 在 dist/index.html 的输出
    // 在这个页面中包含的块，默认情况下会包含
    // 提取出来的通用 chunk 和 vendor chunk。
    chunks: ['chunk-vendors', 'chunk-common', page],
    cdn: cdn[`${page}`](isProduction) // cdn引入依赖
  };
}

if (!isProduction) {
  for (const page of config.buildEntries) {
    initPageParams(page);
  }
} else {
  const page = process.env.page;
  initPageParams(page);
}
// vue.config.ts
module.exports = {
  // 基本路径(相对于服务器根目录   静态资源的相对路径)
  publicPath: isProduction ? '/wetc/' : '/', // font scss资源路径 不同环境切换控制
  productionSourceMap: false, // 打包时不要map文件
  outputDir: 'dist', // 输出文件目录
  lintOnSave: true, // 是否在保存的时候检查
  assetsDir: isProduction ? process.env.page : 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  devServer: {
    host: '0.0.0.0', // host: 'localhost',
    // https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    hotOnly: true, // 热更新
    port: 8081,
    proxy: {
      '/': {
        target: 'https://oiltest.cyzl.com', // 'http://etctest.cyzl.com/',
        changeOrigin: true,
        pathRewrite: {}
      }
    }
  },
  configureWebpack: () => {
    const obj = {};
    if (isProduction) {
      const compressionPlugin = new CompressionPlugin({
        test: /\.(js|css|json)(\?.*)?$/i, // 需要压缩的文件正则
        threshold: 0, // 文件大小大于这个值时启用压缩
        deleteOriginalAssets: false, // 压缩后保留原文件
        minRatio: 0.8 // 只有压缩率小于这个值的资源才会被处理
      });
      // GZIP压缩
      obj.plugins = [compressionPlugin];
    }
    obj.externals = {
      vuex: 'Vuex',
      vue: 'Vue',
      VueRouter: 'vue-router'
    };
    return obj;
  },
  css: {
    extract: isProduction, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: !isProduction, // 开启 CSS source maps?
    loaderOptions: {
      postcss: {
        plugins: [postcss]
      },
      css: {
        localsConvention: 'camelCase',
        modules: {
          mode: 'local',
          localIdentName: !isProduction ? '[name]-[hash:base64:5]' : '[hash:base64:5]' // 使用hash方式生成class
        }
      }
    },
    requireModuleExtension: true
  },
  // 压缩图片 不超过4096字节会被转换成Base64编码,用require引用的也会被转成和base64，超出这个限制则会被打包在img文件夹下。
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        bypassOnDebug: true
      })
      .end();
    config.resolve.alias.set('common', path.resolve(__dirname, './src/common'));
    config.resolve.alias.set('components', path.resolve(__dirname, './src/components'));
    config.resolve.alias.set('modules', path.resolve(__dirname, './src/modules'));
  },
  pages: modules // 多页
};
