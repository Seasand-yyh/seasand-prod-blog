# SQL Server 开发技巧汇总-使用Convert函数进行日期转换

---

1、概念

CONVERT() 函数是把日期转换为新数据类型的通用函数，可以用不同的格式显示日期/时间数据。一般存入数据库中的时间格式为`yyyy-mm-dd hh:mm:ss`， 如果要转换为`yyyy-mm-dd`短日期格式，就可以使用CONVERT() 函数。

2、语法

~~~plaintext
CONVERT(data_type(length),data_to_be_converted,style)
~~~

* data_type(length) 规定目标数据类型（带有可选的长度）。
* data_to_be_converted 含有需要转换的值。
* style 规定日期/时间的输出格式。

可以使用的 style 值：

| Style ID    | Style 格式                            | 备注                |
| ----------- | ------------------------------------- | ------------------- |
| 100 或者 0  | mon dd yyyy hh:miAM （或者 PM）       | 默认值              |
| 101         | mm/dd/yy                              | 美国                |
| 102         | yy.mm.dd                              | ANSI                |
| 103         | dd/mm/yy                              | 英国/法国           |
| 104         | dd.mm.yy                              | 德国                |
| 105         | dd-mm-yy                              | 意大利              |
| 106         | dd mon yy                             |                     |
| 107         | Mon dd, yy                            |                     |
| 108         | hh:mm:ss                              |                     |
| 109 或者 9  | mon dd yyyy hh:mi:ss:mmmAM（或者 PM） | 默认值 + 毫秒       |
| 110         | mm-dd-yy                              | 美国                |
| 111         | yy/mm/dd                              | 日本                |
| 112         | yymmdd                                | ISO                 |
| 113 或者 13 | dd mon yyyy hh:mm:ss:mmm(24h)         | 欧洲默认值 + 毫秒   |
| 114         | hh:mi:ss:mmm(24h)                     |                     |
| 120 或者 20 | yyyy-mm-dd hh:mi:ss(24h)              | ODBC 规范           |
| 121 或者 21 | yyyy-mm-dd hh:mi:ss.mmm(24h)          | ODBC 规范（带毫秒） |
| 126         | yyyy-mm-ddThh:mm:ss.mmm（没有空格）   | ISO8601             |
| 130         | dd mon yyyy hh:mi:ss:mmmAM            | 科威特              |
| 131         | dd/mm/yy hh:mi:ss:mmmAM               | 科威特              |

3、示例

~~~plaintext
CONVERT(VARCHAR(19),GETDATE()) //Dec 29 2008 11:45 PM
CONVERT(VARCHAR(10),GETDATE(),110) //12-29-2008
CONVERT(VARCHAR(11),GETDATE(),106) //29 Dec 08
CONVERT(VARCHAR(24),GETDATE(),113) //29 Dec 2008 16:25:46.635

SELECT CONVERT(varchar(100), GETDATE(), 0): 05 16 2006 10:57AM
SELECT CONVERT(varchar(100), GETDATE(), 1): 05/16/06
SELECT CONVERT(varchar(100), GETDATE(), 2): 06.05.16
SELECT CONVERT(varchar(100), GETDATE(), 3): 16/05/06
SELECT CONVERT(varchar(100), GETDATE(), 4): 16.05.06
SELECT CONVERT(varchar(100), GETDATE(), 5): 16-05-06
SELECT CONVERT(varchar(100), GETDATE(), 6): 16 05 06
SELECT CONVERT(varchar(100), GETDATE(), 7): 05 16, 06
SELECT CONVERT(varchar(100), GETDATE(), 8): 10:57:46
SELECT CONVERT(varchar(100), GETDATE(), 9): 05 16 2006 10:57:46:827AM
SELECT CONVERT(varchar(100), GETDATE(), 10): 05-16-06
SELECT CONVERT(varchar(100), GETDATE(), 11): 06/05/16
SELECT CONVERT(varchar(100), GETDATE(), 12): 060516
SELECT CONVERT(varchar(100), GETDATE(), 13): 16 05 2006 10:57:46:937
SELECT CONVERT(varchar(100), GETDATE(), 14): 10:57:46:967
SELECT CONVERT(varchar(100), GETDATE(), 20): 2006-05-16 10:57:47
SELECT CONVERT(varchar(100), GETDATE(), 21): 2006-05-16 10:57:47.157
SELECT CONVERT(varchar(100), GETDATE(), 22): 05/16/06 10:57:47 AM
SELECT CONVERT(varchar(100), GETDATE(), 23): 2006-05-16
SELECT CONVERT(varchar(100), GETDATE(), 24): 10:57:47
SELECT CONVERT(varchar(100), GETDATE(), 25): 2006-05-16 10:57:47.250

SELECT CONVERT(varchar(100), GETDATE(), 100): 05 16 2006 10:57AM
SELECT CONVERT(varchar(100), GETDATE(), 101): 05/16/2006
SELECT CONVERT(varchar(100), GETDATE(), 102): 2006.05.16
SELECT CONVERT(varchar(100), GETDATE(), 103): 16/05/2006
SELECT CONVERT(varchar(100), GETDATE(), 104): 16.05.2006
SELECT CONVERT(varchar(100), GETDATE(), 105): 16-05-2006
SELECT CONVERT(varchar(100), GETDATE(), 106): 16 05 2006
SELECT CONVERT(varchar(100), GETDATE(), 107): 05 16, 2006
SELECT CONVERT(varchar(100), GETDATE(), 108): 10:57:49
SELECT CONVERT(varchar(100), GETDATE(), 109): 05 16 2006 10:57:49:437AM
SELECT CONVERT(varchar(100), GETDATE(), 110): 05-16-2006
SELECT CONVERT(varchar(100), GETDATE(), 111): 2006/05/16
SELECT CONVERT(varchar(100), GETDATE(), 112): 20060516
SELECT CONVERT(varchar(100), GETDATE(), 113): 16 05 2006 10:57:49:513
SELECT CONVERT(varchar(100), GETDATE(), 114): 10:57:49:547
SELECT CONVERT(varchar(100), GETDATE(), 120): 2006-05-16 10:57:49
SELECT CONVERT(varchar(100), GETDATE(), 121): 2006
SELECT CONVERT(varchar(100), GETDATE(), 126): 2006-05-16T10:57:49.827
SELECT CONVERT(varchar(100), GETDATE(), 130): 18 04 1427 10:57:49:907AM
SELECT CONVERT(varchar(100), GETDATE(), 131): 18/04/1427 10:57:49:920AM
~~~



<br/><br/><br/>

---

