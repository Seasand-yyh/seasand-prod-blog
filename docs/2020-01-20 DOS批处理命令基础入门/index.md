# DOS批处理命令基础入门

---

### DOS基础命令

##### help

~~~plaintext
# 列出系统支持的所有命令
help

# 查看指定命令用法
help dir
# 或者
dir /?
~~~

##### cmd

~~~plaintext
# 启动一个新的CMD实例
cmd
~~~

##### start

~~~plaintext
# 打开一个新的命令窗口执行指定命令
start
start www.baidu.com
~~~

##### exit

~~~plaintext
# 退出命令窗口
exit
~~~

##### cls

~~~plaintext
# 清屏
cls
~~~

##### ver

~~~plaintext
# 查看系统版本
ver
~~~

##### systeminfo

~~~plaintext
# 查看系统信息
systeminfo
~~~

##### color

~~~plaintext
# 指定控制台输出的颜色属性(分别指定背景色、前景色)
color 0F
~~~

##### mode

~~~plaintext
# 显示模式:MODE CON[:] [COLS=c] [LINES=n]
# 设置命令窗口大小
mode con:cols=100 lines=60
~~~

##### title

~~~plaintext
# 设置命令窗口标题
title hello world
~~~

##### tree

~~~plaintext
# 以树状形式显示目录
tree
tree c:\Users
~~~

##### dir

~~~plaintext
# 列出目录下的文件和子目录
dir
dir c:\Users
~~~

##### cd

~~~plaintext
# change directory
cd c:\Users
cd ..
~~~

##### md

~~~plaintext
# 创建目录
md demo
mkdir demo
~~~

##### rd

~~~plaintext
# 删除目录
rd demo
rmdir demo
~~~

##### attrib

~~~plaintext
# 查看或设置文件的属性
attrib
# 只读
attrib +R demo.txt
attrib -R demo.txt
# 隐藏
attrib +H demo.txt
attrib -H demo.txt
~~~

##### type

~~~plaintext
# 查看文件内容
type demo.txt
~~~

##### copy

~~~plaintext
# 复制文件
copy demo.txt tmp\demo2.txt
~~~

##### move

~~~plaintext
# 移动文件或目录
move demo.txt tmp
~~~

##### ren

~~~plaintext
# 重命名文件
ren foo.txt bar.txt
rename foo.txt bar.txt
~~~

##### replace

~~~plaintext
# 替换文件
replace foo.txt bar.txt
~~~

##### del

~~~plaintext
# 删除文件
del demo.txt
# 删除tmp目录下所有文件，只删文件
del tmp
~~~

##### find

~~~plaintext
# 查找内容
find "hello" demo.txt
# 忽略大小写
find /i "hello" demo.txt
# 显示行号
find /n "hello" demo.txt
# 反向查找，显示不包含此内容的行
find /v "hello" demo.txt
~~~

##### date

~~~plaintext
# 查看或设置日期
date
~~~

##### time

~~~plaintext
# 查看或设置时间
time
~~~

##### shutdown

~~~plaintext
# 关机，指定60秒（默认30秒）
shutdown /s /t 60
# 重启
shutdown /r
# 休眠
shutdown /h
# 注销
shutdown /l
# 取消关机
shutdown /a
~~~

##### format

~~~plaintext
# 格式化
format d:
~~~

##### tasklist、taskkill

~~~plaintext
# 查看应用进程列表
tasklist
tasklist | find "tomcat"
# 关闭进程
taskkill /f /pid 2143
taskkill /f /im notepad.exe
~~~

### 网络相关命令

##### ping

~~~plaintext
# ping
ping 127.0.0.1
# 不间断
ping -t www.baidu.com
# 指定发送的字节数
ping -l 64 www.baidu.com
# 指定发送次数
ping -n 3 www.baidu.com
~~~

##### ipconfig

~~~plaintext
# 查看网络配置
ipconfig
ipconfig /all
~~~

##### nslookup

~~~plaintext
# 解析域名
nslookup www.baidu.com
~~~

##### net share

~~~plaintext
# 查看共享
net share
# 共享C盘
net share c$=c:
# 将远程主机C盘映射到本地H盘
net use H: \\192.168.1.100\C
~~~

##### net start/stop

~~~plaintext
net start mysql
net stop mysql
~~~

##### netstat

~~~plaintext
# 查看端⼝的⽹络连接情况
netstat -n
netstat -ano
# 查看正在进⾏的⼯作
netstat -v
# 查看某协议使⽤情况
netstat -p <协议名>
# 例：查看tcp/ip协议使⽤情况
netstat -p tcp/ip
# 查看正在使⽤的所有协议使⽤情况
netstat -s
# 若对⽅136到139其中⼀个端⼝开了的话，就可查看对⽅最近登陆的⽤户名（03前的为⽤户名）,注意：参数-A要⼤写
netstat -A <ip>
~~~

##### net user

~~~plaintext
# 查看本地的⽤户列表
net user
# 增加⼀个⽤户
net user <⽤户名> <密码> /add
# 增加⼀个密码为空的⽤户
net user <⽤户名> /add
# 或
net user <⽤户名> "" /add
# 删除某个⽤户名
net user <⽤户名> /del
# 设置某个⽤户的状态为启⽤/禁⽤
net user <⽤户名> /active:yes/no
~~~

##### net localgroup

~~~plaintext
# 查看管理员组⾥的⽤户(即权限为管理员的⽤户)
net localgroup administrators
# 把某个⽤户增加到管理员组⾥
net localgroup administrators <⽤户名> /add
# 从管理员组⾥删除某个⽤户
net localgroup administrators <⽤户名> /del

# 注意:
# 1.增加到某个组⾥的⽤户必须是已经被创建过的⽤户.
# 2.增加到的组必须为存在的组.
~~~

### 批处理

##### echo

~~~plaintext
@echo off
echo hello world
pause
~~~

~~~plaintext
# 输出内容
echo hello world
# 打开/关闭回显
echo on
echo off
# 使用echo off关闭回显，但是echo off这个命令本身还是会显示出来，需要使用特殊符号@使这一行不显示
@echo off
# @可以隐藏命令，只显示命令的执行结果，能够起到关闭回显的作用
@echo hello world
# 输出空行
echo,
echo;
echo+
echo\
echo/
# 暂停，避免命令行窗口一闪消失
pause
~~~

##### 特殊符号

~~~plaintext
# @：隐藏命令，显示执行结果
@echo hi
# &：连接多个命令
dir c: & dir d: & dir e:
# &&：与&相似，短路功能
dir cc: && dir d:
# ||：短路或
dir cc: || dir d:
# |：管道符
netstat -ano | find "java"
# >：输出重定向(覆盖)
dir c: > demo.txt
# >>：输出重定向(追加)
dir c: >> demo.txt
# ^：取消特殊符号的作用，相当于转义
echo ^> > demo.txt
# *：通配符，任意个字符
del c:\2022-05-*.log
# ?：通配符，任意一个字符
del c:\2022-0?.log
# ""：界定符号，通常⽤来引⽤有空格的⽬录
dir "c:\Documents and settings"
# :：标签定位符号，表示后⾯的内容是⼀个标签名
@echo off
:tag1
xxxxxx
...
goto tag1
# ,：某些时候可以当空格来使⽤
dir,c:\
# ;：当命令相同时，可以将不同⽬标⽤来隔离
dir c:\;d:\;e:\
# ::：注释
::this is a comment!
# %：变量引用
echo %1
~~~

##### 变量

~~~plaintext
# %0 %1 %2 %3 ...到%9，还有⼀个%*
# %0 命令本身
# %1 第1个参数
# %2 第2个参数
# %* 所有参数

# set定义变量并赋值
set a=hello world
echo %a%

# 接收输入值
set /p a=请输入：
echo %a%

# 进行数学运算
set /a x=1+1
set /a x=3-1
set /a x=(1+1)*(3-1)
set /a x=1+1,y=2+2,z=3+3
set /a x+=1
set /a x=1"&"1
set /a x=1"|"1
set /a x=1"^"1
set /a x=2"<<"3
set /a x=8">>"2

# 字符替换
set str=www.baidu.com
set str=%str:w=f%
echo %str%

# 字符截取
set str=www.baidu.com
set x=%str:~1,3%
echo %x%
set y=%str:~-5%
echo %y%
set z=%str:~0,-5%
echo %z%
~~~

##### IF

1、IF [NOT] ERRORLEVEL number command

~~~plaintext
@echo off
ipconfig
if errorlevel 1 goto a
if errorlevel 0 goto b
:a
echo result is a!
pause
exit
:b
echo result is b!
pause
~~~

2、IF [NOT] string1==string2 command

~~~plaintext
@echo off
set str1=hello
set str2=hello
if %str1% == %str2% echo equal!
pause
~~~

3、IF [NOT] EXIST filename command

~~~plaintext
@echo off
if exist demo.txt echo demo is exist
pause
~~~

4、if-else

~~~plaintext
@echo off
IF EXIST demo.txt (del demo.txt) ELSE (echo is not exist)!
pause
~~~

5、比较符号

EQU、NEQ、LSS、LEQ、GTR、GEQ

~~~plaintext
@echo off
set /p var=请输⼊⼀个数字：
if %var% gtr 5 if %var% lss 10 echo 这是⼀个⼤于5⼩于10的数!
pause
~~~

##### FOR

1、基础示例

基本格式：FOR %%variable IN (set) DO command [command-parameters]

~~~plaintext
@echo off
for %%a in (helloworld) do echo %%a
pause
~~~

%%a是个变量，命名规则是从小写a-小写z，和大写A-大写Z。

2、/D

基本格式：FOR /D %%variable IN (set) DO command [command-parameters]

~~~plaintext
@echo off
for /d %%a in (*) do echo %%a
pause

@echo off
for /d %%a in (?indows) do echo %%a
pause
~~~

3、/R

基本格式：FOR /R [drive:]path %%variable IN (set) DO command [command-parameters]

检查以 [drive:]path 为根的目录树，指向每个目录中的FOR 语句。如果在 /R 后没有指定目录，则使用当前目录。如果集(set)为⼀个单点(.)字符，则枚举该目录树。

~~~plaintext
@echo off
for /r %%a in (*.txt) do echo %%a
pause

@echo off
for /r c:\ %%a in (*.exe) do echo %%a
pause
~~~

4、/L

基本格式：FOR /L %%variable IN (start,step,end) DO command [command-parameters]

表示以增量形式从开始到结束的⼀个数字序列。因此，(1,1,5) 将产生序列 1 2 3 4 5，(5,-1,1) 将产生序列 5 4 3 2 1。

~~~plaintext
@echo off
for /l %%a in (1,1,5) do echo %%a
pause

@echo off
for /l %%a in (5,-1,1) do echo %%a
pause
~~~

5、/F

基本格式：FOR /F "ParsingKeywords" %%variable IN (FileNameSet) DO command [command-parameters]

ParsingKeywords代表的是下列这些选项参数：

* eol=c：指⼀个行注释字符的结尾(就⼀个)；
* skip=n：指在文件开始时忽略的行数；
* delims=xxx：指分隔符集。这个替换了空格和跳格键的默认分隔符集；
* tokens=x,y,m-n：指每行的哪⼀个符号被传递到每个迭代的 for 本身。这会导致额外变量名称的分配。m-n格式为⼀个范围，通过 nth 符号指定 mth。如果符号字符串中的最后⼀个字符是星号，那么额外的变量将在最后⼀个符号解析之后分配并接受⾏的保留文本；
* usebackq：指定新语法已在下类情况中使用：在作为命令执行⼀个后引号的字符串并且⼀个单
引号字符为文字字符串命令并允许在 filenameset中使用双引号扩起文件名称。

~~~plaintext
@echo off
for /f "eol=@ tokens=1 delims= " %%i in (a.txt) do echo %%i
pause
~~~

eol=@表示忽略以@符号开头的行，eol默认值是`；`。tokens=1表示取每一行的第一块，如果tokens=2则表示每一行的第二块...以此类推。delims则是划分块的关键字，此处以空格符来划分。

~~~plaintext
@echo off
for /f "eol=; tokens=1,2,3 delims= " %%a in (demo.txt) do echo %%a %%b %%c
pause
~~~

~~~plaintext
@echo off
for /f "skip=5 tokens=*" %%i in (demo.txt) do echo %%i
pause
~~~

~~~plaintext
@echo off
FOR /F "usebackq delims==" %%i IN (`set`) DO echo %%i
pause
~~~

6、变量增强

| 变量      | 说明                                     |
| --------- | ---------------------------------------- |
| %~I       | 删除任何引号(")，扩展 %I                 |
| %~fI      | 将 %I 扩展到⼀个完全合格的路径名         |
| %~dI      | 仅将 %I 扩展到⼀个驱动器号               |
| %~pI      | 仅将 %I 扩展到⼀个路径                   |
| %~nI      | 仅将 %I 扩展到⼀个文件名                 |
| %~xI      | 仅将 %I 扩展到⼀个文件扩展名             |
| %~sI      | 扩展的路径只含有短名                     |
| %~aI      | 将 %I 扩展到文件的文件属性               |
| %~tI      | 将 %I 扩展到文件的日期/时间              |
| %~zI      | 将 %I 扩展到文件的大小                   |
| %~$PATH:I | 查找列在路径环境变量的目录，并将 %I 扩展 |

~~~plaintext
@echo off
for /f "delims=" %%i in (demo.txt) do echo %%~i
pause

@echo off
for /f "delims==" %%i in ('dir /b') do echo %%~fi
pause

@echo off
for /f "delims==" %%i in ('dir /b') do echo %%~di
pause

@echo off
FOR /F "delims==" %%i IN ('dir /b') DO echo %%~pi
pause

@echo off
for /f "delims=" %%i in ('dir /b') do echo %%~si
pause

@echo off
FOR /F "delims==" %%i IN ("notepad.exe") DO echo %%~$PATH:i
pause
~~~

组合用法

| 变量        | 说明                                                         |
| ----------- | ------------------------------------------------------------ |
| %~dpI       | 仅将 %I 扩充到⼀个驱动器号和路径                             |
| %~nxI       | 仅将 %I 扩充到⼀个文件名和扩展名                             |
| %~fsI       | 仅将 %I 扩充到⼀个带有短名的完整路径名                       |
| %~ftzaI     | 将 %I 扩充到类似输出线路的 DIR                               |
| %~dp$PATH:I | 查找列在路径环境变量的目录，并将 %I 扩充到找到的第⼀个驱动器号和路径 |

~~~plaintext
@echo off
for /f "delims=" %%i in ('dir /b') do @echo %%~dpi
pause

@echo off
for /f "delims=" %%i in ("notepad.exe") do @echo %%~dp$PATH:i
pause
~~~

##### 程序间调用

~~~plaintext
# demo1.bat
@echo off
echo this is demo1
echo %1 %2 %3
pause

# demo2.bat
@echo off
echo this is demo2
call demo1.bat haha hehe hoho
pause
~~~

~~~plaintext
@echo off
call :sub sum 10 20 50
echo 运算的结果：%sum%
pause >nul
:sub
set /a %1=%2+%3+%4
goto :eof
~~~

~~~plaintext
@echo off
call :sub ret 你好
echo ⼦程序返回值：%ret%
pause
:sub
set %1=%2
goto :eof
~~~

##### 使用技巧

~~~plaintext
# *.* 可以简写成.
del *.* <=> del .

# MORE分屏显示内容
more < demo.txt
type demo.txt | more

# 向文本文件追加内容
copy demo.txt+CON
type CON >> demo.txt
# 输入内容结束后按F6保存

# 创建空文件或清空文件
type NUL > demo.txt

# 使用type复制文件
type demo.txt > temp.txt

# pushd、popd的使用
# 先将当前工作路径压入栈
pushd
# 切换到其它路径处理其它事情
cd xxx\xxx\xxx
# 弹出栈，即返回到原先路径下
popd

# 制造一个延时
ping /n 2 127.0.0.1 > nul
# 或
for /l %%i in (1,1,10000) do echo %%i>nul
~~~



<br/><br/><br/>

---

