# HTML文档流结束时使用document.write

---

### 案例一

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	aaaaa<br/>
	aaaaa<br/>
	<script type="text/javascript">
        function add(){
            document.write('$$$$$<br/>');
            document.write('$$$$$<br/>');
        }
        add();
	</script>
    bbbbb<br/>
    bbbbb<br/>
</body>
</html>
~~~

结果：

~~~plaintext
aaaaa
aaaaa
$$$$$
$$$$$
bbbbb
bbbbb
~~~

### 案例二

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	aaaaa<br/>
	aaaaa<br/>
	<script type="text/javascript">
        function add(){
            document.write('$$$$$<br/>');
            document.write('$$$$$<br/>');
        }
	</script>
	bbbbb<br/>
	bbbbb<br/>

	<a href="javascript:add();">add</a>
</body>
</html>
~~~

结果：

~~~plaintext
$$$$$
$$$$$
~~~

### 案例三

~~~html
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>
	aaaaa<br/>
	aaaaa<br/>
	<script type="text/javascript">
        function add(){
            document.write('$$$$$<br/>');
            document.write('$$$$$<br/>');
            document.close(); //关闭文档流
            document.write('@@@@@<br/>');
            document.write('$$$$$<br/>');
            document.write('$$$$$<br/>');
        }
	</script>
	bbbbb<br/>
	bbbbb<br/>

	<a href="javascript:add();">add</a>
</body>
</html>
~~~

结果：

~~~plaintext
@@@@@
$$$$$
$$$$$
~~~

总结：

文档流结束时使用document.write方法添加的内容会重新渲染。

> 附：上述示例在通过点击浏览器的后退按钮时可以看到明显的渲染过程。



<br/><br/><br/>

---

