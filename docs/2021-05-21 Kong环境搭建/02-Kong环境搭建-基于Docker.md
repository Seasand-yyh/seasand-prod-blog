# Kong环境搭建-基于Docker

---

### 准备工作

新建一个 Docker 的 network 环境，后续部署 Kong 环境的各个服务组件都指定在这个网络环境下。

~~~shell
docker network create network-mgw
~~~

### 安装配置PostgreSQL

使用 PostgreSQL 9.6 作为 Kong 的数据存储，直接拉取 PostgreSQL 的官方 Docker 镜像，然后实例化一个容器，并指定相应的数据库名称、账号和密码。相应命令如下：

~~~shell
docker pull postgres:9.6

docker run -d \
  --name mgw-postgresql \
  --network=network-mgw \
  -p 5432:5432 \
  -e "POSTGRES_USER=kong" \
  -e "POSTGRES_PASSWORD=kong" \
  -e "POSTGRES_DB=kong" \
postgres:9.6
~~~

### 安装配置Kong

1、拉取 Kong 官方镜像

~~~shell
docker pull kong:2.2.0
~~~

2、初始化 Kong 数据库

~~~shell
docker run --rm \
  --network=network-mgw \
  -e "KONG_DATABASE=postgres" \
  -e "KONG_PG_HOST=mgw-postgresql" \
  -e "KONG_PG_PASSWORD=kong" \
kong:2.2.0 kong migrations bootstrap
~~~

3、启动 Kong 容器

~~~shell
docker run -d \
  --name mgw-kong \
  --network=network-mgw \
  -e "KONG_DATABASE=postgres" \
  -e "KONG_PG_HOST=mgw-postgresql" \
  -e "KONG_PG_PASSWORD=kong" \
  -e "KONG_PROXY_ACCESS_LOG=/dev/stdout" \
  -e "KONG_ADMIN_ACCESS_LOG=/dev/stdout" \
  -e "KONG_PROXY_ERROR_LOG=/dev/stderr" \
  -e "KONG_ADMIN_ERROR_LOG=/dev/stderr" \
  -e "KONG_ADMIN_LISTEN=0.0.0.0:8001, 0.0.0.0:8444 ssl" \
  -p 8000:8000 \
  -p 8443:8443 \
  -p 8001:8001 \
  -p 8444:8444 \
kong:2.2.0
~~~

4、验证

~~~shell
curl -s -i http://localhost:8001/
~~~

### 安装配置Konga

1、拉取 Konga 镜像

~~~shell
docker pull pantsel/konga
~~~

2、初始化 Konga 数据库

命令示例：

~~~shell
docker run --rm pantsel/konga -c prepare -a {{adapter}} -u {{connection-uri}}
~~~

参数说明：

* -c：command
* -a：adapter (can be postgres or mysql)
* -u：full database connection url

~~~shell
docker run --rm \
  --name mgw-konga \
  --network=network-mgw \
pantsel/konga -c prepare -a postgres -u postgresql://konga:konga@mgw-postgresql:5432/konga
~~~

3、启动 Konga

~~~shell
docker run -d \
  --name mgw-konga \
  --network=network-mgw \
  -p 1337:1337 \
  -e "DB_ADAPTER=postgres" \
  -e "DB_HOST=mgw-postgresql" \
  -e "DB_PORT=5432" \
  -e "DB_USER=konga" \
  -e "DB_PASSWORD=konga" \
  -e "DB_DATABASE=konga" \
  -e "KONGA_HOOK_TIMEOUT=120000" \
  -e "DB_PG_SCHEMA=public" \
  -e "NODE_ENV=production" \
pantsel/konga
~~~

4、验证

在浏览器输入 `http://localhost:1337`，即可打开 Konga 页面，首次打开需要先注册管理员账号。登入系统后，需要设置 connection，地址为`http://mgw-kong:8001`。



<br/><br/><br/>

---

