# ndx-npm-private

## 一、说明和用法

PS：接下来每一个版本的md文档都会更新！！！！



[TOC]



### 1、本包连接GitHub

更新前请先上传到GitHub：https://github.com/ndx2527/ndx-npm-private.git

### 2、上传

```
# 版本更新
npm version patch

# 上传到npm
npm publish
```

### 3、用法

```js
import dealDate from 'ndx-npm-private'

const obj1 = {
  name: 'tom',
  age: 20,
  arr: [1, 2, 3, 4]
}

// 深度拷贝 obj1 ，使用的是自己封装的方法
const obj2 = dealDate.deepClone(obj1);

obj2.name = 'ndx';
console.log(obj1);
console.log(obj2);
```

### 4、扩展：修改源

查看源：npm config get registry

配置淘宝镜像源：npm config set registry https://registry.npm.taobao.org

配置官方源： npm config set registry https://registry.npmjs.org/

## 二、查询

### 1、deepClone-深度克隆

说明：深度克隆一个对象或者数组。

参数：传入参数为一个对象/数组，返回一个深度克隆后的对象。

示例：

```javascript
const obj1 = {
  name: 'tom',
  age: 20,
  arr: [1, 2, 3, 4]
}
const obj2 = dealDate.deepClone(obj); // 返回深度克隆后的对象
```



### 2、timeDiffer-计算时差

说明：时间差值显为易读形式。

​	1.小于60s，显示刚刚

​	2.大于60s，小于1个小时，？分钟前

​	3.大于1小时，小于24小时，？小时前

​	4.大于24小时，小于一个月，？天前

​	5.大于一个月，小于12个月，？个月前

​	6.大于12个月，？年前

参数：第一个参数为过去时间，第二个参数为之后时间（不传默认为当前时间），参数是时间戳！

示例：

```javascript
var t1 = new Date("2020-10-11 15:21:57");
var t2 = new Date(); // 获取当前时间
console.log(timediffer(t1, t2));
```



### 3、formatDate处理日期格式

说明：传入时间戳，可以转换成你想要的格式

用法：

```javascript
/**
 * @description: 时间戳转日期对象 默认当前日期
 * @param {number} date 时间戳
 * @param {string} pattern 时间格式
 * @return {*}
 */
var time = new Date()
console.log(formatDate(time , 'yyyy-MM-dd hh:mm:ss')); // 2022-04-26 17:45:30
console.log(formatDate(time , 'yyyy-M-dd hh:mm')); // 2022-4-26 17:45
```

### 4、获取设备类型

```javascript
/**
 * @description: 获取设备类型
 * @return { boolean }  facility:true移动端；反之PC端
 * @return {*}
 */
console.log(getDeviceType()); // true移动端；反之PC端
```

## 三、其它

1）推荐一：JavaScript常用方法库，可直接查看笔记：https://note.youdao.com/s/M3YELiSI

2）推荐二：vueuse官方库，自己总结的笔记：https://note.youdao.com/s/2lqjACyC