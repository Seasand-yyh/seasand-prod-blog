# Kong环境搭建-基于CentOS

---

### 安装依赖

检查并安装相关依赖组件。

1、gcc

安装 gcc 编译环境。

~~~shell
yum install -y gcc gcc-c++
~~~

2、pcre

pcre(Perl Compatible Regular Expressions) 是一个 Perl 库，包括 perl 兼容的正则表达式，Nginx 的 http 库使用 pcre 解析正则表达式。

~~~shell
yum install -y pcre pcre-devel
~~~

3、zlib

zlib 库提供多种压缩和解压缩的方式。

~~~shell
yum install -y zlib zlib-devel
~~~

4、openssl

openssl 是一个安全套接字层密码库，囊括主要的密码算法、常用的密钥和证书封装管理功能及 SSL 协议。

~~~shell
yum install -y openssl openssl-devel
~~~

5、其它

~~~shell
yum install -y wget curl zip unzip git
~~~

### 安装配置PostgreSQL

Kong 默认使用 PostgreSQL 作为数据库。

1、添加rpm

~~~shell
yum install -y https://download.postgresql.org/pub/repos/yum/reporpms/EL-7-x86_64/pgdg-redhat-repo-latest.noarch.rpm
~~~

2、安装

~~~shell
yum install -y postgresql96-server
~~~

3、初始化数据库

~~~shell
/usr/pgsql-9.6/bin/postgresql96-setup initdb
~~~

执行完初始化任务之后，PostgreSQL 会自动创建两个用户和一个数据库：

* Linux 系统用户 postgres：管理数据库的系统用户；
* PostgreSQL 数据库用户 postgres：数据库超级管理员；
* 数据库 postgres：用户 postgres 的默认数据库。

4、修改密码

密码由于是默认生成的，需要在系统中修改一下。

1）修改系统用户 postgres 的密码：

~~~shell
passwd postgres
~~~

2）修改数据库用户 postgres 的密码：

~~~shell
# 切换 postgres 用户
su postgres

# 进入 psql 控制台（此时系统提示符变为'postgres=#'）
psql

# 为管理员用户postgres修改密码
\password postgres
~~~

5、修改配置

在 work 或者 root 账户下登录 PostgreSQL 数据库会提示权限问题。认证权限配置文件为 `/var/lib/pgsql/9.6/data/pg_hba.conf`，常见的四种身份验证为：

* trust：凡是连接到服务器的，都是可信任的。只需要提供 PostgreSQL 用户名，可以没有对应的操作系统同名用户；
* password 和 md5：对于外部访问，需要提供 PostgreSQL 用户名和密码。对于本地连接，提供 PostgreSQL 用户名密码之外，还需要有操作系统访问权（用操作系统同名用户验证）。password 和 md5 的区别就是外部访问时传输的密码是否用 md5 加密；
* ident：对于外部访问，从 ident 服务器获得客户端操作系统用户名，然后把操作系统作为数据库用户名进行登录，对于本地连接，实际上使用了peer；
* peer：通过客户端操作系统内核来获取当前系统登录的用户名，并作为 PostgreSQL 用户名进行登录。

PostgreSQL 用户必须有同名的操作系统用户名，并且必须以与 PostgreSQL 同名用户登录 Linux 才可以登录 PostgreSQL 。想用其他用户（例如 root ）登录 PostgreSQL，修改本地认证方式为 trust 或者 password 即可。如下：

~~~plaintext
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
host    all             all             0.0.0.0/0               trust
~~~

PostgreSQL 默认只能通过本地访问，需要开启远程访问，可通过修改配置文件 `/var/lib/pgsql/9.6/data/postgresql.conf` ，将 `listen_address` 设置为 `'*'`。

~~~plaintext
#---------------------------------------------------
# CONNECTIONS AND AUTHENTICATION
#---------------------------------------------------

# - Connection Settings -
listen_addresses = '*'          # what IP address(es) to listen on;
~~~

6、启动

~~~shell
# 设置成开机启动服务
systemctl enable postgresql-9.6

# 启动postgresql服务
systemctl start postgresql-9.6

# 查看postgresql状态
systemctl status postgresql-9.6
~~~

7、建立 Kong 数据库

为了安全以及满足 Kong 初始化的需求，需要再建立一个 PostgreSQL 数据库用户 kong 和对应的 Linux 系统用户 kong，并新建数据库 kong。

1）新建Linux系统用户kong

~~~shell
adduser kong
passwd kong
~~~

2）新建数据库用户kong和数据库kong

~~~shell
# 使用管理员账号登录psql，创建用户和数据库
su postgres

# 进入psql控制台（此时系统提示符变为'postgres=#'）
psql

# 建立新的数据库用户（和之前建立的系统用户kong要对应）
create user kong with password 'kong';

# 为新用户建立数据库
create database kong owner kong;

# 把新建的数据库权限赋予kong
grant all privileges on database kong to kong;

# 退出控制台
\q
~~~

登录验证：

~~~shell
su kong

psql -h 127.0.0.1 -p 5432 -d kong -U kong
~~~

> 附：更多关于PostgreSQL的安装教程，请查阅[PostgreSQL安装指南](#docs/system-database-postgresql/2020-09-06 PostgreSQL安装指南) 。

### 安装配置Kong

1、创建 Kong 工作目录

~~~shell
mkdir ~/svr/kong
mkdir ~/svr/kong/config
mkdir ~/svr/kong/script

cd ~/svr/kong
~~~

2、下载并安装 Kong

~~~shell
wget https://download.konghq.com/gateway-2.x-centos-7/Packages/k/kong-2.2.0.el7.amd64.rpm

sudo yum install kong-2.2.0.el7.amd64.rpm
~~~

> 附：本文档使用 Kong 2.2.0 版本，如需使用其它版本，请自行到[官网](https://download.konghq.com/)下载。

3、配置 Kong

Kong 的默认配置文件位于 `/etc/kong/kong.conf.default`，以该文件为模板进行修改。

~~~shell
cp /etc/kong/kong.conf.default ~/svr/kong/config/kong.conf
vi ~/svr/kong/config/kong.conf
~~~

~~~plaintext
# kong custom config

prefix = /root/svr/kong

log_level = info
proxy_access_log = logs/access.log
proxy_error_log = logs/error.log
admin_access_log = logs/admin_access.log
admin_error_log = logs/admin_error.log

plugins = bundled

proxy_listen = 0.0.0.0:8000, 0.0.0.0:8443 ssl
admin_listen = 0.0.0.0:8001, 0.0.0.0:8444 ssl

database = postgres
pg_host = localhost
pg_port = 5432
pg_user = kong
pg_password = kong
pg_database = kong
pg_timeout = 5000
~~~

4、初始化 Kong 数据库

~~~shell
kong migrations bootstrap -c ~/svr/kong/config/kong.conf
~~~

5、启动 Kong

~~~shell
kong start -c ~/svr/kong/config/kong.conf
~~~

6、验证 Kong 是否启动

~~~shell
curl -i -X GET --url http://localhost:8001/
~~~

如果能够返回一个状态码为 200 的响应，说明 Kong 已经正常启动了。

7、自定义脚本

~~~shell
vi ~/svr/kong/script/svr-kong
~~~

内容如下：

~~~shell
#!/bin/sh

case $1 in
  start)
    kong start -p /root/svr/kong -c /root/svr/kong/config/kong.conf
  ;;
  stop)
    kong stop -p /root/svr/kong
  ;;
  restart)
    kong restart -p /root/svr/kong -c /root/svr/kong/config/kong.conf
  ;;
  reload)
    kong reload -p /root/svr/kong -c /root/svr/kong/config/kong.conf
  ;;
  *)
    echo 'start|stop|restart|reload'
  ;;
esac
~~~

### 安装配置Konga

安装过程请参考 [Konga官网](https://github.com/pantsel/konga)。

> 注：从 0.14.0 开始，Konga 仅兼容 Kong 1.x 及以上版本。

1、下载源码

~~~shell
yum install -y git

git clone https://github.com/pantsel/konga.git
~~~

2、安装依赖

因考虑到 Node.js 版本的兼容问题，本次使用 12.16 版本，需手动安装指定版本。

~~~shell
curl -O https://nodejs.org/download/release/v12.16.0/node-v12.16.0-linux-x64.tar.gz
mv node-v12.16.0-linux-x64.tar.gz /usr/local/

cd /usr/local/
tar -xvf node-v12.16.0-linux-x64.tar.gz
mv node-v12.16.0-linux-x64 nodejs

ln -s /usr/local/nodejs/bin/npm /usr/local/bin/
ln -s /usr/local/nodejs/bin/node /usr/local/bin/

node -v
npm -v
~~~

安装`nrm`和`cnpm`：

~~~shell
npm install -g nrm
npm install -g cnpm

ln -s /usr/local/nodejs/bin/nrm /usr/local/bin/
ln -s /usr/local/nodejs/bin/cnpm /usr/local/bin/
~~~

安装`gulp`、`bower`和`sails`：

~~~shell
npm install -g gulp
npm install -g bower
npm install -g sails

ln -s /usr/local/nodejs/bin/gulp /usr/local/bin/
ln -s /usr/local/nodejs/bin/bower /usr/local/bin/
ln -s /usr/local/nodejs/bin/sails /usr/local/bin/
~~~

> 注：为了避免频繁地创建软链接，可以将node和npm添加到Path环境变量。

3、配置Konga

使用数据库管理员 postgres 登录 PostgreSQL，添加konga数据库和账号：

~~~shell
psql -U postgres -d postgres -h 127.0.0.1 -p 5432
~~~

~~~shell
# 创建konga用户
create user konga with password 'konga';

# 创建konga数据库
create database konga owner konga;

# 把新建的数据库权限赋予konga用户
grant all privileges on database konga to konga;
~~~

设置环境配置文件：

~~~shell
cd konga
cp .env_example .env
~~~

可对各项作相应修改：

~~~plaintext
DB_ADAPTER=postgres
DB_URI=postgresql://konga:konga@localhost:5432/konga
DB_HOST=localhost
DB_PORT=5432
DB_USER=konga
DB_PASSWORD=konga
DB_DATABASE=konga
PORT=1337
NODE_ENV=development
KONGA_HOOK_TIMEOUT=120000
KONGA_LOG_LEVEL=warn
#TOKEN_SECRET=some_secret_token
~~~

> 附：具体配置作用在`config/local_example.js`和`config/connections.js`文件中，更多配置项可参考官网。

4、安装Konga

~~~shell
cd konga
cnpm i
~~~

安装过程中可能会报如下错误：

~~~plaintext
......
ECMDERR Failed to execute "git ls-remote --tags --heads https://github.com/angular/bower-angular-animate.git", exit code of #128 fatal: unable to access 'https://github.com/angular/bower-angular-animate.git/': OpenSSL SSL_read: SSL_ERROR_SYSCALL, errno 10054
......
bower angular-mocks#1.5.x ECMDERR Failed to execute "git ls-remote --tags --heads https://github.com/angular/bower-angular-mocks.git", exit code of #128 fatal: unable to access 'https://github.com/angular/bower-angular-mocks.git/': Empty reply from server
Additional error details:
fatal: unable to access 'https://github.com/angular/bower-angular-mocks.git/': Empty reply from server
......
~~~

据分析，这段脚本执行是`git`拉取代码所用到(默认用ssh)的端口被禁止使用，应该改用`https`的方式进行下载：

~~~shell
git config --global url."git://".insteadOf https://
~~~

因为需要连接PostgreSQL，所以还需要安装相关驱动依赖：

~~~shell
cnpm install sails-postgresql

# 如因权限问题报错，可如下执行
cnpm install --unsafe-perm=true --allow-root sails-postgresql
~~~

5、启动Konga

~~~shell
cd konga
npm start
~~~

6、验证

在浏览器输入 `http://localhost:1337`，即可打开Konga页面。

注册管理员账号，然后设置connection，名称为`kong`，地址为`http://localhost:8001`。



<br/><br/><br/>

---

