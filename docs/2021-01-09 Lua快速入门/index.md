# Lua快速入门

---

### 简介

Lua 是一种轻量小巧的脚本语言，用标准C语言编写并以源代码形式开放。其设计目的是为了嵌入应用程序中，从而为应用程序提供灵活的扩展和定制功能。

Lua 是巴西里约热内卢天主教大学（Pontifical Catholic University of Rio de Janeiro）里的一个研究小组于 1993 年开发的，该小组成员有：Roberto Ierusalimschy、Waldemar Celes 和 Luiz Henrique de Figueiredo。

### 特性

1、轻量级：它用标准C语言编写并以源代码形式开放，编译后仅仅一百余K，可以很方便的嵌入别的程序里。

2、可扩展：Lua提供了非常易于使用的扩展接口和机制，由宿主语言（通常是C或C++）提供这些功能，Lua可以使用它们，就像是本来就内置的功能一样。

3、其它特性：

* 支持面向过程（procedure-oriented）编程和函数式编程（functional programming）；
* 自动内存管理；
* 只提供了一种通用类型的表（table），用它可以实现数组，哈希表，集合，对象；
* 语言内置模式匹配；
* 闭包（closure）；
* 函数也可以看作一个值；
* 提供多线程（协同进程，并非操作系统所支持的线程）支持；
* 通过闭包和table可以很方便地支持面向对象编程所需要的一些关键机制，比如数据抽象，虚函数，继承和重载等。

### 应用场景

* 游戏开发
* 独立应用脚本
* Web应用脚本
* 扩展和数据库插件，如MySQL Proxy 和 MySQL WorkBench
* 安全系统，如入侵检测系统

### 环境搭建

1、Linux环境

~~~plaintext
curl -R -O http://www.lua.org/ftp/lua-5.3.0.tar.gz
tar zxf lua-5.3.0.tar.gz
cd lua-5.3.0
make linux test
make install
~~~

2、Mac OS X环境

~~~plaintext
curl -R -O http://www.lua.org/ftp/lua-5.3.0.tar.gz
tar zxf lua-5.3.0.tar.gz
cd lua-5.3.0
make macosx test
make install
~~~

3、Windows环境

访问[Lua官网](http://www.lua.org/)，打开 download -> Building -> get a binary -> Download，下载Windows版本的zip包，解压到本地目录，并配置到环境变量。

4、第一个程序

创建一个 HelloWorld.lua 文件，代码如下：

~~~lua
print("Hello World!")
~~~

执行以下命令：

~~~plaintext
lua HelloWorld.lua
~~~

输出结果为：

~~~plaintext
Hello World!
~~~

### 程序运行方式

1、交互式编程

Lua 提供了交互式编程模式，我们可以在命令行中输入程序并立即查看效果。Lua 交互式编程模式可以通过命令 `lua -i` 或 `lua` 来启用：

~~~plaintext
$ lua -i 
$ Lua 5.3.0  Copyright (C) 1994-2015 Lua.org, PUC-Rio
> 
~~~

在命令行中，输入以下命令：

~~~plaintext
> print("Hello World！")
~~~

2、脚本式编程

我们可以将 Lua 程序代码保存到一个以 lua 结尾的文件，并执行，该模式称为脚本式编程。如将以下代码存储在名为 `hello.lua` 的脚本文件中：

~~~lua
print("Hello World!")
print("www.runoob.com")
~~~

使用 lua 执行以上脚本：

~~~plaintext
$ lua hello.lua
~~~

### 注释

1、单行注释

~~~lua
--这是单行注释
~~~

2、多行注释

~~~lua
--[[
多行注释
多行注释
--]]
~~~

### 标识符

Lua 标识符用于定义一个变量、函数或者其他用户定义的项。标识符以一个字母（`A-Z、a-z`）或下划线 （`_`） 开头，后加上 0 个或多个字母、下划线、数字组成的。最好不要使用下划线加大写字母的标识符，因为Lua的保留字也是这样的。

Lua 不允许使用特殊字符如 `@`、`$`、`%` 来定义标识符。 Lua 是一个区分大小写的编程语言，因此在 Lua 中 Hello 与 hello 是两个不同的标识符。以下列出了一些正确的标识符：

~~~plaintext
mohd         zara      abc     move_name    a_123
myname50     _temp     j       a23b9        retVal
~~~

### 关键字

保留关键字不能作为常量、变量或其他用户自定义标识符。

|          |       |       |        |
| -------- | ----- | ----- | ------ |
| and      | break | do    | else   |
| elseif   | end   | false | for    |
| function | if    | in    | local  |
| nil      | not   | or    | repeat |
| return   | then  | true  | until  |
| while    | goto  |       |        |

一般约定，以下划线开头连接一串大写字母的名字（比如 `_VERSION`）被保留用于 Lua 内部全局变量。

### 数据类型

Lua 是动态类型语言，变量不需要类型定义，只需要为变量赋值。 值可以存储在变量中，作为参数传递或结果返回。

Lua 中有 8 个基本数据类型，分别为：nil、boolean、number、string、userdata、function、thread 和 table。

| 数据类型 | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| nil      | 只有值nil属于该类，表示一个无效值（在条件表达式中相当于false） |
| boolean  | 包含两个值，false和true                                      |
| number   | 表示双精度类型的实浮点数                                     |
| string   | 字符串由一对双引号或单引号来表示                             |
| function | 由 C 或 Lua 编写的函数                                       |
| userdata | 表示任意存储在变量中的C数据结构                              |
| thread   | 表示执行的独立线路，用于执行协同程序                         |
| table    | Lua 中的表（table）其实是一个"关联数组"（associative arrays），数组的索引可以是数字、字符串或表类型。在 Lua 里，table 的创建是通过"构造表达式"来完成，最简单构造表达式是{}，用来创建一个空表。 |

可以使用 `type` 函数测试给定变量或者值的类型。

~~~lua
print(type("Hello world"))      --> string
print(type(10.4*3))             --> number
print(type(print))              --> function
print(type(type))               --> function
print(type(true))               --> boolean
print(type(nil))                --> nil
print(type(type(X)))            --> string
~~~

1、nil

nil 类型表示一种没有任何有效值，它只有一个值 nil。例如打印一个没有赋值的变量，便会输出一个 nil 值：

~~~plaintext
> print(type(a))
nil
>
~~~

对于全局变量和 table，nil 还有一个"删除"作用。给全局变量或者 table 表里的变量赋一个 nil 值，等同于把它们删掉，执行下面代码：

~~~lua
tab1 = { key1 = "val1", key2 = "val2", "val3" }
for k, v in pairs(tab1) do
	print(k .. " - " .. v)
end

tab1.key1 = nil
for k, v in pairs(tab1) do
	print(k .. " - " .. v)
end
~~~

~~~plaintext
> type(X)
nil
> type(X)==nil
false
> type(X)=="nil"
true
>
~~~

`type(X)==nil` 结果为 `false` 的原因是 `type(X)` 实质是返回的 "nil" 字符串，是一个 string 类型：

~~~lua
type(type(X))==string
~~~

2、boolean

boolean 类型只有两个可选值：true（真） 和 false（假）。Lua 把 false 和 nil 看作是 false，其他的都为 true，数字 0 也是 true。

~~~lua
print(type(true)) --boolean
print(type(false)) --boolean
print(type(nil)) --nil
 
if false or nil then
	print("至少有一个是 true")
else
	print("false 和 nil 都为 false") --false 和 nil 都为 false
end

if 0 then
	print("数字 0 是 true") --数字 0 是 true
else
	print("数字 0 为 false")
end
~~~

3、number

Lua 默认只有一种 number 类型：double（双精度）类型（默认类型可以修改 luaconf.h 里的定义），以下几种写法都被看作是 number 类型：

~~~lua
print(type(2))
print(type(2.2))
print(type(0.2))
print(type(2e+1))
print(type(0.2e-1))
print(type(7.8263692594256e-06))
~~~

4、string

字符串由一对双引号或单引号来表示。

~~~lua
string1 = "this is string1"
string2 = 'this is string2'
~~~

也可以用 2 个方括号 "[[]]" 来表示"一块"字符串。

~~~lua
html = [[
<html>
<head></head>
<body>
	<a href="http://www.runoob.com/">菜鸟教程</a>
</body>
</html>
]]
print(html)
~~~

在对一个数字字符串上进行算术操作时，Lua 会尝试将这个数字字符串转成一个数字：

~~~lua
print("2" + 6) --8.0
print("2" + "6") --8.0
print("2 + 6") --2 + 6
print("-2e2" * "6") -- -1200.0
print("error" + 1) -- stdin:1: attempt to perform arithmetic on a string value
~~~

以上代码中"error" + 1执行报错了，字符串连接使用的是 `..` ，如：

~~~lua
print("a" .. 'b') --ab
print(157 .. 428) --157428
~~~

使用 `#` 来计算字符串的长度，放在字符串前面，如下实例：

~~~lua
str = "www.runoob.com"
print(#str) --14
print(#"www.runoob.com") --14
~~~

5、table

在 Lua 里，table 的创建是通过"构造表达式"来完成，最简单构造表达式是`{}`，用来创建一个空表。也可以在表里添加一些数据，直接初始化表：

~~~lua
-- 创建一个空的table
local tbl1 = {}

-- 直接初始表
local tbl2 = {"apple", "pear", "orange", "grape"}
~~~

Lua 中的表（table）其实是一个"关联数组"（associative arrays），数组的索引可以是数字或者是字符串：

~~~lua
a = {}
a["key"] = "value"
key = 10
a[key] = 22
a[key] = a[key] + 11
for k, v in pairs(a) do
	print(k .. " : " .. v)
end
~~~

不同于其他语言的数组把 0 作为数组的初始索引，在 Lua 里表的默认初始索引一般以 1 开始：

~~~lua
local tbl = {"apple", "pear", "orange", "grape"}
for key, val in pairs(tbl) do
	print("Key", key)
end
~~~

table 不会固定长度大小，有新数据添加时 table 长度会自动增长，没初始的 table 都是 nil：

~~~lua
a3 = {}
for i = 1, 10 do
	a3[i] = i
end
a3["key"] = "val"
print(a3["key"])
print(a3["none"])
~~~

6、function

在 Lua 中，函数是被看作是"第一类值（First-Class Value）"，函数可以存在变量里：

~~~lua
function factorial1(n)
	if n == 0 then
		return 1
	else
		return n * factorial1(n - 1)
	end
end
print(factorial1(5))
factorial2 = factorial1
print(factorial2(5))
~~~

function 可以以匿名函数（anonymous function）的方式通过参数传递：

~~~lua
function testFun(tab, fun)
	for k ,v in pairs(tab) do
		print(fun(k,v))
	end
end

tab = { key1 = "val1", key2 = "val2" }
testFun(tab, function(key, val) --匿名函数
	return key.."="..val
end)
~~~

7、thread

在 Lua 里，最主要的线程是协同程序（coroutine）。它跟线程（thread）差不多，拥有自己独立的栈、局部变量和指令指针，可以跟其他协同程序共享全局变量和其他大部分东西。

线程跟协程的区别：线程可以同时多个运行，而协程任意时刻只能运行一个，并且处于运行状态的协程只有被挂起（suspend）时才会暂停。

8、userdata

userdata 是一种用户自定义数据，用于表示一种由应用程序或 C/C++ 语言库所创建的类型，可以将任意 C/C++ 的任意数据类型的数据（通常是 struct 和 指针）存储到 Lua 变量中调用。

### 变量

变量在使用前，需要在代码中进行声明，即创建该变量。编译程序执行代码之前编译器需要知道如何给语句变量开辟存储区，用于存储变量的值。

Lua 变量有三种类型：全局变量、局部变量、表中的域。Lua 中的变量全是全局变量，那怕是语句块或是函数里，除非用 local 显式声明为局部变量。局部变量的作用域为从声明位置开始到所在语句块结束。

变量的默认值均为 nil。

~~~lua
a = 5               -- 全局变量
local b = 5         -- 局部变量

function joke()
	c = 5           -- 全局变量
	local d = 6     -- 局部变量
end

joke()
print(c, d)         --> 5 nil

do
	local a = 6     -- 局部变量
	b = 6           -- 对局部变量重新赋值
	print(a, b);    --> 6 6
end

print(a, b)         --> 5 6
~~~

1、全局变量

在默认情况下，变量总是认为是全局的。全局变量不需要声明，给一个变量赋值后即创建了这个全局变量，访问一个没有初始化的全局变量也不会出错，只不过得到的结果是：nil。

~~~plaintext
> print(b)
nil
> b=10
> print(b)
10
>
~~~

如果你想删除一个全局变量，只需要将变量赋值为nil。

~~~lua
b = nil
print(b) --> nil
~~~

2、赋值语句

赋值是改变一个变量的值和改变表域的最基本的方法：

~~~lua
a = "hello" .. "world"
t.n = t.n + 1
~~~

Lua 可以对多个变量同时赋值，变量列表和值列表的各个元素用逗号分开，赋值语句右边的值会依次赋给左边的变量：

~~~lua
a, b = 10, 2*x       -->       a=10; b=2*x
~~~

遇到赋值语句Lua会先计算右边所有的值然后再执行赋值操作，所以我们可以这样进行交换变量的值：

~~~lua
x, y = y, x                     -- swap 'x' for 'y'
a[i], a[j] = a[j], a[i]         -- swap 'a[i]' for 'a[j]'
~~~

当变量个数和值的个数不一致时，Lua会一直以变量个数为基础采取以下策略：

~~~plaintext
变量个数 > 值的个数             按变量个数补足nil
变量个数 < 值的个数             多余的值会被忽略
~~~

~~~lua
a, b, c = 0, 1
print(a, b, c)            --> 0 1 nil

a, b = a+1, b+1, b+2      -- value of b+2 is ignored
print(a, b)               --> 1   2

a, b, c = 0
print(a, b, c)            --> 0 nil nil
~~~

上面最后一个例子是一个常见的错误情况，注意，如果要对多个变量赋值必须依次对每个变量赋值：

~~~lua
a, b, c = 0, 0, 0
print(a, b, c)             --> 0   0   0
~~~

多值赋值经常用来交换变量，或将函数调用返回给变量：

~~~lua
a, b = f()
~~~

f()返回两个值，第一个赋给a，第二个赋给b。

应该尽可能的使用局部变量，有两个好处：

* 避免命名冲突。
* 访问局部变量的速度比全局变量更快。

3、索引

对 table 的索引使用方括号 `[]`，Lua 也提供了 `.` 操作。

~~~lua
t[i]
t.i                  -- 当索引为字符串类型时的一种简化写法
gettable_event(t, i) -- 采用索引访问本质上是一个类似这样的函数调用
~~~

~~~lua
site = {}
site["key"] = "www.runoob.com"
print(site["key"]) -- www.runoob.com
print(site.key) -- www.runoob.com
~~~

### 运算符

运算符是一个特殊的符号，用于告诉解释器执行特定的数学或逻辑运算。Lua提供了以下几种运算符类型：

* 算术运算符
* 关系运算符
* 逻辑运算符
* 其他运算符

1、算术运算符

下表列出了 Lua 语言中的常用算术运算符，设定 A 的值为10，B 的值为 20：

| 运算符 | 描述 | 示例               |
| ------ | ---- | ------------------- |
| `+`    | 加法  | A `+` B 输出结果 30  |
| `-`    | 减法  | A `-` B 输出结果 -10 |
| `*`    | 乘法  | A `*` B 输出结果 200 |
| `/`    | 除法  | B `/` A 输出结果 2   |
| `%`    | 取余  | B `%` A 输出结果 0   |
| `^`    | 乘幂  | A `^` 2 输出结果 100 |
| `-`    | 负号  | `-` A 输出结果 -10   |

~~~lua
a = 21
b = 10
print("a + b 的值为 ", a + b ) -- 31
print("a - b 的值为 ", a - b ) -- 11
print("a * b 的值为 ", a * b ) -- 210
print("a / b 的值为 ", a / b ) -- 2.1
print("a % b 的值为 ", a % b ) -- 1
print("a ^ 2 的值为 ", a ^ 2 ) -- 441
print("-a 的值为 ", -a )       -- -21
~~~

2、关系运算符

下表列出了 Lua 语言中的常用关系运算符，设定 A 的值为10，B 的值为 20：

| 运算符 | 描述                                                    | 示例              |
| ------ | ------------------------------------------------------- | ----------------- |
| `==`   | 等于，检测两个值是否相等，相等返回 true，否则返回 false | (A `==` B) 为 false |
| `~=`   | 不等于，检测两个值是否相等，不相等返回 true，否则返回 false | (A `~=` B) 为 true |
| `>`    | 大于，如果左边的值大于右边的值，返回 true，否则返回 false | (A `>` B) 为 false |
| `<`    | 小于，如果左边的值大于右边的值，返回 false，否则返回 true | (A `<` B) 为 true |
| `>=`   | 大于等于，如果左边的值大于等于右边的值，返回 true，否则返回 false | (A `>=` B) 返回 false |
| `<=`   | 小于等于， 如果左边的值小于等于右边的值，返回 true，否则返回 false | (A `<=` B) 返回 true |

~~~lua
a = 21
b = 10

if( a == b )
then
	print("Line 1 - a 等于 b" )
else
	print("Line 1 - a 不等于 b" )
end

if( a ~= b )
then
	print("Line 2 - a 不等于 b" )
else
	print("Line 2 - a 等于 b" )
end

if ( a < b )
then
	print("Line 3 - a 小于 b" )
else
	print("Line 3 - a 大于等于 b" )
end

if ( a > b )
then
	print("Line 4 - a 大于 b" )
else
	print("Line 5 - a 小于等于 b" )
end

-- 修改 a 和 b 的值
a = 5
b = 20
if ( a <= b )
then
	print("Line 5 - a 小于等于  b" )
end

if ( b >= a )
then
	print("Line 6 - b 大于等于 a" )
end
~~~

3、逻辑运算符

下表列出了 Lua 语言中的常用逻辑运算符，设定 A 的值为 true，B 的值为 false：

| 运算符 | 描述                                                         | 示例                 |
| ------ | ------------------------------------------------------------ | -------------------- |
| and    | 逻辑与操作符。 若 A 为 false，则返回 A，否则返回 B。         | (A and B) 为 false   |
| or     | 逻辑或操作符。 若 A 为 true，则返回 A，否则返回 B。          | (A or B) 为 true     |
| not    | 逻辑非操作符。与逻辑运算结果相反，如果条件为 true，逻辑非为 false。 | not(A and B) 为 true |

~~~lua
a = true
b = true

if ( a and b )
then
	print("a and b - 条件为 true" )
end

if ( a or b )
then
	print("a or b - 条件为 true" )
end

print("---------分割线---------" )

-- 修改 a 和 b 的值
a = false
b = true

if ( a and b )
then
	print("a and b - 条件为 true" )
else
	print("a and b - 条件为 false" )
end

if ( not( a and b) )
then
	print("not( a and b) - 条件为 true" )
else
	print("not( a and b) - 条件为 false" )
end
~~~

4、其他运算符

下表列出了 Lua 语言中的连接运算符与计算表或字符串长度的运算符：

| 运算符 | 描述                             | 示例                                                         |
| ------ | -------------------------------- | ------------------------------------------------------------ |
| `..`   | 连接两个字符串                   | a`..`b ，其中 a 为 "Hello " ， b 为 "World", 输出结果为 "Hello World" |
| `#`    | 一元运算符，返回字符串或表的长度 | `#`"Hello" 返回 5                                            |

~~~lua
a = "Hello "
b = "World"

print("连接字符串 a 和 b ", a..b )
print("b 字符串长度 ", #b )
print("字符串 Test 长度 ", #"Test" )
print("菜鸟教程网址长度 ", #"www.runoob.com" )
~~~

5、运算符的优先级

| 序号 | 运算符           |
| ---- | -------------------------------- |
| 1    | `^`                              |
| 2    | not  `-` (unary)                 |
| 3    | `*`  `/`  `%`                    |
| 4    | `+`  `-`                         |
| 5    | `..`                             |
| 6    | `<`  `>`  `<=`  `>=`  `~=`  `==` |
| 7    | and                              |
| 8    | or                               |

除了 `^` 和 `..`  外所有的二元运算符都是左连接的。

~~~lua
a+i < b/2+1          -->       (a+i) < ((b/2)+1)
5+x^2*8              -->       5+((x^2)*8)
a < y and y <= z     -->       (a < y) and (y <= z)
-x^2                 -->       -(x^2)
x^y^z                -->       x^(y^z)
~~~

~~~lua
a = 20
b = 10
c = 15
d = 5

e = (a + b) * c / d  -- ( 30 * 15 ) / 5
print("(a + b) * c / d 运算值为  :", e ) -- 90.0

e = ((a + b) * c) / d  -- (30 * 15 ) / 5
print("((a + b) * c) / d 运算值为 :", e ) -- 90.0

e = (a + b) * (c / d)  -- (30) * (15/5)
print("(a + b) * (c / d) 运算值为 :", e ) -- 90.0

e = a + (b * c) / d  -- 20 + (150/5)
print("a + (b * c) / d 运算值为   :", e ) -- 50.0
~~~

### 条件语句

1、if语句

if 语句由一个布尔表达式作为条件判断，其后紧跟其他语句组成。

~~~plaintext
if(布尔表达式)
then
	--[ 在布尔表达式为 true 时执行的语句 --]
end
~~~

在布尔表达式为 true 时会if中的代码块会被执行，在布尔表达式为 false 时，紧跟在 if 语句 end 之后的代码会被执行。Lua认为false和nil为假，true 和非nil为真。要注意的是Lua中 0 为 true。

~~~lua
a = 10
if( a < 20 ) then
	--[ if 条件为 true 时打印以下信息 --]
	print("a 小于 20" )
end
print("a 的值为:", a)
~~~

2、if...else语句

if 语句可以与 else 语句搭配使用，在 if 条件表达式为 false 时执行 else 语句代码块。

~~~plaintext
if(布尔表达式)
then
	--[ 布尔表达式为 true 时执行该语句块 --]
else
	--[ 布尔表达式为 false 时执行该语句块 --]
end
~~~

在布尔表达式为 true 时会if中的代码块会被执行，在布尔表达式为 false 时，else的代码块会被执行。Lua认为false和nil为假，true和非nil为真。要注意的是Lua中 0 为 true。

~~~lua
a = 100
if( a < 20 ) then
	--[ if 条件为 true 时执行该语句块 --]
	print("a 小于 20" )
else
	--[ if 条件为 false 时执行该语句块 --]
	print("a 大于 20" )
end
print("a 的值为 :", a)
~~~

if 语句可以与 elseif...else 语句搭配使用，在 if 条件表达式为 false 时执行 elseif...else 语句代码块，用于检测多个条件语句。

~~~plaintext
if( 布尔表达式 1)
then
	--[ 在布尔表达式 1 为 true 时执行该语句块 --]
elseif( 布尔表达式 2)
then
	--[ 在布尔表达式 2 为 true 时执行该语句块 --]
elseif( 布尔表达式 3)
then
	--[ 在布尔表达式 3 为 true 时执行该语句块 --]
else 
	--[ 如果以上布尔表达式都不为 true 则执行该语句块 --]
end
~~~

~~~lua
a = 100
if( a == 10 ) then
	print("a 的值为 10" )
elseif( a == 20 ) then
	print("a 的值为 20" )
elseif( a == 30 ) then
	print("a 的值为 30" )
else
	print("没有匹配 a 的值" )
end
print("a 的真实值为: ", a )
~~~

3、if嵌套语句

if 语句允许嵌套，这就意味着你可以在一个 if 或 else if 语句中插入其他的 if 或 else if 语句。

~~~plaintext
if( 布尔表达式 1)
then
	--[ 布尔表达式 1 为 true 时执行该语句块 --]
	if(布尔表达式 2)
	then
		--[ 布尔表达式 2 为 true 时执行该语句块 --]
	end
end
~~~

你可以用同样的方式嵌套 else if...else 语句。

~~~lua
a = 100
b = 200
if( a == 100 ) then
	if( b == 200 ) then
		print("a 的值为 100 b 的值为 200" )
	end
end
print("a 的值为 :", a )
print("b 的值为 :", b )
~~~

### 循环语句

1、while循环

Lua 编程语言中 while 循环语句在判断条件为 true 时会重复执行循环体语句。

~~~plaintext
while(condition)
do
	statements
end
~~~

statements(循环体语句) 可以是一条或多条语句，condition(条件) 可以是任意表达式，在 condition(条件) 为 true 时执行循环体语句。

~~~lua
a=10
while( a < 20 )
do
	print("a 的值为:", a)
	a = a+1
end
~~~

2、for循环

Lua 编程语言中 for 循环语句可以重复执行指定语句，重复次数可在 for 语句中控制。for语句有两大类：

* 数值for循环
* 泛型for循环

1）数值for循环

~~~plaintext
for var=exp1,exp2,exp3 do
	<执行体>
end
~~~

var 从 exp1 变化到 exp2，每次变化以 exp3 为步长递增 var，并执行一次 "执行体"。exp3 是可选的，如果不指定，默认为1。

~~~lua
for i=1,f(x) do
	print(i)
end

for i=10,1,-1 do
	print(i)
end
~~~

for的三个表达式在循环开始前一次性求值，以后不再进行求值。比如上面的f(x)只会在循环开始前执行一次，其结果用在后面的循环中。

~~~lua
function f(x)
	print("function")
	return x*2
end

for i=1,f(5) do
	print(i)
end
~~~

2）泛型for循环

泛型 for 循环通过一个迭代器函数来遍历所有值，类似 Java 中的 foreach 语句。

~~~lua
a = {"one", "two", "three"}
for i, v in ipairs(a) do
	print(i, v)
end
~~~

i是数组索引值，v是对应索引的数组元素值。ipairs是Lua提供的一个迭代器函数，用来迭代数组。

~~~lua
days = {"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"}
for i,v in ipairs(days) do
	print(v)
end
~~~

3、repeat...until 循环

Lua 编程语言中 repeat...until 循环语句不同于 for 和 while循环，for 和 while 循环的条件语句在当前循环执行开始时判断，而 repeat...until 循环的条件语句在当前循环结束后判断。

~~~plaintext
repeat
	statements
until( condition )
~~~

我们注意到循环条件判断语句（condition）在循环体末尾部分，所以在条件进行判断前循环体都会执行一次。如果条件判断语句（condition）为 false，循环会重新开始执行，直到条件判断语句（condition）为 true 才会停止执行。

~~~lua
a = 10
repeat
	print("a的值为:", a)
	a = a + 1
until( a > 15 )
~~~

4、嵌套循环

Lua 编程语言中 for 循环嵌套语法格式：

~~~lua
for init, max/min value, increment do
	for init, max/min value, increment do
		statements
	end
	statements
end
~~~

Lua 编程语言中 while 循环嵌套语法格式：

~~~lua
while(condition) do
	while(condition) do
		statements
	end
	statements
end
~~~

Lua 编程语言中 repeat...until 循环嵌套语法格式：

~~~lua
repeat
	statements
	repeat
		statements
	until( condition )
until( condition )
~~~

除了以上同类型循环嵌套外，我们还可以使用不同的循环类型来嵌套，如 for 循环体中嵌套 while 循环。

~~~lua
j = 2
for i=2,10 do
	for j=2,(i/j),2 do
		if(not(i%j)) then
			break
		end
		if(j > (i/j)) then
			print("i 的值为：", i)
		end
	end
end
~~~

5、无限循环

在循环体中如果条件永远为 true 循环语句就会永远执行下去：

~~~lua
while( true )
do
	print("循环将永远执行下去")
end
~~~

6、break语句

Lua 编程语言 break 语句插入在循环体中，用于退出当前循环或语句，并开始脚本执行紧接着的语句。如果你使用循环嵌套，break语句将停止最内层循环的执行，并开始执行的外层的循环语句。

~~~lua
a = 10
while( a < 20 )
do
	print("a 的值为:", a)
	a = a+1
	if( a > 15) then
		break --[ 使用 break 语句终止循环 --]
	end
end
~~~

7、goto语句

Lua 语言中的 goto 语句允许将控制流程无条件地转到被标记的语句处。

~~~plaintext
goto Label
~~~

Label 的格式为：

~~~lua
:: Label ::
~~~

~~~lua
local a = 1
::label:: print("--- goto label ---")

a = a+1
if a < 3 then
	goto label   -- a 小于 3 的时候跳转到标签 label
end
~~~

可以在 lable 中设置多个语句：

~~~lua
i = 0
::s1:: do
	print(i)
	i = i+1
end

if i>3 then
	os.exit()   -- i 大于 3 时退出
end
goto s1
~~~

有了 goto，我们可以实现 continue 的功能：

~~~lua
for i=1,3 do
	if i <= 2 then
		print(i, "yes continue")
		goto continue
	end
	print(i, " no continue")
	::continue::
	print([[i'm end]])
end
~~~

### 函数

在Lua中，函数是对语句和表达式进行抽象的主要方法。函数既可以用来处理一些特殊的工作，也可以用来计算一些值。Lua 提供了许多的内建函数，你可以很方便的在程序中调用它们，如print()函数可以将传入的参数打印在控制台上。

Lua 函数主要有两种用途：

* 完成指定的任务，这种情况下函数作为调用语句使用；
* 计算并返回值，这种情况下函数作为赋值语句的表达式使用。

1、函数定义

Lua 编程语言函数定义格式如下：

~~~lua
optional_function_scope function function_name( argument1, argument2, argument3..., argumentn)
	function_body
	return result_params_comma_separated
end
~~~

解析：

* optional_function_scope：该参数是可选的指定函数是全局函数还是局部函数，未设置该参数默认为全局函数，如果你需要设置函数为局部函数需要使用关键字 local。
* function_name：指定函数名称。
* argument1, argument2, argument3..., argumentn：函数参数，多个参数以逗号隔开，函数也可以不带参数。
* function_body：函数体，函数中需要执行的代码语句块。
* result_params_comma_separated：函数返回值，Lua语言函数可以返回多个值，每个值以逗号隔开。

以下实例定义了函数 max()，参数为 num1、num2，用于比较两值的大小，并返回最大值：

~~~lua
--[[ 函数返回两个值的最大值 --]]
function max(num1, num2)
	if (num1 > num2) then
		result = num1
	else
		result = num2
	end
	return result
end
-- 调用函数
print("两值比较最大值为 ", max(10,4))
print("两值比较最大值为 ", max(5,6))
~~~

Lua 中我们可以将函数作为参数传递给函数，如下实例：

~~~lua
myprint = function(param)
	print("这是打印函数 -   ##", param, "##")
end

function add(num1, num2, functionPrint)
	result = num1 + num2
	-- 调用传递的函数参数
	functionPrint(result)
end

myprint(10)
add(2, 5, myprint)
~~~

2、多返回值

Lua函数可以返回多个结果值，比如`string.find`，其返回匹配串"开始和结束的下标"（如果不存在匹配串返回nil）。

~~~lua
s, e = string.find("www.runoob.com", "runoob") 
print(s, e) --5 10
~~~

Lua函数中，在return后列出要返回的值的列表即可返回多值，如：

~~~lua
function maximum(a)
	local mi = 1             -- 最大值索引
	local m = a[mi]          -- 最大值
	for i,val in ipairs(a) do
		if val > m then
			mi = i
			m = val
		end
	end
	return m, mi
end

print(maximum({8,10,23,12,5}))
~~~

3、可变参数

Lua 函数可以接受可变数目的参数，和 C 语言类似，在函数参数列表中使用三点 `...` 表示函数有可变的参数。

~~~lua
function add(...)
	local s = 0
	for i, v in ipairs{...} do -- {...} 表示一个由所有变长参数构成的数组
		s = s + v
	end
	return s
end
print(add(3,4,5,6,7))  -- 25
~~~

我们可以将可变参数赋值给一个变量。例如，我们计算几个数的平均值：

~~~lua
function average(...)
	result = 0
	local arg = {...} -- arg为一个表，局部变量
	for i,v in ipairs(arg) do
		result = result + v
	end
	print("总共传入 " .. #arg .. " 个数")
	return result/#arg
end

print("平均值为", average(10,5,3,4,5,6))
~~~

我们也可以通过 `select("#", ...)` 来获取可变参数的数量：

~~~lua
function average(...)
	result = 0
	local arg = {...}
	for i,v in ipairs(arg) do
		result = result + v
	end
	print("总共传入 " .. select("#",...) .. " 个数")
	return result/select("#", ...)
end

print("平均值为", average(10,5,3,4,5,6))
~~~

有时候我们可能需要几个固定参数加上可变参数，固定参数必须放在变长参数之前：

~~~lua
function fwrite(fmt, ...)
	return io.write(string.format(fmt, ...))
end

fwrite("runoob\n")       --->fmt = "runoob", 没有变长参数。
fwrite("%d%d\n", 1, 2)   --->fmt = "%d%d", 变长参数为 1 和 2
~~~

通常在遍历变长参数的时候只需要使用 `{…}`，然而变长参数可能会包含一些 nil，那么就可以用 `select` 函数来访问变长参数了：`select('#', …)` 或者 `select(n, …)`。

* `select('#', …)` ：返回可变参数的长度。
* `select(n, …)` ：用于返回从起点 n 开始到结束位置的所有参数列表。

调用 select 时，必须传入一个固定实参 selector(选择开关) 和一系列变长参数。如果 selector 为数字 n，那么 select 返回参数列表中从索引 n 开始到结束位置的所有参数列表，否则只能为字符串 `#`，这样 select 返回变长参数的总数。

~~~lua
function f(...)
	a = select(3, ...)  --从第三个位置开始，变量 a 对应右边变量列表的第一个参数
	print(a)
	print(select(3, ...)) --打印所有列表参数
end

f(0,1,2,3,4,5)
~~~

~~~lua
do
	function foo(...)
		for i = 1, select('#', ...) do
			local arg = select(i, ...) --读取参数，arg对应的是右边变量列表的第一个参数
			print("arg", arg)
		end
	end

	foo(1, 2, 3, 4)
end
~~~

### 数组

数组，就是相同数据类型的元素按一定顺序排列的集合，可以是一维数组和多维数组。Lua 数组的索引键值可以使用整数表示，数组的大小不是固定的。

1、一维数组

一维数组是最简单的数组，其逻辑结构是线性表。一维数组可以用for循环出数组中的元素，如下实例：

~~~lua
array = {"Lua", "Tutorial"}

for i= 0, 2 do
	print(array[i])
end
~~~

正如你所看到的，我们可以使用整数索引来访问数组元素，如果知道的索引没有值则返回nil。

在 Lua 索引值是以 1 为起始，但你也可以指定 0 开始。除此外我们还可以以负数为数组索引值：

~~~lua
array = {}

for i = -2, 2 do
	array[i] = i *2
end

for i = -2, 2 do
	print(array[i])
end
~~~

2、多维数组

多维数组即数组中包含数组或一维数组的索引键对应一个数组。以下是一个三行三列的阵列多维数组：

~~~lua
-- 初始化数组
array = {}
for i=1,3 do
	array[i] = {}
	for j=1,3 do
		array[i][j] = i*j
	end
end

-- 访问数组
for i=1,3 do
	for j=1,3 do
		print(array[i][j])
	end
end
~~~

不同索引键的三行三列阵列多维数组：

~~~lua
-- 初始化数组
array = {}
maxRows = 3
maxColumns = 3
for row=1,maxRows do
	for col=1,maxColumns do
		array[row*maxColumns +col] = row*col
	end
end

-- 访问数组
for row=1,maxRows do
	for col=1,maxColumns do
		print(array[row*maxColumns +col])
	end
end
~~~

### 迭代器

迭代器（iterator）是一种对象，它能够用来遍历标准模板库容器中的部分或全部元素，每个迭代器对象代表容器中的确定的地址。在 Lua 中迭代器是一种支持指针类型的结构，它可以遍历集合的每一个元素。

1、泛型 for 迭代器

泛型 for 在自己内部保存迭代函数，实际上它保存三个值：迭代函数、状态常量、控制变量。

泛型 for 迭代器提供了集合的 key/value 对，语法格式如下：

~~~lua
for k, v in pairs(t) do
	print(k, v)
end
~~~

上面代码中，k, v为变量列表；pairs(t)为表达式列表。

~~~lua
array = {"Google", "Runoob"}
for key,value in ipairs(array)
do
	print(key, value)
end
~~~

以上实例中我们使用了 Lua 默认提供的迭代函数 ipairs。下面我们看看泛型 for 的执行过程：

* 首先，初始化，计算 in 后面表达式的值，表达式应该返回泛型 for 需要的三个值：迭代函数、状态常量、控制变量；与多值赋值一样，如果表达式返回的结果个数不足三个会自动用 nil 补足，多出部分会被忽略。
* 第二，将状态常量和控制变量作为参数调用迭代函数（注意：对于 for 结构来说，状态常量没有用处，仅仅在初始化时获取他的值并传递给迭代函数）。
* 第三，将迭代函数返回的值赋给变量列表。
* 第四，如果返回的第一个值为nil循环结束，否则执行循环体。
* 第五，回到第二步再次调用迭代函数

在Lua中我们常常使用函数来描述迭代器，每次调用该函数就返回集合的下一个元素。Lua 的迭代器包含以下两种类型：

* 无状态的迭代器
* 多状态的迭代器

2、无状态的迭代器

无状态的迭代器是指不保留任何状态的迭代器，因此在循环中我们可以利用无状态迭代器避免创建闭包花费额外的代价。每一次迭代，迭代函数都是用两个变量（状态常量和控制变量）的值作为参数被调用，一个无状态的迭代器只利用这两个值可以获取下一个元素。这种无状态迭代器的典型的简单的例子是 ipairs，它遍历数组的每一个元素，元素的索引需要是数值。

以下实例我们使用了一个简单的函数来实现迭代器，实现数字 n 的平方：

~~~lua
function square(iteratorMaxCount, currentNumber)
	if currentNumber<iteratorMaxCount then
		currentNumber = currentNumber+1
		return currentNumber, currentNumber*currentNumber
	end
end

for i,n in square,3,0
do
	print(i, n)
end
~~~

迭代的状态包括被遍历的表（循环过程中不会改变的状态常量）和当前的索引下标（控制变量），ipairs 和迭代函数都很简单，我们在 Lua 中可以这样实现：

~~~lua
function iter(a, i)
	i = i + 1
	local v = a[i]
	if v then
		return i, v
	end
end

function ipairs(a)
	return iter, a, 0
end
~~~

当 Lua 调用 ipairs(a) 开始循环时，他获取三个值：迭代函数 iter、状态常量 a、控制变量初始值 0；然后 Lua 调用 iter(a,0) 返回 1, a[1]（除非 a[1]=nil）；第二次迭代调用 iter(a,1) 返回 2, a[2]……直到第一个 nil 元素。

3、多状态的迭代器

很多情况下，迭代器需要保存多个状态信息而不是简单的状态常量和控制变量，最简单的方法是使用闭包，还有一种方法就是将所有的状态信息封装到 table 内，将 table 作为迭代器的状态常量，因为这种情况下可以将所有的信息存放在 table 内，所以迭代函数通常不需要第二个参数。

~~~lua
array = {"Google", "Runoob"}

function elementIterator(collection)
	local index = 0
	local count = #collection
	-- 闭包函数
	return function()
		index = index + 1
		if index <= count then
			-- 返回迭代器的当前元素
			return collection[index]
		end
	end
end

for element in elementIterator(array)
do
	print(element)
end
~~~

以上实例中我们可以看到，elementIterator 内使用了闭包函数，实现计算集合大小并输出各个元素。

### 字符串

字符串或串(String)是由数字、字母、下划线组成的一串字符。Lua 语言中字符串可以使用以下三种方式来表示：

* 单引号间的一串字符。
* 双引号间的一串字符。
* [[ 与 ]] 间的一串字符。

以上三种方式的字符串实例如下：

~~~lua
string1 = "Lua"
print("字符串 1 是", string1)

string2 = 'runoob.com'
print("字符串 2 是", string2)

string3 = [[Lua 教程]]
print("字符串 3 是", string3)
~~~

转义字符用于表示不能直接显示的字符，比如后退键，回车键等。如在字符串转换双引号可以使用 "\""。所有的转义字符和所对应的意义：

| 转义字符 | 描述                                | ASCII码值（十进制） |
| -------- | ----------------------------------- | ------------------- |
| `\a`     | 响铃(BEL)                            | 007                 |
| `\b`     | 退格(BS) ，将当前位置移到前一列          | 008                 |
| `\f`     | 换页(FF)，将当前位置移到下页开头         | 012                 |
| `\n`     | 换行(LF) ，将当前位置移到下一行开头       | 010                |
| `\r`     | 回车(CR) ，将当前位置移到本行开头        | 013                 |
| `\t`     | 水平制表(HT) （跳到下一个TAB位置）       | 009                |
| `\v`     | 垂直制表(VT)                          | 011                |
| `\\`     | 代表一个反斜线字符'\'                   | 092                |
| `\'`     | 代表一个单引号（撇号）字符               | 039                |
| `\"`     | 代表一个双引号字符                      | 034                |
| `\0`     | 空字符(NULL)                          | 000                |
| `\ddd`   | 1到3位八进制数所代表的任意字符            | 三位八进制          |
| `\xhh`   | 1到2位十六进制所代表的任意字符            | 二位十六进制        |

1、字符串操作

* ..

连接两个字符串。

~~~lua
print("www.runoob." .. "com")  -- www.runoob.com
~~~

* string.len(arg)

计算字符串长度。

~~~lua
string.len("abc")  -- 3
~~~

* string.upper(arg)

字符串全部转为大写字母。

~~~lua
string1 = "Lua";
print(string.upper(string1))  -- LUA
~~~

* string.lower(arg)

字符串全部转为小写字母。

~~~lua
string1 = "Lua";
print(string.lower(string1))  -- lua
~~~

* string.reverse(arg)

字符串反转。

~~~lua
string.reverse("Lua")  -- auL
~~~

* string.rep(string, n)

返回字符串string的n个拷贝。

~~~lua
string.rep("abcd", 2)  -- abcdabcd
~~~

* string.char(arg) 

将整型数字转成字符并连接。

~~~lua
string.char(97, 98, 99, 100)  -- abcd

-- 整数 ASCII 码转换为字符
print(string.char(97))  -- a
~~~

* string.byte(arg[, int])

转换字符为整数值(可以指定某个字符，默认第一个字符)。

~~~lua
string.byte("ABCD", 4)  -- 68
string.byte("ABCD")  -- 65

-- 转换第一个字符
print(string.byte("Lua"))  -- 76
-- 转换第三个字符
print(string.byte("Lua", 3))  -- 97
-- 转换末尾第一个字符
print(string.byte("Lua", -1))  -- 97
-- 第二个字符
print(string.byte("Lua", 2))  -- 117
-- 转换末尾第二个字符
print(string.byte("Lua", -2))  -- 117
~~~

* string.format(...)

Lua 提供了 string.format() 函数来生成具有特定格式的字符串，函数的第一个参数是格式，之后是对应格式中每个代号的各种数据。由于格式字符串的存在，使得产生的长字符串可读性大大提高了。这个函数的格式很像 C 语言中的 printf()。

格式字符串可能包含以下的转义码：

* %c - 接受一个数字并将其转化为ASCII码表中对应的字符
* %d、%i - 接受一个数字并将其转化为有符号的整数格式
* %o - 接受一个数字并将其转化为八进制数格式
* %u - 接受一个数字并将其转化为无符号整数格式
* %x - 接受一个数字并将其转化为十六进制数格式，使用小写字母
* %X - 接受一个数字并将其转化为十六进制数格式，使用大写字母
* %e - 接受一个数字并将其转化为科学记数法格式，使用小写字母e
* %E - 接受一个数字并将其转化为科学记数法格式，使用大写字母E
* %f - 接受一个数字并将其转化为浮点数格式
* %g(%G) - 接受一个数字并将其转化为%e(%E，对应%G)及%f中较短的一种格式
* %q - 接受一个字符串并将其转化为可安全被Lua编译器读入的格式
* %s - 接受一个字符串并按照给定的参数格式化该字符串

为进一步细化格式，可以在%号后添加参数。参数将以如下的顺序读入：

* 符号：一个+号表示其后的数字转义符将让正数显示正号，默认情况下只有负数显示符号。
* 占位符：一个0，在后面指定了字串宽度时占位用，不填时的默认占位符是空格。
* 对齐标识：在指定了字串宽度时，默认为右对齐，增加-号可以改为左对齐。
* 宽度数值。
* 小数位数/字串裁切：在宽度数值后增加的小数部分n，若后接f(浮点数转义符，如%6.3f)则设定该浮点数的小数只保留n位，若后接s(字符串转义符，如%5.3s)则设定该字符串只显示前n位。

~~~lua
string.format("the value is:%d", 4)  -- the value is:4

string1 = "Lua"
string2 = "Tutorial"
-- 基本字符串格式化
print(string.format("基本格式化 %s %s", string1, string2))  -- 基本格式化 Lua Tutorial

-- 日期格式化
date = 2
month = 1
year = 2014
print(string.format("日期格式化 %02d/%02d/%03d", date, month, year))  -- 日期格式化 02/01/2014

-- 十进制格式化
print(string.format("%.4f",1/3))  -- 0.3333
~~~

~~~lua
string.format("%c", 83)                 -- 输出S
string.format("%+d", 17.0)              -- 输出+17
string.format("%05d", 17)               -- 输出00017
string.format("%o", 17)                 -- 输出21
string.format("%u", 3.14)               -- 输出3
string.format("%x", 13)                 -- 输出d
string.format("%X", 13)                 -- 输出D
string.format("%e", 1000)               -- 输出1.000000e+03
string.format("%E", 1000)               -- 输出1.000000E+03
string.format("%6.3f", 13)              -- 输出13.000
string.format("%q", "One\nTwo")         -- 输出"One\
                                        -- 　　Two"
string.format("%s", "monkey")           -- 输出monkey
string.format("%10s", "monkey")         -- 输出    monkey
string.format("%5.3s", "monkey")        -- 输出  mon
~~~

* string.find(str, substr, [init, [end]])

在一个指定的目标字符串中搜索指定的内容(第三个参数为索引)，返回其具体位置。不存在则返回 nil。

~~~lua
string.find("Hello Lua user", "Lua", 1)  -- 7 9

string = "Lua Tutorial"
print(string.find(string, "Tutorial"))  -- 5 12
~~~

* string.sub(s, i [, j])

用于截取字符串，s为要截取的字符串，i为截取开始位置，j为截取结束位置，默认为 -1，即最后一个字符。

~~~lua
-- 字符串
local sourcestr = "prefix--runoobgoogletaobao--suffix"
print("\n原始字符串", string.format("%q", sourcestr))  -- 原始字符串    "prefix--runoobgoogletaobao--suffix"

-- 截取部分，第4个到第15个
local first_sub = string.sub(sourcestr, 4, 15)
print("\n第一次截取", string.format("%q", first_sub))  -- 第一次截取    "fix--runoobg"

-- 取字符串前缀，第1个到第8个
local second_sub = string.sub(sourcestr, 1, 8)
print("\n第二次截取", string.format("%q", second_sub))  -- 第二次截取    "prefix--"

-- 截取最后10个
local third_sub = string.sub(sourcestr, -10)
print("\n第三次截取", string.format("%q", third_sub))  -- 第三次截取    "ao--suffix"

-- 索引越界，输出原始字符串
local fourth_sub = string.sub(sourcestr, -100)
print("\n第四次截取", string.format("%q", fourth_sub))  -- 第四次截取    "prefix--runoobgoogletaobao--suffix"
~~~

* string.gsub(mainString, findString, replaceString, num)

在字符串中替换。mainString 为要操作的字符串，findString 为被替换的字符，replaceString 为要替换的字符，num 替换次数（可以忽略，则全部替换）。如：

~~~lua
string.gsub("aaaa", "a", "z", 3)  -- zzza 3
~~~

* string.gmatch(str, pattern)

返回一个迭代器函数，每一次调用这个函数，返回一个在字符串 str 找到的下一个符合 pattern 描述的子串。如果参数 pattern 描述的字符串没有找到，迭代函数返回nil。

~~~lua
for word in string.gmatch("Hello Lua user", "%a+") do 
	print(word) 
end

-- Hello
-- Lua
-- user
~~~

* string.match(str, pattern, init)

string.match()只寻找源字串str中的第一个配对。参数init可选，指定搜寻过程的起点，默认为1。在成功配对时，函数将返回配对表达式中的所有捕获结果；如果没有设置捕获标记，则返回整个配对字符串。当没有成功的配对时，返回nil。

~~~lua
string.match("I have 2 questions for you.", "%d+ %a+")  -- 2 questions

string.format("%d, %q", string.match("I have 2 questions for you.", "(%d+) (%a+)"))  -- 2, "questions"
~~~

2、匹配模式

Lua 中的匹配模式直接用常规的字符串来描述。它用于模式匹配函数 string.find、string.gmatch、string.gsub、string.match。

你还可以在模式串中使用字符类。字符类指可以匹配一个特定字符集合内任何字符的模式项。比如，字符类 `%d` 匹配任意数字，所以你可以使用模式串 `%d%d/%d%d/%d%d%d%d` 搜索 `dd/mm/yyyy` 格式的日期：

~~~lua
s = "Deadline is 30/05/1999, firm"
date = "%d%d/%d%d/%d%d%d%d"
print(string.sub(s, string.find(s, date)))    --> 30/05/1999
~~~

下面的表列出了Lua支持的所有字符类：

单个字符(除 `^$()%.[]*+-?` 外)，与该字符自身配对。

* .(点)：与任何字符配对
* %a：与任何字母配对
* %c：与任何控制符配对(例如\n)
* %d：与任何数字配对
* %l：与任何小写字母配对
* %p：与任何标点(punctuation)配对
* %s：与空白字符配对
* %u：与任何大写字母配对
* %w：与任何字母/数字配对
* %x：与任何十六进制数配对
* %z：与任何代表0的字符配对
* %x(此处x是非字母非数字字符)：与字符x配对，主要用来处理表达式中有功能的字符(`^$()%.[]*+-?`)的配对问题，例如`%%`与`%`配对
* [数个字符类]：与任何[]中包含的字符类配对，例如`[%w_]`与任何字母/数字，或下划线符号(`_`)配对
* [^数个字符类]：与任何不包含在[]中的字符类配对，例如`[^%s]`与任何非空白字符配对

当上述的字符类用大写书写时，表示与非此字符类的任何字符配对。例如，%S表示与任何非空白字符配对，例如，`'%A'`非字母的字符：

~~~lua
print(string.gsub("hello, up-down!", "%A", "."))  -- hello..up.down.    4
~~~

数字4不是字符串结果的一部分，他是gsub返回的第二个结果，代表发生替换的次数。

在模式匹配中有一些特殊字符，他们有特殊的意义，Lua中的特殊字符如下：

~~~lua
( ) . % + - * ? [ ^ $
~~~

'%' 用作特殊字符的转义字符，因此 '%.' 匹配点；'%%' 匹配字符 '%'。转义字符 '%'不仅可以用来转义特殊字符，还可以用于所有的非字母的字符。

模式条目可以是：

* 单个字符类匹配该类别中任意单个字符；
* 单个字符类跟一个 `'*'`，将匹配零或多个该类的字符。这个条目总是匹配尽可能长的串；
* 单个字符类跟一个 `'+'`，将匹配一或更多个该类的字符。这个条目总是匹配尽可能长的串；
* 单个字符类跟一个 `'-'`，将匹配零或更多个该类的字符。和`'*'` 不同，这个条目总是匹配尽可能短的串；
* 单个字符类跟一个 `'?'`，将匹配零或一个该类的字符。只要有可能，它会匹配一个；
* %n，这里的 n 可以从 1 到 9；这个条目匹配一个等于 n 号捕获物（后面有描述）的子串。
* %bxy， 这里的 x 和 y 是两个明确的字符；这个条目匹配以 x 开始 y 结束， 且其中 x 和 y 保持平衡的字符串。意思是，如果从左到右读这个字符串，对每次读到一个 x 就 +1 ，读到一个 y 就 -1， 最终结束处的那个 y 是第一个记数到 0 的 y。 举个例子，条目 %b() 可以匹配到括号平衡的表达式。
* %f[set]，指边境模式；这个条目会匹配到一个位于 set 内某个字符之前的一个空串，且这个位置的前一个字符不属于 set 。集合 set 的含义如前面所述。 匹配出的那个空串之开始和结束点的计算就看成该处有个字符 '\0' 一样。

模式：

模式指一个模式条目的序列。在模式最前面加上符号 '^' 将锚定从字符串的开始处做匹配。在模式最后面加上符号 '$' 将使匹配过程锚定到字符串的结尾。如果 '^' 和 '$' 出现在其它位置，它们均没有特殊含义，只表示自身。

捕获：

模式可以在内部用小括号括起一个子模式， 这些子模式被称为捕获物。当匹配成功时，由捕获物匹配到的字符串中的子串被保存起来用于未来的用途。捕获物以它们左括号的次序来编号。例如，对于模式 `"(a*(.)%w(%s*))"` ，字符串中匹配到 `"a*(.)%w(%s*)"` 的部分保存在第一个捕获物中（因此是编号 1 ）；由 `"."` 匹配到的字符是 2 号捕获物，匹配到 `"%s*"` 的那部分是 3 号。

作为一个特例，空的捕获 () 将捕获到当前字符串的位置（它是一个数字）。例如，如果将模式 `"()aa()"` 作用到字符串 "flaaap" 上，将产生两个捕获物： 3 和 5 。

### table

table 是 Lua 的一种数据结构，用来帮助我们创建不同的数据类型，如数组、字典等。table 使用关联型数组，你可以用任意类型的值来作数组的索引，但这个值不能是 nil。table 是不固定大小的，你可以根据自己需要进行扩容。

Lua也是通过table来解决模块（module）、包（package）和对象（Object）的。 例如string.format表示使用"format"来索引table string。

1、table的构造

构造器是创建和初始化table的表达式，table是Lua特有的功能强大的东西。最简单的构造函数是{}，用来创建一个空table，也可以直接初始化数组：

~~~lua
-- 初始化table
mytable = {}

-- 指定值
mytable[1]= "Lua"

-- 移除引用
mytable = nil
-- lua 垃圾回收会释放内存
~~~

当我们为 table a 设置元素，然后将 a 赋值给 b，则 a 与 b 都指向同一个内存。如果 a 设置为 nil ，则 b 同样能访问 table 的元素。如果没有指定的变量指向a，Lua的垃圾回收机制会清理相对应的内存。

~~~lua
-- 简单的table
mytable = {}
print("mytable 的类型是 ", type(mytable))  -- mytable 的类型是     table

mytable[1] = "Lua"
mytable["wow"] = "修改前"
print("mytable 索引为 1 的元素是 ", mytable[1])  -- mytable 索引为 1 的元素是     Lua
print("mytable 索引为 wow 的元素是 ", mytable["wow"])  -- mytable 索引为 wow 的元素是     修改前

-- alternatetable和mytable的是指同一个 table
alternatetable = mytable

print("alternatetable 索引为 1 的元素是 ", alternatetable[1])  -- alternatetable 索引为 1 的元素是     Lua
print("alternatetable 索引为 wow 的元素是 ", alternatetable["wow"])  -- alternatetable 索引为 wow 的元素是     修改前

alternatetable["wow"] = "修改后"

print("mytable 索引为 wow 的元素是 ", mytable["wow"])  -- mytable 索引为 wow 的元素是     修改后

-- 释放变量
alternatetable = nil
print("alternatetable 是 ", alternatetable)  -- alternatetable 是     nil

-- mytable 仍然可以访问
print("mytable 索引为 wow 的元素是 ", mytable["wow"])  -- mytable 索引为 wow 的元素是     修改后

mytable = nil
print("mytable 是 ", mytable)  -- mytable 是     nil
~~~

2、table的操作

* table.concat (table [, sep [, start [, end]]])

concat是concatenate(连锁、连接)的缩写。table.concat()函数列出参数中指定table的数组部分从start位置到end位置的所有元素，元素间以指定的分隔符(sep)隔开。

~~~lua
fruits = {"banana", "orange", "apple"}

-- 返回 table 连接后的字符串
print("连接后的字符串 ", table.concat(fruits))  -- 连接后的字符串     bananaorangeapple

-- 指定连接字符
print("连接后的字符串 ", table.concat(fruits,", "))  -- 连接后的字符串     banana, orange, apple

-- 指定索引来连接 table
print("连接后的字符串 ", table.concat(fruits,", ", 2, 3))  -- 连接后的字符串     orange, apple
~~~

* table.insert (table, [pos,] value)

在table的数组部分指定位置(pos)插入值为value的一个元素。pos参数可选，默认为数组部分末尾。

~~~lua
fruits = {"banana", "orange", "apple"}

-- 在末尾插入
table.insert(fruits, "mango")
print("索引为 4 的元素为 ", fruits[4])  -- 索引为 4 的元素为     mango

-- 在索引为 2 的键处插入
table.insert(fruits, 2, "grapes")
print("索引为 2 的元素为 ", fruits[2])  -- 索引为 2 的元素为     grapes

print("最后一个元素为 ", fruits[5])  -- 最后一个元素为     mango
table.remove(fruits)
print("移除后最后一个元素为 ", fruits[5])  -- 移除后最后一个元素为     nil
~~~

* table.maxn (table)

指定table中所有正数key值中最大的key值。如果不存在key值为正数的元素，则返回0。(Lua5.2之后该方法已经不存在了，本文使用了自定义函数实现)。

table.maxn 在 Lua5.2 之后该方法已经不存在了，我们定义了 table_maxn 方法来实现。以下实例演示了如何获取 table 中的最大值：

~~~lua
function table_maxn(t)
	local mn = nil;
	for k, v in pairs(t) do
		if(mn == nil) then
			mn = v
		end
		if mn < v then
			mn = v
		end
	end
	return mn
end

tbl = {[1] = 2, [2] = 6, [3] = 34, [26] =5}
print("tbl 最大值：", table_maxn(tbl))
print("tbl 长度 ", #tbl)
~~~

注意：当我们获取 table 的长度的时候无论是使用 `#` 还是 `table.getn` 其都会在索引中断的地方停止计数，而导致无法正确取得 table 的长度。可以使用以下方法来代替：

~~~lua
function table_leng(t)
	local leng = 0
	for k, v in pairs(t) do
		leng = leng + 1
	end
	return leng
end
~~~

* table.remove (table [, pos])

返回table数组部分位于pos位置的元素，其后的元素会被前移。pos参数可选，默认为table长度，即从最后一个元素删起。

* table.sort (table [, comp])

对给定的table进行升序排序。

~~~lua
fruits = {"banana", "orange", "apple", "grapes"}

print("排序前")
for k,v in ipairs(fruits) do
	print(k, v)
end

table.sort(fruits)

print("排序后")
for k,v in ipairs(fruits) do
	print(k, v)
end
~~~

### Metatable

在 Lua table 中我们可以访问对应的key来得到value值，但是却无法对两个 table 进行操作。因此 Lua 提供了元表(Metatable)，允许我们改变table的行为，每个行为关联了对应的元方法。例如，使用元表我们可以定义Lua如何计算两个table的相加操作a+b。

当Lua试图对两个表进行相加时，先检查两者之一是否有元表，之后检查是否有一个叫`"__add"`的字段，若找到，则调用对应的值。`"__add"`等即时字段，其对应的值（往往是一个函数或是table）就是"元方法"。

有两个很重要的函数来处理元表：

* setmetatable(table, metatable)：对指定 table 设置元表(metatable)，如果元表(metatable)中存在 `__metatable` 键值，setmetatable 会失败。
* getmetatable(table)：返回对象的元表(metatable)。

以下实例演示了如何对指定的表设置元表：

~~~lua
mytable = {}                          -- 普通表
mymetatable = {}                      -- 元表
setmetatable(mytable, mymetatable)    -- 把 mymetatable 设为 mytable 的元表
~~~

以上代码也可以直接写成一行：

~~~lua
mytable = setmetatable({}, {})
~~~

以下为返回对象元表：

~~~lua
getmetatable(mytable)                 -- 返回mymetatable
~~~

1、`__index` 元方法

这是 metatable 最常用的键。当你通过键来访问 table 的时候，如果这个键没有值，那么Lua就会寻找该table的metatable（假定有metatable）中的`__index` 键。如果`__index`包含一个表格，Lua会在表格中查找相应的键。

我们可以在使用 lua 命令进入交互模式查看：

~~~plaintext
$ lua
Lua 5.3.0  Copyright (C) 1994-2015 Lua.org, PUC-Rio
> other = { foo = 3 }
> t = setmetatable({}, { __index = other })
> t.foo
3
> t.bar
nil
~~~

如果`__index`包含一个函数的话，Lua就会调用那个函数，table和键会作为参数传递给函数。`__index` 元方法查看表中元素是否存在，如果不存在，返回结果为 nil；如果存在则由 `__index` 返回结果。

~~~lua
mytable = setmetatable({key1 = "value1"}, {
	__index = function(mytable, key)
		if key == "key2" then
			return "metatablevalue"
		else
			return nil
		end
	end
})

print(mytable.key1, mytable.key2)
~~~

实例解析：

* mytable 表赋值为 {key1 = "value1"}。
* mytable 设置了元表，元方法为 `__index`。
* 在mytable表中查找 key1，如果找到，返回该元素，找不到则继续。
* 在mytable表中查找 key2，如果找到，返回 metatablevalue，找不到则继续。
* 判断元表有没有`__index`方法，如果`__index`方法是一个函数，则调用该函数。
* 元方法中查看是否传入 "key2" 键的参数（mytable.key2已设置），如果传入 "key2" 参数返回 "metatablevalue"，否则返回 mytable 对应的键值。

我们可以将以上代码简单写成：

~~~lua
mytable = setmetatable({key1 = "value1"}, { __index = { key2 = "metatablevalue" } })
print(mytable.key1,mytable.key2)
~~~

总结：Lua 查找一个表元素时的规则，其实就是如下 3 个步骤：

* 在表中查找，如果找到，返回该元素，找不到则继续；
* 判断该表是否有元表，如果没有元表，返回 nil，有元表则继续；
* 判断元表有没有 `__index` 方法，如果` __index` 方法为 nil，则返回 nil；如果 `__index` 方法是一个表，则重复 1、2、3；如果 `__index` 方法是一个函数，则返回该函数的返回值。

2、`__newindex` 元方法

`__newindex` 元方法用来对表更新，`__index`则用来对表访问 。当你给表的一个缺少的索引赋值，解释器就会查找`__newindex` 元方法，如果存在则调用这个函数而不进行赋值操作。

以下实例演示了 `__newindex` 元方法的应用：

~~~lua
mymetatable = {}
mytable = setmetatable({key1 = "value1"}, { __newindex = mymetatable })

print(mytable.key1)  -- value1

mytable.newkey = "新值2"
print(mytable.newkey, mymetatable.newkey)  -- nil    新值2

mytable.key1 = "新值1"
print(mytable.key1, mymetatable.key1)  -- 新值1    nil
~~~

以上实例中表设置了元方法 `__newindex`，在对新索引键（newkey）赋值时（mytable.newkey = "新值2"），会调用元方法，而不进行赋值。而如果对已存在的索引键（key1），则会进行赋值，而不调用元方法 `__newindex`。

以下实例使用了 rawset 函数来更新表：

~~~lua
mytable = setmetatable({key1 = "value1"}, {
	__newindex = function(mytable, key, value)
		rawset(mytable, key, "\""..value.."\"")
	end
})

mytable.key1 = "new value"
mytable.key2 = 4

print(mytable.key1, mytable.key2)  -- new value    "4"
~~~

3、为表添加操作符

以下实例演示了两表相加操作：

~~~lua
-- 计算表中最大值，table.maxn在Lua5.2以上版本中已无法使用
-- 自定义计算表中最大键值函数 table_maxn，即计算表的元素个数
function table_maxn(t)
	local mn = 0
	for k, v in pairs(t) do
		if mn < k then
			mn = k
		end
	end
	return mn
end

-- 两表相加操作
mytable = setmetatable({ 1, 2, 3 }, {
	__add = function(mytable, newtable)
		for i = 1, table_maxn(newtable) do
			table.insert(mytable, table_maxn(mytable)+1, newtable[i])
		end
		return mytable
	end
})

secondtable = {4,5,6}
mytable = mytable + secondtable

for k,v in ipairs(mytable) do
	print(k,v)
end
~~~

`__add` 键包含在元表中，并进行相加操作。 表中对应的操作列表如下：

* `__add`：对应的运算符 '+'
* `__sub`：对应的运算符 '-'
* `__mul`：对应的运算符 '*'
* `__div`：对应的运算符 '/'
* `__mod`：对应的运算符 '%'
* `__unm`：对应的运算符 '-'
* `__concat`：对应的运算符 '..'
* `__eq`：对应的运算符 '=='
* `__lt`：对应的运算符 '<'
* `__le`：对应的运算符 '<='

4、`__call` 元方法

`__call` 元方法在 Lua 调用一个值时调用。以下实例演示了计算表中元素的和：

~~~lua
-- 计算表中最大值，table.maxn在Lua5.2以上版本中已无法使用
-- 自定义计算表中最大键值函数 table_maxn，即计算表的元素个数
function table_maxn(t)
	local mn = 0
	for k, v in pairs(t) do
		if mn < k then
			mn = k
		end
	end
	return mn
end

-- 定义元方法__call
mytable = setmetatable({10}, {
	__call = function(mytable, newtable)
		sum = 0
		for i = 1, table_maxn(mytable) do
			sum = sum + mytable[i]
		end
		for i = 1, table_maxn(newtable) do
			sum = sum + newtable[i]
		end
		return sum
	end
})

newtable = {10,20,30}
print(mytable(newtable))
~~~

5、`__tostring` 元方法

`__tostring` 元方法用于修改表的输出行为。以下实例我们自定义了表的输出内容：

~~~lua
mytable = setmetatable({ 10, 20, 30 }, {
	__tostring = function(mytable)
		sum = 0
		for k, v in pairs(mytable) do
			sum = sum + v
		end
		return "表所有元素的和为 " .. sum
	end
})
print(mytable)
~~~

### 模块与包

模块类似于一个封装库，从 Lua 5.1 开始，Lua 加入了标准的模块管理机制，可以把一些公用的代码放在一个文件里，以 API 接口的形式在其他地方调用，有利于代码的重用和降低代码耦合度。

1、Lua 的模块

Lua 的模块是由变量、函数等已知元素组成的 table。因此创建一个模块很简单，就是创建一个 table，然后把需要导出的常量、函数放入其中，最后返回这个 table 就行。以下为创建自定义模块 module.lua，文件代码格式如下：

~~~lua
-- 文件名为 module.lua
-- 定义一个名为 module 的模块
module = {}

-- 定义一个常量
module.constant = "这是一个常量"

-- 定义一个函数
function module.func1()
	io.write("这是一个公有函数！\n")
end

local function func2()
	print("这是一个私有函数！")
end

function module.func3()
	func2()
end

return module
~~~

由上可知，模块的结构就是一个 table 的结构，因此可以像操作调用 table 里的元素那样来操作调用模块里的常量或函数。上面的 func2 声明为程序块的局部变量，即表示一个私有函数，因此是不能从外部访问模块里的这个私有函数，必须通过模块里的公有函数来调用。

2、require 函数

Lua提供了一个名为require的函数用来加载模块。要加载一个模块，只需要简单地调用就可以了。例如：

~~~lua
require("<模块名>")
~~~

或者：

~~~lua
require "<模块名>"
~~~

执行 require 后会返回一个由模块常量或函数组成的 table，并且还会定义一个包含该 table 的全局变量：

~~~lua
-- test_module.lua 文件
-- module 模块为上文提到到 module.lua
require("module")
 
print(module.constant)
 
module.func3()
~~~

或者给加载的模块定义一个别名变量，方便调用：

~~~lua
-- test_module2.lua 文件
-- module 模块为上文提到到 module.lua
-- 别名变量 m
local m = require("module")
 
print(m.constant)
 
m.func3()
~~~

3、加载机制

对于自定义的模块，模块文件不是放在哪个文件目录都行，函数 require 有它自己的文件路径加载策略，它会尝试从 Lua 文件或 C 程序库中加载模块。

require 用于搜索 Lua 文件的路径是存放在全局变量 package.path 中，当 Lua 启动后，会以环境变量 LUA_PATH 的值来初始这个环境变量。如果没有找到该环境变量，则使用一个编译时定义的默认路径来初始化。

当然，如果没有 LUA_PATH 这个环境变量，也可以自定义设置，在当前用户根目录下打开 `.profile` 文件（没有则创建，打开 `.bashrc` 文件也可以），例如把 "~/lua/" 路径加入 LUA_PATH 环境变量里：

~~~plaintext
#LUA_PATH
export LUA_PATH="~/lua/?.lua;;"
~~~

文件路径以 ";" 号分隔，最后的 2 个 ";;" 表示新加的路径后面加上原来的默认路径。

接着，更新环境变量参数，使之立即生效。

~~~plaintext
source ~/.profile
~~~

这时假设 package.path 的值是：

~~~plaintext
/Users/dengjoe/lua/?.lua;./?.lua;/usr/local/share/lua/5.1/?.lua;/usr/local/share/lua/5.1/?/init.lua;/usr/local/lib/lua/5.1/?.lua;/usr/local/lib/lua/5.1/?/init.lua
~~~

那么调用 require("module") 时就会尝试打开以下文件目录去搜索目标：

~~~plaintext
/Users/dengjoe/lua/module.lua;
./module.lua
/usr/local/share/lua/5.1/module.lua
/usr/local/share/lua/5.1/module/init.lua
/usr/local/lib/lua/5.1/module.lua
/usr/local/lib/lua/5.1/module/init.lua
~~~

如果找到目标文件，则会调用 package.loadfile 来加载模块。否则，就会去找 C 程序库。搜索的文件路径是从全局变量 package.cpath 获取，而这个变量则是通过环境变量 LUA_CPATH 来初始。搜索的策略跟上面的一样，只不过现在换成搜索的是 so 或 dll 类型的文件。如果找得到，那么 require 就会通过 package.loadlib 来加载它。

4、C 包

Lua和C是很容易结合的，使用 C 为 Lua 写包。与Lua中写包不同，C包在使用以前必须首先加载并连接，在大多数系统中最容易的实现方式是通过动态连接库机制。Lua在一个叫loadlib的函数内提供了所有的动态连接的功能。这个函数有两个参数：库的绝对路径和初始化函数。所以典型的调用的例子如下：

~~~lua
local path = "/usr/local/lua/lib/libluasocket.so"
local f = loadlib(path, "luaopen_socket")
~~~

loadlib 函数加载指定的库并且连接到 Lua，然而它并不打开库（也就是说没有调用初始化函数），反之他返回初始化函数作为 Lua 的一个函数，这样我们就可以直接在Lua中调用他。

如果加载动态库或者查找初始化函数时出错，loadlib 将返回 nil 和错误信息。我们可以修改前面一段代码，使其检测错误然后调用初始化函数：

~~~lua
local path = "/usr/local/lua/lib/libluasocket.so"
-- 或者 path = "C:\\windows\\luasocket.dll"，这是 Window 平台下
local f = assert(loadlib(path, "luaopen_socket"))
f()  -- 真正打开库
~~~

一般情况下我们期望二进制的发布库包含一个与前面代码段相似的 stub 文件，安装二进制库的时候可以随便放在某个目录，只需要修改 stub 文件对应二进制库的实际路径即可。将 stub 文件所在的目录加入到 LUA_PATH，这样设定后就可以使用 require 函数加载 C 库了。

### 面向对象

1、面向对象特征

* 封装：指能够把一个实体的信息、功能、响应都装入一个单独的对象中的特性。
* 继承：继承的方法允许在不改动原程序的基础上对其进行扩充，这样使得原功能得以保存，而新功能也得以扩展。这有利于减少重复编码，提高软件的开发效率。
* 多态：同一操作作用于不同的对象，可以有不同的解释，产生不同的执行结果。在运行时，可以通过指向基类的指针，来调用实现派生类中的方法。
* 抽象：抽象(Abstraction)是简化复杂的现实问题的途径，它可以为具体问题找到最恰当的类定义，并且可以在最恰当的继承级别解释问题。

2、Lua中的面向对象

我们知道，对象由属性和方法组成。Lua中最基本的结构是table，所以需要用table来描述对象的属性。Lua 中的 function 可以用来表示方法，那么Lua中的类可以通过 table + function 模拟出来。至于继承，可以通过 metetable 模拟出来（不推荐用，只模拟最基本的对象大部分时间够用了）。

Lua 中的表不仅在某种意义上是一种对象。像对象一样，表也有状态（成员变量）；也有与对象的值独立的本性，特别是拥有两个不同值的对象（table）代表两个不同的对象；一个对象在不同的时候也可以有不同的值，但他始终是一个对象；与对象类似，表的生命周期与其由什么创建、在哪创建没有关系。对象有他们的成员函数，表也有：

~~~lua
Account = {balance = 0}
function Account.withdraw(v)
	Account.balance = Account.balance - v
end
~~~

这个定义创建了一个新的函数，并且保存在Account对象的withdraw域内，下面我们可以这样调用：

~~~lua
Account.withdraw(100.00)
~~~

以下简单的类包含了三个属性： area，length 和 breadth，printArea方法用于打印计算结果：

~~~lua
-- 元类
Rectangle = {area = 0, length = 0, breadth = 0}

-- 派生类的方法 new
function Rectangle:new(o, length, breadth)
	o = o or {}
	setmetatable(o, self)
	self.__index = self
	self.length = length or 0
	self.breadth = breadth or 0
	self.area = length*breadth;
	return o
end

-- 派生类的方法 printArea
function Rectangle:printArea()
	print("矩形面积为 ",self.area)
end
~~~

1）创建对象

创建对象是为类的实例分配内存的过程。每个类都有属于自己的内存并共享公共数据。

~~~lua
r = Rectangle:new(nil, 10, 20)
~~~

2）访问属性

我们可以使用点号(.)来访问类的属性：

~~~lua
print(r.length)
~~~

3）访问成员函数

我们可以使用冒号 : 来访问类的成员函数：

~~~lua
r:printArea()
~~~

内存在对象初始化时分配。以下我们演示了 Lua 面向对象的完整实例：

~~~lua
-- 元类
Shape = {area = 0}

-- 基础类方法 new
function Shape:new(o, side)
	o = o or {}
	setmetatable(o, self)
	self.__index = self
	side = side or 0
	self.area = side*side;
	return o
end

-- 基础类方法 printArea
function Shape:printArea()
	print("面积为 ", self.area)
end

-- 创建对象
myshape = Shape:new(nil, 10)

myshape:printArea()
~~~

执行以上程序，输出结果为：

~~~plaintext
面积为     100
~~~

3、Lua 继承

继承是指一个对象直接使用另一对象的属性和方法。可用于扩展基础类的属性和方法。以下演示了一个简单的继承实例：

~~~lua
-- Meta class
Shape = {area = 0}

-- 基础类方法 new
function Shape:new(o, side)
	o = o or {}
	setmetatable(o, self)
	self.__index = self
	side = side or 0
	self.area = side*side;
	return o
end

-- 基础类方法 printArea
function Shape:printArea()
	print("面积为 ", self.area)
end
~~~

接下来的实例，Square 对象继承了 Shape 类：

~~~lua
Square = Shape:new()
-- Derived class method new
function Square:new(o, side)
	o = o or Shape:new(o, side)
	setmetatable(o, self)
	self.__index = self
	return o
end
~~~

以下实例我们继承了一个简单的类，来扩展派生类的方法，派生类中保留了继承类的成员变量和方法：

~~~lua
-- Meta class
Shape = {area = 0}

-- 基础类方法 new
function Shape:new(o, side)
	o = o or {}
	setmetatable(o, self)
	self.__index = self
	side = side or 0
	self.area = side*side;
	return o
end

-- 基础类方法 printArea
function Shape:printArea()
	print("面积为 ", self.area)
end

-- 创建对象
myshape = Shape:new(nil, 10)
myshape:printArea()

Square = Shape:new()
-- 派生类方法 new
function Square:new(o, side)
	o = o or Shape:new(o, side)
	setmetatable(o, self)
	self.__index = self
	return o
end

-- 派生类方法 printArea
function Square:printArea()
	print("正方形面积为 ", self.area)
end

-- 创建对象
mysquare = Square:new(nil, 10)
mysquare:printArea()

Rectangle = Shape:new()
-- 派生类方法 new
function Rectangle:new(o, length, breadth)
	o = o or Shape:new(o)
	setmetatable(o, self)
	self.__index = self
	self.area = length * breadth
	return o
end

-- 派生类方法 printArea
function Rectangle:printArea()
	print("矩形面积为 ", self.area)
end

-- 创建对象
myrectangle = Rectangle:new(nil, 10, 20)
myrectangle:printArea()
~~~

执行以上代码，输出结果为：

~~~plaintext
面积为     100
正方形面积为     100
矩形面积为     200
~~~

4、函数重写

Lua 中我们可以重写基础类的函数，在派生类中定义自己的实现方式：

~~~lua
-- 派生类方法 printArea
function Square:printArea()
	print("正方形面积 ", self.area)
end
~~~

### 协同程序coroutine

1、什么是协同(coroutine)？

Lua 协同程序(coroutine)与线程比较类似：拥有独立的堆栈，独立的局部变量，独立的指令指针，同时又与其它协同程序共享全局变量和其它大部分东西。协同是非常强大的功能，但是用起来也很复杂。

2、线程和协同程序的区别

线程与协同程序的主要区别在于，一个具有多个线程的程序可以同时运行几个线程，而协同程序却需要彼此协作的运行。在任一指定时刻只有一个协同程序在运行，并且这个正在运行的协同程序只有在明确的被要求挂起的时候才会被挂起。协同程序有点类似同步的多线程，在等待同一个线程锁的几个线程有点类似协同。

3、基本语法

* coroutine.create()：创建 coroutine，返回 coroutine， 参数是一个函数，当和 resume 配合使用的时候就唤醒函数调用；
* coroutine.resume()：重启 coroutine，和 create 配合使用；
* coroutine.yield()：挂起 coroutine，将 coroutine 设置为挂起状态，这个和 resume 配合使用能有很多有用的效果；
* coroutine.status()：查看 coroutine 的状态；注：coroutine 的状态有三种：dead，suspended，running，具体什么时候有这样的状态请参考下面的程序；
* coroutine.wrap()：创建 coroutine，返回一个函数，一旦你调用这个函数，就进入 coroutine，和 create 功能重复；
* coroutine.running()：返回正在跑的 coroutine，一个 coroutine 就是一个线程，当使用running的时候，就是返回一个 corouting 的线程号；

4、示例

~~~lua
co = coroutine.create(
	function(i)
		print(i)
	end
)
coroutine.resume(co, 1)   -- 1
print(coroutine.status(co))  -- dead

print("----------")

co = coroutine.wrap(
	function(i)
		print(i);
	end
)
co(1)

print("----------")

co2 = coroutine.create(
	function()
		for i=1,10 do
			print(i)
			if i == 3 then
				print(coroutine.status(co2))  --running
				print(coroutine.running()) --thread:XXXXXX
			end
			coroutine.yield()
		end
	end
)
coroutine.resume(co2) --1
coroutine.resume(co2) --2
coroutine.resume(co2) --3
print(coroutine.status(co2))   -- suspended
print(coroutine.running())

print("----------")
~~~

运行结果：

~~~plaintext
1
dead
----------
1
----------
1
2
3
running
thread: 0x7fb801c05868    false
suspended
thread: 0x7fb801c04c88    true
----------
~~~

coroutine.running就可以看出来，coroutine在底层实现就是一个线程。当create一个coroutine的时候就是在新线程中注册了一个事件，当使用resume触发事件的时候，create的coroutine函数就被执行了，当遇到yield的时候就代表挂起当前线程，等候再次resume触发事件。

5、示例

~~~lua
function foo(a)
	print("foo 函数输出", a)
	return coroutine.yield(2 * a) -- 返回 2*a 的值
end

co = coroutine.create(function (a , b)
	print("第一次协同程序执行输出", a, b) -- co-body 1 10
	local r = foo(a + 1)

	print("第二次协同程序执行输出", r)
	local r, s = coroutine.yield(a + b, a - b)  -- a，b的值为第一次调用协同程序时传入

	print("第三次协同程序执行输出", r, s)
	return b, "结束协同程序"  -- b的值为第二次调用协同程序时传入
end)

print("main", coroutine.resume(co, 1, 10)) -- true, 4
print("--分割线----")
print("main", coroutine.resume(co, "r")) -- true 11 -9
print("---分割线---")
print("main", coroutine.resume(co, "x", "y")) -- true 10 end
print("---分割线---")
print("main", coroutine.resume(co, "x", "y")) -- cannot resume dead coroutine
print("---分割线---")
~~~

运行结果：

~~~plaintext
第一次协同程序执行输出    1    10
foo 函数输出    2
main    true    4
--分割线----
第二次协同程序执行输出    r
main    true    11    -9
---分割线---
第三次协同程序执行输出    x    y
main    true    10    结束协同程序
---分割线---
main    false    cannot resume dead coroutine
---分割线---
~~~

以上实例运行流程如下：

* 调用resume，将协同程序唤醒，resume操作成功返回true，否则返回false；
* 协同程序运行；
* 运行到yield语句；
* yield挂起协同程序，第一次resume返回；（注意：此处yield返回，参数是resume的参数）
* 第二次resume，再次唤醒协同程序；（注意：此处resume的参数中，除了第一个参数，剩下的参数将作为yield的参数）
* yield返回；
* 协同程序继续运行；
* 如果使用的协同程序继续运行完成后继续调用 resume方法则输出：cannot resume dead coroutine；

resume和yield的配合强大之处在于，resume处于主程中，它将外部状态（数据）传入到协同程序内部；而yield则将内部的状态（数据）返回到主程中。

6、生产者-消费者问题

~~~lua
local newProductor

function productor()
	local i = 0
	while true do
		i = i + 1
		send(i)     -- 将生产的物品发送给消费者
	end
end

function consumer()
	while true do
		local i = receive()     -- 从生产者那里得到物品
		print(i)
	end
end

function receive()
	local status, value = coroutine.resume(newProductor)
	return value
end

function send(x)
	coroutine.yield(x)     -- x表示需要发送的值，值返回以后，就挂起该协同程序
end

-- 启动程序
newProductor = coroutine.create(productor)
consumer()
~~~

### 文件IO

Lua I/O 库用于读取和处理文件，分为简单模式（和C一样）、完全模式。

* 简单模式（simple model）：拥有一个当前输入文件和一个当前输出文件，并且提供针对这些文件相关的操作。
* 完全模式（complete model）：使用外部的文件句柄来实现。它以一种面向对象的形式，将所有的文件操作定义为文件句柄的方法。

简单模式在做一些简单的文件操作时较为合适，但是在进行一些高级的文件操作的时候，简单模式就显得力不从心。例如同时读取多个文件这样的操作，使用完全模式则较为合适。

打开文件操作语句如下：

~~~lua
file = io.open (filename [, mode])
~~~

mode 的值有：

* r：以只读方式打开文件，该文件必须存在。
* w：打开只写文件，若文件存在则文件长度清为0，即该文件内容会消失。若文件不存在则建立该文件。
* a：以附加的方式打开只写文件。若文件不存在，则会建立该文件，如果文件存在，写入的数据会被加到文件尾，即文件原先的内容会被保留。（EOF符保留）
* r+：以可读写方式打开文件，该文件必须存在。
* w+：打开可读写文件，若文件存在则文件长度清为零，即该文件内容会消失。若文件不存在则建立该文件。
* a+：与a类似，但此文件可读可写。
* b：二进制模式，如果文件是二进制文件，可以加上b。
* +：号表示对文件既可以读也可以写。

1、简单模式

简单模式使用标准的 I/O 或使用一个当前输入文件和一个当前输出文件。

~~~lua
-- 以只读方式打开文件
file = io.open("test.lua", "r")

-- 设置默认输入文件为 test.lua
io.input(file)

-- 输出文件第一行
print(io.read())

-- 关闭打开的文件
io.close(file)

-- 以附加的方式打开只写文件
file = io.open("test.lua", "a")

-- 设置默认输出文件为 test.lua
io.output(file)

-- 在文件最后一行添加 Lua 注释
io.write("--  test.lua 文件末尾注释")

-- 关闭打开的文件
io.close(file)
~~~

在以上实例中我们使用了 io."x" 方法，其中 io.read() 中我们没有带参数，参数可以是下表中的一个：

* `"*n"`：读取一个数字并返回它。例：`file.read("*n")`；
* `"*a"`：从当前位置读取整个文件。例：`file.read("*a")`；
* `"*l"`：默认，读取下一行，在文件尾 (EOF) 处返回 nil。例：`file.read("*l")`；
* `number`：返回一个指定字符个数的字符串，或在 EOF 时返回 nil。例：`file.read(5)`；

其他的 io 方法有：

* io.tmpfile()：返回一个临时文件句柄，该文件以更新模式打开，程序结束时自动删除；
* io.type(file)：检测obj是否一个可用的文件句柄；
* io.flush()：向文件写入缓冲中的所有数据；
* io.lines(optional file name)：返回一个迭代函数，每次调用将获得文件中的一行内容，当到文件尾时，将返回nil，但不关闭文件；

2、完全模式

通常我们需要在同一时间处理多个文件，我们需要使用 `file:function_name` 来代替 `io.function_name` 方法。以下实例演示了如何同时处理同一个文件：

~~~lua
-- 以只读方式打开文件
file = io.open("test.lua", "r")

-- 输出文件第一行
print(file:read())

-- 关闭打开的文件
file:close()

-- 以附加的方式打开只写文件
file = io.open("test.lua", "a")

-- 在文件最后一行添加 Lua 注释
file:write("--test")

-- 关闭打开的文件
file:close()
~~~

read 的参数与简单模式一致。其他方法：

* file:seek(optional whence, optional offset)：设置和获取当前文件位置，成功则返回最终的文件位置(按字节)，失败则返回nil加错误信息。参数 whence 值可以是：

* "set"：从文件头开始；
* "cur"：从当前位置开始[默认]；
* "end"：从文件尾开始；
* offset：默认为0；

不带参数`file:seek()`则返回当前位置，`file:seek("set")`则定位到文件头，`file:seek("end")`则定位到文件尾并返回文件大小。

* file:flush()：向文件写入缓冲中的所有数据。

* io.lines(optional file name)：打开指定的文件filename为读模式并返回一个迭代函数，每次调用将获得文件中的一行内容，当到文件尾时，将返回nil，并自动关闭文件。

若不带参数时`io.lines() <=> io.input():lines()`。读取默认输入设备的内容，但结束时不关闭文件，如：

~~~lua
for line in io.lines("main.lua") do
	print(line)
end
~~~

以下实例使用了 seek 方法，定位到文件倒数第 25 个位置并使用 read 方法的 `*a` 参数，即从当前位置(倒数第 25 个位置)读取整个文件。

~~~lua
-- 以只读方式打开文件
file = io.open("test.lua", "r")

file:seek("end", -25)
print(file:read("*a"))

-- 关闭打开的文件
file:close()
~~~

### 数据库访问

本文主要为大家介绍 Lua 数据库的操作库：LuaSQL。他是开源的，支持的数据库有：ODBC、ADO、Oracle、MySQL、SQLite 和 PostgreSQL。本文主要为大家介绍MySQL的数据库连接。

LuaSQL 可以使用 LuaRocks 来安装，可以根据需要安装你需要的数据库驱动。LuaRocks 安装方法：

~~~plaintext
$ wget http://luarocks.org/releases/luarocks-2.2.1.tar.gz
$ tar zxpf luarocks-2.2.1.tar.gz
$ cd luarocks-2.2.1
$ ./configure; sudo make bootstrap
$ sudo luarocks install luasocket
$ lua
Lua 5.3.0 Copyright (C) 1994-2015 Lua.org, PUC-Rio
> require "socket"
~~~

附：[Window下安装 LuaRocks](https://github.com/keplerproject/luarocks/wiki/Installation-instructions-for-Windows)。

安装不同数据库驱动：

~~~plaintext
luarocks install luasql-sqlite3
luarocks install luasql-postgres
luarocks install luasql-mysql
luarocks install luasql-sqlite
luarocks install luasql-odbc
~~~

附：你也可以使用源码安装方式，Lua Github源码地址：https://github.com/keplerproject/luasql 。

Lua 连接MySQL数据库：

~~~lua
require "luasql.mysql"

--创建环境对象
env = luasql.mysql()

--连接数据库
conn = env:connect("数据库名", "用户名", "密码", "IP地址", 端口)

--设置数据库的编码格式
conn:execute"SET NAMES UTF8"

--执行数据库操作
cur = conn:execute("select * from role")

row = cur:fetch({}, "a")

--文件对象的创建
file = io.open("role.txt", "w+")

while row do
	var = string.format("%d %s\n", row.id, row.name)
	print(var)
	file:write(var)
	row = cur:fetch(row, "a")
end

file:close()  --关闭文件对象
conn:close()  --关闭数据库连接
env:close()   --关闭数据库环境
~~~

### 垃圾回收

Lua 采用了自动内存管理。这意味着你不用操心新创建的对象需要的内存如何分配出来，也不用考虑在对象不再被使用后怎样释放它们所占用的内存。

Lua 运行了一个垃圾收集器来收集所有死对象 （即在 Lua 中不可能再访问到的对象）来完成自动内存管理的工作。Lua 中所有用到的内存，如：字符串、表、用户数据、函数、线程、内部结构等，都服从自动管理。

Lua 实现了一个增量标记-扫描收集器。它使用这两个数字来控制垃圾收集循环：垃圾收集器间歇率和垃圾收集器步进倍率。这两个数字都使用百分数为单位 （例如：值 100 在内部表示 1 ）。

垃圾收集器间歇率控制着收集器需要在开启新的循环前要等待多久，增大这个值会减少收集器的积极性。当这个值比 100 小的时候，收集器在开启新的循环前不会有等待。设置这个值为 200 就会让收集器等到总内存使用量达到之前的两倍时才开始新的循环。

垃圾收集器步进倍率控制着收集器运作速度相对于内存分配速度的倍率。增大这个值不仅会让收集器更加积极，还会增加每个增量步骤的长度。不要把这个值设得小于100 ，那样的话收集器就工作的太慢了以至于永远都干不完一个循环。 默认值是200，这表示收集器以内存分配的"两倍"速工作。

如果你把步进倍率设为一个非常大的数字 （比你的程序可能用到的字节数还大 10% ），收集器的行为就像一个 stop-the-world 收集器。接着你若把间歇率设为200，收集器的行为就和过去的 Lua 版本一样了：每次 Lua 使用的内存翻倍时，就做一次完整的收集。

垃圾回收器函数

Lua 提供了以下函数`collectgarbage ([opt [, arg]])`用来控制自动内存管理：

* collectgarbage("collect")：做一次完整的垃圾收集循环。通过参数 opt 它提供了一组不同的功能。
* collectgarbage("count")：以 K 字节数为单位返回 Lua 使用的总内存数。 这个值有小数部分，所以只需要乘上 1024 就能得到 Lua 使用的准确字节数（除非溢出）。
* collectgarbage("restart")：重启垃圾收集器的自动运行。
* collectgarbage("setpause")：将 arg 设为收集器的间歇率。返回 间歇率 的前一个值。
* collectgarbage("setstepmul")：返回 步进倍率 的前一个值。
* collectgarbage("step")：单步运行垃圾收集器。 步长"大小"由 arg 控制。传入 0 时，收集器步进（不可分割的）一步。传入非 0 值，收集器收集相当于 Lua 分配这些多（K 字节）内存的工作。如果收集器结束一个循环将返回 true 。
* collectgarbage("stop")：停止垃圾收集器的运行。 在调用重启前，收集器只会因显式的调用运行。

~~~lua
mytable = {"apple", "orange", "banana"}

print(collectgarbage("count"))

mytable = nil

print(collectgarbage("count"))

print(collectgarbage("collect"))

print(collectgarbage("count"))
~~~

### 错误处理

程序运行中错误处理是必要的，在我们进行文件操作、数据转移及web service调用过程中都会出现不可预期的错误。如果不注重错误信息的处理，就会造成信息泄露，程序无法运行等情况。任何程序语言中，都需要错误处理，错误类型有：

* 语法错误
* 运行错误

1、语法错误

语法错误通常是由于对程序的组件（如运算符、表达式）使用不当引起的。一个简单的实例如下：

~~~lua
a == 2
~~~

以上代码执行结果为：

~~~plaintext
lua: test.lua:2: syntax error near '=='
~~~

正如你所看到的，以上出现了语法错误，一个 "=" 号跟两个 "=" 号是有区别的。一个 "=" 是赋值表达式，两个 "=" 是比较运算。

另外一个实例：

~~~lua
for a= 1,10
	print(a)
end
~~~

执行以上程序会出现如下错误：

~~~lua
lua: test2.lua:2: 'do' expected near 'print'
~~~

语法错误比程序运行错误更简单，运行错误无法定位具体错误，而语法错误我们可以很快的解决，如以上实例我们只要在for语句下添加 do 即可：

~~~lua
for a= 1,10 do
	print(a)
end
~~~

2、运行错误

运行错误是程序可以正常执行，但是会输出报错信息。如下实例由于参数输入错误，程序执行时报错：

~~~lua
function add(a, b)
	return a+b
end

add(10)
~~~

当我们编译运行以下代码时，编译是可以成功的，但在运行的时候会产生如下错误：

~~~plaintext
lua: test2.lua:2: attempt to perform arithmetic on local 'b' (a nil value)
stack traceback:
    test2.lua:2: in function 'add'
    test2.lua:5: in main chunk
    [C]: ?
~~~

lua 里调用函数时，即使实参列表和形参列表不一致也能成功调用，多余的参数会被舍弃，缺少的参数会被补为 nil。以上报错信息是由于参数 b 被补为 nil 后，nil 参与了 + 运算。假如 add 函数内不是 "return a+b" 而是 "print(a,b)" 的话，结果会变成 "10 nil" 不会报错。

3、错误处理

我们可以使用两个函数：assert 和 error 来处理错误。实例如下：

~~~lua
local function add(a,b)
	assert(type(a) == "number", "a 不是一个数字")
	assert(type(b) == "number", "b 不是一个数字")
	return a+b
end

add(10)
~~~

执行以上程序会出现如下错误：

~~~plaintext
lua: test.lua:3: b 不是一个数字
stack traceback:
    [C]: in function 'assert'
    test.lua:3: in local 'add'
    test.lua:6: in main chunk
    [C]: in ?
~~~

实例中assert首先检查第一个参数，若没问题，assert不做任何事情；否则，assert以第二个参数作为错误信息抛出。

1）error函数

语法格式：

~~~lua
error (message [, level])
~~~

功能：终止正在执行的函数，并返回message的内容作为错误信息(error函数永远都不会返回)。通常情况下，error会附加一些错误位置的信息到message头部。

Level参数指示获得错误的位置：

* Level=1：默认，为调用error位置(文件+行号)；
* Level=2：指出哪个调用error的函数的函数；
* Level=0：不添加错误位置信息；

2）pcall 和 xpcall、debug

Lua中处理错误，可以使用函数pcall（protected call）来包装需要执行的代码。pcall接收一个函数和要传递给后者的参数，并执行。执行结果：有错误、无错误；返回值：true或者false，errorinfo。语法格式如下：

~~~lua
if pcall(function_name, ….) then
-- 没有错误
else
-- 一些错误
end
~~~

简单实例：

~~~plaintext
> =pcall(function(i) print(i) end, 33)
33
true

> =pcall(function(i) print(i) error('error..') end, 33)
33
false        stdin:1: error..
> function f() return false,2 end
> if f() then print '1' else print '0' end
0
~~~

pcall以一种"保护模式"来调用第一个参数，因此pcall可以捕获函数执行中的任何错误。通常在错误发生时，希望落得更多的调试信息，而不只是发生错误的位置。但pcall返回时，它已经销毁了调用桟的部分内容。

Lua提供了xpcall函数，xpcall接收第二个参数——一个错误处理函数，当错误发生时，Lua会在调用栈展开（unwind）前调用错误处理函数，于是就可以在这个函数中使用debug库来获取关于错误的额外信息了。

debug库提供了两个通用的错误处理函数：

* debug.debug：提供一个Lua提示符，让用户来检查错误的原因；
* debug.traceback：根据调用栈来构建一个扩展的错误消息；

~~~plaintext
> =xpcall(function(i) print(i) error('error..') end, function() print(debug.traceback()) end, 33)
33
stack traceback:
stdin:1: in function <stdin:1>
[C]: in function 'error'
stdin:1: in function <stdin:1>
[C]: in function 'xpcall'
stdin:1: in main chunk
[C]: in ?
false        nil
~~~

xpcall 使用实例 2：

~~~lua
function myfunction()
	n = n/nil
end

function myerrorhandler( err )
	print( "ERROR:", err )
end

status = xpcall( myfunction, myerrorhandler )
print( status)
~~~

执行以上程序会出现如下错误：

~~~plaintext
ERROR:    test2.lua:2: attempt to perform arithmetic on global 'n' (a nil value)
false
~~~

### 调试

Lua 提供了 debug 库用于提供创建我们自定义调试器的功能。Lua 本身并未有内置的调试器，但很多开发者共享了他们的 Lua 调试器代码。Lua 中 debug 库包含以下函数：

* debug()

进入一个用户交互模式，运行用户输入的每个字符串。 使用简单的命令以及其它调试设置，用户可以检阅全局变量和局部变量， 改变变量的值，计算一些表达式，等等。输入一行仅包含 cont 的字符串将结束这个函数， 这样调用者就可以继续向下运行。

* getfenv(object)

返回对象的环境变量。

* gethook(optional thread)

返回三个表示线程钩子设置的值： 当前钩子函数，当前钩子掩码，当前钩子计数。

* getinfo ([thread,] f [, what])

返回关于一个函数信息的表。 你可以直接提供该函数， 也可以用一个数字 f 表示该函数。 数字 f 表示运行在指定线程的调用栈对应层次上的函数： 0 层表示当前函数（getinfo 自身）； 1 层表示调用 getinfo 的函数 （除非是尾调用，这种情况不计入栈）；等等。 如果 f 是一个比活动函数数量还大的数字， getinfo 返回 nil。

* debug.getlocal ([thread,] f, local)

此函数返回在栈的 f 层处函数的索引为 local 的局部变量的名字和值。这个函数不仅用于访问显式定义的局部变量，也包括形参、临时变量等。

* getmetatable(value)

把给定索引指向的值的元表压入堆栈。如果索引无效，或是这个值没有元表，函数将返回 0 并且不会向栈上压任何东西。

* getregistry()

返回注册表表，这是一个预定义出来的表， 可以用来保存任何 C 代码想保存的 Lua 值。

* getupvalue (f, up)

此函数返回函数 f 的第 up 个上值的名字和值。 如果该函数没有那个上值，返回 nil 。以 '(' （开括号）打头的变量名表示没有名字的变量 （去除了调试信息的代码块）。

* sethook ([thread,] hook, mask [, count])

将一个函数作为钩子函数设入。 字符串 mask 以及数字 count 决定了钩子将在何时调用。 掩码是由下列字符组合成的字符串，每个字符有其含义：

* 'c'：每当 Lua 调用一个函数时，调用钩子；
* 'r'：每当 Lua 从一个函数内返回时，调用钩子；
* 'l'：每当 Lua 进入新的一行时，调用钩子。

* setlocal ([thread,] level, local, value)

这个函数将 value 赋给栈上第 level 层函数的第 local 个局部变量。 如果没有那个变量，函数返回 nil 。 如果 level 越界，抛出一个错误。

* setmetatable (value, table)

将 value 的元表设为 table （可以是 nil）， 返回 value。

* setupvalue (f, up, value)

这个函数将 value 设为函数 f 的第 up 个上值。 如果函数没有那个上值，返回 nil 否则，返回该上值的名字。

* traceback ([thread,] [message [, level]])

如果 message 有，且不是字符串或 nil， 函数不做任何处理直接返回 message。 否则，它返回调用栈的栈回溯信息。 字符串可选项 message 被添加在栈回溯信息的开头。 数字可选项 level 指明从栈的哪一层开始回溯 （默认为 1 ，即调用 traceback 的那里）。

上表列出了我们常用的调试函数，接下来我们可以看些简单的例子：

~~~lua
function myfunction()
	print(debug.traceback("Stack trace"))
	print(debug.getinfo(1))
	print("Stack trace end")
	return 10
end

myfunction ()
print(debug.getinfo(1))
~~~

1、另一个实例

我们经常需要调试函数内的局部变量，我们可以使用 getupvalue 函数来设置这些局部变量。实例如下：

~~~lua
function newCounter()
	local n = 0
	local k = 0
	return function()
		k = n
		n = n + 1
		return n
	end
end

counter = newCounter()
print(counter())
print(counter())

local i = 1

repeat
	name, val = debug.getupvalue(counter, i)
	if name then
		print ("index", i, name, "=", val)
		if(name == "n") then
			debug.setupvalue (counter,2,10)
		end
		i = i + 1
	end -- if
until not name

print(counter())
~~~

在以上实例中，计数器在每次调用时都会自增1。实例中我们使用了 getupvalue 函数查看局部变量的当前状态，我们可以设置局部变量为新值。实例中，在设置前 n 的值为 2，使用 setupvalue 函数将其设置为 10。现在我们调用函数，执行后输出为 11 而不是 3。

2、调试类型

* 命令行调试
* 图形界面调试

命令行调试器有：RemDebug、clidebugger、ctrace、xdbLua、LuaInterface - Debugger、Rldb、ModDebug。图形界调试器有：SciTE、Decoda、ZeroBrane Studio、akdebugger、luaedit。



<br/><br/><br/>

---

