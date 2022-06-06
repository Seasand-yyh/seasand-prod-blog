# HTML中引用JS的几种形式

---

### 使用script标签引入外部js文件

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<!-- 通过script标签引入外部js文件 -->
	<script type="text/javascript" src="main.js"></script>
</head>
<body>

</body>
</html>
~~~

### 在script标签中嵌入JavaScript代码

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<!-- 在script标签中嵌入JavaScript代码 -->
	<script type="text/javascript">
		console.log('hello world!');
	</script>
</head>
<body>

</body>
</html>
~~~

### 在a标签的href属性中执行JavaScript代码

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript">
        function fn() {
            console.log('hello world!');
        }
	</script>
</head>
<body>
    <!-- 在a标签的href属性中执行JavaScript代码 -->
	<a href="javascript:fn();">链接</a>
</body>
</html>
~~~

### 在form标签的action属性中执行JavaScript代码

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript">
        function fn() {
            console.log('hello world!');
        }
	</script>
</head>
<body>
    <!-- 在form标签的action属性中执行JavaScript代码 -->
    <form action="javascript:fn();">
        <input type="submit" value="提交"/>
    </form>
</body>
</html>
~~~

### 在事件中执行JavaScript代码

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript">
        function fn() {
            console.log('hello world!');
        }
	</script>
</head>
<body>
    <!-- 在事件中执行JavaScript代码 -->
    <div onclick="fn();"></div>
</body>
</html>
~~~

### script标签引入外部js文件同时在标签中嵌入JavaScript代码

当使用`<script>`标签引入外部js文件的同时，在标签内书写的JavaScript代码将不会被执行。如：

main.js

~~~javascript
var a = 1;
var b = 2;
console.log('a + b = ', a + b);
~~~

index.html

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script type="text/javascript" src="main.js">
		console.log('code in script tag.');
	</script>
</head>
<body>
	
</body>
</html>
~~~

执行结果：

~~~plaintext
a + b = 3
~~~



<br/><br/><br/>

---

