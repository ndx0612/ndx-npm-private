/**
 * @description: 深度拷贝
 */
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

/**
 * @description: 计算时差
 * @param {String} startTime 
 * @return {String}
 */
var timeDiffer = function (startTime) {
  var currentTime = Date.parse(new Date()),
    time = currentTime - startTime,
    day = parseInt(time / (1000 * 60 * 60 * 24)),
    hour = parseInt(time / (1000 * 60 * 60)),
    min = parseInt(time / (1000 * 60)),
    month = parseInt(day / 30),
    year = parseInt(month / 12);
  if (year) return year + "年前"
  if (month) return month + "个月前"
  if (day) return day + "天前"
  if (hour) return hour + "小时前"
  if (min) return min + "分钟前"
  else return '刚刚'
}

/**
 * 日期补0
 */
function padding(s, len) {
  len = len - (s + "").length
  for (var i = 0; i < len; i++) {
    s = "0" + s
  }
  return s
}

/**
 * @description: 时间戳转日期对象 默认当前日期
 * @param {number} date 时间戳
 * @param {string} pattern 时间格式
 */
const formatDate = (date = new Date(), pattern) => {
  if (typeof date == "string") date = Number(date)
  if (typeof date == "string" || typeof date == "number") {
    date = new Date((date + "").length == 10 ? date * 1000 : date)
  }
  pattern = pattern || "yyyy-MM-dd"
  return pattern.replace(/([yMdhsm])(\1*)/g, function ($0) {
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
const getDeviceType = () => {
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
 * @description: 防抖
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
 * @description: 节流
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

/**
 * @description: 当localStorage里面存的是对象的时候，获取值
 * @param {string} localStorageKey
 * @return {Object}
 */
const getLocalStorageData = (localStorageKey) => {
  var data = localStorage.getItem(localStorageKey);
  if (data != null) {
    // 本地存储里面的数据是字符串格式的，但我们需要的是对象格式
    return JSON.parse(data);
  } else {
    return {};
  }
};

/**
 * @description: 重置一个对象的所有key
 * @param {Object} obj
 * @returns {Object}
 */
const resetObject = (obj) => {
  // 1、数字、字符串、boolean值重置为 ""
  // 2、数组重置为[]
  // 3、对象重置为{}
  for (const item in obj) {
    if (obj[item]) {
      console.log(obj[item].constructor);
      if (obj[item].constructor === Array) {
        obj[item] = [];
      } else if (obj[item].constructor === Object) {
        obj[item] = {};
      } else {
        obj[item] = "";
      }
    }
  }
  return obj
};

/**
 * @description: url解析
 * @param  {String} url  default: window.location.href
 * @return {Object}
 */
 function parseQueryString(url) {
  url = !url ? window.location.href : url;
  if (url.indexOf("?") === -1) {
    return {};
  }
  var search =
    url[0] === "?" ? url.substr(1) : url.substring(url.lastIndexOf("?") + 1);
  if (search === "") {
    return {};
  }
  search = search.split("&");
  var query = {};
  for (var i = 0; i < search.length; i++) {
    var pair = search[i].split("=");
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
  }
  return query;
}


const judge = {
  isMobile(parameter) {
    let reg = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
    return reg.test(parameter);
  },
  isUrl(parameter) {
    let reg = /((http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)/
    return reg.test(parameter);
  },
  isEmail(parameter) {
    let reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
    return reg.test(parameter);
  }
}

/**
 * @description: 给数字或者金额千分位添加逗号
 * @param: money {number} 必须传入数字类型
 * @param: precision {number} 精度 默认是小数点后两位
 * @param: splitDesc {string} 分隔符
 */
const formatMoney = (money, precision = 2, splitDesc = ",") => {
  precision = +precision; // 这里为了处理precision传入null  +null=0
  const str = money.toFixed(precision);
  const reg =
    str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
  return str.replace(reg, "$1" + splitDesc);
};

/**
 * @description: 金额转大写
 * @param  {Number} n 
 * @return {String}
 */
function digitUppercase(n) {
  var fraction = ['角', '分'];
  var digit = [
    '零', '壹', '贰', '叁', '肆',
    '伍', '陆', '柒', '捌', '玖'
  ];
  var unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  var head = n < 0 ? '欠' : '';
  n = Math.abs(n);
  var s = '';
  for (var i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (var i = 0; i < unit[0].length && n > 0; i++) {
    var p = '';
    for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元')
    .replace(/(零.)+/g, '零')
    .replace(/^整$/, '零元整');
};

/**
 * @description: 保留小数位
 * @param {Number, String}
 * @param {Number} 保留几位小数
 * @param {Boolean} 是否返回字符串
 */
 function financial(num, decimal = 2, isString = true) {
  if (isString) {
    return Number.parseFloat(num).toFixed(decimal);
  } else {
    return Number(Number.parseFloat(num).toFixed(decimal));
  }
}

// 导出模块
module.exports = {
  deepClone,
  timeDiffer,
  formatDate,
  getDeviceType,
  debounce,
  throttle,
  dataToFile,
  getLocalStorageData,
  resetObject,
  parseQueryString,
  digitUppercase,
  financial
}