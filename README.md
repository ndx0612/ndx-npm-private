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