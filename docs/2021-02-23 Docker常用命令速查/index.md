# Docker常用命令速查

---

### 镜像相关

1、查看镜像

~~~shell
docker images
docker image ls
~~~

2、查询镜像

~~~shell
docker search <image-name>
docker search ubuntu
~~~

3、拉取镜像

~~~shell
docker pull <image-name>:<tag>

docker pull ubuntu
# 等价于默认latest
docker pull ubuntu:latest

# 拉取指定版本
docker pull ubuntu:15.10
~~~

4、删除镜像

~~~shell
docker rmi <image-name>:<tag>
docker rmi ubuntu:15.10
~~~

5、生成镜像

~~~shell
docker commit -m="message" -a="author" <container-id> <image-name>:<tag>

docker commit -m="test message" -a="tester" a6543d6f4389f test/ubuntu:1.0
~~~

6、构建镜像

~~~shell
docker build -t <image-name>:<tag> <Dockerfile path>

docker build -t test/centos:6.7 ./Dockerfile
~~~

7、设置镜像标签

~~~shell
docker tag <image-id> <image-name>:<tag>

docker tag a6543d6f4389f test/centos:dev
~~~

### 容器相关

1、启动容器

~~~shell
docker run <image-name>:<tag> <command>

# 启动容器
docker run ubuntu:15.10 /bin/echo "Hello world"

# 启动容器，指定-i、-t进入交互模式
docker run -i -t ubuntu /bin/bash

# 启动容器，--name指定名称
docker run --name myubuntu ubuntu /bin/bash

# 启动容器，指定-d进入后台模式
docker run -d ubuntu /bin/bash

# 指定-rm，容器退出时自动清理容器内部的文件系统
docker run --rm ubuntu cat etc/resolv.conf
~~~

2、指定端口映射

~~~shell
# 使用-P随机映射端口
docker run -P ubuntu /bin/bash

# 使用-p指定映射端口
docker run -p 8080:8080 ubuntu /bin/bash
docker run -p 127.0.0.1:8080:8080 ubuntu /bin/bash
docker run -p 127.0.0.1:8080:8080/udp ubuntu /bin/bash

# 查看端口映射
docker port <container-id>
~~~

3、查看容器

~~~shell
# 查看当前正在运行的容器
docker ps

# 查看所有容器
docker ps -a

# 查看最后一次创建的容器
docker ps -l
~~~

4、查看容器日志

~~~shell
docker logs <container-id>
docker logs -f <container-id>
~~~

5、启动、停止、重启容器

~~~shell
# 启动
docker start <container-id>

# 停止
docker stop <container-id>

# 重启
docker restart <container-id>
~~~

6、查看容器内部进程

~~~shell
docker top <container-id>
~~~

7、容器的配置和状态信息

~~~shell
docker inspect <container-id>
~~~

8、进入容器

~~~shell
# 进入容器，当从这个容器退出时，会导致容器停止
docker attach <container-id>

# 进入容器，当从这个容器退出时，容器不会停止（推荐）
docker exec -it <container-id> /bin/bash
~~~

9、导入导出

~~~shell
# 导出容器
docker export <container-id> > <filename>
docker export 767d87asae56fd > ubuntu.tar

# 导入容器
cat docker/ubuntu.tar | docker import - test/ubuntu:v1
# 或者
docker import http://example.com/exampleimage.tgz example/imagerepo
~~~

10、删除容器

~~~shell
docker rm <container-id>
docker rm -f <container-id>

# 清理掉所有处于终止状态的容器
docker container prune
~~~

### 仓库相关

1、登入仓库

~~~shell
docker login
~~~

2、登出仓库

~~~shell
docker logout
~~~

3、查询

~~~shell
docker search ubuntu
~~~

4、拉取

~~~shell
docker pull ubuntu
~~~

5、推送

~~~shell
docker push <image-name>:<tag>
~~~

### 网络相关

~~~shell
# 新建网络，-d参数指定网络类型，有bridge、overlay，其中overlay用于Swarm mode
docker network create -d bridge <network-name>
docker network create -d bridge mynet

# 新建两个容器，通过--network指定在同一个网络下
docker run -itd --name test1 --network mynet ubuntu /bin/bash
docker run -itd --name test2 --network mynet ubuntu /bin/bash

# ping测试联通性
ping test2
ping test1
~~~

### 传输文件

~~~shell
# 宿主机复制文件到容器
docker cp ./kong-2.2.0.el7.amd64.rpm <container-id>:/root/apps/

# 容器复制文件到宿主机
docker cp <container-id>:/root/apps/kong-2.2.0.el7.amd64.rpm /usr/
~~~



<br/><br/><br/>

---

