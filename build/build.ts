const glob = require('glob');
const fs = require('fs');
const execSync = require('child_process').execSync;
const config = require('../config/config.ts');

// 移除目录
// @ts-ignore
function deleteDist(path) {
  let files = [];
  // 判断目录是否存在
  if (fs.existsSync(path)) {
    files = fs.readdirSync(path); // 读取目录
    // @ts-ignore
    files.forEach((file) => {
      const curPath = path + '/' + file; // 拼接目录写文件完整路径
      if (fs.statSync(curPath).isDirectory()) { // 读取文件路径状态 判断是否为文件夹 如果为文件夹，递归
        deleteDist(curPath);
      } else {
        fs.unlinkSync(curPath); // 删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

try {
  const startTime = Date.now();
  process.env.NODE_ENV = 'production';  // 切换环境为生产
  // 如果配置的打包单页为空，则打包全部
  if (config.buildEntries.length === 0) {
    const globPath = ['./src/modules/**/*.html'];
    globPath.forEach((itemPath) => {
      // @ts-ignore
      const arr = [];
      // @ts-ignore
      glob.sync(itemPath).forEach( (entry) => {
        // @ts-ignore
        arr.push(/\.\/\w+\/\w+\/(\w+)\/\w+\.\w+/ig.exec(entry)[1]);
      });
      // @ts-ignore
      config.buildEntries = arr;
    });
  }
// 执行打包前删除dist目录
  deleteDist('./dist');
  for (const page of config.buildEntries) {
    process.env.page = page;
    execSync('npm run _build', { stdio: 'inherit' });
  }
// 重置
  process.env.NODE_ENV = undefined;
  const time = Date.now() - startTime;
  // eslint-disable-next-line no-octal-escape
  console.log('\033[42;30m ALL DONE \033[0m Build Compiled successfully in ' + `${time / 1000}s`);
} catch (e) {
  // eslint-disable-next-line no-octal-escape
  console.log('\033[41;30m FAILED \033[0m ' + e);
}
