# ndx-npm-private

## 一、说明和用法

1、改包连接githuub、更新前请先上传到GitHubhttps://github.com/ndx2527/ndx-npm-private.git

2、上传

```
# 版本更新
npm version patch

# 上传到npm
npm publish
```

3、用法

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



## 二、查询

1、deepClone

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



2、fastSort

说明：将数组从小到大排序（默认）

参数：传入参数为一个数组，返回排序后的数组。

​		第二个参数为bool值，默认为flase（升序）。true为降序

示例：

```javascript
nums = [1, 31, 5, 20, 8, 16, 51, 64]
fastSort(nums) // 升序
fastSort(nums,true) // 降序
```



3、sortObj

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



4、timediffer

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

