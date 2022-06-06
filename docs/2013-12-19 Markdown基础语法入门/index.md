# Markdown基础语法入门

---

### 标题

形式一：

~~~markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
~~~

> # 一级标题
>
> ## 二级标题
>
> ### 三级标题
>
> #### 四级标题
>
> ##### 五级标题
>
> ###### 六级标题

### 字体设置

~~~markdown
_斜体_
*斜体*
**粗体**
***斜体加粗***
~~中划线~~
<u>下划线</u>
~~~

_斜体_

*斜体*

**粗体**

***斜体加粗***

~~中划线~~

<u>下划线</u>

### 链接

1、行内式：

~~~markdown
[百度](https://www.baidu.com/)
~~~

[百度](https://www.baidu.com/)

2、参考式：

~~~markdown
[百度](1)
[百度一下](2)

[1]: https://www.baidu.com/
[2]: https://www.baidu.com/	"百度一下，你就知道"
~~~

[百度](1)

[百度一下](2)

[1]:https://www.baidu.com/
[2]:https://www.baidu.com/ "百度一下，你就知道"

3、使用`<`和`>` 包起来的内容会显示为链接，或者直接书写URL地址也会显示为链接

~~~markdown
<https://www.baidu.com/> 或 https://www.baidu.com/
~~~

<https://www.baidu.com/> 或 https://www.baidu.com/

### 图片

1、本地图片

~~~markdown
![这是一张图片，来自本地文件](images/1550127510862.png)
~~~

![这是一张图片，来自本地文件](images/1550127510862.png)

2、网络图片

~~~markdown
![这是一张图片，来自网络](https://www.baidu.com/img/xinshouye_f097208390e839e5b5295804227d94e9.png)
~~~

![这是一张图片，来自网络](https://www.baidu.com/img/xinshouye_f097208390e839e5b5295804227d94e9.png)

### 分割线

~~~markdown
---
***
___
~~~

1、

---

2、

***

3、

___

### 代码块

1、行内形式：

~~~markdown
这是一个示例代码：`int a = 1; int b = 2; int c = a + b;`
~~~

这是一个示例代码：`int a = 1; int b = 2; int c = a + b;`

2、多行形式：

~~~markdown
```
var a = 1;
var b = 2;
console.log(a + b);
```
~~~

~~~javascript
var a = 1;
var b = 2;
console.log(a + b);
~~~

### 引用

```markdown
> 这是被引用的内容

> 这是被引用的内容1
  > 这是被引用的内容2
    > 这是被引用的内容3
```

>  这是被引用的内容

嵌套引用：

> 这是被引用的内容1
>
> > 这是被引用的内容2
> >
> > > 这是被引用的内容3

### 列表

```markdown
1、无序列表
* 列表项目
* 列表项目
* 列表项目

+ 列表项目
+ 列表项目
+ 列表项目

- 列表项目
- 列表项目
- 列表项目

2、有序列表
1. AAA
2. BBB
3. CCC
4. DDD
```

1、无序列表

* 列表项目
* 列表项目
* 列表项目

+ 列表项目
+ 列表项目
+ 列表项目

- 列表项目
- 列表项目
- 列表项目

2、有序列表

1. AAA
2. BBB
3. CCC
4. DDD

### 表格

~~~markdown
| 序号 | 标题 | 内容          |
| ---- | ---- | ------------- |
| 1    | aa   | aaaaaaaaaaaa  |
| 2    | bb   | bbbbbbbbbbbb  |
| 3    | cc   | ccccccccccccc |
~~~

| 序号 | 标题 | 内容          |
| ---- | ---- | ------------- |
| 1    | aa   | aaaaaaaaaaaa  |
| 2    | bb   | bbbbbbbbbbbb  |
| 3    | cc   | ccccccccccccc |

### 换行

~~~markdown
1、这是一段文字，在这里换行。{2个以上空格+回车}换行后的内容从这里开始。

2、这是一段文字，在这里换行。<br/>换行后的内容从这里开始。
~~~

1、这是一段文字，在这里换行。  

换行后的内容从这里开始。

2、这是一段文字，在这里换行。<br/>换行后的内容从这里开始。

### 转义字符

~~~markdown
\\
\*
\#
\+
\-
\_
\.
\!
\(\)
\[\]
\{\}
~~~

\\

\*

\#

\+

\-

\_

\.

\!

\(\)

\[\]

\{\}

### 实体字符

~~~markdown
&#10084;
&#10003;
&#9728;
&#9733;
&#9730;
&#9775;
&#9762;
&#9742;
&#8734;
&#10052;
&#9835;
~~~

&#10084;

&#10003;

&#9728;

&#9733;

&#9730;

&#9775;

&#9762;

&#9742;

&#8734;

&#10052;

&#9835;

更多实体字符，查看[这里](https://unicode-table.com/cn/)

### 锚点

点击[这里](#131)跳转

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是跳转过来看到的内容{#131}

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

这是一段文字

~~~markdown
点击[这里](#131)跳转
这是跳转过来看到的内容{#131}
~~~

### 注脚

~~~markdown
使用Markdown[^1]可以高效率地书写文档，并且可以直接转换成HTML[^2]。

[^1]: Markdown是一种纯文本标记语言。
[^2]: HyperText Markup Language 超文本标记语言。 
~~~

使用Markdown[^1]可以高效率地书写文档，并且可以直接转换成HTML[^2]。

[^1]: Markdown是一种纯文本标记语言。
[^2]: HyperText Markup Language 超文本标记语言。 

### emoji表情符号

~~~markdown
:smile:
:smiley:
:smirk:
:worried:
:expressionless:
~~~

:smile:

:smiley:

:smirk:

:worried:

:expressionless:

更多符号，查看[这里](https://www.webpagefx.com/tools/emoji-cheat-sheet/)



<br/><br/><br/>

---

