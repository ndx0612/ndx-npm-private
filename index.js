export default {
  /**
   * 深度拷贝一个数组/对象
   * 用法：传入参数数组或者对象，返回一个新的对象
   */
  deepClone(source) {
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
}