# ELK环境安装部署教程(DTX)

---

## 1、简介

ELK分别代表ElasticSearch、Logstash和Kibana。

ElasticSearch：是一个基于Lucene的开源分布式搜索服务器。它的特点有：分布式，零配置，自动发现，索引自动分片，索引副本机制，restful风格接口，多数据源，自动搜索负载等。它提供了一个分布式多用户能力的全文搜索引擎，基于RESTful web接口。ElasticSearch是用Java开发的，并作为Apache许可条款下的开放源码发布，是第二流行的企业搜索引擎。设计用于云计算中，能够达到实时搜索，稳定，可靠，快速，安装使用方便。 在ElasticSearch中，所有节点的数据是均等的。

Logstash：是一个完全开源的工具，它可以对你的日志进行收集、过滤、分析，支持大量的数据获取方法，并将其存储供以后使用（如搜索）。说到搜索，Logstash带有一个web界面，搜索和展示所有日志。一般工作方式为c/s架构，client端安装在需要收集日志的主机上，server端负责将收到的各节点日志进行过滤、修改等操作在一并发往ElasticSearch上去。

Kibana：是一个基于浏览器页面的ElasticSearch 前端展示工具，也是一个开源和免费的工具，Kibana可以为 Logstash 和 ElasticSearch 提供的日志分析友好的 Web 界面，可以帮助您汇总、分析和搜索重要数据日志。

## 2、环境准备

### 2.1、目录结构

~~~plaintext
/DTXPM
|--elk
   |--config
   |--execute
   |--src
~~~

说明：config目录用于存放配置文件，execute目录用于存放执行脚本文件，src目录用于存放安装程序。安装程序可自行下载，为了与本教程兼容，推荐直接使用本教程src目录下提供的安装程序。

### 2.2、安装JDK8

ELK环境需要JDK8的支持，因此需要安装JDK8。为了不破坏系统原有的JDK环境，此处只是安装JDK8，不需要配置到环境变量。如果系统已经安装JDK8，可略过该步骤。

~~~shell
cd /DTXPM/elk/src
cp jdk-8u192-linux-x64.tar.gz ../jdk-8u192-linux-x64.tar.gz
cd ..
tar -zvxf jdk-8u192-linux-x64.tar.gz
~~~

### 2.3、安装NodeJS

安装NodeJS：

~~~shell
cd /DTXPM/elk/src
cp node-v8.11.4-linux-x64.tar.gz ../node-v8.11.4-linux-x64.tar.gz
cd ..
tar -zvxf node-v8.11.4-linux-x64.tar.gz
mv node-v8.11.4-linux-x64 nodejs
~~~

配置NodeJS环境变量：

~~~shell
vim /etc/profile
~~~

在最后添加如下内容：

~~~plaintext
#set nodejs environment variables
export NODE_HOME=/DTXPM/elk/nodejs
export PATH=$NODE_HOME/bin:$PATH
~~~

使环境变量生效：

~~~shell
source /etc/profile
~~~

验证NodeJS是否安装成功：

~~~shell
node --version
npm --version
~~~

## 3、安装Filebeat

### 3.1Linux服务器安装Filebeat

filebeat为日志采集客户端，需安装在产生日志的机器上，如`10.7.210.129`、`10.7.210.130`、`10.7.210.140`。filebeat安装方法如下（129、130、140每一台机器都要安装，各个机器的目录结构与ELK服务器目录结构保持一致 [参照2.1]）：

~~~shell
cd /DTXPM/elk/src
cp filebeat-6.4.2-linux-x86_64.tar.gz ../filebeat-6.4.2-linux-x86_64.tar.gz
cd ..
tar -zvxf filebeat-6.4.2-linux-x86_64.tar.gz
mv filebeat-6.4.2-linux-x86_64 filebeat
~~~

添加配置文件：

~~~shell
cd /DTXPM/elk/filebeat
vim filebeat.dtx.yml
~~~

各个配置文件如下：

1）10.7.210.129配置

~~~plaintext
#========== input configuration ==========
filebeat.inputs:
#---------- dtx-web-log ----------
- type: log
  enabled: false
  paths:
    - /DTXPM/tomcat_8080/logs/webDtx.log
  fields:
    app_id: dtx-web
    log_type: app
    log_level: info
  multiline.pattern: '^\d{2}:\d{2}:\d{2},\d{3}'
  multiline.negate: true
  multiline.match: after

#---------- dtx-web-error-log ----------
- type: log
  enabled: true
  paths:
    - /DTXPM/tomcat_8080/logs/webDtx_error.log
  fields:
    app_id: dtx-web
    log_type: app
    log_level: error
  multiline.pattern: '^\d{2}:\d{2}:\d{2},\d{3}'
  multiline.negate: true
  multiline.match: after

#---------- dtx-web-access-log ----------
- type: log
  enabled: true
  paths:
    - /DTXPM/nginx/logs/access.log
  fields:
    app_id: dtx-web
    log_type: access


#---------- dtx-portal-log ----------
- type: log
  enabled: false
  paths:
    - /DTXPM/tomcat_8888/logs/portal.log
  fields:
    app_id: dtx-portal
    log_type: app
    log_level: info
  multiline.pattern: '^\d{2}:\d{2}:\d{2},\d{3}'
  multiline.negate: true
  multiline.match: after

#---------- dtx-portal-error-log ----------
- type: log
  enabled: true
  paths:
    - /DTXPM/tomcat_8888/logs/portal_error.log
  fields:
    app_id: dtx-portal
    log_type: app 
    log_level: error
  multiline.pattern: '^\d{2}:\d{2}:\d{2},\d{3}'
  multiline.negate: true
  multiline.match: after

#---------- dtx-portal-access-log ----------
- type: log
  enabled: true
  paths:
    - /DTXPM/tomcat_8888/logs/localhost_access_log*txt
  fields:
    app_id: dtx-portal
    log_type: access



#========== output configuration ==========
output.logstash:
  hosts: ["10.7.210.146:5044"]

~~~

2）10.7.210.130配置

~~~plaintext
#========== input configuration ==========
filebeat.inputs:
#---------- dtx-service-log ----------
- type: log
  enabled: false
  paths:
    - /DTXPM/common_service/Dtx_Service/logs/dtxService.log
  fields:
    app_id: dtx-service
    log_type: app
    log_level: info
  multiline.pattern: '^\d{2}:\d{2}:\d{2},\d{3}'
  multiline.negate: true
  multiline.match: after

#---------- dtx-service-error-log ----------
- type: log
  enabled: true
  paths:
    - /DTXPM/common_service/Dtx_Service/logs/dtxService_error.log
  fields:
    app_id: dtx-service
    log_type: app
    log_level: error
  multiline.pattern: '^\d{2}:\d{2}:\d{2},\d{3}'
  multiline.negate: true
  multiline.match: after



#========== output configuration ==========
output.logstash:
  hosts: ["10.7.210.146:5044"]

~~~

3）10.7.210.140配置

~~~plaintext
#========== input configuration ==========
filebeat.inputs:
#---------- dtx-workflow-info-log ----------
- type: log
  enabled: false
  paths:
    - /DTXPM/common_service/Workflow_Server/logs/workflow_server_info.log
  fields:
    app_id: dtx-workflow
    log_type: app
    log_level: info
  multiline.pattern: '^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}:\d{3}\]'
  multiline.negate: true
  multiline.match: after

#---------- dtx-workflow-warn-log ----------
- type: log
  enabled: true
  paths:
    - /DTXPM/common_service/Workflow_Server/logs/workflow_server_warn.log
  fields:
    app_id: dtx-workflow
    log_type: app
    log_level: warn
  multiline.pattern: '^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}:\d{3}\]'
  multiline.negate: true
  multiline.match: after

#---------- dtx-workflow-error-log ----------
- type: log
  enabled: true
  paths:
    - /DTXPM/common_service/Workflow_Server/logs/workflow_server_error.log
  fields:
    app_id: dtx-workflow
    log_type: app
    log_level: error
  multiline.pattern: '^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}:\d{3}\]'
  multiline.negate: true
  multiline.match: after



#========== output configuration ==========
output.logstash:
  hosts: ["10.7.210.146:5044"]

~~~

添加启动脚本(129、130、140服务器分别配置启动脚本)

~~~shell
vim /DTXPM/elk/execute/start_filebeat.sh
~~~

脚本内容：

~~~shell
cd /DTXPM/elk/filebeat
nohup ./filebeat -e -c /DTXPM/elk/filebeat/filebeat.dtx.yml > /dev/null 2>&1 &
exit
~~~

查看filebeat是否启动成功：

~~~shell
ps -ef|grep filebeat
~~~

### 3.2Windows服务器安装Filebeat

filebeat在Windows系统下的安装配置（以10.7.210.148为例）：

下载Windows版本的filebeat安装包（或直接使用本教程src目录下提供的安装包），然后上传至Windows服务器的对应目录下（D:\Dtx\elk），解压安装包并重命名为`filebeat`。

在`filebeat`目录下，新建`filebeat.dtx.yml`文件，内容如下：

~~~plaintext
#========== input configuration ==========
filebeat.inputs:
#---------- dtx-wechatapi-info-log ----------
- type: log
  enabled: false
  paths:
    - d:\log\WeChatApi\info.log
  encoding: gbk # Windows下日志文件如果是gbk编码格式，需要指定
  fields:
    app_id: dtx-wechatapi
    log_type: app
    log_level: info
  multiline.pattern: '^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
  multiline.negate: true
  multiline.match: after

#---------- dtx-wechatapi-warn-log ----------
- type: log
  enabled: true
  paths:
    - d:\log\WeChatApi\warn.log
  encoding: gbk
  fields:
    app_id: dtx-wechatapi
    log_type: app
    log_level: warn
  multiline.pattern: '^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
  multiline.negate: true
  multiline.match: after

#---------- dtx-wechatapi-error-log ----------
- type: log
  enabled: false
  paths:
    - d:\log\WeChatApi\error.log
  encoding: gbk
  fields:
    app_id: dtx-wechatapi
    log_type: app
    log_level: error
  multiline.pattern: '^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
  multiline.negate: true
  multiline.match: after


#---------- dtx-wechatapi-oa-log ----------
- type: log
  enabled: true
  paths:
    - d:\log\OA\*.log
  fields:
    app_id: dtx-wechatapi-oa
    log_type: app
  multiline.pattern: '^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}'
  multiline.negate: true
  multiline.match: after



#========== output configuration ==========
output.logstash:
  hosts: ["10.7.210.146:5044"]

~~~

验证filebeat是否可以启动，以管理员身份运行PowerShell：

~~~shell
cd D:\Dtx\elk\filebeat
.\filebeat -e -c filebeat.dtx.yml
~~~

若能正常输出启动信息，则说明能启动。

为了能让filebeat后台运行，需将filebeat注册为Windows服务，filebeat提供了`install-service-filebeat.ps1`脚本用于注册服务。因为我们自定义了filebeat配置文件（`filebeat.dtx.yml`），因此需要将`install-service-filebeat.ps1`脚本中的配置文件名称进行修改。用记事本打开`install-service-filebeat.ps1`文件，找到14行的如下内容：

~~~plaintext
-binaryPathName "`"$workdir\filebeat.exe`" -c `"$workdir\filebeat.yml`" -path.home `"$workdir`" -path.data `"C:\ProgramData\filebeat`" -path.logs `"C:\ProgramData\filebeat\logs`""
~~~

将其中的配置文件名称`-c `"$workdir\filebeat.yml`"`重新指定为我们自定义的文件：

~~~plaintext
-binaryPathName "`"$workdir\filebeat.exe`" -c `"$workdir\filebeat.dtx.yml`" -path.home `"$workdir`" -path.data `"C:\ProgramData\filebeat`" -path.logs `"C:\ProgramData\filebeat\logs`""
~~~

修改完成后，在PowerShell中执行这个脚本（PowerShell必须以管理员身份运行）：

~~~shell
.\install-service-filebeat.ps1
~~~

如果提示没有权限，请尝试以下命令运行：

~~~shell
PowerShell.exe -ExecutionPolicy UnRestricted -File .\install-service-filebeat.ps1
~~~

出现注册成功提示后，可以到Windows服务里面启动、停止、重启filebeat服务了，也可以将filebeat服务设置为开机自动启动。

相似的，filebeat目录下的`uninstall-service-filebeat.ps1`用于卸载服务，更多详细信息请查阅[参考文档](https://blog.csdn.net/qq_21383435/article/details/79463832)。

> 附：关于filebeat的配置文件，可在本教程config目录下获取到。filebeat的更多配置信息请参考[filebeat官方文档](https://www.elastic.co/guide/en/beats/filebeat/current/index.html)。

## 4、安装Logstash

安装logstash：

~~~shell
cd /DTXPM/elk/src
cp logstash-6.4.2.tar.gz ../logstash-6.4.2.tar.gz
cd ..
tar -zvxf logstash-6.4.2.tar.gz
mv logstash-6.4.2 logstash
~~~

添加用户：

~~~shell
groupadd logstash
useradd logstash -g logstash -p logstash
passwd logstash
#提示输入密码

chmod u+x /DTXPM/elk/logstash
chown -R logstash:logstash /DTXPM/elk/logstash
chmod 777 /DTXPM/elk/logstash
~~~

修改配置：

~~~shell
cd /DTXPM/elk/logstash/config/

vim jvm.options 
# 将jvm参数改为512m
-Xms512m
-Xmx512m

vim startup.options
# 修改如下内容
LS_HOME=/DTXPM/elk/logstash
LS_SETTINGS_DIR=/DTXPM/elk/logstash/config
LS_USER=logstash
LS_GROUP=logstash

vim logstash.yml
# 修改如下内容
http.host: "0.0.0.0"
http.port: 9600-9700

cd /DTXPM/elk/logstash/bin/
vim logstash
# 在开头加入以下内容，指定使用JDK8

#set jdk8
export JAVA_CMD=/DTXPM/elk/jdk1.8.0_192/bin
export JAVA_HOME=/DTXPM/elk/jdk1.8.0_192
~~~

模拟采集：

~~~shell
su logstash
cd /DTXPM/elk/logstash/bin
./logstash -e 'input { stdin { } } output { stdout { codec => rubydebug } }'
~~~

执行该命令后等到控制台有信息输出，然后输入任意内容，能看到相应内容即安装成功。

Logstash配置：

~~~shell
vim /DTXPM/elk/config/logstash-dtx.conf
~~~

内容如下：

~~~plaintext
input {
  beats {
    host => "0.0.0.0"
    port => 5044
  }
}

filter {
  if [fields][log_type] == "access" {
    grok {
      match => {
        "message" => "%{COMBINEDAPACHELOG}"
        #"message" => "%{IPORHOST:clientip} %{USER:identity} %{USER:auth} \[%{HTTPDATE:accesstime}\] \"(?:%{WORD:requestmethod} %{URIPATHPARAM:request}(?: HTTP/%{NUMBER:httpversion})?|-)\" %{NUMBER:responsecode} (?:%{NUMBER:responsebytes}|-)"
      }
    }
    mutate {
      convert => {
        "response" => "integer"
        "bytes" => "integer"
      }
    }
    useragent {
      source => "agent"
      target => "user_agent"
    }
    geoip {
      source => "clientip"
      target => "geoip"
      database => "/DTXPM/elk/logstash/GeoLite2-City.mmdb"
      add_field => [ "[geoip][coordinates]", "%{[geoip][longitude]}" ]
      add_field => [ "[geoip][coordinates]", "%{[geoip][latitude]}" ]
    }
    mutate {
      convert => [ "[geoip][coordinates]", "float" ]
    }
  }

  mutate {
    remove_field => ["@version", "beat", "tags", "offset", "prospector", "host"]
  }
}

output {
  elasticsearch {
    hosts => ["127.0.0.1:9200"]
    index => "logstash-%{[fields][app_id]}-%{[fields][log_type]}-%{+YYYY.MM.dd}"
  }
}
~~~

启动脚本：

~~~shell
vim /DTXPM/elk/execute/start_logstash.sh
~~~

内容如下：

~~~shell
nohup sh /DTXPM/elk/logstash/bin/logstash -f /DTXPM/elk/config/logstash-dtx.conf > /dev/null 2>&1 &
exit
~~~

启动验证：

~~~shell
ps -ef|grep logstash
~~~

> 附：Logstash更多配置信息，请参考[Logstash官方文档](https://www.elastic.co/guide/en/logstash/current/index.html)。

## 5、安装ElasticSearch

### 5.1、安装ES

> 注：ES可安装多个节点，因资源限制，DTX暂定只安装一个节点。

1）节点一：es-node-1

~~~shell
cd /DTXPM/elk
mkdir elasticsearch

cd /DTXPM/elk/src
cp elasticsearch-6.4.2.tar.gz ../elasticsearch/elasticsearch-6.4.2.tar.gz
cd ../elasticsearch
tar -zvxf elasticsearch-6.4.2.tar.gz
mv elasticsearch-6.4.2 es-node-1
~~~

修改配置：

~~~shell
cd /DTXPM/elk/elasticsearch/es-node-1/config

vim elasticsearch.yml
# 修改内容如下
cluster.name: cluster-es-dtx
node.name: es-node-1
path.data: /DTXPM/data/elasticsearch/data/es-node-1
path.logs: /DTXPM/data/elasticsearch/logs/es-node-1
network.host: 0.0.0.0
http.port: 9200
transport.tcp.port: 9300
node.max_local_storage_nodes: 2
bootstrap.memory_lock: false
bootstrap.system_call_filter: false
http.cors.enabled: true
http.cors.allow-origin: "*"
discovery.zen.ping.unicast.hosts: ["10.7.210.146:9300", "10.7.210.146:9400"]
discovery.zen.minimum_master_nodes: 2
node.master: true
node.data: true

vim jvm_options
# 调整jvm参数为512m
-Xms512m
-Xmx512m
~~~

添加环境变量：

~~~shell
vim /etc/profile
~~~

添加内容如下：

~~~plaintext
ES_CLASSPATH=/DTXPM/elk/elasticsearch/es-node-1
PATH=$PATH:$ES_CLASSPATH:$ES_CLASSPATH/bin:$ES_CLASSPATH/lib/elasticsearch-6.4.2.jar:$ES_CLASSPATH/lib/*
export PATH
~~~

使环境变量生效：

~~~shell
source /etc/profile
~~~

添加目录和用户：

~~~shell
mkdir /DTXPM/data/elasticsearch/data/es-node-1
mkdir /DTXPM/data/elasticsearch/logs/es-node-1

groupadd elasticsearch
useradd elasticsearch -g elasticsearch -p elasticsearch
passwd elasticsearch
#提示输入密码

## 设置可执行权限
chmod u+x  /DTXPM/elk/elasticsearch/es-node-1
## 设置目录权限
chown -R elasticsearch:elasticsearch /DTXPM/elk/elasticsearch/es-node-1
chown -R elasticsearch:elasticsearch /DTXPM/data/elasticsearch/data/es-node-1
chown -R elasticsearch:elasticsearch /DTXPM/data/elasticsearch/logs/es-node-1
## 在没有读写权限的情况下设置读写权限
chmod 777 /DTXPM/elk/elasticsearch/es-node-1
chmod 777 /DTXPM/data/elasticsearch/data/es-node-1
chmod 777 /DTXPM/data/elasticsearch/logs/es-node-1
~~~

启动脚本指定JDK8：

~~~shell
vim /DTXPM/elk/elasticsearch/es-node-1/bin/elasticsearch
~~~

~~~plaintext
# Optionally, exact memory values can be set using the `ES_JAVA_OPTS`. Note that
# the Xms and Xmx lines in the JVM options file must be commented out. Example
# values are "512m", and "10g".
#
#   ES_JAVA_OPTS="-Xms8g -Xmx8g" ./bin/elasticsearch

#set jdk8 
export JAVA_HOME=/DTXPM/elk/jdk1.8.0_192
export PATH=$JAVA_HOME/bin:$PATH

source "`dirname "$0"`"/elasticsearch-env

ES_JVM_OPTIONS="$ES_PATH_CONF"/jvm.options
JVM_OPTIONS=`"$JAVA" -cp "$ES_CLASSPATH" org.elasticsearch.tools.launchers.JvmOptionsParser "$ES_JVM_OPTIONS"`
ES_JAVA_OPTS="${JVM_OPTIONS//\$\{ES_TMPDIR\}/$ES_TMPDIR} $ES_JAVA_OPTS"

#judge jdk8
if [ -x "$JAVA_HOME/bin/java" ]; then
  JAVA="/DTXPM/elk/jdk1.8.0_192/bin/java"
else
  JAVA=`which java`
fi

cd "$ES_HOME"
# manual parsing to find out, if process should be detached
~~~

2）节点二：es-node-2

直接复制节点一：

~~~shell
cd /DTXPM/elk/elasticsearch
cp -r es-node-1 es-node-2
~~~

修改相关配置：

~~~shell
cd /DTXPM/elk/elasticsearch/es-node-2/config
vim elasticsearch.yml
~~~

~~~plaintext
cluster.name: cluster-es-dtx
node.name: es-node-2
path.data: /DTXPM/data/elasticsearch/data/es-node-2
path.logs: /DTXPM/data/elasticsearch/logs/es-node-2
network.host: 0.0.0.0
http.port: 9201
transport.tcp.port: 9400
node.max_local_storage_nodes: 2
bootstrap.memory_lock: false
bootstrap.system_call_filter: false
http.cors.enabled: true
http.cors.allow-origin: "*"
discovery.zen.ping.unicast.hosts: ["10.7.210.146:9300", "10.7.210.146:9400"]
discovery.zen.minimum_master_nodes: 2
node.master: true
node.data: true
~~~

~~~shell
mkdir /DTXPM/data/elasticsearch/data/es-node-2
mkdir /DTXPM/data/elasticsearch/logs/es-node-2

## 设置可执行权限
chmod u+x  /DTXPM/elk/elasticsearch/es-node-2
## 设置目录权限
chown -R elasticsearch:elasticsearch /DTXPM/elk/elasticsearch/es-node-2
chown -R elasticsearch:elasticsearch /DTXPM/data/elasticsearch/data/es-node-2
chown -R elasticsearch:elasticsearch /DTXPM/data/elasticsearch/logs/es-node-2
## 在没有读写权限的情况下设置读写权限
chmod 777 /DTXPM/elk/elasticsearch/es-node-2
chmod 777 /DTXPM/data/elasticsearch/data/es-node-2
chmod 777 /DTXPM/data/elasticsearch/logs/es-node-2
~~~

3）启动验证

~~~shell
su elasticsearch

#前台启动
sh /DTXPM/elk/elasticsearch/es-node-1/bin/elasticsearch
sh /DTXPM/elk/elasticsearch/es-node-2/bin/elasticsearch

#后台启动
sh /DTXPM/elk/elasticsearch/es-node-1/bin/elasticsearch -d
sh /DTXPM/elk/elasticsearch/es-node-2/bin/elasticsearch -d

#查看日志
tail -f /DTXPM/data/elasticsearch/logs/es-node-1/cluster-es-dtx.log
tail -f /DTXPM/data/elasticsearch/logs/es-node-2/cluster-es-dtx.log
~~~

4）常见报错及解决方法

①问题一

~~~plaintext
[1]: max file descriptors [4096] for elasticsearch process is too low, increase to at least [65536]
~~~

~~~plaintext
## 如果是centos6，修改以下文件
vim /etc/security/limits.conf
## 如果是centos7，修改以下文件
vim /etc/security/limits.d/20-nproc.conf

# 添加以下内容
elasticsearch soft nofile 65536
elasticsearch hard nofile 65536

# 再执行
sysctl -p
~~~

②问题二

~~~plaintext
[2]: max number of threads [1024] for user [elasticsearch] is too low, increase to at least [4096]
~~~

~~~plaintext
su root
vim /etc/security/limits.d/90-nproc.conf

# 添加如下内容
elasticsearch soft nproc 4096
~~~

③问题三

~~~plaintext
[3]: max virtual memory areas vm.max_map_count [65530] is too low, increase to at least [262144]
~~~

~~~plaintext
su root
vim /etc/sysctl.conf

# 添加如下内容
vm.max_map_count=262144

# 再执行
sysctl -p
~~~

5）查看ES集群状态

~~~shell
# 查看集群状态
curl http://10.7.210.146:9200/_cat/health?v

# 查看集群所有索引
curl http://10.7.210.146:9200/_cat/indices?v

# 查看集群master状态
curl http://10.7.210.146:9200/_cat/master?v

# 删除索引
# curl -XDELETE 'ip:port/索引名称?pretty'
curl -XPUT -H 'Content-Type: application/json' http://10.7.210.146:9200/_all/_settings -d '{"index.blocks.read_only_allow_delete": null}'
~~~

6）启动脚本

start_es_node_1.sh

~~~shell
vim /DTXPM/elk/execute/start_es_node_1.sh
~~~

~~~shell
sh /DTXPM/elk/elasticsearch/es-node-1/bin/elasticsearch -d && tail -f /DTXPM/data/elasticsearch/logs/es-node-1/cluster-es-dtx.log
~~~

start_es_node_2.sh

~~~shell
vim /DTXPM/elk/execute/start_es_node_2.sh
~~~

~~~shell
sh /DTXPM/elk/elasticsearch/es-node-2/bin/elasticsearch -d && tail -f /DTXPM/data/elasticsearch/logs/es-node-2/cluster-es-dtx.log
~~~

7）启动验证

~~~shell
ps -ef|grep elastic
~~~

### 5.2、安装elasticsearch-head

elasticsearch-head是一个用于监控查看ES的Web项目。

~~~shell
# 检查git，没有就安装
git --version
yum install -y git

#下载elasticsearch-head
cd /DTXPM/elk/elasticsearch
git clone git://github.com/mobz/elasticsearch-head.git

# 更改目录权限
chmod 777 elasticsearch-head/
chown -R elasticsearch:elasticsearch elasticsearch-head/
chmod u+x elasticsearch-head/

# 修改elasticsearch-head的连接地址
vim /DTXPM/elk/elasticsearch/elasticsearch-head/_site/app.js
# 修改第4360行，如下
this.base_uri = this.config.base_uri || this.prefs.get("app-base_uri") || "http://10.7.210.146:9200";


cd /DTXPM/elk/elasticsearch/elasticsearch-head
npm install
npm run start
~~~

elasticsearch-head项目启动成功后，打开浏览器，输入`http://localhost:9100/`，即可查看。

启动脚本：

~~~shell
vim /DTXPM/elk/execute/start_elasticsearch_head.sh
~~~

~~~shell
cd /DTXPM/elk/elasticsearch/elasticsearch-head && nohup npm run start >/dev/null 2>&1 &
exit
~~~

## 6、安装Kibana

### 6.1、安装Kibana

安装：

~~~shell
cd /DTXPM/elk/src
cp kibana-6.4.2-linux-x86_64.tar.gz ../kibana-6.4.2-linux-x86_64.tar.gz
cd ..
tar -zvxf kibana-6.4.2-linux-x86_64.tar.gz
mv kibana-6.4.2-linux-x86_64 kibana
~~~

配置文件：

~~~shell
vim /DTXPM/elk/kibana/config/kibana.dtx.yml
~~~

~~~plaintext
server.port: 5601
server.host: "10.7.210.146"
server.name: "kibana-dtx"
elasticsearch.url: "http://10.7.210.146:9200"
elasticsearch.username: "elasticsearch"
elasticsearch.password: "elasticsearch"
kibana.index: ".kibana"
tilemap.url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
~~~

启动脚本：

~~~shell
vim /DTXPM/elk/execute/start_kibana.sh
~~~

~~~shell
nohup sh /DTXPM/elk/kibana/bin/kibana --config /DTXPM/elk/kibana/config/kibana.dtx.yml > /dev/null 2>&1 &
exit
~~~

启动验证：

~~~shell
ps -ef|grep kibana
~~~

打开浏览器，访问`http://10.7.210.146:5601/`。

### 6.2、Kibana汉化

为了不破坏原有的版本，重新安装一个kibana用于汉化。

~~~shell
cd /DTXPM/elk/src
cp kibana-6.4.2-linux-x86_64.tar.gz ../kibana-6.4.2-linux-x86_64.tar.gz
cd ..
tar -zvxf kibana-6.4.2-linux-x86_64.tar.gz
mv kibana-6.4.2-linux-x86_64 kibana_CN
~~~

配置文件：

~~~shell
vim /DTXPM/elk/kibana_CN/config/kibana.dtx.yml
~~~

~~~plaintext
server.port: 5602
server.host: "10.7.210.146"
server.name: "kibana-dtx"
elasticsearch.url: "http://10.7.210.146:9200"
elasticsearch.username: "elasticsearch"
elasticsearch.password: "elasticsearch"
kibana.index: ".kibana"
tilemap.url: 'http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=7&x={x}&y={y}&z={z}'
~~~

可以先启动一下看能否正常访问：

~~~shell
sh /DTXPM/elk/kibana_CN/bin/kibana --config /DTXPM/elk/kibana_CN/config/kibana.dtx.yml
~~~

打开浏览器，访问`http://10.7.210.146:5602/`。

安装汉化工具：

~~~shell
# 下载汉化工具（本教程src目录下已经下载，可直接使用，略过该步骤）
cd /DTXPM/elk/src
git clone https://github.com/anbai-inc/Kibana_Hanization.git

cp master.zip ../master.zip
cd ..
unzip master.zip

cd /DTXPM/elk/Kibana_Hanization-master/old/

# 需要安装Python环境，若无，请先安装
python --version

# 进行汉化，指定需要汉化的kibana目录
python main.py /DTXPM/elk/kibana_CN
~~~

再次启动看是否汉化成功：

~~~shell
sh /DTXPM/elk/kibana_CN/bin/kibana --config /DTXPM/elk/kibana_CN/config/kibana.dtx.yml
~~~

打开浏览器，访问`http://10.7.210.146:5602/`。

启动脚本：

~~~shell
vim /DTXPM/elk/execute/start_kibana_CN.sh
~~~

~~~shell
nohup sh /DTXPM/elk/kibana_CN/bin/kibana --config /DTXPM/elk/kibana_CN/config/kibana.dtx.yml > /dev/null 2>&1 &
exit
~~~

启动验证：

~~~shell
ps -ef|grep kibana
~~~

打开浏览器，访问`http://10.7.210.146:5602/`。

### 6.3、Kibana添加身份验证

使用Nginx进行身份验证，因此需要先安装Nginx。

~~~shell
# 查看nginx已安装模块
./sbin/nginx -V

# 结果 
configure arguments: --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.35

# 安装依赖包
yum install pcre-devel openssl-devel gcc curl

# 创建openssl密码  
openssl passwd

# 连续两次输入密码
Password: 
Verifying - Password: 
XXXXXXXXXXXX

vim /usr/local/nginx/htpasswd.users
# 用户名:加密后的密码
gdcn_admin:XXXXXXXXXXXX


# 修改nginx主配置文件
vim /usr/local/nginx/conf/nginx.conf
# 在最后一个 } 前引入子配置
include vhosts/*.conf;


# 创建子配置 
vim /usr/local/nginx/conf/vhosts/kibana.conf
# 输入以下内容
server {
    listen 8602;
    server_name 10.7.210.146;
    auth_basic "Restricted Access";
    auth_basic_user_file /usr/local/nginx/htpasswd.users;
    location / {
        proxy_pass http://10.7.210.146:5602;
    }
}


cd /usr/local/nginx/sbin/
# 检查配置
./nginx -t

# 启动Nginx
./nginx

# 重新加载
./nginx -s reload
~~~

打开浏览器，访问`http://10.7.210.146:8602/`。

##  7、其它事项

1、kibana、elasticsearch-head如果访问不通，检查防火墙是否开启对应端口。

~~~shell
vim /etc/sysconfig/iptables

-A INPUT -p tcp -m state --state NEW -m tcp --dport 5044 -j ACCEPT
#-A INPUT -p tcp -m state --state NEW -m tcp --dport 5601 -j ACCEPT
#-A INPUT -p tcp -m state --state NEW -m tcp --dport 5602 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 8601 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 8602 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 9100 -j ACCEPT
-A INPUT -p tcp -m state --state NEW -m tcp --dport 9200 -j ACCEPT

service iptables restart
~~~

2、Tomcat的访问日志如果没有添加User-Agent部分，可手动修改配置：

~~~shell
vim ${CATALINA_HOME}/conf/server.xml
~~~

~~~xml
<Valve className="org.apache.catalina.valves.AccessLogValve" directory="logs" prefix="localhost_access_log." suffix=".txt" pattern="%h %l %u %t &quot;%r&quot; %s %b &quot;%{Referer}i&quot; &quot;%{User-Agent}i&quot;" />
~~~

## 参考文档

* [ELK - 快速搭建一套稳定的ELK环境](https://shimo.im/docs/INivcTCUe1kizSdA)
* [第一节 ELK - 整体规划](https://shimo.im/docs/ifnvMlIrUukRkCiN/)
* [第二节 ELK -  filebeat 6.2.4](https://shimo.im/docs/uZ0h6RloZv0308kR/)
* [第三节  ELK - logstash 6.2.4](https://shimo.im/docs/KYuUfiRi3aAKIT52)
* [第四节 ELK - elasticsearch 6.2.4](https://shimo.im/docs/mucJEYgNvR4dBAQQ/read)
* [第五节 ELK - kibana 6.2.4](https://shimo.im/docs/IhQBQxpVzagEPwCX/read)
* [第六节  ELK - 踩坑之路](https://shimo.im/docs/YPSKpgSko6kqCXvb/read)
* [第七节  ELK - 优化方案](https://shimo.im/docs/xkbwftYfNCgXVW41/read)
* [第八节 ELK - Metricbeat](https://shimo.im/docs/tZamwn2TzsU9p4iW/read)
* [第九节 ELK -  APM 服务监控](https://shimo.im/docs/bU5oT4F3OY8crg8p/read)
* [ELK实时日志分析平台环境部署](https://www.cnblogs.com/kevingrace/p/5919021.html)



<br/><br/><br/>

---

