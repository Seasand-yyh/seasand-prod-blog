# SpringBoot系列学习-使用Jenkins部署SpringBoot

---

Jenkins 搭建、部署分为四个步骤：

* 第一步：Jenkins 安装；
* 第二步：插件安装和配置；
* 第三步：Push SSH；
* 第四步：部署项目；

### Jenkins 安装

1、准备环境

* CentOS：7.3
* JDK：1.8
* Maven：3.5
* Jenkins：2.83

> Jdk 默认已经安装完成。

2、配置 Maven

版本要求：Maven 3.5.0

软件下载：

~~~shell
wget http://mirror.bit.edu.cn/apache/maven/maven-3/3.5.0/binaries/apache-maven-3.5.0-bin.tar.gz
~~~

安装：

~~~shell
## 解压
tar vxf apache-maven-3.5.0-bin.tar.gz
## 移动
mv apache-maven-3.5.0 /usr/local/maven3
~~~

修改环境变量，在`/etc/profile`中添加以下几行：

~~~plaintext
MAVEN_HOME=/usr/local/maven3
export MAVEN_HOME
export PATH=${PATH}:${MAVEN_HOME}/bin
~~~

记得执行`source /etc/profile`使环境变量生效。

验证：

最后运行`mvn -v`验证maven是否安装成功。

3、配置防护墙

关闭防护墙：

~~~shell
#centos7
systemctl stop firewalld.service

==============================

#centOS6.5关闭防火墙步骤
#关闭命令：  
service iptables stop 
#永久关闭防火墙：
chkconfig iptables off
~~~

两个命令同时运行，运行完成后查看防火墙关闭状态。

~~~shell
service iptables status
~~~

4、Jenkins 安装

下载：

~~~shell
cd /opt
wget http://mirrors.jenkins.io/war/2.83/jenkins.war
~~~

启动服务：

~~~shell
java -jar jenkins.war &
~~~

Jenkins 就启动成功了！它的war包自带Jetty服务器。

第一次启动 Jenkins 时，出于安全考虑，Jenkins 会自动生成一个随机的口令。注意控制台输出的口令，复制下来，然后在浏览器输入密码：

~~~plaintext
INFO: 

*************************************************************
*************************************************************
*************************************************************

Jenkins initial setup is required. An admin user has been created and a password generated.
Please use the following password to proceed to installation:

0cca37389e6540c08ce6e4c96f46da0f

This may also be found at: /root/.jenkins/secrets/initialAdminPassword

*************************************************************
*************************************************************
*************************************************************
~~~

访问：

浏览器访问：http://localhost:8080/



输入：0cca37389e6540c08ce6e4c96f46da0f

进入用户自定义插件界面，建议选择安装官方推荐插件，因为安装后自己也得安装。



接下来是进入插件安装进度界面。



插件一次可能不会完全安装成功，可以点击Retry再次安装，直到全部安装成功。



等待一段时间之后，插件安装完成，配置用户名密码。



输入：admin/admin

系统管理 -- 全局工具 配置 jdk路径。



### 插件安装和配置

有很多插件都是选择的默认安装的，所以现在需要我们安装的插件不多。Git plugin 和 Maven Integration plugin，publish over SSH。

插件安装：系统管理 > 插件管理 > 可选插件，勾选需要安装的插件，点击直接安装或者下载重启后安装。

1、配置全局变量

系统管理 > 全局工具配置

* JDK

配置本地 JDK 的路径，去掉勾选自动安装



* Maven

配置本地maven的路径，去掉勾选自动安装



其它内容可以根据自己的情况选择安装。



2、使用密钥方式登录目标发布服务器

ssh 的配置可使用密钥，也可以使用密码，这里我们使用密钥来配置，在配置之前先配置好Jenkins服务器和应用服务器的密钥认证。

Jenkins服务器上生成密钥对，使用`ssh-keygen -t rsa`命令。输入下面命令，一直回车，一个矩形图形出现就说明成功，在`~/.ssh/`下会有私钥id_rsa和公钥id_rsa.pub。

~~~shell
ssh-keygen -t rsa
~~~

将Jenkins服务器的公钥id_rsa.pub中的内容复制到应用服务器 的`~/.ssh/`下的 authorized_keys文件。

~~~shell
ssh-copy-id -i id_rsa.pub 192.168.0.xx
chmod 644 authorized_keys
~~~

在应用服务器上重启 ssh 服务，`service sshd restart`。现在 Jenkins 服务器可免密码直接登陆应用服务器。

之后在用 ssh B尝试能否免密登录 B 服务器，如果还是提示需要输入密码，则有以下原因：

* 非 root 账户可能不支持 ssh 公钥认证（看服务器是否有限制）；
* 传过来的公钥文件权限不够，可以给这个文件授权下 `chmod 644 authorized_keys`；
* 使用 root 账户执行 `ssh-copy-id -i ~/.ssh/id_rsa.pub` 这个指令的时候如果需要输入密码则要配置sshd_config；

~~~shell
vi /etc/ssh/sshd_config
#内容
PermitRootLogin no
~~~

修改完后要重启 sshd 服务：

~~~shell
service sshd restart
~~~

最后，如果可以 SSH IP 免密登录成功说明 SSH 公钥认证成功。

上面这种方式比较复杂，其实在 Jenkins 后台直接添加操作即可，参考下面方式。

3、使用用户名+密码方式登录目标发布服务器

1）点击"高级"展开配置



2）配置SSH的登陆密码



配置完成后可点击“Test Configuration”测试到目标主机的连接，出现”success“则成功连接。如果有多台应用服务器，可以点击”增加“，配置多个“SSH Servers” 点击“保存”以保存配置。

### Push SSH

系统管理 > 系统设置

选择 Publish over SSH



Passphrase 不用设置，Path to key 写上生成的ssh路径：`/root/.ssh/id_rsa`。

下面的 SSH Servers 是重点：

* Name 随意起名代表这个服务，待会要根据它来选择；
* Hostname 配置应用服务器的地址；
* Username 配置 linux 登陆用户名；
* Remote Directory 不填；

> 点击下方增加可以添加多个应用服务器的地址。

### 部署项目

首页点击新建：输入项目名称



下方选择构建一个 Maven 项目，点击确定。

勾选丢弃旧的构建，选择是否备份被替换的旧包。我这里选择备份最近的10个。



源码管理，选择 SVN，配置 SVN 相关信息，点击 add 可以输入 SVN 的账户和密码。



SVN 地址：http://192.168.0.xx/svn/xxx@HEAD， @HEAD意思取最新版本。

构建环境中勾选“Add timestamps to the Console Output”，代码构建的过程中会将日志打印出来。



在 Build 中输入打包前的 mvn 命令，如：

~~~plaintext
clean install -Dmaven.test.skip=true -Ptest
~~~

意思是：排除测试的包内容，使用后缀为 test 的配置文件。



Post Steps 选择 Run only if build succeeds



点击Add post-build step，选择 Send files or execute commands over SSH



Name 选择上面配置的 Push SSH



* Source files配置：`target/xxx-0.0.1-SNAPSHOT.jar` 项目jar包名；
* Remove prefix：`target/`；
* Remote directory：`Jenkins-in/` 代码应用服务器的目录地址；
* Exec command：`Jenkins-in/xxx.sh` 应用服务器对应的脚本；

需要在应用服务器创建文件夹：Jenkins-in，在文件夹中复制一下脚本内容：xxx.sh

~~~plaintext
DATE=$(date +%Y%m%d)
export JAVA_HOME PATH CLASSPATH
JAVA_HOME=/usr/java/jdk1.8.0_131
PATH=$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib:$CLASSPATH
DIR=/root/xxx
JARFILE=xxx-0.0.1-SNAPSHOT.jar

if [ ! -d $DIR/backup ];then
   mkdir -p $DIR/backup
fi
cd $DIR

ps -ef | grep $JARFILE | grep -v grep | awk '{print $2}' | xargs kill -9
mv $JARFILE backup/$JARFILE$DATE
mv -f /root/Jenkins-in/$JARFILE .

java -jar $JARFILE > out.log &
if [ $? = 0 ];then
        sleep 30
        tail -n 50 out.log
fi

cd backup/
ls -lt|awk 'NR>5{print $NF}'|xargs rm -rf
~~~

这段脚本的意思，就是 kill 旧项目，删除旧项目，启动新项目，备份老项目。



<br/><br/><br/>

---

