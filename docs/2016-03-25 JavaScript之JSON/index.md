# JavaScript之JSON

---

### 概念

JSON(JavaScript Object Notation， JavaScript对象表示法)，是JavaScript的一个严格的子集，利用了JavaScript中的一些模式来表示结构化数据。

### 语法

* 简单值：使用与JavaScript相同的语法，可以在JSON中表示字符串、数值、布尔值和null。但是不支持JavaScript中的特殊值undefined。
* 对象：对象作为一种复杂数据类型，表示的是一组有序的键值对。而每个键值对中的值可以是简单值，也可以是复杂数据类型的值。
* 数组：数组也是一种复杂数据类型，表示一组有序的值的列表。数组的值也可以是任意类型--简单值、对象或数组。

注意：JSON不支持变量、函数或对象实例，它就是一种表示结构化数据的格式。JSON中不能添加注释。

示例：

~~~javascript
12
~~~

~~~javascript
false
~~~

~~~javascript
"Hello world！"
~~~

JSON中的字符串必须使用双引号，单引号会导致语法错误。

~~~javascript
{
	"name": "zhangsan",
	"age": 20,
	"work": false,
	"school": {
		"name": "xxx school",
		"grade": 3
	},
	"nicknames": ["zs", "xz", "zz"]
}
~~~

JSON中对象的属性必须添加双引号。

~~~javascript
[{
	"name": "zs",
	"age": 18
},{
	"name": "ls",
	"age": 22
},{
	"name": "ww",
	"age": 19
}]
~~~

### JSON序列化

1、利用全局对象JSON的stringify()方法进行序列化。

~~~javascript
var person = {
	name: "zhangsan",
	age: 20,
	work: false,
	school: {
		name: "xxx school",
		grade: 3
	},
	nicknames: ["zs", "xz", "zz"]
};
var personStr = JSON.stringify(person);
console.log(personStr);
~~~

运行结果：

~~~javascript
{"name":"zhangsan","age":20,"work":false,"school":{"name":"xxx school","grade":3},"nicknames":["zs","xz","zz"]}
~~~

2、默认情况下，JSON.stringify()输出的JSON字符串不包含任何空格字符或缩进。可以在JSON.stringify()中传入第三个参数，用以输出指定的格式。

~~~javascript
var person = {
	name: "zhangsan",
	age: 20,
	work: false,
	school: {
		name: "xxx school",
		grade: 3
	},
	nicknames: ["zs", "xz", "zz"]
};
~~~

如果传入的参数是一个数值，表示的是每个级别缩进的空格数。

~~~javascript
var personStr = JSON.stringify(person, null, 4);
console.log(personStr);
~~~

运行结果：

~~~javascript
{
	"name": "zhangsan",
	"age": 20,
	"work": false,
	"school": {
		"name": "xxx school",
		"grade": 3
	},
	"nicknames": [
		"zs",
		"xz",
		"zz"
	]
}
~~~

注意：最大的缩进数是10，所有大于10的值都会转换为10。

如果传入的参数是一个字符串，则该字符串将作为缩进字符。

~~~javascript
var personStr = JSON.stringify(person, null, '-');
console.log(personStr);
~~~

运行结果：

~~~javascript
{
-"name": "zhangsan",
-"age": 20,
-"work": false,
-"school": {
--"name": "xxx school",
--"grade": 3
-},
-"nicknames": [
--"zs",
--"xz",
--"zz"
-]
}
~~~

注意：缩进字符串的长度不能超过10个字符，如果超过，只会出现前10个字符。缩进字符串也可以使用制表符`'\t'`等字符。

3、在序列化JavaScript对象时，所有函数及原型成员都会被有意忽略，不体现在结果中。此外，值为undefined的任何属性也都会被跳过。**结果中最终都是值为有效JSON数据类型的实例属性。**

~~~javascript
var person = {
	name: "zhangsan",
	age: 20,
	score: undefined,
	work: function() {
		console.log('I am working...');
	}
};
var personStr = JSON.stringify(person);
console.log(personStr);
~~~

运行结果：

~~~javascript
{"name":"zhangsan","age":20}
~~~

4、JSON.stringify()第二个参数是一个过滤器，可以是一个数组或者函数。

如果过滤器是一个数组，那么结果中将会只出现数组中列出的属性。

~~~javascript
var person = {
	name: "zhangsan",
	age: 20,
	work: false,
	school: {
		name: "xxx school",
		grade: 3
	},
	nicknames: ["zs", "xz", "zz"]
};
var personStr = JSON.stringify(person, ['name', 'nicknames']);
console.log(personStr);
~~~

运行结果：

~~~javascript
{"name":"zhangsan","nicknames":["zs","xz","zz"]}
~~~

如果过滤器是一个函数，则传入的函数会接收到两个参数，属性名和属性值。

~~~javascript
var person = {
	name: "zhangsan",
	age: 20,
	work: false,
	school: {
		name: "xxx school",
		grade: 3
	},
	nicknames: ["zs", "xz", "zz"]
};
var personStr = JSON.stringify(person, function(key, value) {
	switch(key) {
		case 'nicknames':
			return value.join(',');
		case 'school':
			return undefined;
		default:
			return value;
	}
});
console.log(personStr);
~~~

运行结果：

~~~javascript
{"name":"zhangsan","age":20,"work":false,"nicknames":"zs,xz,zz"}
~~~

注意：如果函数返回了undefined，相应的属性会被忽略。如上例中的school属性。

5、有时候，JSON.stringify()还是不能满足对某些对象进行自定义序列化的需求，此时可以通过对象上调用toJSON()方法，返回其自身的JSON数据格式。

~~~javascript
var person = {
	name: "zhangsan",
	age: 20,
	work: false,
	school: {
		name: "xxx school",
		grade: 3,
		toJSON: function(){
			return this.name; 
		}
	},
	nicknames: ["zs", "xz", "zz"]
};
var personStr = JSON.stringify(person);
console.log(personStr);
~~~

运行结果：

~~~javascript
{"name":"zhangsan","age":20,"work":false,"school":"xxx school","nicknames":["zs","xz","zz"]}
~~~

如果toJSON()方法返回undefined，若此时包含它的对象嵌入在另一个对象中，会导致该对象的值变为null。若包含它的对象为顶级对象，结果就是undefined。

~~~javascript
var person = {
	name: "zhangsan",
	age: 20,
	work: false,
	school: {
		name: "xxx school",
		grade: 3,
		toJSON: function(){
			return undefined; 
		}
	},
	nicknames: ["zs", "xz", "zz"]
};
var personStr = JSON.stringify(person);
console.log(personStr);
~~~

运行结果：

~~~javascript
{"name":"zhangsan","age":20,"work":false,"nicknames":["zs","xz","zz"]}
~~~

或者

~~~javascript
var person = {
	name: "zhangsan",
	age: 20,
	work: false,
	school: {
		name: "xxx school",
		grade: 3
	},
	nicknames: ["zs", "xz", "zz"],
	toJSON: function(){
		return undefined;
	}
};
var personStr = JSON.stringify(person);
console.log(personStr);
~~~

运行结果：

~~~javascript
undefined
~~~

6、序列化顺序

* 如果存toJSON()方法并且通过它能取得有效的值，则调用该方法。否则，按默认顺序执行序列化。
* 如果提供了第二个参数，则应用这个函数过滤器。传入函数过滤器的值是第（1）步返回的值。
* 对第（2）步返回的每个值进行相应的序列化。
* 如果提供了第三个参数，执行相应的格式化。

### JSON解析

1、将JSON字符串直接传递给JSON.parse()就可以得到相应的JavaScript的值。

~~~javascript
var personStr = '{"name":"zhangsan","age":20,"work":false,"school":{"name":"xxx school","grade":3},"nicknames":["zs","xz","zz"]}';
var person = JSON.parse(personStr);
console.log(person);
~~~

2、JSON.parse()的第二个参数也可以传入一个函数，称为还原函数。还原函数接收两个参数，属性名和属性值。如果还原函数返回undefined，表示要从结果中删除相应的键。

~~~javascript
var personStr = '{"name":"zhangsan","age":20,"work":false,"school":{"name":"xxx school","grade":3},"nicknames":["zs","xz","zz"]}';
var person = JSON.parse(personStr, function(key, value) {
	switch(key){
		case 'nicknames':
			return value.join(',');
		case 'school':
			return undefined;
		default:
			return value;
	}
});
console.log(person);
~~~



<br/><br/><br/>

---

