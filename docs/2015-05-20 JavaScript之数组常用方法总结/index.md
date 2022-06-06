# JavaScript之数组常用方法总结

---

### 转换方法

* toString()

参数： 无。

返回值：返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串，为了创建这个字符串会调用数组中每一项的toString()方法。

描述：返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。

示例：

~~~javascript
var colors = ['red', 'green', 'blue'];
var str = colors.toString();
console.log(str); //red,green,blue
~~~

~~~javascript
var person1 = {
	toString: function() {
		return 'person1';
	}
};
var person2 = {
	toString: function() {
		return 'person2';
	}
};

var persons = [person1, person2];
var str = persons.toString();
console.log(str); //person1,person2
~~~

* toLocaleString()

参数：无。

返回值：返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串，为了创建这个字符串会调用数组中每一项的toLocaleString()方法。

描述：返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串。

示例：

~~~javascript
var person1 = {
	toString: function() {
		return 'person1';
	},
	toLocaleString: function() {
		return 'locale person1';
	}
};
var person2 = {
	toString: function() {
		return 'person2';
	},
	toLocaleString: function() {
		return 'locale person2';
	}
};

var persons = [person1, person2];
var str = persons.toLocaleString();
console.log(str); //locale person1,locale person2
~~~

* join()

参数：str，可选。用来分隔数组某个元素与下一个元素的可选字符或字符串。如果省略，默认是英文逗号（,）。

返回值：一个字符串。将数组中的每一个元素转换为字符串，然后用参数指定的字符串分隔开，最后衔接为返回的字符串。

描述：将数组的每一个元素转换为字符串，并通过在中间插入指定的分隔字符串将它们衔接起来，最后返回衔接好的字符串。其相反的操作--将字符串分割成数组元素，可以参考String对象的split()方法。

示例：

~~~javascript
var arr = ['red', 'green', 'blue'];
var str;
str = arr.join();
console.log(str); //red,green,blue
str = arr.join('|');
console.log(str); //red|green|blue
~~~

注意：如果数组中某一项的值是null或者undefined，那么该值在join()方法返回的结果中以空字符串表示。

### 栈方法

* push()

参数：value, ... 。追加到数组尾部的一个或多个值。

返回值：把指定值追加到数组后 数组的新长度。

描述：push()将参数按顺序追加到数组尾部。它直接修改原数组而不是创建一个新数组。

示例：

~~~javascript
var arr = [];
var count;
count = arr.push('red');
console.log(count); //1
count = arr.push('green', 'blue');
console.log(count); //3
~~~

* pop()

参数：无。

返回值：数组的最后一个元素。

描述：移除并返回数组的最后一个元素。它会修改数组的长度。如果数组已经为空，pop()不会修改该数组，返回值是undefined。

示例：

~~~javascript
var stack = [];
var count, item;
count = stack.push(1, 2);
console.log(count, stack); //2, [1, 2]
item = stack.pop();
console.log(item, stack); //2, [1]
count = stack.push([4, 5]);
console.log(count, stack); //2, [1, [4, 5]]
item = stack.pop();
console.log(item, stack); //[4, 5], [1]
item = stack.pop();
console.log(item, stack); //1, []
~~~

### 队列方法

* shift()

参数：无。

返回值：数组的第一个元素。

描述：移除并返回数组的第一个元素，并将所有后续元素前移一位，以填补数组头部的空缺。如果数组为空，则直接返回undefined。它会直接修改原数组，不会创建新数组。

示例：

~~~javascript
var arr = [1, [2, 3], 4];
var item;
item = arr.shift();
console.log(item); //1
item = arr.shift();
console.log(item); //[2, 3]
~~~

* unshift()

参数：value, ... 。要插入数组头部的一个或多个值。

返回值：数组的新长度。

描述：将参数插入数组的头部，并将已经存在的元素顺次往后移动，以便留出空间。该方法的第一个参数会成为新数组的元素0，第二个参数会成为数组的元素1，以此类推。该方法直接修改原数组，不会创建新数组。

示例：

~~~javascript
var arr = [];
var count, item;
count = arr.unshift(1);
console.log(count, arr); //1, [1]
count = arr.unshift(22);
console.log(count, arr); //2, [22, 1]
item = arr.shift();
console.log(item, arr); //22, [1]
count = arr.unshift(33, [44, 55]);
console.log(count, arr); //3, [33, [44, 55], 1]
~~~

### 重排序方法

* sort()

参数：orderfunc，可选。用来指定如何排序的可选函数。

返回值：原数组的引用。

描述：该方法在原数组中对元素进行排序，不会创建新数组。如果不带参数，将按照字母顺序（字符编码顺序）对数组中的元素进行排序。要实现这一点，首先要把元素转换为字符串（如有必要），以便进行比较。如果要按照其它顺序进行排序，就必须提供比较函数。该函数要比较两个值，然后返回一个数字来表明这两个值的相对顺序。比较函数需要接收两个参数a和b，并返回如下值：

一个小于0的值：在这种情况下，表示根据排序标准，a小于b，在排序后的数组中，a应该排在b 的前面。

0：在这种排序在，a和b是相等的。

一个大于0的值：在这种情况下，a大于b。

示例：

~~~javascript
var arr = [33, 4, 1111, 222];
var arr2;
arr2 = arr.sort();
console.log(arr); //1111, 222, 33, 4
arr2 = arr.sort(function(a, b) {
	return a-b;
});
console.log(arr); //4, 33, 222, 1111
~~~

注意：sort()方法会调用每个数组项的toString()方法，然后比较得到的字符串，以确定如何排序，即使数组的每一项都是数值。数组中的undefined元素会始终排列在数组末尾。即便提供了自定义的比较函数也是如此，因为undefined值不会传递给提供的orderfunc。

* reverse()

参数：无。

返回值：原数组的引用。

描述：该方法可以颠倒数组元素的顺序。它在原数组中调整元素而不创建新数组。

示例：

~~~javascript
var arr = [1, 2, 3, 4, 5];
var arr2;
arr2 = arr.reverse();
console.log(arr); //[5, 4, 3, 2, 1]
~~~

### 操作方法

* concat()

参数：value, ... 。任意多个要衔接到数组中的值。

返回值：一个新数组，包含数组的原有元素以及衔接的新元素。

描述：将参数衔接到数组中得到一个新数组并返回。它不修改原数组。如果传递的某个参数本身是一个数组，会将该数组的元素衔接到原数组，而不是数组本身。

示例：

~~~javascript
var arr = [1, 2, 3];
var newArr;
newArr = arr.concat();
console.log(newArr); //[1, 2, 3]
newArr = arr.concat(4, 5);
console.log(newArr); //[1, 2, 3, 4, 5]
newArr = arr.concat([4, 5]);
console.log(newArr); //[1, 2, 3, 4, 5]
newArr = arr.concat([4, 5], [6, 7]);
console.log(newArr); //[1, 2, 3, 4, 5, 6, 7]
newArr = arr.concat(4, [5, [6, 7]]);
console.log(newArr); //[1, 2, 3, 4, 5, [6, 7]]
~~~

* slice()

参数： start，end

start：数组片段开始处的数组序号，如果为负数，则表示从数组的尾部开始计算。

end：数组片段结束处的后一个元素的数组序号。如果没有指定，该片段会包含从start开始到数组尾部的所有数组元素。如果为负数，则表示从数组的尾部开始计算。

返回值：一个新数组，包含数组中从start开始一直到end之间的所有元素（包含start指定的元素，但不包含end指定的元素）。

描述：返回原始数组的片段，或称为子数组。返回的数组包含从start开始一直到end之间的所有元素（包含start指定的元素，但不包含end指定的元素）。如果没有指定end，返回的数组会包含从start开始到数组尾部的所有数组元素。

示例：

~~~javascript
var arr = [1, 2, 3, 4, 5];
var newArr;
newArr = arr.slice(0, 3);
console.log(newArr); //[1, 2, 3]
newArr = arr.slice(3);
console.log(newArr); //[4, 5]
newArr = arr.slice(1, -1);
console.log(newArr); //[2, 3, 4]
newArr = arr.slice(-3, -2);
console.log(newArr); //[3]
~~~

注意：如果结束位置小于开始位置，则返回空数组。

* splice()

参数：start，deleteCount，value...

start：开始插入和（或）删除处的数组元素的序号。

deleteCount：要删除的元素个数，从start开始，包含start处的元素。如果指定为0，表示插入元素，而不用删除任何元素。

value...：要插入数组中的0个或多个值，从start序号处开始插入。

返回值：返回一个新数组，如果从数组中删除了元素，则包含这些删除的元素，否则返回空数组。

描述：删除从start开始（包括start处）的0个或多个元素，并且用参数列表中指定的0个或多个值来替换掉那些删除的元素。该方法会直接修改原始数组。

~~~javascript
var arr = [1, 2, 3, 4];
var retArr;
retArr = arr.splice(1, 2);
console.log(retArr, arr); //[2, 3], [1, 4]
retArr = arr.splice(1, 1);
console.log(retArr, arr); //[4], [1]
retArr = arr.splice(1, 0, 2, 3);
console.log(retArr, arr); //[], [1, 2, 3]
~~~

### 位置方法

* indexOf()

参数：value [, start] 。value：要在数组中查找的值。start：开始查找的序号，可选。如果省略则为0。

返回值：一个大于等于start的最小序号值，该序号值处的数组元素与value全等。如果不存在匹配的元素时，返回-1。

描述：该方法在数组中查找等于value的元素，并返回找到的第一个元素的序号。查找的起始位置是start指定的序号，如果没有指定则从0开始。判断是否相等使用的是"==="操作符。返回值是找到的第一个匹配元素的序号，如果没有找到匹配的，则返回-1。

示例：

~~~javascript
var arr = ['a', 'b', 'c', 'b'];
var pos;
pos = arr.indexOf('b');
console.log(pos); //1
pos = arr.indexOf('d');
console.log(pos); //-1
pos = arr.indexOf('a', 1);
console.log(pos); //-1
~~~

* lastIndexOf()

参数：value [, start] 。value：要在数组中查找的值。start：开始查找的序号，可选。如果省略则从最后一个元素开始查找。

返回值：一个小于等于start的最大序号值，该序号值处的数组元素与value全等。如果不存在匹配元素时返回-1。

描述：该方法在数组中反向查找等于value的元素，并返回找到的第一个匹配元素的序号值。查找的起始位置是start指定的数组序号，如果没有指定，则从最后一个元素开始。判断是否相等使用的是"==="操作符。返回值是找到的第一个匹配元素的序号，如果没有找到匹配的，则返回-1。

示例：

~~~javascript
var arr = ['a', 'b', 'c', 'b'];
var pos;
pos = arr.lastIndexOf('b');
console.log(pos); //3
pos = arr.lastIndexOf('d');
console.log(pos); //-1
pos = arr.lastIndexOf('c', 1);
console.log(pos); //-1
~~~

### 迭代方法

forEach()、filter()、map()、every()、some() 这些方法都接收一个函数作为第一个参数，并接收可选的第二个参数。如果指定了第二个参数o，则调用函数时，就好像该函数是o的方法一样。即，在函数体内，this值等于o。如果没有指定第二个参数，则就像函数一样调用该函数，而不是方法。this值在非严格模式下是全局对象，在严格模式下是null。

所有这些方法都会在开始遍历时记录数组的长度。如果调用函数把新元素追加到数组中，这些新添加的元素不会被遍历到。如果调用的函数修改了未被遍历到的已存在元素，则调用时会传递修改后的值。

当作用于稀疏数组时，这些方法不会在实际上不存在元素的序号上调用函数。

* forEach()

参数：fn [, o] 。fn：为数组每一个元素调用的函数。 o：调用fn时的this值，可选。

返回值：无。

描述：该方法按序号从小到大遍历数组，并对每一个元素调用一次fn。对于序号i，调用fn时带有3个参数：

`fn(array[i], i, array)`

fn的任何返回值都会忽略。forEach()方法没有返回值。

示例：

~~~javascript
var arr = [1, 2, 3];
arr.forEach(function(v, i, array) {
    array[i] ++;
});
console.log(arr); //[2, 3, 4]
~~~

* filter()

参数：n [, o] 。fn：用来判断数组中的元素是否需要包含在返回数组中的调用函数。 o：调用fn时的this值，可选。

返回值：一个新数组，只包含那些让fn返回true的数组元素。

描述：该方法会创建一个新数组，包含那些让fn函数返回true的数组元素。该方法不会修改数组本身。该方法按序号从小到大遍历数组，并对每一个元素调用一次fn。对于序号i，调用fn时带有3个参数：

`fn(array[i], i, array)`

如果fn返回true，则数组中序号为i的元素会追加到新创建的数组中。一旦filter()测试完数组中的每一个元素，它就会返回新创建的数组。

示例：

~~~javascript
var arr = [1, 2, 3, 4, 5, 4, 3, 2, 1];
var newArr = arr.filter(function(v, i, array) {
	return v>2;
});
console.log(newArr); //[3, 4, 5, 4, 3]
~~~

* map()

参数：n [, o] 。fn：为数组每一个元素调用的函数，它的返回值会成为返回数组的元素。 o：调用fn时的this值，可选。

返回值：一个新数组，由函数fn计算出的元素组成。

描述：该方法会创建一个新数组，新数组长度与原始数组一样。新数组的元素通过将原始数组的元素传递给函数fn计算得到。该方法按序号从小到大遍历数组，并对每一个元素调用一次fn。对于序号i，调用fn时带有3个参数：

`newArray[i] = fn(array[i], i, array)`

fn的返回值存放在新创建数组的序号i处。

示例：

~~~javascript
var arr = [1, 2, 3];
var newArr = arr.map(function(v, i, array) {
	return v*v;
});
console.log(newArr); //[1, 4, 9]
~~~

* every()

参数：n [, o] 。fn：用来测试数组每一个元素的断言函数。 o：调用fn时的this值，可选。

返回值：如果对数组中每一个元素调用fn时都返回真值，则返回true。如果有任何一个元素调用fn时返回假值，则返回false。

描述：测试断言函数是否对每个元素都为true。该方法用来测试数组的所有元素是否都满足某些条件。它会按照序号从小到大的顺序遍历数组的元素，并对每个元素调用指定的fn函数。如果fn返回false（或任何可以转化为false的值），则该函数会停止遍历，并立即返回false。如果fn针对原数组元素每一次调用都返回true，则函数返回true。当遍历的数组为空时，every()总是返回true。对于序号i，调用fn时带有3个参数：

`fn(array[i], i, array)`

fn的返回值会当做布尔值解析。true和真值表示该数组元素通过了测试或者说满足该函数所描述的条件。如果返回值为false或价假值，则表示数组元素没有通过测试。

示例：

~~~javascript
var arr = [1, 2, 3];
var b;
b = arr.every(function(v, i, array) {
	return v<5;
});
console.log(b); //true
b = arr.every(function(v, i, array) {
	return v<2;
});
console.log(b); //false

arr = [];
b = arr.every(function(v, i, array) {
	return false;
});
console.log(b); //true
~~~

* some()

参数：n [, o] 。fn：用来测试数组元素的断言函数。 o：调用fn时的this值，可选。

返回值：如果数组中有至少一个元素调用fn时返回真值，则返回true。如果数组所有元素调用fn都返回假值，则返回false。

描述：测试是否有元素满足断言函数。该方法用来测试数组中是否有元素满足某些条件。它会按照序号从小到大的顺序遍历数组的元素，并对每个元素调用指定的fn函数。如果fn返回true（或任何可以转化为true的值），则该函数会停止遍历，并立即返回true。如果fn针对原数组元素每一次调用都返回false（或任何可以转化为false的值），则函数返回false。当遍历的数组为空时，some()总是返回false。对于序号i，调用fn时带有3个参数：

`fn(array[i], i, array)`

fn的返回值会当做布尔值解析。

示例：

~~~javascript
var arr = [1, 2, 3];
var b;
b = arr.some(function(v, i, array) {
	return v>5;
});
console.log(b); //false
b = arr.some(function(v, i, array) {
	return v>2;
});
console.log(b); //true

arr = [];
b = arr.some(function(v, i, array) {
	return true;
});
console.log(b); //false
~~~

### 缩小方法

* reduce()

参数：fn [, initial] 。

fn：一个函数，可以合并两个值（比如两个数组元素），并返回一个"缩减"的新值。

initial：用来缩减数组的初始值，可选。若指定该参数，reduce()的行为会像是把该参数插入数组的头部一样。

返回值：数组的化简值，该值是最后一次调用fn时的返回值。

描述：该方法接收一个函数fn作为第一个参数。fn函数的行为像一个二元操作符一样：接收两个值，执行某些操作，然后返回结果。如果原数组有n个元素，reduce()就会调用n-1次fn来将这些元素缩减为一个合并值。

第一次调用fn时传入的是数组的前两个元素，接下来的调用会传入之前的计算值和数组的下一个元素。最后一次调用fn的返回值就是reduce()方法的返回值。

如果指定第二个参数，reduce()的行为会像是把该参数插入数组的头部一样。这种情况下，第一次调用fn时传入的是参数initial和数组的第一个元素。当指定initial时，要缩减的元素有n+1个，fn调用了n次。

如果原数组为空，又没有指定initial，则reduce()会抛出TypeError异常；

如果原数组为空，但是指定了initial，则reduce()会返回initial，且永远不会调用fn；

如果原数组只有一个元素，又没有指定initial，则reduce()会返回那个元素，且不会调用fn；

调用fn时带有4个参数：

`fn(preval, array[i], i, array)`

示例：

~~~javascript
var arr = [1, 2, 3, 4];
var val = arr.reduce(function(prev, v, i, array) {
	return prev*v;
});
console.log(val); //24 ((1*2)*3)*4
~~~

* reduceRight()

参数：fn [, initial] 。

fn：一个函数，可以合并两个值（比如两个数组元素），并返回一个"缩减"的新值。

initial：用来缩减数组的初始值，可选。若指定该参数，reduceRight()的行为会像是把该参数插入数组的尾部一样。

返回值：数组的化简值，该值是最后一次调用fn时的返回值。

描述：该方法与reduce()基本原理相同。不同的是，遍历数组时是从右到左，即从尾部开始遍历。

示例：

~~~javascript
var arr = [2, 10, 60];
var val = arr.reduceRight(function(prev, v, i, array) {
	return prev/v;
});
console.log(val); //3 (60/10)/2
~~~

### ES6 新增方法

* Array.isArray()

参数：obj。需要检测的值。

返回值：如果对象是Array，返回true。否则返回false。

描述：如果对象是Array，返回true。否则返回false。

示例：

~~~javascript
// 下面的函数调用都返回 true
Array.isArray([]);
Array.isArray([1]);
Array.isArray(new Array());
Array.isArray(Array.prototype); //Array.prototype 也是一个数组。

// 下面的函数调用都返回 false
Array.isArray();
Array.isArray({});
Array.isArray(null);
Array.isArray(undefined);
Array.isArray(17);
Array.isArray('Array');
Array.isArray(true);
Array.isArray(false);
Array.isArray({ __proto__: Array.prototype });
~~~

* Array.of()

参数：elementN。任意个参数，将按顺序成为返回数组中的元素。

返回值：新的Array实例。

描述：`Array.of()` 方法创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。`Array.of()` 和 `Array` 构造函数之间的区别在于处理整数参数：`Array.of(7)` 创建一个具有单个元素 **7** 的数组，而 Array(7) 创建一个长度为7的空数组（**注意：**这是指一个有7个空位的数组，而不是由7个`undefined`组成的数组）。

示例：

~~~javascript
Array.of(7);       // [7] 
Array.of(1, 2, 3); // [1, 2, 3]

Array(7);          // [ , , , , , , ]
Array(1, 2, 3);    // [1, 2, 3]

Array.of(undefined); // [undefined]
~~~

* Array.from()

参数：arrayLike[, mapFn[, thisArg]]。

arrayLike：想要转换成数组的伪数组对象或可迭代对象。

mapFn：如果指定了该参数，新数组中的每个元素会执行该回调函数。可选。

thisArg：可选参数，执行回调函数 `mapFn` 时 `this` 对象。可选。

返回值：一个新的数组实例。

描述：该方法从一个类似数组（伪数组）或可迭代对象中创建一个新的数组实例。

示例：

~~~javascript
Array.from('foo'); //["f", "o", "o"]

let s = new Set(['foo', window]); 
Array.from(s); //["foo", window]

let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); //[[1, 2], [2, 4], [4, 8]]

function f() {
	return Array.from(arguments);
}
f(1, 2, 3); //[1, 2, 3]

Array.from([1, 2, 3], x => x + x); //[2, 4, 6]

Array.from({length: 5}, (v, i) => i); //[0, 1, 2, 3, 4]

//数组去重合并
function combine(){ 
	let arr = [].concat.apply([], arguments);  //没有去重复的新数组 
	return Array.from(new Set(arr));
} 
var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n));   
~~~

* find()

参数：fn[, o]。fn：在数组每一项上执行的函数，接收 3 个参数：element，index，array 。o：执行回调时用作this的对象，可选。

返回值：数组中第一个满足所提供测试函数的元素的值，否则返回 `undefined`。

描述：find方法对数组中的每一项元素执行一次 fn 函数，直至有一个fn返回 true。当找到了这样一个元素后，该方法会立即返回这个元素的值，否则返回 undefined。注意 fn函数会为数组中的每个索引调用即从 0 到 length - 1，而不仅仅是那些被赋值的索引，这意味着对于稀疏数组来说，该方法的效率要低于那些只遍历有值的索引的方法。

fn函数带有3个参数：当前元素的值、当前元素的索引，以及数组本身。

如果提供了 o 参数，那么它将作为每次 fn 函数执行时的this，如果未提供，则使用 undefined。

find方法不会改变数组。

在第一次调用 fn 函数时会确定元素的索引范围，因此在 find 方法开始执行之后添加到数组的新元素将不会被 fn函数访问到。如果数组中一个尚未被fn函数访问到的元素的值被fn函数所改变，那么当fn函数访问到它时，它的值是将是根据它在数组中的索引所访问到的当前值。被删除的元素仍旧会被访问到。

示例：

~~~javascript
var inventory = [
	{name: 'apples', quantity: 2},
	{name: 'bananas', quantity: 0},
	{name: 'cherries', quantity: 5}
];

function findCherries(fruit) { 
	return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries)); // { name: 'cherries', quantity: 5 }
~~~

* findIndex()

参数：fn[, o]。fn：在数组每一项上执行的函数，接收 3 个参数：element，index，array 。o：执行回调时用作this的对象，可选。

返回值：返回数组中满足提供的测试函数的第一个元素的索引，否则返回-1。

描述：findIndex方法对数组中的每个数组索引0..length-1（包括）执行一次fn函数，直到找到一个fn函数返回真值（强制为true）的值。如果找到这样的元素，findIndex会立即返回该元素的索引。如果回调从不返回真值，或者数组的length为0，则findIndex返回-1。 在稀疏数组中，即使对于数组中不存在的条目的索引也会调用回调函数。

findIndex不会修改所调用的数组。

示例：

~~~javascript
function isPrime(element, index, array) {
	var start = 2;
	while (start <= Math.sqrt(element)) {
		if (element % start++ < 1) {
			return false;
		}
	}
	return element > 1;
}

console.log([4, 6, 8, 12].findIndex(isPrime)); // -1, not found
console.log([4, 6, 7, 12].findIndex(isPrime)); // 2
~~~

* copyWithin()

参数：target[, start[, end]]。

target：0 为基底的索引，复制序列到该位置。如果是负数，target将从末尾开始计算。如果 target大于等于 arr.length，将会不发生拷贝。如果 target在start之后，复制的序列将被修改以符合 arr.length。

start：0 为基底的索引，开始复制元素的起始位置。如果是负数，start将从末尾开始计算。如果 start被忽略，copyWithin将会从0开始复制。

end：0 为基底的索引，开始复制元素的结束位置。copyWithin将会拷贝到该位置，但不包括 end这个位置的元素。如果是负数， end将从末尾开始计算。如果 end被忽略，copyWithin 将会复制到 arr.length。

返回值：一个新数组，长度跟原数组一致。

描述：该方法浅复制数组的一部分到同一数组中的另一个位置，并返回它，而不修改其大小。

示例：

~~~javascript
[1, 2, 3, 4, 5].copyWithin(-2); // [1, 2, 3, 1, 2]

[1, 2, 3, 4, 5].copyWithin(0, 3); // [4, 5, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(0, 3, 4); // [4, 2, 3, 4, 5]

[1, 2, 3, 4, 5].copyWithin(-2, -3, -1); // [1, 2, 3, 3, 4]

[].copyWithin.call({length: 5, 3: 1}, 0, 3); // {0: 1, 3: 1, length: 5}
~~~

* fill()

参数：value[, start[, end]。

value：用来填充数组元素的值。

start：起始索引，可选，默认值为0。

end：终止索引，可选，默认值为length。

返回值：修改后的数组。

描述：该方法用一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

如果 `start` 是个负数, 则开始索引会被自动计算成为 `length+start`, 其中 `length` 是 `this` 对象的 `length `属性值。如果 `end` 是个负数, 则结束索引会被自动计算成为 `length+end`。

`fill` 方法故意被设计成通用方法, 该方法不要求 `this` 是数组对象。

`fill` 方法是个可变方法, 它会改变调用它的 `this` 对象本身, 然后返回它, 而并不是返回一个副本。

当一个对象被传递给 **fill**方法的时候, 填充数组的是这个对象的引用。

示例：

~~~javascript
[1, 2, 3].fill(4);               // [4, 4, 4]
[1, 2, 3].fill(4, 1);            // [1, 4, 4]
[1, 2, 3].fill(4, 1, 2);         // [1, 4, 3]
[1, 2, 3].fill(4, 1, 1);         // [1, 2, 3]
[1, 2, 3].fill(4, 3, 3);         // [1, 2, 3]
[1, 2, 3].fill(4, -3, -2);       // [4, 2, 3]
[1, 2, 3].fill(4, NaN, NaN);     // [1, 2, 3]
[1, 2, 3].fill(4, 3, 5);         // [1, 2, 3]
Array(3).fill(4);                // [4, 4, 4]
[].fill.call({ length: 3 }, 4);  // {0: 4, 1: 4, 2: 4, length: 3}

// Objects by reference.
var arr = Array(3).fill({}) // [{}, {}, {}];
arr[0].hi = "hi"; // [{ hi: "hi" }, { hi: "hi" }, { hi: "hi" }]
~~~

* includes()

参数：valueToFind[, fromIndex]。

valueToFind：需要查找的元素值。

fromIndex：从该索引处开始查找 。如果为负值，则按升序从 `array.length - fromIndex` 的索引开始搜索。默认为 0。

返回值：如果包含则返回 true，否则返回false。

描述：该方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

示例：

~~~javascript
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, 3].includes(3, 3);  // false
[1, 2, 3].includes(3, -1); // true
[1, 2, NaN].includes(NaN); // true

var arr = ['a', 'b', 'c'];
arr.includes('c', 3);   //false
arr.includes('c', 100); // false
arr.includes('a', -100); // true
arr.includes('b', -100); // true
arr.includes('c', -100); // true
~~~

* keys()

参数：无。

返回值：一个新的 Array 迭代器对象。

描述：该方法返回一个包含数组中每个索引键的 **Array Iterator** 对象。

示例：

~~~javascript
var arr = ["a", , "c"];
var sparseKeys = Object.keys(arr);
var denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2']
console.log(denseKeys);  // [0, 1, 2]
~~~

* values()

参数：无。

返回值：一个新的 Array 迭代器对象。

描述：该方法返回一个新的 **Array Iterator** 对象，该对象包含数组每个索引的值。

示例：

~~~javascript
let arr = ['w', 'y', 'k', 'o', 'p'];
let eArr = arr.values();
for (let letter of eArr) {
  console.log(letter);
}
~~~

* entries()

参数：无。

返回值：一个新的 Array 迭代器对象。

描述：该方法返回一个新的**Array Iterator**对象，该对象包含数组中每个索引的键/值对。

示例：

~~~javascript
var arr = ["a", "b", "c"];
var iterator = arr.entries();
for (let e of iterator) {
	console.log(e);
}
~~~

### 参考文档

* [MDN Web Doc - JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)



<br/><br/><br/>

---

