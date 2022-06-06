# GitBook基础教程

---

GitBook是一个基于Node.js的命令行工具，支持Markdown和AsciiDoc两种语法格式，可以输出HTML、PDF、eBook等格式的电子书。

### 1、安装GitBook

GitBook是基于Node.js的，应先搭建好Node.js环境，然后再使用npm进行安装：

~~~plaintext
npm install -g gitbook-cli
~~~

安装完成后，即可使用gitbook命令。

* 获取帮助

~~~plaintext
gitbook -h
gitbook --help
~~~

* 查看当前版本

~~~plaintext
gitbook -V
gitbook --version
~~~

* 列出本地已安装可用的版本

~~~plaintext
gitbook ls
~~~

* 列出远程可下载的版本

~~~plaintext
gitbook ls-remote
~~~

* 下载安装指定版本

~~~plaintext
gitbook fetch 版本号/标签
~~~

* 更新到最新版本

~~~plaintext
gitbook update
~~~

* 当前版本

~~~plaintext
gitbook current
~~~

* 卸载

~~~plaintext
gitbook uninstall 版本号
~~~

* 使用指定版本的gitbook

~~~plaintext
gitbook -v 版本号
gitbook --gitbook 版本号
~~~

* 启用调试模式

~~~plaintext
gitbook -d
gitbook --debug
~~~

* 列出所有命令

~~~plaintext
gitbook help
~~~

### 2、使用GitBook创建书籍

* 初始化

~~~plaintext
gitbook init
~~~

执行该命令，gitbook会查找SUMMARY.md文件中描述的目录和文件，如果没有则会将其创建。如果要将书籍创建到一个新目录中，可以指定目录名：

~~~plaintext
gitbook init 目录名
gitbook init ./mybook
~~~

* 构建

~~~plaintext
gitbook build
~~~

构建完毕，会在项目目录下生成一个`_book`目录，里面的内容为静态站点的资源文件。也可以手动指定输出目录：

~~~plaintext
gitbook build 书籍路径 输出路径
gitbook build ./ ./dist
~~~

使用指定版本gitbook构建：

~~~plaintext
gitbook build --gitbook=2.0.1
~~~

构建过程还可以查看构建日志，并指定log级别：

~~~plaintext
gitbook build ./ --log=debug --debug
~~~

* 预览

~~~plaintext
gitbook serve
~~~

该命令会运行一个web服务, 默认端口为4000，通过 `http://localhost:4000/` 可以预览书籍。也可以指定端口号：

~~~plaintext
gitbook serve --port 端口号
gitbook serve --port 8888
~~~

* 输出

需要安装ebook-convert插件。

生成 PDF 格式的电子书：

~~~plaintext
gitbook pdf ./ ./mybook.pdf
~~~

生成 epub 格式的电子书：

~~~plaintext
gitbook epub ./ ./mybook.epub
~~~

生成 mobi 格式的电子书：

~~~plaintext
gitbook mobi ./ ./mybook.mobi
~~~

### 3、GitBook项目结构

一个基本的GitBook项目结构如下：

~~~plaintext
.
├── book.json
├── README.md
├── SUMMARY.md
├── chapter-1/
|   ├── README.md
|   └── something.md
└── chapter-2/
    ├── README.md
    └── something.md
~~~

结构分析：

* book.json： 配置数据
* README.md：前言或简介
* SUMMARY.md：目录
* GLOSSARY.md：词汇/注释术语列表

**SUMMARY.md：**

SUMMARY.md文件用来定义书籍的章节和子章节的结构，以及用于生成书籍的目录结构。它的格式是一个链接列表，链接的标题将作为章节的标题，链接的目标是该章节文件的路径。向父章节添加嵌套列表将创建子章节。

~~~markdown
# Summary
 
* [Part I](part1/README.md)
    * [Writing is nice](part1/writing.md)
    * [GitBook is nice](part1/gitbook.md)
* [Part II](part2/README.md)
    * [We love feedback](part2/feedback_please.md)
    * [Better tools for authors](part2/better_tools.md)
~~~

章节列表链接可以使用锚点以跳到书籍指定部位。章节之间也可以添加水平分割线。

**GLOSSARY.md：**

GLOSSARY.md文件用于指定要显示为注释的术语及其各自的定义。根据这些术语，GitBook 将自动构建索引并突出显示这些术语。其格式是 `h2` 标题的列表，以及描述段落：

~~~markdown
## Term
Definition for this term
 
## Another term
With it's definition, this can contain bold text
and all other kinds of inline markup ...
~~~

**book.json：**

book.json文件可通过灵活的配置来自定义书籍。

~~~javascript
{
    "author": "Seasand-yyh",
    "title": "Gitbook使用教程",
    "description": "Gitbook使用教程",
    "isbn": "",
    "root": "./docs",
    "direction": "ltr",
    "gitbook": ">=3.0.0",
    "language": "zh-hans",
    "structure": {
        "readme": "README.md",
        "summary": "SUMMARY.md",
        "glossary": "GLOSSARY.md",
        "languages": "LANGS.md"
    },
    "links": {
        "sidebar": {
            "Home": "https://github.com/"
        }
    },
    "styles": {
        "website": "styles/website.css",
        "ebook": "styles/ebook.css",
        "pdf": "styles/pdf.css",
        "mobi": "styles/mobi.css",
        "epub": "styles/epub.css"
    },
    "plugins": ["-search", "splitter"],
    "pdf": {
        "pageNumbers": true,
        "fontFamily": "Arial",
        "fontSize": 12,
        "paperSize": "a4",
        "margin": {
          "right": 62,
          "left": 62,
          "top": 56,
          "bottom": 56
        }
    }
}
~~~

* author：作者名。在GitBook.com上，这个字段是预填的。
* title：书名，默认值是从 README 中提取出来的。在 GitBook.com 上，这个字段是预填的。
* description：书籍的描述，默认值是从 README 中提取出来的。在 GitBook.com 上，这个字段是预填的。
* isbn：国际标准书号 ISBN。
* root：包含所有图书文件的根文件夹的路径，除了 `book.json`。
  对于软件项目，可以使用子目录（如 `docs/` ）来存储项目文档的图书。配置根选项来指示GitBook 可以找到该图书文件的文件夹。如：

~~~plaintext
.
├── book.json
└── docs/
├── README.md
└── SUMMARY.md
~~~

在 `book.json` 中配置以下内容：

~~~javascript
"root": "./docs"
~~~

* structure：指定Readme、Summary、Glossary 和 Languages 等的路径。

可以指定 Readme，Summary，Glossary 和 Languages 的名称（而不是使用默认名称，如README.md）。这些文件必须在项目的根目录下（或 `root` 的根目录，如果你在 `book.json` 中配置了 `root` 属性）。

~~~javascript
"structure": {
    "readme": "README.md",
    "summary": "SUMMARY.md",
    "glossary": "GLOSSARY.md",
    "languages": "LANGS.md"
}
~~~

(注：以上配置为默认值)

* direction：文本阅读顺序。可以是 `rtl` （从右向左）或 `ltr` （从左向右），默认值依赖于 `language` 的值。
* gitbook：使用的GitBook版本。使用 [SemVer](http://semver.org/) 规范，并接受类似于 `"> = 3.0.0"` 的条件。

~~~javascript
"gitbook" : "3.0.0",
"gitbook" : ">=3.0.0"
~~~

* language：语言类型，默认值是`en`。

~~~plaintext
en, ar, bn, cs, de, en, es, fa, fi, fr, he, it, ja, ko, no, pl, pt, ro, ru, sv, uk, vi, zh-hans, zh-tw
~~~

* links：在左侧导航栏添加链接信息。

~~~javascript
"links": {
    "sidebar": {
    	"Home": "https://github.com/"
    }
}
~~~

* styles：自定义页面样式， 默认情况下各generator对应的css文件如下：

~~~javascript
"styles": {
    "website": "styles/website.css",
    "ebook": "styles/ebook.css",
    "pdf": "styles/pdf.css",
    "mobi": "styles/mobi.css",
    "epub": "styles/epub.css"
}
~~~

* plugins：插件列表。
* pluginsConfig：插件的配置。

~~~javascript
"plugins": ["expandable-chapters", "splitter", "back-to-top-button"]
~~~

以上插件分别为：左侧列表折叠插件、左侧分割线可调整插件、回到顶部按钮插件。配置的插件需要先安装才能使用：

~~~plaintext
gitbook install
~~~

GitBook默认提供了5个插件：`highlight`、`search`、`sharing`、`livereload`、`font-settings`。若想去除某个插件，可配置如下：

~~~javascript
"plugins": ["-sharing", "-livereload"]
~~~

* pdf：定制PDF输出。

* pdf.pageNumbers：将页码添加到每个页面的底部（默认为 true）。
* pdf.fontSize：基本字体大小（默认是 12）。
* pdf.fontFamily：基本字体样式（默认是 `Arial`）。
* pdf.paperSize：页面尺寸，选项有： `'a0', 'a1', 'a2', 'a3', 'a4', 'a5', 'a6', 'b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6', 'legal', 'letter'` （默认值是 `a4`）。
* pdf.margin.top：上边界（默认值是 56）。
* pdf.margin.bottom：下边界（默认值是 56）。
* pdf.margin.left：左边界（默认值是 62）。
* pdf.margin.right：右边界（默认值是 62）。

**忽略规则文件：**

静态文件是在 SUMMARY.md中未列出的文件，除非被忽略，否则所有静态文件都将复制到输出路径。GitBook将读取 `.gitignore`，`.bookignore` 和 `.ignore` 文件，以获取要过滤的文件和文件夹。这些文件中的格式遵循 `.gitignore` 的规则，如：

~~~plaintext
# This is a comment
 
# Ignore the file test.md
test.md
 
# Ignore everything in the directory "bin"
bin/*
~~~

> 附：常见插件

* [editlink](https://plugins.gitbook.com/plugin/editlink)：内容顶部显示`编辑本页`链接。
* [ad](https://plugins.gitbook.com/plugin/ad)：在每个页面顶部和底部添加广告或任何自定义内容。
* [splitter](https://plugins.gitbook.com/plugin/splitter)：在左侧目录和右侧内容之间添加一个可以拖拽的栏，用来调整两边的宽度。
* [image-captions](https://plugins.gitbook.com/plugin/image-captions)：抓取内容中图片的`alt` 或 `title` 属性，在图片下面显示标题。
* [github](https://plugins.gitbook.com/plugin/github)：在右上角显示 github 仓库的图标链接。
* [anchors](https://plugins.gitbook.com/plugin/anchors)：题带有 github 样式的锚点。
* [chart](https://plugins.gitbook.com/plugin/chart)：使用 C3.js 图表。
* [styles-sass](https://plugins.gitbook.com/plugin/styles-sass)：使用 SASS 替换 CSS。
* [styles-less](https://plugins.gitbook.com/plugin/styles-less)：使用 LESS 替换 CSS。
* [ga](https://plugins.gitbook.com/plugin/ga)：添加 Google 统计代码。
* [disqus](https://plugins.gitbook.com/plugin/disqus)：添加 disqus 评论插件。
* [sitemap](https://plugins.gitbook.com/plugin/sitemap)：生成站点地图。
* [latex-codecogs](https://plugins.gitbook.com/plugin/latex-codecogs)：使用数学方程式。
* [mermaid](https://plugins.gitbook.com/plugin/mermaid)：使用流程图。
* [book-summary-scroll-position-saver](https://plugins.gitbook.com/plugin/book-summary-scroll-position-saver)：自动保存左侧目录区域导航条的位置。
* [sharing](https://plugins.gitbook.com/plugin/sharing)：默认的分享插件。
* [fontsettings](https://plugins.gitbook.com/plugin/fontsettings)：默认的字体、字号、颜色设置插件。
* [search](https://plugins.gitbook.com/plugin/search)：默认搜索插件。
* [tbfed-pagefooter](https://plugins.gitbook.com/plugin/tbfed-pagefooter)：自定义页脚，显示版权和最后修订时间。
* [prism](https://plugins.gitbook.com/plugin/prism)：基于[Prism](http://prismjs.com/)的代码高亮。
* [atoc](https://plugins.gitbook.com/plugin/atoc)：插入 TOC 目录。
* [ace](https://plugins.gitbook.com/plugin/ace)：插入代码高亮编辑器。
* [highlight](https://plugins.gitbook.com/plugin/highlight)：默认的代码高亮插件，通常会使用 prism 来替换。
* [github-buttons](https://plugins.gitbook.com/plugin/github-buttons)：显示 github 仓库的 star 和 fork 按钮。
* [sectionx](https://plugins.gitbook.com/plugin/sectionx)：分离各个段落，并提供一个展开收起的按钮。
* [mcqx](https://plugins.gitbook.com/plugin/mcqx)：使用选择题。
* [include-codeblock](https://plugins.gitbook.com/plugin/include-codeblock)：通过引用文件插入代码。
* [fbqx](https://plugins.gitbook.com/plugin/fbqx)：使用填空题。
* [spoiler](https://plugins.gitbook.com/plugin/spoiler)：隐藏答案，当鼠标划过时才显示。
* [anchor-navigation](https://plugins.gitbook.com/plugin/anchor-navigation)：锚点导航。
* [youtubex](https://plugins.gitbook.com/plugin/youtubex)：插入 YouTube 视频。
* [redirect](https://plugins.gitbook.com/plugin/redirect)：页面跳转。
* [expandable-chapters](https://plugins.gitbook.com/plugin/expandable-chapters)：收起或展开章节目录中的父节点。
* [baidu](https://plugins.gitbook.com/plugin/baidu)：使用百度统计。
* [duoshuo](https://plugins.gitbook.com/plugin/duoshuo)：使用多说评论。
* [jsfiddle](https://plugins.gitbook.com/plugin/jsfiddle)：插入 JSFiddle 组件。
* [jsbin](https://plugins.gitbook.com/plugin/jsbin)：插入 JSBin 组件。

### 参考链接：

* [npm gitbook](https://www.npmjs.com/package/gitbook)
* [gitbook使用教程](https://blog.csdn.net/liudongdong19/article/details/80034835)



<br/><br/><br/>

---

