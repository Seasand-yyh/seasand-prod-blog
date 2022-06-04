# JavaScript 语言入门教程

作者：[阮一峰](http://www.ruanyifeng.com)

## 目录

[前言](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/README)
1. 入门篇
	1. [导论](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/basic/introduction)
	1. [历史](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/basic/history)
	1. [基本语法](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/basic/grammar)
1. 数据类型
	1. [概述](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/types/general)
	1. [null，undefined 和布尔值](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/types/null-undefined-boolean)
	1. [数值](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/types/number)
	1. [字符串](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/types/string)
	1. [对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/types/object)
	1. [函数](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/types/function)
	1. [数组](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/types/array)
1. 运算符
	1. [算术运算符](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/operators/arithmetic)
	1. [比较运算符](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/operators/comparison)
	1. [布尔运算符](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/operators/boolean)
	1. [二进制位运算符](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/operators/bit)
	1. [其他运算符，运算顺序](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/operators/priority)
1. 语法专题
	1. [数据类型的转换](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/features/conversion)
	1. [错误处理机制](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/features/error)
	1. [编程风格](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/features/style)
	1. [console对象与控制台](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/features/console)
1. 标准库
	1. [Object 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/object)
	1. [属性描述对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/attributes)
	1. [Array 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/array)
	1. [包装对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/wrapper)
	1. [Boolean 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/boolean)
	1. [Number 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/number)
	1. [String 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/string)
	1. [Math 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/math)
	1. [Date 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/date)
	1. [RegExp 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/regexp)
	1. [JSON 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/stdlib/json)
1. 面向对象编程
	1. [实例对象与 new 命令](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/oop/new)
	1. [this 关键字](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/oop/this)
	1. [对象的继承](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/oop/prototype)
	1. [Object 对象的相关方法](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/oop/object)
	1. [严格模式](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/oop/strict)
1. 异步操作
	1. [概述](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/async/general)
	1. [定时器](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/async/timer)
	1. [Promise 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/async/promise)
1. DOM
	1. [概述](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/general)
	1. [Node 接口](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/node)
	1. [NodeList 接口，HTMLCollection 接口](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/nodelist)
	1. [ParentNode 接口，ChildNode 接口](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/parentnode)
	1. [Document 节点](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/document)
	1. [Element 节点](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/element)
	1. [属性的操作](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/attributes)
	1. [Text 节点和 DocumentFragment 节点](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/text)
	1. [CSS 操作](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/css)
	1. [Mutation Observer API](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/dom/mutationobserver)
1. 事件
	1. [EventTarget 接口](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/eventtarget)
	1. [事件模型](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/model)
	1. [Event 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/event)
	1. [鼠标事件](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/mouse)
	1. [键盘事件](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/keyboard)
	1. [进度事件](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/progress)
	1. [表单事件](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/form)
	1. [触摸事件](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/touch)
	1. [拖拉事件](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/drag)
	1. [其他常见事件](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/common)
	1. [GlobalEventHandlers 接口](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/events/globaleventhandlers)
1. 浏览器模型
	1. [浏览器模型概述](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/engine)
	1. [window 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/window)
	1. [Navigator 对象，Screen 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/navigator)
	1. [Cookie](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/cookie)
	1. [XMLHttpRequest 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/xmlhttprequest)
	1. [同源限制](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/same-origin)
	1. [CORS 通信](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/cors)
	1. [Storage 接口](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/storage)
	1. [History 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/history)
	1. [Location 对象，URL 对象，URLSearchParams 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/location)
	1. [ArrayBuffer 对象，Blob 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/arraybuffer)
	1. [File 对象，FileList 对象，FileReader 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/file)
	1. [表单，FormData 对象](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/form)
	1. [IndexedDB API](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/indexeddb)
	1. [Web Worker](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/bom/webworker)
1. 附录：网页元素接口
	1. [a](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/elements/a)
	1. [img](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/elements/image)
	1. [form](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/elements/form)
	1. [input](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/elements/input)
	1. [button](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/elements/button)
	1. [option](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/elements/option)
	1. [video，audio](#docs/2015-03-12 JavaScript语言入门教程-阮一峰/docs/elements/video)



<br/><br/><br/>

---

