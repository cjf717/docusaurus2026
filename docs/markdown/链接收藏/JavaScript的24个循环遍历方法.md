---
title: JavaScript的24个循环遍历方法
date: 2023-02-01 10:17:19
categories: 编程
tags:
  - JavaScript
  - 前端
cover: /images/24个JavaScript循环遍历方法.png
---

# 一、数组遍历方法

## 1. forEach()

forEach 方法用于调用数组的每个元素，并将元素传递给回调函数。数组中的每个值都会调用回调函数。其语法如下：

```
array.forEach(function(currentValue, index, arr), thisValue)
```

该方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必需。当前元素
- index：可选。当前元素的索引值。
- arr：可选。当前元素所属的数组对象

```
let arr = [1,2,3,4,5]
arr.forEach((item, index, arr) => {
  console.log(index+":"+item)
})
```

该方法还可以有第二个参数，用来绑定回调函数内部 this 变量（前提是回调函数不能是箭头函数，因为箭头函数没有 this）：

```
let arr = [1,2,3,4,5]
let arr1 = [9,8,7,6,5]
arr.forEach(function(item, index, arr){
  console.log(this[index]) // 9 8 7 6 5
}, arr1)
```

注意：

- forEach 方法不会改变原数组，也没有返回值；
- forEach 无法使用 break，continue 跳出循环，使用 return 时，效果和在 for 循环中使用 continue 一致；
- forEach 方法无法遍历对象，仅适用于数组的遍历。 2. map()

## 2. map()

方法会返回一个新数组，数组中的元素为原始数组元素调用函数处理后的值。该方法按照原始数组元素顺序依次处理元素。其语法如下：

```
array.map(function(currentValue,index,arr), thisValue)
```

该方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必须。当前元素的值；
- index：可选。当前元素的索引值；
- arr：可选。当前元素属于的数组对象。

```
let arr = [1, 2, 3];

arr.map(item => {
  return item + 1;
})

// 输出结果： [2, 3, 4]
```

该方法的第二个参数用来绑定参数函数内部的 this 变量，是可选的：

```
let arr = ['a', 'b', 'c'];

[1, 2].map(function (e) {
  return this[e];
}, arr)

// 输出结果： ['b', 'c']
```

该方法还可以进行链式调用：

```
let arr = [1, 2, 3];

arr.map(item => item + 1).map(item => item + 1)

// 输出结果： [3, 4, 5]
```

注意：

- map 方法不会对空数组进行检测；
- map 方法遍历数组时会返回一个新数组，不会改变原始数组；
- map 方法有返回值，可以 return 出来，map 的回调函数中支持 return 返回值；
- map 方法无法遍历对象，仅适用于数组的遍历。

## 3. for of

for...of 语句创建一个循环来迭代可迭代的对象。在 ES6 中引入的 for...of 循环，以替代 for...in 和 forEach() ，并支持新的迭代协议。其语法如下：

```
for (variable of iterable) {
  statement
}
```

该方法有两个参数：

- variable：每个迭代的属性值被分配给该变量。
- iterable：一个具有可枚举属性并且可以迭代的对象。

该方法可以获取数组的每一项：

```
let arr = [
  {id:1, value:'hello'},
  {id:2, value:'world'},
  {id:3, value:'JavaScript'}
]
for (let item of arr) {
  console.log(item);
}
// 输出结果：{id:1, value:'hello'} {id:2, value:'world'} {id:3, value:'JavaScript'}
```

注意：

- for of 方法只会遍历当前对象的属性，不会遍历其原型链上的属性；
- for of 方法适用遍历 数组/ 类数组/字符串/map/set 等拥有迭代器对象的集合；
- for of 方法不支持遍历普通对象，因为其没有迭代器对象。如果想要遍历一个对象的属性，可以用 for in 方法；
- 可以使用 break、continue、return 来中断循环遍历；

## 4. filter()

filter()方法用于过滤数组，满足条件的元素会被返回。它的参数是一个回调函数，所有数组元素依次执行该函数，返回结果为 true 的元素会被返回，如果没有符合条件的元素，则返回空数组。其语法如下：

```
array.filter(function(currentValue,index,arr), thisValue)
```

该方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必须。当前元素的值；
- index：可选。当前元素的索引值；
- arr：可选。当前元素属于的数组对象。

```
const arr = [1, 2, 3, 4, 5]
arr.filter(item => item > 2)

// 输出结果：[3, 4, 5]
```

同样，它也有第二个参数，用来绑定参数函数内部的 this 变量。

可以使用 filter()方法来移除数组中的 undefined、null、NAN 等值：

```
let arr = [1, undefined, 2, null, 3, false, '', 4, 0]
arr.filter(Boolean)

// 输出结果：[1, 2, 3, 4]
```

注意：

- filter 方法会返回一个新的数组，不会改变原数组；
- filter 方法不会对空数组进行检测；
- filter 方法仅适用于检测数组。

## 5. some()、every()

some() 方法会对数组中的每一项进行遍历，只要有一个元素符合条件，就返回 true，且剩余的元素不会再进行检测，否则就返回 false。

every() 方法会对数组中的每一项进行遍历，只有所有元素都符合条件时，才返回 true，如果数组中检测到有一个元素不满足，则整个表达式返回 false ，且剩余的元素不会再进行检测。其语法如下：

两者的语法如下：

```
array.some(function(currentValue,index,arr),thisValue)
array.every(function(currentValue,index,arr), thisValue)
```

两个方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必须。当前元素的值；
- index：可选。当前元素的索引值；
- arr：可选。当前元素属于的数组对象。

```
let arr = [1, 2, 3, 4, 5]
arr.some(item => item > 4)

// 输出结果： true

let arr = [1, 2, 3, 4, 5]
arr.every(item => item > 0)

// 输出结果： true
```

注意：

- 两个方法都不会改变原数组，会返回一个布尔值；
- 两个方法都不会对空数组进行检测；
- 两个方法都仅适用于检测数组。

## 6. reduce()、reduceRight()

reduce() 方法接收一个函数作为累加器，数组中的每个值（从左到右）开始缩减，最终计算为一个值。reduce() 可以作为一个高阶函数，用于函数的 compose。其语法如下：

array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
reduce 方法会为数组中的每一个元素依次执行回调函数，不包括数组中被删除或从未被赋值的元素，回调函数接受四个参数：

- total：上一次调用回调返回的值，或者是提供的初始值（initialValue）；
- currentValue：当前被处理的元素；
- currentIndex：当前元素的索引；
- arr：当前元素所属的数组对象。

该方法的第二个参数是 initialValue，表示传递给函数的初始值 （作为第一次调用 callback 的第一个参数）：

```
let arr = [1, 2, 3, 4]
let sum = arr.reduce((prev, cur, index, arr) => {
  console.log(prev, cur, index);
  return prev + cur;
})
console.log(arr, sum);
```

输出结果：

```
1 2 1
3 3 2
6 4 3
[1, 2, 3, 4] 10
```

再来加一个初始值试试：

```
let arr = [1, 2, 3, 4]
let sum = arr.reduce((prev, cur, index, arr) => {
  console.log(prev, cur, index);
  return prev + cur;
}, 5)
console.log(arr, sum);
```

输出结果：

```
5 1 0
6 2 1
8 3 2
11 4 3
[1, 2, 3, 4] 15
```

由此可以得出结论：如果没有提供初始值 initialValue，reduce 会从索引 1 的地方开始执行 callback 方法，跳过第一个索引。如果提供了初始值 initialValue，从索引 0 开始执行

reduceRight() 方法和的 reduce()用法几乎一致，只是该方法是对数组进行倒序遍历的，而 reduce()方法是正序遍历的。

```
let arr = [1, 2, 3, 4]
let sum = arr.reduceRight((prev, cur, index, arr) => {
  console.log(prev, cur, index);
  return prev + cur;
}, 5)
console.log(arr, sum);
```

输出结果：

```
5 4 3
9 3 2
12 2 1
14 1 0
[1, 2, 3, 4] 15
```

注意：

- 两个方法都不会改变原数组；
- 两个方法如果添加初始值，就会改变原数组，会将这个初始值放在数组的最后一位；
- 两个方法对于空数组是不会执行回调函数的。

## 7. find()、findIndex()

find() 方法返回通过函数内判断的数组的第一个元素的值。当数组中的元素在测试条件时返回 true 时， find() 返回符合条件的元素，之后的值不会再调用执行函数。如果没有符合条件的元素返回 undefined。

findIndex() 方法返回传入一个测试函数符合条件的数组第一个元素位置（索引）。当数组中的元素在函数条件时返回 true 时， findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。如果没有符合条件的元素返回 -1。

两个方法的语法如下：

```
array.find(function(currentValue, index, arr),thisValue)
array.findIndex(function(currentValue, index, arr), thisValue)
```

两个方法的第一个参数为回调函数，是必传的，它有三个参数：

- currentValue：必需。当前元素；
- index：可选。当前元素的索引；
- arr：可选。当前元素所属的数组对象。
- let arr = [1, 2, 3, 4, 5]

arr.find(item => item > 2)

```
// 输出结果： 3

let arr = [1, 2, 3, 4, 5]
arr.findIndex(item => item > 2)

// 输出结果： 2
```

find()和 findIndex()两个方法几乎一样，只是返回结果不同：

- find()：返回的是第一个符合条件的值；
- findIndex：返回的是第一个返回条件的值的索引值。

注意：

- 两个方法对于空数组，函数是不会执行的；
- 两个方法否不会改变原数组。

## 8. keys()、values()、entries()

三个方法都返回一个数组的迭代对象，对象的内容不太相同：

- keys() 返回数组的索引值；
- values() 返回数组的元素；
- entries() 返回数组的键值对。

三个方法的语法如下：

```
array.keys()
array.values()
array.entries()
```

这三个方法都没有参数：

```
let arr = ["Banana", "Orange", "Apple", "Mango"];
const iterator1 = arr.keys();
const iterator2 = arr.values()
const iterator3 = arr.entries()

for (let item of iterator1) {
  console.log(item);
}
// 输出结果： 0 1 2 3

for (let item of iterator2) {
  console.log(item);
}
// 输出结果： Banana Orange Apple Mango

for (let item of iterator3) {
  console.log(item);
}
// 输出结果：[0, 'Banana'] [1, 'Orange'] [2, 'Apple'] [3, 'Mango']
```

总结：

| 方法                        | 是否改变原数组 | 特点                                                                                                                             |
| --------------------------- | :------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| forEach()                   | 否             | 没有返回值                                                                                                                       |
| map()                       | 否             | 有返回值，可链式调用                                                                                                             |
| for of                      | 否             | for...of 遍历具有 Iterator 迭代器的对象的属性，返回的是数组的元素、对象的属性值，不能遍历普通的 obj 对象，将异步循环变成同步循环 |
| filter()                    | 否             | 过滤数组，返回包含符合条件的元素的数组，可链式调用                                                                               |
| every()、some()             | 否             | some()只要有一个是 true，便返回 true；而 every()只要有一个是 false，便返回 false.                                                |
| find()、findIndex()         | 否             | find()返回的是第一个符合条件的值；findIndex()返回的是第一个返回条件的值的索引值                                                  |
| reduce()、reduceRight()     | 否             | reduce()对数组正序操作；reduceRight()对数组逆序操作                                                                              |
| keys()、values()、entries() | 否             | keys() 返回数组的索引值；values() 返回数组元素；entries() 返回数组的键值对。                                                     |

# 二、对象遍历方法

## 1. for in

for…in 主要用于循环对象属性。循环中的代码每执行一次，就会对对象的属性进行一次操作。其语法如下：

```
for (var in object) {
  执行的代码块
}
```

其中两个参数：

- var：必须。指定的变量可以是数组元素，也可以是对象的属性。
- object：必须。指定迭代的的对象。

```
var obj = {a: 1, b: 2, c: 3};

for (var i in obj) {
  console.log('键名：', i);
  console.log('键值：', obj[i]);
}
```

输出结果：

键名： a
键值： 1
键名： b
键值： 2
键名： c
键值： 3

注意：

- for in 方法不仅会遍历当前的对象所有的可枚举属性，还会遍历其原型链上的属性。

## 2. Object.keys()、Object.values()、Object.entries()

这三个方法都用来遍历对象，它会返回一个由给定对象的自身可枚举属性（不含继承的和 Symbol 属性）组成的数组，数组元素的排列顺序和正常循环遍历该对象时返回的顺序一致，这个三个元素返回的值分别如下：

- Object.keys()：返回包含对象键名的数组；
- Object.values()：返回包含对象键值的数组；
- Object.entries()：返回包含对象键名和键值的数组。

```
let obj = {
  id: 1,
  name: 'hello',
  age: 18
};
console.log(Object.keys(obj)); // 输出结果: ['id', 'name', 'age']
console.log(Object.values(obj)); // 输出结果: [1, 'hello', 18]
console.log(Object.entries(obj)); // 输出结果: [['id', 1], ['name', 'hello'], ['age', 18]
```

注意

- Object.keys()方法返回的数组中的值都是字符串，也就是说不是字符串的 key 值会转化为字符串。
- 结果数组中的属性值都是对象本身可枚举的属性，不包括继承来的属性。

## 3. Object.getOwnPropertyNames()

Object.getOwnPropertyNames()方法与 Object.keys()类似，也是接受一个对象作为参数，返回一个数组，包含了该对象自身的所有属性名。但它能返回不可枚举的属性。

```
let a = ['Hello', 'World'];

Object.keys(a) // ["0", "1"]
Object.getOwnPropertyNames(a) // ["0", "1", "length"]
```

这两个方法都可以用来计算对象中属性的个数：

```
var obj = { 0: "a", 1: "b", 2: "c"};
Object.getOwnPropertyNames(obj) // ["0", "1", "2"]
Object.keys(obj).length // 3
Object.getOwnPropertyNames(obj).length // 3
```

## 4. Object.getOwnPropertySymbols()

Object.getOwnPropertySymbols() 方法返回对象自身的 Symbol 属性组成的数组，不包括字符串属性：

```
let obj = {a: 1}

// 给对象添加一个不可枚举的 Symbol 属性
Object.defineProperties(obj, {
  [Symbol('baz')]: {
    value: 'Symbol baz',
    enumerable: false
  }
})

// 给对象添加一个可枚举的 Symbol 属性
obj[Symbol('foo')] = 'Symbol foo'

Object.getOwnPropertySymbols(obj).forEach((key) => {
  console.log(obj[key])
})

// 输出结果：Symbol baz Symbol foo
```

## 5. Reflect.ownKeys()

Reflect.ownKeys() 返回一个数组，包含对象自身的所有属性。它和 Object.keys()类似，Object.keys()返回属性 key，但不包括不可枚举的属性，而 Reflect.ownKeys()会返回所有属性 key：

```
var obj = {
  a: 1,
  b: 2
}
Object.defineProperty(obj, 'method', {
  value: function () {
    alert("Non enumerable property")
  },
  enumerable: false
})

console.log(Object.keys(obj))
// ["a", "b"]
console.log(Reflect.ownKeys(obj))
// ["a", "b", "method"]
```

注意：

- Object.keys() ：相当于返回对象属性数组；
- Reflect.ownKeys() :相当于 Object.getOwnPropertyNames(obj).concat(Object.getOwnPropertySymbols(obj)。

总结：

| 对象方法                       | 遍历基本属性 | 遍历原型链 | 遍历不可枚举属性 | 遍历 | Symbol |
| ------------------------------ | :----------- | :--------- | :--------------- | :--- | :----- |
| for in                         | 是           | 是         | 否               | 否   |
| Object.keys()                  | 是           | 否         | 否               | 否   |
| Object.getOwnPropertyNames()   | 是           | 否         | 是               | 否   |
| Object.getOwnPropertySymbols() | 否           | 否         | 是               | 是   |
| Reflect.ownKeys()              | 是           | 否         | 是               | 是   |

# 三、其他遍历方法

## 1. for

for 循环是应该是最常见的循环方式了，它由三个表达式组成，分别是声明循环变量、判断循环条件、更新循环变量。这三个表达式用分号分隔。可以使用临时变量将数组的长度缓存起来，避免重复获取数组长度，当数组较大时优化效果会比较明显。

```
const arr = [1,2,3,4,5]
for(let i = 0, len = arr.length; i < len; i++ ){
  console.log(arr[i])
}
```

在执行的时候，会先判断执行条件，再执行。for 循环可以用来遍历数组，字符串，类数组，DOM 节点等。可以改变原数组。

## 2. while

while 循环中的结束条件可以是各种类型，但是最终都会转为布尔值，转换规则如下。

- Boolean：true 为真，false 为假；
- String：空字符串为假，所有非空字符串为真；
- Number：0 为假，非 0 数字为真；
- null/Undefined/NaN：全为假；
- Object：全为真。

```
let num = 1;

while (num < 10){
  console.log(num);
  num ++;
}
while 和 for 一样，都是先判断，再执行。只要指定条件为 true，循环就可以一直执行代码。
```

## 3. do / while

该方法会先执行再判断，即使初始条件不成立，do/while 循环也至少会执行一次。

```
let num = 10;

do
{
  console.log(num);
  num--;
}
while(num >= 0);

console.log(num); //-1
```

不建议使用 do / while 来遍历数组。

## 4. for await of

for await...of 方法被称为异步迭代器，该方法是主要用来遍历异步对象。它是 ES2018 中引入的方法。

for await...of 语句会在异步或者同步可迭代对象上创建一个迭代循环，包括 String，Array，类数组，Map， Set 和自定义的异步或者同步可迭代对象。这个语句只能在 async function 内使用：

```
function Gen (time) {
  return new Promise((resolve,reject) => {
    setTimeout(function () {
      resolve(time)
    },time)
  })
}

async function test () {
  let arr = [Gen(2000),Gen(100),Gen(3000)]
  for await (let item of arr) {
    console.log(Date.now(),item)
  }
}
test()
```

输出结果：

图片: ![输出结果][结果图片地址]

[结果图片地址]: data:image/png;base64,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
