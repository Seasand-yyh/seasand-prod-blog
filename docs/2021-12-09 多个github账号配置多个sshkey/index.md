# 多个github账号配置多个sshkey

---

同一台电脑的同一个sshkey无法配置到多个github账号。例如公司电脑的sshkey配置到公司的github账号后，就无法再使用同一个key配置到个人的github账号。这时候需要生成多个sshkey，分别配置给不同的github账户。

1、生成sshkey

~~~shell
cd ~/.ssh
ssh-keygen -t rsa -C "123456789@qq.com" -f ~/.ssh/id_rsa
ssh-keygen -t rsa -C "987654321@qq.com" -f ~/.ssh/id_rsa2
~~~

2、将生成的sshkey分别添加到对应的github账号后台

3、添加配置文件

~~~shell
cd ~/.ssh
vim config
~~~

~~~plaintext
Host github.com
HostName github.com
User 123456789@qq.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa

Host github2.com
HostName github.com
User 987654321@qq.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa2
~~~

> 附：按照该格式可以继续添加更多配置，例如gitlab、gitee、或者Git私服IP地址。

4、测试

~~~shell
ssh -T git@github.com
ssh -T git@github2.com
~~~

若出现 `Hi xxx! You've successfully authenticated, but GitHub does not provide shell access.` 则表示成功。

5、配置sshkey代理

~~~shell
# 查看
ssh-add -l
#The agent has no identities. #表示没有代理

# 添加
ssh-add ~/.ssh/id_rsa
ssh-add ~/.ssh/id_rsa2

# 删除
ssh-add -D
~~~

> 注：若出现 `Could not open a connection to your authentication agent.`，则执行一下 `ssh-agent bash` 即可。

6、远程地址修改

对于添加了非默认key的github账号，仓库的远程地址要对应地作出修改。

将 `github.com` 改为 `github2.com`：

~~~plaintext
# 新仓库
git clone git@github2.com:{账户名}/{仓库}

# 已经存在的仓库
git remote set-url origin git@github2.com:{账户名}/{仓库}
# 或者
git remote rm origin
git remote add origin git@github2.com:{账户名}/{仓库}
~~~



<br/><br/><br/>

---

