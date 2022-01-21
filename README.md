# ndx-npm-private

## 一、说明和用法

### 1、改包连接githuub

更新前请先上传到GitHubhttps://github.com/ndx2527/ndx-npm-private.git

### 2、上传

```
# 版本更新
npm version patch

# 上传到npm
npm publish
```

### 3、用法

```js
import formatDate from 'ndx-npm-private'

const obj1 = {
  name: 'tom',
  age: 20,
  arr: [1, 2, 3, 4]
}

// 深度拷贝 obj1 ，使用的是自己封装的方法
const obj2 = formatDate.deepClone(obj1);

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
const obj2 = formatDate.deepClone(obj); // 返回深度克隆后的对象
```



### 2、fastSort-快速排序

说明：将数组从小到大排序（默认）

参数：传入参数为一个数组，返回排序后的数组。

​		第二个参数为bool值，默认为flase（升序）。true为降序

示例：

```javascript
nums = [1, 31, 5, 20, 8, 16, 51, 64]
formatDate.fastSort(nums) // 升序
formatDate.fastSort(nums,true) // 降序
```



### 3、sortObj-对象排序

说明：对数组（里面包含多个对象）进行排序。

参数：第一个为需要排序的数组对象

​		第二个参数为字符串，选择需要排序的字段

示例：

```javascript
list = [
  { name: 'lwx', sex: 'bbbb', age: 22 },
  { name: 'xiaohu', sex: 'fd', age: 30 },
  { name: 'lwx', sex: 'ghf', age: 5 },
  { name: 'tian', sex: 'ghf', age: 10 },
];
sortObj(list, 'age'); // 通过age进行排序(升序)
```



### 4、timediffer-计算时差

说明：时间差值显为易读形式。

​	1.小于60s，显示刚刚

​	2.大于60s，小于1个小时，？分钟前

​	3.大于1小时，小于24小时，？小时前

​	4.大于24小时，小于一个月，？天前

​	5.大于一个月，小于12个月，？个月前

​	6.大于12个月，？年前

参数：第一个参数为过去事件，第二个参数为之后时间（不传默认为当前时间）

示例：

```javascript
var t1 = new Date("2020-10-11 15:21:57");
var t2 = new Date(); // 获取当前时间
console.log(timediffer(t1, t2));
```

### 5、judge正则验证

说明：验证是否为手机号、URL、邮箱

用法：

```javascript
console.log(formatDate.judge.isMobile('15055906047'));
console.log(formatDate.judge.isUrl('https://www.baidu.com/'));
console.log(formatDate.judge.isEmail('1378362527@qq.com'));
```

### 6、arrDisorder数组乱序

说明：传入一个数组，深度克隆一个新的乱序数组并返回

用法：

```javascript
const arr = [1, 2, 3, 4, 5, 6, 7, 8]
console.log(arrDisorder(arr)); // 输出乱序数组
```

### 7、getRandom获取随机验证码

说明：传入一个参数（数字），获取指定长度的验证码（字符串类型）。

用法：

```javascript
console.log(getRandom(6)); // 输出6为随机数
```

