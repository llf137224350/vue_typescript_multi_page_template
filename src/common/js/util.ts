// 项目配置文件
const config = require('./config.ts');
declare const CryptoJS: any;

/**
 * @author い 狂奔的蜗牛
 * @param title 标题
 * @description 设置document标题
 */
function setTitle(title: string = '标题'): void {
  document.title = title;
  // 兼容 iOS 端微信浏览器非首次加载修改标题无效的 Bug
  const iframe = document.createElement('iframe');
  let fun: any = () => {
    setTimeout(() => {
      iframe.removeEventListener('load', fun);
      iframe.remove();
      fun = null;
    });
  };
  iframe.setAttribute('src', '/favicon.ico');
  iframe.style.display = 'none';
  iframe.addEventListener('load', fun);
  document.body.appendChild(iframe);
}

/**
 * @author い 狂奔的蜗牛
 * @returns {boolean}
 * @description 判断是否是在微信里面打开
 */
function isWeiXin(): boolean {
  const ua = navigator.userAgent.toLowerCase();
  return ua.indexOf('micromessenger') !== -1;
}

/**
 * md5 加密
 * @param message
 */
function md5Encrypt(message: string): string {
  return CryptoJS.MD5(message).toString();
}

// DES  ECB模式加密
function encryptByDESModeEBC(message: string): string {
  const keyHex = CryptoJS.enc.Utf8.parse(config.key);
  const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.ciphertext.toString();
}

// DES  ECB模式解密
function decryptByDESModeEBC(ciphertext: string): string {
  const keyHex = CryptoJS.enc.Utf8.parse(config.key);
  const decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Hex.parse(ciphertext),
  }, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

/**
 *  get路径参数转换为json对象
 * @param params
 */
function path2json(params: string): object {
  if (!params) {
    return {};
  }
  if (params.indexOf('?') !== -1) {
    params = params.substring(params.indexOf('?') + 1);
  }
  const arr = params.split('&');
  const obj: any = {};
  let temp: Array<string>;
  for (let i = 0; i < arr.length; i++) {
    temp = arr[i].split('=');
    if (temp.length > 1) {
      obj[temp[0]] = temp[1];
    }
  }
  return obj;
}

/**
 * 是否为iphone x系列
 * @returns {boolean}
 */
function isIphonex(): boolean {
  if (typeof window !== 'undefined' && window) {
    return /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812;
  }
  return false;
}

// 小于10的前补0操作
function formatNumber(num: string): string {
  num = num.toString();
  return num[1] ? num : `0${num}`;
}

export {
  setTitle,
  isWeiXin,
  md5Encrypt,
  decryptByDESModeEBC,
  encryptByDESModeEBC,
  path2json,
  isIphonex,
  formatNumber
};
