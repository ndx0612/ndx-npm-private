// 深度克隆
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

// 数组排序,true为降序,不传为升序
function fastSort(array, bool) {
  let nums = array;
  if (!bool) {
    function sortNumber(a, b) {
      return a - b;
    }
  } else {
    function sortNumber(a, b) {
      return b - a;
    }
  }
  nums = nums.sort(sortNumber);
  return nums;
}

// 数组对象排序
function sortObj(object, option) {
  function compare(option) {
    return function (obj1, obj2) {
      var val1 = obj1[option];
      var val2 = obj2[option];
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
  return object.sort(compare(option));
}

// 时差计算
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


// 导出模块
module.exports = {
  deepClone,
  fastSort,
  sortObj,
  timediffer
}