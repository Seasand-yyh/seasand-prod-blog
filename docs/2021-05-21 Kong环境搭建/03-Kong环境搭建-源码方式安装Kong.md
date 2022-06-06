# Kong环境搭建-源码方式安装Kong

---

### 安装依赖

1、gcc

~~~shell
yum install -y gcc gcc-c++
~~~

2、pcre

~~~shell
yum install -y pcre pcre-devel
~~~

3、zlib

~~~shell
yum install -y zlib zlib-devel
~~~

4、openssl

~~~shell
yum install -y openssl openssl-devel
~~~

5、libyaml

~~~shell
yum install -y libyaml libyaml-devel
~~~

### 安装openresty

1、下载

~~~shell
cd ~/svr
wget https://openresty.org/download/openresty-1.15.8.2.tar.gz
~~~

2、解压

~~~shell
tar -zvxf openresty-1.15.8.2.tar.gz
mv openresty-1.15.8.2 openresty
cd openresty
~~~

3、安装

~~~shell
./configure \
  --with-pcre-jit \
  --with-http_ssl_module \
  --with-http_realip_module \
  --with-http_stub_status_module \
  --with-http_v2_module

make
make install
~~~

4、添加环境变量

~~~shell
export PATH="$PATH:/usr/local/openresty/bin"
~~~

5、验证

~~~shell
openresty -V
~~~

### 安装luarocks

1、下载

~~~shell
cd ~/svr
wget https://luarocks.org/releases/luarocks-3.2.1.tar.gz
~~~

2、解压

~~~shell
tar -zvxf luarocks-3.2.1.tar.gz
mv luarocks-3.2.1 luarocks
cd luarocks
~~~

3、安装

~~~shell
./configure \
  --with-lua=/usr/local/openresty/luajit/ \
  --lua-suffix=jit \
  --with-lua-include=/usr/local/openresty/luajit/include/luajit-2.1

make build
make install
~~~

4、验证

~~~shell
luarocks --version
~~~

### 安装Kong

1、下载

~~~shell
cd ~/svr
git clone https://github.com/Kong/kong.git
~~~

2、安装

~~~shell
cd kong
git checkout 2.2.0 # 指定版本
make install
~~~

3、添加环境变量

~~~shell
export PATH="$PATH:/root/svr/kong/bin"
~~~

4、验证

~~~shell
kong version --vv
~~~

5、配置Kong

~~~shell
mkdir -p ~/svr/kong/conf
cp ~/svr/kong/kong.conf.default ~/svr/kong/conf/kong.conf
vi ~/svr/kong/conf/kong.conf
~~~

~~~plaintext
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

6、初始化Kong

~~~shell
kong migrations bootstrap -c ~/svr/kong/conf/kong.conf
~~~

7、启动Kong

~~~shell
kong start -c ~/svr/kong/conf/kong.conf
~~~

附：常见启动报错

~~~plaintext
Error: module 'resty.kong.tls' not found:No LuaRocks module found for resty.kong.tls
~~~

原因：Kong启动时会在预先设置的路径中加载`tls.lua`和`init.lua`模块，而搜索完所有路径都没有发现需要的模块就会报错，可能是在安装过程中依赖的lua模块没有放到对应的路径下。

解决方法：使用`find`命令在根目录下找Kong缺失的模块文件（如：`find / -name tls.lua`），将找到后的模块文件放到Kong启动加载时检索的目录下，或使用建立软连接的方式即可。另一个更加便捷的方法是拷贝 https://github.com/Kong/lua-kong-nginx-module 里的`lualib/resty/kong/tls.lua`到  `{luarocks}/share/lua/5.1/resty/kong/tls.lua`。

8、启动脚本

~~~shell
vi ~/svr/kong/script/svr-kong.sh
~~~

~~~shell
#!/bin/sh

case $1 in
  start)
    kong start -p /root/svr/kong -c /root/svr/kong/conf/kong.conf
  ;;
  stop)
    kong stop -p /root/svr/kong
  ;;
  restart)
    kong restart -p /root/svr/kong -c /root/svr/kong/conf/kong.conf
  ;;
  reload)
    kong reload -p /root/svr/kong -c /root/svr/kong/conf/kong.conf
  ;;
  *)
    echo 'start|stop|restart|reload'
  ;;
esac
~~~

9、验证

~~~shell
curl -i -X GET http://localhost:8001/
~~~



<br/><br/><br/>

---

