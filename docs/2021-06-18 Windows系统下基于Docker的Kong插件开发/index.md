# Windows系统下基于Docker的Kong插件开发

---

## 搭建 Docker 环境

Docker Desktop 是 Docker 在 Windows 10 操作系统上的官方安装方式，其原理是先在虚拟机中安装 Linux 然后再安装 Docker。Docker Desktop 的官方下载地址为 [https://hub.docker.com/editions/community/docker-ce-desktop-windows](https://hub.docker.com/editions/community/docker-ce-desktop-windows) 。

> 注意：Docker Desktop 仅适用于 Windows 10 操作系统专业版、企业版、教育版和部分家庭版。

### 启用 Hyper-V

Hyper-V 是微软开发的虚拟机，类似于 VMWare 或 VirtualBox，仅适用于 Windows 10，这是 Docker Desktop for Windows 所使用的虚拟机。

在 Windows 10 系统中启用 Hyper-V 功能，可以依次进行如下操作：

* 右键点击【开始】菜单；
* 选择【应用和功能】；
* 选择【程序和功能】；
* 选择【启用或关闭Windows功能】；
* 找到并勾选【Hyper-V】相关选项；
* 点击【确定】。

![img](images/1625153748913.png)

也可以通过命令的方式来启用 Hyper-V 功能，以管理员身份运行 PowerShell，并执行以下命令：

~~~shell
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All
~~~

> 注意：开启 Hyper-V 功能后需要重新启动操作系统才会生效。

### 安装 Docker

Docker Desktop 的安装过程比较简单，只需要双击下载的 Docker for Windows Installer 安装文件，一路 Next，最后点击 Finish 完成安装。

安装完成后，Docker 会自动启动。通知栏上会出现个小鲸鱼的图标，这表示 Docker 正在运行。

![img](images/1625156283459.png)

我们可以在命令行执行 `docker version` 来查看当前安装的 Docker 版本信息：

![img](images/1625191100652.png)

执行`docker run hello-world` 来载入测试镜像进行测试：

![img](images/1625190247935.png)

执行以上命令都能正常输出相应信息，说明 Docker Desktop 在本地系统已经安装成功。

### Docker Desktop 简单使用

1、Docker 功能面板（Dashboard）

Docker Desktop 启动后，点击通知栏上的小鲸鱼图标，即可打开 Docker Dashboard 功能面板。

在镜像（Images）管理界面，可以查看本地的镜像并进行管理，以及使用镜像实例化容器：

![img](images/1625191100654.png)

在容器（Containers）管理界面，可以查看容器的状态，以及对容器进行启动、停止、重启等常规操作，还可以启动一个命令行进入到容器执行相关命令：

![img](images/1625191100653.png)

以上是比较常用的功能简介，更多功能和具体操作可以查阅相关文档。

2、 更改镜像源

为了加快镜像下载速度，可以添加常用的国内镜像源地址。右键点击通知栏上的小鲸鱼图标，选择 Settings 菜单项，进入 Docker Desktop 的设置界面：

![img](images/1625188523113.png)

在 Docker Engine 界面，找到`registry-mirrors`配置项，添加镜像源地址：

~~~plaintext
"registry-mirrors": [
  "https://docker.mirrors.ustc.edu.cn/",
  "https://hub-mirror.c.163.com/",
  "https://mirror.baidubce.com"
]
~~~

### Docker 常用命令

1、镜像相关

| 命令                                                         | 说明                                  |
| ------------------------------------------------------------ | ------------------------------------- |
| docker images                                                | 列出镜像                              |
| docker search `<image-name>`<br/>docker search ubuntu        | 查找镜像                              |
| docker pull `<image-name>:<tag>`<br/>docker pull ubuntu<br/>docker pull ubuntu:latest<br/>docker pull ubuntu:15.10 | 拉取镜像，如果不指定tag，默认为latest |
| docker build -t test/centos:6.7 ./Dockerfile                 | 构建镜像                              |
| docker commit -m="message" -a="author" `<container-id>` test/ubuntu:1.0 | 以容器创建镜像                        |
| docker rmi `<image-name>:<tag>`<br/>docker rmi ubuntu:15.10  | 删除镜像                              |

2、容器相关

| 命令                                                         | 说明                                               |
| ------------------------------------------------------------ | -------------------------------------------------- |
| docker run ubuntu:15.10 /bin/echo "Hello world"              | 在一个新容器内运行指定命令                         |
| docker run -i -t ubuntu /bin/bash                            | 指定-i、-t进入交互模式                             |
| docker run --name myubuntu ubuntu /bin/bash                  | --name指定名称                                     |
| docker run -d ubuntu /bin/bash                               | 指定-d进入后台模式                                 |
| docker run --rm ubuntu cat etc/resolv.conf                   | 指定-rm，容器退出时自动清理容器内部的文件系统      |
| docker start `<container-id>`                                | 启动容器                                           |
| docker stop `<container-id>`                                 | 停止容器                                           |
| docker restart `<container-id>`                              | 重启容器                                           |
| docker ps                                                    | 查看当前正在运行的容器                             |
| docker ps -a                                                 | 查看所有容器                                       |
| docker ps -l                                                 | 查看最后一次创建的容器                             |
| docker run -P ubuntu /bin/bash                               | 使用-P随机映射端口                                 |
| docker run -p 8080:8080 ubuntu /bin/bash<br/>docker run -p 127.0.0.1:8080:8080 ubuntu /bin/bash<br/>docker run -p 127.0.0.1:8080:8080/udp ubuntu /bin/bash | 使用-p指定映射端口                                 |
| docker port `<container-id>`                                 | 查看端口映射                                       |
| docker logs `<container-id>`<br/>docker logs -f `<container-id>` | 查看容器日志                                       |
| docker attach `<container-id>`                               | 进入容器，当从这个容器退出时，会导致容器停止       |
| docker exec -it `<container-id>` /bin/bash                   | 进入容器，当从这个容器退出时，容器不会停止（推荐） |
| docker rm `<container-id>`<br/>docker rm -f `<container-id>` | 删除容器                                           |

3、其它命令

| 命令                                                         | 说明                                            |
| ------------------------------------------------------------ | ----------------------------------------------- |
| docker login                                                 | 登入仓库                                        |
| docker logout                                                | 登出仓库                                        |
| docker push `<image-name>:<tag>`                             | 推送镜像                                        |
| docker network create -d bridge `<network-name>`             | 新建网络，-d参数指定网络类型，有bridge、overlay |
| docker run -itd --name test1 --network mynet ubuntu /bin/bash<br/>docker run -itd --name test2 --network mynet ubuntu /bin/bash | 新建两个容器，通过--network指定在同一个网络下   |
| docker cp ./kong-2.2.0.el7.amd64.rpm `<container-id>`:/root/apps/ | 宿主机复制文件到容器                            |
| docker cp `<container-id>`:/root/apps/kong-2.2.0.el7.amd64.rpm /usr/ | 容器复制文件到宿主机                            |

### 参考资料

* [Docker官方安装文档](https://docs.docker.com/docker-for-windows/install/)
* [Windows Docker安装](https://www.runoob.com/docker/windows-docker-install.html)

## 基于 Docker 部署 Kong 环境

### 准备工作

1、确保 Docker Decktop 在本系统已经启动并且正常运行。

2、新建一个 Docker 的 network 环境，后续部署 Kong 环境的各个服务都指定在这个网络环境下。

~~~shell
docker network create network-mgw
~~~

> 注意：如无特别说明，下文涉及到 Docker 的相关操作都在Windows命令行中执行。

### 安装部署 PostgreSQL

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

### 安装部署 Kong

#### 使用 Docker 官方镜像部署 Kong

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

**特别说明：** 考虑到在开发 Kong 插件过程中的编码、调试、部署等一系列步骤，都需要在 Kong 服务器上进行操作；同时，Kong 配置文件的修改以及 Kong 服务的重新启动等涉及到 Kong 本身的操作也都需要在部署 Kong 的服务器上进行。使用 Docker 官方镜像的部署方式相对来说缺少一定的灵活性，综合考量，我们可以采用在 CentOS 容器内安装 Kong 的方式。

#### 使用 CentOS 容器部署 Kong

实现思路：首先运行一个 CentOS 的 Docker 容器，将其看作是一台虚拟机服务器，然后在其上安装 Kong。

1、创建 CentOS 容器

~~~shell
docker pull centos:centos7

docker run -itd \
  --privileged=true \
  --name mgw-kong-server \
  --network=network-mgw \
  -p 8000:8000 \
  -p 8001:8001 \
  -p 8443:8443 \
  -p 8444:8444 \
centos:centos7 /usr/sbin/init
~~~

2、登入到 Kong 服务器

~~~shell
docker exec -it mgw-kong-server /bin/bash
~~~

3、检查并安装相关依赖

~~~shell
yum install -y gcc gcc-c++ pcre pcre-devel zlib zlib-devel openssl openssl-devel wget curl zip unzip
~~~

4、创建 Kong 工作目录

~~~shell
mkdir ~/svr/kong
mkdir ~/svr/kong/config
mkdir ~/svr/kong/script

cd ~/svr/kong
~~~

5、下载并安装 Kong

~~~shell
wget https://download.konghq.com/gateway-2.x-centos-7/Packages/k/kong-2.2.0.el7.amd64.rpm

yum install kong-2.2.0.el7.amd64.rpm
~~~

> 注意：本文档使用 Kong 2.2.0 版本，如需使用其它版本，请自行到[官网](https://download.konghq.com/)下载。

6、配置 Kong

Kong 的默认配置文件位于 `/etc/kong/kong.conf.default`，以该文件为模板进行修改。

~~~shell
cp /etc/kong/kong.conf.default ~/svr/kong/config/kong.conf
vi ~/svr/kong/config/kong.conf
~~~

主要修改的配置项有以下，可根据实际情况适当进行修改：

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
pg_host = mgw-postgresql
pg_port = 5432
pg_user = kong
pg_password = kong
pg_database = kong
pg_timeout = 5000
~~~

7、初始化 Kong 数据库

~~~shell
kong migrations bootstrap -c ~/svr/kong/config/kong.conf
~~~

8、启动 Kong

~~~shell
kong start -c ~/svr/kong/config/kong.conf
~~~

9、验证 Kong 是否启动

~~~shell
curl -i -X GET --url http://localhost:8001/
~~~

如果能够返回一个状态码为 200 的响应，说明 Kong 已经正常启动了。

10、自定义脚本

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

### 安装部署 Konga

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

在浏览器输入 `http://localhost:1337`，即可打开 Konga 页面，首次打开需要先注册管理员账号。登入系统后，需要设置 connection，地址为`http://mgw-kong-server:8001`。

## Kong 插件开发

### Kong 插件开发环境搭建

Kong 插件开发环境的搭建选择在安装了 Kong 的 CentOS 容器内，需要先登入该容器：

~~~shell
docker exec -it mgw-kong-server /bin/bash
~~~

1、创建工作目录

~~~shell
mkdir -p ~/workspaces && cd ~/workspaces
~~~

2、检出工程源码

~~~shell
# 使用git检出工程源码（如未安装git，请自行安装）
git clone http://git.midea.com/uom-dev/midea-mobile-mkong.git

cd midea-mobile-mkong

# 切换到开发分支
git checkout -b feature/v1.19.0/esb-ip-restriction origin/feature/v1.19.0/esb-ip-restriction
~~~

3、安装第三方插件

`midea-mobile-mkong`项目使用了若干第三方插件，我们自定义开发的插件有依赖于这些第三方插件，所以需要首先进行手动安装：

~~~shell
ls deploy/init/plugins/0/*.rock | xargs -I {} luarocks install {}
ls deploy/init/plugins/1/*.rock | xargs -I {} luarocks install {}
~~~

> 注意：其中`1`中的插件依赖于`0`中的插件，所以`0`中的插件需先于`1`中的插件进行安装。

4、安装自定义插件

`midea-mobile-mkong`项目提供了批量安装插件的脚本`src/build-all-plugins.sh`，直接执行该脚本即可。

~~~shell
# 执行脚本安装自定义插件
cd src/ && ./build-all-plugins.sh

# 将打包好的插件备份到`deploy/plugins/customized/`
cd ..
rm -f deploy/plugins/customized/*.rock
mv src/*.rock deploy/plugins/customized/
~~~

> 注意：一般情况下，如果只是对其中某个插件进行开发调试，则无需每次都全量安装所有插件，只需单独更新相应插件即可。

5、重启 Kong 服务

新添加的插件需要在配置文件`kong.conf`中进行配置：

~~~shell
vi ~/svr/kong/config/kong.conf

# 找到`plugins`，并在其尾部添加插件名称
plugins = bundled,esb-ip-restriction
~~~

重启 Kong 使插件生效：

~~~shell
# 如果是首次安装插件，需要restart
kong restart -c ~/svr/kong/config/kong.conf

# 如果只是更新插件，只需要reload
kong reload  -c ~/svr/kong/config/kong.conf
~~~

至此，Kong 插件的开发环境已初步搭建完毕。

### 使用 VSCode 开发 Kong 插件

为了方便 Kong 插件的构建、部署和调试工作，我们将 Kong 插件的开发环境搭建在了部署 Kong 服务的 CentOS 容器内。对于 Kong 插件的代码编写，一种方式是，首先在宿主机（即本地Windows环境）将插件的基础代码编写完毕，然后提交到Git服务器；接着切换到 CentOS 容器内的开发环境，并检出最新的插件代码，在此基础上作细节上的调整和修改，然后进行构建、部署、调试，不断重复该过程，直至确认插件功能开发完毕。

上述方式存在一个比较明显的缺点是，在 Linux 环境下的代码编写无法像 Windows 环境下那样便捷，不能使用 IDE 工具提供的一系列高级功能。所幸的是，通过 VSCode 提供的 Remote-Development 插件，使得我们可以在远程编码如同在本地一样地方便。

1、Remote-Development

Remote-Development 可以让开发者在 VSCode 中直接访问远程的目录进行开发工作，这样我们的代码和开发环境就可以和终端电脑分离了。

Remote-Development 是一个插件套装，它包含了 Remote-WSL（连接 Windows Subsystem for Linux）、Remote-SSH（通过ssh连接远程服务器）和Remote-Container（连接 Docker 容器）。

Remote-Development 插件的安装十分简单，跟其它 VSCode 插件一样，先在插件栏搜索并找到 Remote-Development，然后安装即可。

![img](images/1625191100655.png)

插件安装完成后，可以发现侧边栏多了一项，这个就是 Remote-Development 插件了。点击该图标，打开 Remote-Development 插件，发现在右上角下拉框里有3个选项，分别为 SSH Targets、WSL Targets 和 Containers。我们选择 Containers ，即可列出当前系统下已经安装的 Docker 容器实例。

![img](images/1625191100656.png)

在列出的容器实例中，我们选择 Kong 插件开发环境所在的容器`mgw-kong-server`，右键，然后选择 "Attach to Container" ，即可连接到该容器。连接成功后，VSCode 会弹窗让我们选择需要打开的目录，我们选择`midea-mobile-mkong`项目所在的路径，即可打开`midea-mobile-mkong`项目，就跟在 Windows 环境下打开的效果是一样的。

2、EmmyLua

EmmyLua 是 VSCode 下开发 Lua 程序的一款十分实用的插件，提供了语法高亮、代码提示、自动补全，以及更加高级的断点调试、远程调试等功能。

VSCode 下安装 EmmyLua 插件：

![img](images/1625191100657.png)

更多关于 EmmyLua 的使用方法，请参考 [EmmyLua 官网](https://github.com/EmmyLua/VSCode-EmmyLua) 。

至此，我们就可以尽情地使用 VSCode IDE 进行插件的编码工作了。

### Kong 插件开发简介

Kong 是一个 Lua 应用程序，被设计用于加载和执行 Lua 模块（通常我们也称之为“插件”），并为之提供了一个完整的开发环境，包括 SDK、数据抽象和迁移等等。插件由一系列的 Lua 模块组成，通过 PDK（Plugin Development Kit，插件开发工具集）与 request/response 对象或者 streams 进行交互以实现任意逻辑。

1、插件文件结构

基础形式：

~~~plaintext
simple-plugin
├── handler.lua
└── schema.lua
~~~

高级形式：

~~~plaintext
complete-plugin
├── api.lua
├── daos.lua
├── handler.lua
├── migrations
│   ├── init.lua
│   └── 000_base_complete_plugin.lua
└── schema.lua
~~~

其中，最为重要的是`handler.lua`和`schema.lua`这两个文件，说明如下：

* handler.lua：插件的核心文件，是一个待实现的接口，里面的每个方法会在一个请求/连接的生命周期的特定时期执行。
* schema.lua：插件有可能会保留一些配置是让用户输入的，这个模块指定了插件的配置约束和定义规则，使用户能够输入有效的配置值。

2、插件生命周期

在`handler.lua`文件中，可以通过覆盖插件的一系列生命周期回调函数，来实现自定义逻辑。

HTTP模块提供的生命周期函数：

* :init_worker()：在每个 Nginx worker 进程启动的时候执行；
* :certificate()：在SSL认证阶段执行；
* :rewrite()：请求的 rewrite 阶段执行；
* :access()：每个请求到来的时候执行；
* :response()：在接收到上游服务的整个响应之后，以及发送到客户端之前执行；
* :header_filter()：在接收到上游服务的所有响应头之后执行；
* :body_filter()：在接收到上游服务的所有响应体数据之后执行；
* :log()：所有响应数据发送到客户端后执行；

Stream模块提供的生命周期函数：

* :init_worker()：在每个 Nginx worker 进程启动的时候执行；
* :preread()：每个连接执行一次；
* :log()：每个连接关闭后执行一次；

3、插件优先级

插件之间有可能存在相互依赖的关系，Kong 通过定义插件的优先级来确保插件执行的顺序。

可以通过`PRIORITY`属性指定插件的优先级：

~~~lua
CustomHandler.PRIORITY = 10
~~~

优先级的值是一个数值，数值越大，优先级越高。

4、插件的配置

插件是可以根据用户的需求进行配置的，插件的配置信息是存储在数据库中，并且在插件执行的时候由 Kong 取出来作为参数传递到 `handler.lua`的生命周期函数中。

插件的配置信息是一个 Lua 的 table 类型数据，也称为`schema`。在通过 Admin API 启用或者更新插件的时候可以设置值，并且 Kong 也提供了对这些值进行校验的方法。

以下是`schema.lua`的一个基本定义格式：

~~~lua
local typedefs = require "kong.db.schema.typedefs"

return {
  name = "<plugin-name>",
  fields = {
    {
      -- this plugin will only be applied to Services or Routes
      consumer = typedefs.no_consumer
    },
    {
      -- this plugin will only run within Nginx HTTP module
      protocols = typedefs.protocols_http
    },
    {
      config = {
        type = "record",
        fields = {
          -- Describe your plugin's configuration's schema here.
          {
              foo = {
                  type = "string",
                  required = false,
                  default = "hello"
              }
          },
        },
      },
    },
  },
  entity_checks = {
    -- Describe your plugin's entity validation rules
  },
}
~~~

~~~shell
curl -X POST http://kong:8001/services/<service-name-or-id>/plugins \
  -d "name=my-custom-plugin" \
  -d "config.foo=bar"
~~~

详细的定义格式以及更多配置项请参阅[官方文档](https://docs.konghq.com/gateway-oss/2.2.x/plugin-development/plugin-configuration/) 。

5、插件的打包和安装

对 Kong 插件源码进行打包，可以使用常规的打包方式，即打成 `xxx.tar`的形式，但更加推荐使用的方式是使用 LuaRocks 来打包。如果是使用官方发行版安装的 Kong，就已经顺带安装了 LuaRocks ，否则需要自行安装。

使用 LuaRocks ，须首先创建一个`rockspec`文件，用于对插件包的内容进行描述。`rockspec`文件的书写格式，可以参考 [Kong 官方插件](https://github.com/Kong/kong-plugin) 已经提供的作为模板，也可以查阅 LuaRocks 的 [rockspec 文档](https://github.com/keplerproject/luarocks/wiki/Creating-a-rock) 。

安装插件：

~~~shell
luarocks make
~~~

以上命令需要在`.rockspec`文件所在目录下执行。如果存在多个`.rockspec`文件，须手动指定需要安装的`.rockspec`文件。

~~~shell
luarocks make kong-plugin-esb-ip-restriction-1.0.0-1.rockspec
~~~

打包插件：

~~~shell
# luarocks pack <plugin-name> <version>
luarocks pack kong-plugin-esb-ip-restriction 1.0.0-1
~~~

打包完成后，会生成`.rock`的打包文件，便于传输和管理。

对于`.rock`打包文件，可以使用`luarocks install`进行安装：

~~~shell
# luarocks install <rock file name>
luarocks install kong-plugin-esb-ip-restriction-1.0.0-1.all.rock
~~~

> 附：关于 LuaRocks 的更多用法，请参阅 [LuaRocks 官网](https://luarocks.org/) 、[LuaRocks 官方文档](https://github.com/luarocks/luarocks/wiki/Documentation) 。

参考资料：

* [Kong 插件开发官方指南](https://docs.konghq.com/gateway-oss/2.2.x/plugin-development/)
* [PDK 官方文档](https://docs.konghq.com/gateway-oss/2.2.x/pdk/)



<br/><br/><br/>

---

