# ELK运维文档(DTX)

---

> 注意：ELK各个服务需要按照一定的顺序启动，ElasticSearch-->Logstash-->filebeat。

### 1、ElasticSearch

ElasticSearch不能以root用户启动，需切换到elasticsearch用户。

~~~shell
su elasticsearch
~~~

启动服务：

~~~shell
# 启动节点一
sh /DTXPM/elk/execute/start_es_node_1.sh

# 启动节点二（如果没有部署节点二则不需要启动）
sh /DTXPM/elk/execute/start_es_node_2.sh
~~~

关闭服务：

~~~shell
# kill 进程id
ps -ef|grep elasticsearch
kill -9 <pid>
~~~

### 2、Logstash

启动服务：

~~~shell
sh /DTXPM/elk/execute/start_logstash.sh
~~~

关闭服务：

~~~shell
# kill 进程id
ps -ef|grep logstash
kill -9 <pid>
~~~

### 3、filebeat

启动服务：

~~~shell
# 各个采集客户端分别启动（129、130、140、148）
sh /DTXPM/elk/execute/start_filebeat.sh
~~~

关闭服务：

~~~shell
# kill 进程id
ps -ef|grep filebeat
kill -9 <pid>
~~~

### 4、elasticsearch-head

启动服务：

~~~shell
sh /DTXPM/elk/execute/start_elasticsearch_head.sh
~~~

关闭服务：

~~~shell
# kill 进程id
ps -ef|grep elasticsearch_head
kill -9 <pid>
~~~

### 5、kibana

启动服务：

~~~shell
# 启动英文版
sh /DTXPM/elk/execute/start_kibana.sh

# 启动汉化版本
sh /DTXPM/elk/execute/start_kibana_CN.sh
~~~

关闭服务：

~~~shell
# kill 进程id
ps -ef|grep kibana
kill -9 <pid>
~~~

> 注：kibana的身份验证是基于Nginx的，因此要确保Nginx的正常启动运行。



<br/><br/><br/>

---

