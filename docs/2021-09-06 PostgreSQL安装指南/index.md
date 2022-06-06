# PostgreSQL安装指南

---

### 安装包方式安装

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

### 源码方式安装

1、安装依赖

~~~shell
yum install -y bzip2 readline-devel zlib-devel
~~~

2、下载源码

~~~shell
wget https://ftp.postgresql.org/pub/source/v9.6.22/postgresql-9.6.22.tar.gz
~~~

3、创建用户

~~~shell
groupadd postgres
useradd -g postgres -G postgres -d /home/postgres -m postgres
passwd postgres
~~~

4、安装

~~~shell
tar -zvxf postgresql-9.6.22.tar.gz
cd postgresql-9.6.22
~~~

~~~shell
./configure --prefix=/usr/local/pgsql
make
make install
~~~

5、创建数据目录

~~~shell
mkdir /usr/local/pgsql/data
chown -R postgres:postgres /usr/local/pgsql/data
~~~

6、初始化数据

~~~shell
su - postgres

# 初始化数据
/usr/local/pgsql/bin/initdb --locale=C -E UNICODE -D /usr/local/pgsql/data
~~~

7、修改配置

1）针对实例的配置：`/usr/local/pgsql/data/postgresql.conf`

~~~plaintext
listen_addresses = '*'

port = 5432
~~~

2）针对数据库访问的控制：`/usr/local/pgsql/data/pg_hba.conf`

允许所有IP都可以连接此服务器，添加以下内容：

~~~plaintext
# IPv4 local connections:
host    all             all             127.0.0.1/32            trust
host    all             all             0.0.0.0/0               trust
~~~

8、添加环境变量

~~~shell
vi ~/.bash_profile
~~~

~~~shell
export PG_HOME=/usr/local/pgsql
export PGPORT=5432
export PGDATA=$PG_HOME/data
export LD_LIBRARY_PATH=$PG_HOME/lib:$LD_LIBRARY_PATH
export PATH=$PATH:$PG_HOME/bin
~~~

~~~shell
source ~/.bash_profile
~~~

9、启动

~~~shell
su - postgres

# 启动
/usr/local/pgsql/bin/postgres -D /usr/local/pgsql/data >logfile 2>&1 &
~~~

10、开机启动

PostgreSQL安装文件夹内提供了启动脚本，直接使用即可。

~~~shell
cp /root/svr/postgresql/postgresql-9.6.22/contrib/start-scripts/linux /etc/init.d/postgresql
chkconfig --add postgresql
chmod 755 /etc/init.d/postgresql
~~~

检查几个配置是否正确：

~~~shell
cat /etc/init.d/postgresql

prefix：软件的安装路径
PGDATA：数据的存放路径
PGUSER：启动postgresql服务的用户
~~~

以服务方式启动、关闭PostgreSQL：

~~~shell
service postgresql start
service postgresql stop
service postgresql status
~~~

11、修改管理员密码

~~~shell
# 切换postgres用户
su postgres

# 进入psql控制台（此时系统提示符变为'postgres=#'）
psql

# 为管理员用户postgres修改密码
\password postgres
~~~



<br/><br/><br/>

---

