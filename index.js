// 深度拷贝
function deepClone(source) {
  // 如果类型不是对象
  if (typeof source != "object") {
    return source;
  }
  // 如果为null
  if (source == null) {
    return source;
  }
  var newObj = (source.constructor === Array) ? [] : {}; //开辟一块新的内存空间
  for (var i in source) {
    newObj[i] = deepClone(source[i]);
  }
  return newObj;
}

// 数组排序(数字)
function fastSort(array) {
  function sortNumber(a, b) {
    return a - b;
  }
  array = array.sort(sortNumber);
  return array;
}

// 数组排序(对象)
function sortObj(object, key) {
  function compare(key) {
    return function (obj1, obj2) {
      var val1 = obj1[key];
      var val2 = obj2[key];
      if (!isNaN(Number(val1)) && !isNaN(Number(val2))) {
        val1 = Number(val1);
        val2 = Number(val2);
      }
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    }
  }
  return object.sort(compare(key));
}

// 时差计算(传入时间戳)
var timediffer = function (last, now) {
  const options = {
    year: '年前',
    month: '个月前',
    day: '天前',
    hour: '小时前',
    minute: '分钟前',
    second: '秒前',
    just: '刚刚',
  }
  if (!now) {
    var now = new Date();
  }
  const timer = (now - last) / 1000; // 获取秒数
  let tip = '';
  if (timer <= 0 || Math.floor(timer / 60) <= 0) { // 小于60s,刚刚
    tip = options.just;
  } else if (timer < 60 * 60) {
    tip = Math.floor(timer / 60) + `${options.minute}`;
  } else if (timer < 60 * 60 * 24) {
    tip = Math.floor(timer / 3600) + `${options.hour}`;
  } else if (timer < 60 * 60 * 24 * 30) {
    tip = Math.ceil(timer / 86400) + `${options.day}`;
  } else {
    tip = Math.floor(timer / (86400 * 24)) + `${options.month}`;
  }
  return tip;
}

// 正则验证
const judge = {
  isMobile(parameter) {
    let patt = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    return patt.test(parameter);
  },
  isUrl(parameter) {
    let patt = /((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)/
    return patt.test(parameter);
  },
  isEmail(parameter) {
    let patt = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return patt.test(parameter);
  }
}

// 数组乱序
function arrDisorder(arr) {
  var newArr = deepClone(arr)
  for (let i = 0; i < newArr.length; i++) {
    var index = Math.floor(Math.random() * newArr.length);
    var swap = newArr[i];
    newArr[i] = newArr[index];
    newArr[index] = swap;
  }
  return newArr;
}

// 生成随机数(传入num位随机数)
function getRandom(num) {
  const currentNumber = Math.random().toString().slice(2, num + 2)
  return currentNumber;
}

/**
 * @description: 时间戳转日期对象 默认当前日期
 * @param {number} date 时间戳
 * @param {string} pattern 时间格式
 * @return {*}
 */
// formatDate(baseData.updateTime , 'yyyy-MM-dd hh:mm:ss')

const DEFAULT_PATTERN = "yyyy-MM-dd"
const SIGN_REGEXP = /([yMdhsm])(\1*)/g
// 个位日期补0
function padding(s, len) {
  len = len - (s + "").length
  for (var i = 0; i < len; i++) {
    s = "0" + s
  }
  return s
}
const formatDate = function (date = new Date(), pattern) {
  if (typeof date == "string") date = Number(date)
  if (typeof date == "string" || typeof date == "number") {
    date = new Date((date + "").length == 10 ? date * 1000 : date)
  }
  pattern = pattern || DEFAULT_PATTERN
  return pattern.replace(SIGN_REGEXP, function ($0) {
    switch ($0.charAt(0)) {
      case "y":
        return padding(date.getFullYear(), $0.length)
      case "M":
        return padding(date.getMonth() + 1, $0.length)
      case "d":
        return padding(date.getDate(), $0.length)
      case "w":
        return date.getDay() + 1
      case "h":
        return padding(date.getHours(), $0.length)
      case "m":
        return padding(date.getMinutes(), $0.length)
      case "s":
        return padding(date.getSeconds(), $0.length)
    }
  })
}

/**
 * @description: 获取设备类型
 * @return { boolean }  facility:true移动端；反之PC端
 * @return {*}
 */
const getDeviceType = function () {
  const userAgent = navigator.userAgent
  const Agents = [
    "Android",
    "iPhone",
    "NokiaN9",
    "SymbianOS",
    "Windows Phone",
    "iPad",
  ]
  const facility = Agents.some((i) => {
    return userAgent.includes(i)
  })
  return facility
}

let timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行 
 * @return null
 */
function debounce(func, wait = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}

let timer, flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 * 
 * @param {Function} func 要执行的回调函数 
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func, wait = 500, immediate = true) {
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(() => {
        flag = false;
      }, wait);
    }
  } else {
    if (!flag) {
      flag = true
      // 如果是非立即执行，则在wait毫秒内的结束处执行
      timer = setTimeout(() => {
        flag = false
        typeof func === 'function' && func();
      }, wait);
    }
  }
};


/**
* @description: 文件流转文件下载
* @param {string} fileName 文件名(带上后缀)
* @param {string} data 二进制流数据
* @return {*}
*/
const dataToFile = (fileName, data) => {
  let type = 'application/octet-stream;';
  // 兼容 IE
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(new Blob([data]), fileName);
  } else {
    // 非IE 浏览器
    const url = window.URL.createObjectURL(new Blob([data], { type }));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${fileName}`);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url); // 释放内存
  }
};

// 导出模块
module.exports = {
  deepClone,
  fastSort,
  sortObj,
  timediffer,
  judge,
  arrDisorder,
  getRandom,
  formatDate,
  getDeviceType,
  debounce,
  throttle,
  dataToFile,
}