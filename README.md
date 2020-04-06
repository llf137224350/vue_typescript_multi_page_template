# Vue TypeScript多页项目模板

## 安装依赖
```
npm install 或者 cnpm install
```

### 开发模式
```
npm run serve
```

### 生产打包
```
npm run build
```

### Run your tests
```
npm run test
```

###  项目特点
```
1、单个项目实现多个单页开发（项目a、项目b），可独立打包各个单页且打包后内容按照单页分割，互不影响，也不会因为更改某一个
单页导致其他单页也需要打包一起发布，从而减少对线上其他版本影响，便于维护

2、大部分开发依赖采用cdn方式引入，减少打包时长和加快网页加载速度

3、路由配置为懒加载，js独立打包，gz压缩

4、添加编辑器代码风格约束，便于多人共同协作

5、增加eslint代码格式约束

6、css样式采用module方式，实现生成的class类名为hash值，增强了css代码安全性

7、git commit增加了tslint检查，如果检查通不过，则不允许提交到git

8、加载动画、吐司/带图标吐司、ActionSheet、车牌输入键盘控件等，前三个为全局函数调用方式，如：
this.$toast({text: '我是提示消息'})

9、px自动转为rem，为不同设备进行屏幕适配

```

### 注：搭建项目的出发点主要针对移动web应用，若用于pc项目，适配方案需要做一下小调整，调整地方包括

```
vue.config.js文件中
const postcss = px2rem({
  remUnit: 37.5, // 设计图iphone 678 = 750 / 20
  remPrecision: 10
});

src/common/js/init.ts

const setRootFontSize = () => {
      // 进行rem适配 设置根元素字体大小
      const width = document.documentElement.clientWidth || document.body.clientWidth;
      const htmlDom = document.getElementsByTagName('html')[0];
      htmlDom.style.fontSize = width / 10 + 'px';
    };
    // 设置适配
    setRootFontSize();
    // 屏幕大小改变后，重新进行设置根字体大小
    window.onresize = () => {
      setRootFontSize();
};
```
### new VueRouter({ routes, mode: 'history' }) mode=hash或者mode=history的一些注意点
1、hash模式下访问方式为：
  >http://localhost:8081/demo01/index.html#/demo

  >http://localhost:8081/demo02/index.html#/demo02

2、history模式下访问方式为：
  >http://localhost:8081/demo01/demo

3、history模式配置参考：
```
  路由：

    {
      path: '/demo01/demo',
      name: 'demo',
      component: demo组件
    }

  代理：

    devServer: {
      host: '0.0.0.0', // host: 'localhost',
      // https: false, // https:{type:Boolean}
      open: false, // 配置自动启动浏览器
      hotOnly: true, // 热更新
      port: 8081,
      historyApiFallback: {
        rewrites: (() => { // 自动处理单页应用
          const arr = [];
          config.buildEntries.map((name) => {
            arr.push({
              from: new RegExp(`\/${name}\/.*$`), to: `/${name}/index.html`
            });
          });
          return arr;
        })()
      },
      proxy: {
        '/api': {
          target: 'http://www.baidu.com', 
          changeOrigin: true,
          pathRewrite: {}
        }
      }
   }
  ```



### 项目效果及使用方法

<img src='./screenshot/01.jpg'/></b>
<img src='./screenshot/02.jpg'/></b>
<img src='./screenshot/03.jpg'/></b>
<img src='./screenshot/04.jpg'/></b>
<img src='./screenshot/05.jpg'/></b>
<img src='./screenshot/06.jpg'/></b>
<img src='./screenshot/07.jpg'/></b>
<img src='./screenshot/08.jpg'/></b>
<img src='./screenshot/09.jpg'/></b>
