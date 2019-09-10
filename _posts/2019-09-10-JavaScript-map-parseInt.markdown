---
layout: post
title:  "JavaScript | 为何 ['1','7','11'].map(parseInt) = [1, NaN, 3] 【译】"
date:   2019-09-10 19:00:00 +0800
categories: javascript
header-img: "img/in-post/post-bg-js2.png"
tags:
    - javascript
---

*javascript* 是古怪的。不信🤨？试着用`map`和`parseInt`将一个字符串数组转成数字数组。将下面的段代码输入到控制台(在Chrome浏览器按 F12)，并回车。
```js
['1', '7', '11'].map(parseInt);
```
我们得到结果是`[1, NaN, 3]`，而不是我们想要的`[1, 7, 11]`。为何？为了探究其原因，我们先探讨一些javascript观点。如果你是个'太长不看'，可以直接到总结部分。
![](/img/in-post/2019-09-10-js-map-parseInt.jpeg)  

### true 或者 false
看下面这个 `if-else` 的简单条件语句。
```js
if (true) {
    // 总是执行
} else {
    // 绝对不会执行
}
```
在这个例子中，`if-else`的语句总是`true`，所以`if`下的块语句总是执行，而`else`语句块绝不会执行。这很好理解，因为`true`是`boolean`。如果不是`boolean`作为条件的话会是怎么样呢？  
```js
if ("hello world") {
    // 执行这个？
    console.log("Condition is true");
} else {
    // 还是这个？
    console.log("Condition is false");
}
```
当你在控制台里执行后，会发现`if`下的语句块被执行，说明`string`对象`"hello world"`转成`boolean`值为`true`。所有的javascript的值要么是`true`要么是`false`。当在一个`boolean`环境下时，如`if-else`，都会被转成`true`或`false`。那么这个转换规则是什么呢？可以参考以下这个规则：   

> ⚠️ 除了`false`, `0`, `""` (空字符串), `null`, `undefined`, 和 `NaN`，其余的值都是转成`true`  

也就是说，字符串`"false"`,`"0"`,以及空对象`{}`,空数组`[]`都是被转成`true`。你可以用`Boolean`方法验证下，例如`Boolean("0")`。在我们这个文章中，我们只用到`0`是转成`false`。

### 基数
```
0 1 2 3 4 5 6 7 8 9 10
````
当我们从一数到九，我们有不同的字符表示每个数字(0-9)。然而，当数到十的时候，我们用两个字符表示(1和0)。这是因为我们采用的十进制，以10为基数(radix or base)。基数就是用一个字符表示的最小单位的数量。不同的计数方法有不同的基数，在不同的基数下一些相同的字符表示不同的数字。  
```
十进制   二进制    十六进制
RADIX=10  RADIX=2   RADIX=16
0         0         0
1         1         1
2         10        2
3         11        3
4         100       4
5         101       5
6         110       6
7         111       7
8         1000      8
9         1001      9
10        1010      A
11        1011      B
12        1100      C
13        1101      D
14        1110      E
15        1111      F
16        10000     10
17        10001     11
```
例如，看上面的表格，在不同的基数规则字符11可以表示不同的数字。如果基数是2，那么11表示的是数字3，如果基数是16，那么表示数字17。你可能注意到了，我们的例子中的11被`parseInt`后变成了3，也就是基数为2的时候。

### Function arguments
Javascript中的function，不管声明时是几个变量，调用时可以传任意个参数。没有传的默认为`undefined`，超出的部分被忽略(但会保存在`arguments`对象中)。  
```js
function foo(x, y) {
    console.log(x, y);
}
foo(1, 2);      // 1  2
foo(1);         // 1  undefined
foo(1, 2, 3);   // 1  2
```

### map()
`map`是数组`Array`的一个方法，返回的是一个数组，这个数组的值是由原数组的每一个值通过一个新方法映射的。例如，下面的代码就是把数组里所有的数乘以3。  
```js
function multiplyBy3(x) {
    return x * 3;
}
const result = [1, 2, 3, 4, 5].map(multiplyBy3);
console.log(result);   // [3, 6, 9, 12, 15];
```
现在我们可以用利用`map()`传入`console.log`打印所有元素。
```js
[1, 2, 3, 4, 5].map(console.log);
```
![](/img/in-post/2019-09-10-js-map-log.png)  
哇🐸！发现打印的不仅仅是数值，还打印了index和整个数组。
```js
[1, 2, 3, 4, 5].map(console.log);
// 相当于
[1, 2, 3, 4, 5].map(
    (val, index, array) => console.log(val, index, array)
);
// 而不是
[1, 2, 3, 4, 5].map(
    val => console.log(val)
);
```
当传入一个函数给map()时，对于每一个迭代器，都传了3个参数给这个函数：`currentValue`(当前值), `currentIndex`(当前索引), 和 `array`(原数组)。这就是为什么会打印三个值了。好的👌，我们现在已经揭开部分谜底了。  

### 综合起来看
`parseInt`需要两个参数：字符串和基数。当基数作为条件的时候是`false`时，基数默认为10。  
```js
parseInt('11');               // 11
parseInt('11', 2);            // 3
parseInt('11', 16);           // 17
parseInt('11', undefined);    // 11 (基数 是 false)
parseInt('11', 0);            // 11 (基数 是 false)
```
现在，让我们一步一步分解我们的例子：  
```js
['1', '7', '11'].map(parseInt);     // [1, NaN, 3]
// 第一次迭代: val = '1', index = 0, array = ['1', '7', '11']
parseInt('1', 0, ['1', '7', '11']); // 1
```
因为`Boolean(0)`为`false`，所以默认的基数为10。`parseInt`只接收两个参数，所以第三个参数`['1', '7', '11']`被忽略了。字符串`'1'`在基数10中为数字1。  
```js
// 第二次迭代: val = '7', index = 1, array = ['1', '7', '11']
parseInt('7', 1, ['1', '7', '11']); //  NaN
```
在基数1的系统中, 字符 `'7'` 不存在. 像第一次迭代一样,最后一个参数被忽略。所以`parseInt`结果为`NaN`。  
```js
// 第三次迭代: val = '11', index = 2, array = ['1', '7', '11']
parseInt('11', 2, ['1', '7', '11']);  // 3
```
在基数2下(二进制)下, `'11'`表示数字3。最后一个参数被忽略。  

### 总结
`['1', '7', '11'].map(parseInt)`没有像预期一样是因为`map`在每次迭代传了3个参数给`parseInt`。第二个参数`index`(当前索引)被`parseInt`作为基数参数了。所以，每个字符串被解析成不同的基数。`'7'`用基数1，返回`NaN`,`'11'`用基数2，返回`3`。因为`Boolean(0)`为`false`，`'1'`用默认基数10，返回`1`。

因此，我们想要的结果应该是如下代码：
```js
['1', '7', '11'].map(numStr => parseInt(numStr));
```
![](/img/in-post/2019-09-10-js-map-parseint-right.png)  

---
原文链接🔗：[https://medium.com/dailyjs/parseint-mystery-7c4368ef7b21](https://medium.com/dailyjs/parseint-mystery-7c4368ef7b21)