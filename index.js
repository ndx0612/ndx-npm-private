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
// 导出模块
module.exports = {
  deepClone,
}