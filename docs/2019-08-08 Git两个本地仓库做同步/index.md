# Git两个本地仓库做同步

---

1、创建目录用于测试

~~~plaintext
mkdir G:/team/workspaces/seasand/git/repo
mkdir G:/team/workspaces/seasand/git/workspace
mkdir G:/team/workspaces/seasand/git/workspace/user1
mkdir G:/team/workspaces/seasand/git/workspace/user2
~~~

2、初始化一个裸仓库作为公共库

~~~plaintext
git init --bare G:/team/workspaces/seasand/git/repo/demo.git
~~~

3、分别在各自的用户目录下克隆仓库

~~~plaintext
cd G:/team/workspaces/seasand/git/workspace/user1

git clone file:///G:/team/workspaces/seasand/git/repo/demo.git

git config user.name user1
git config user.email user1@demo.com
~~~

~~~plaintext
cd G:/team/workspaces/seasand/git/workspace/user2

git clone file:///G:/team/workspaces/seasand/git/repo/demo.git

git config user.name user2
git config user.email user2@demo.com
~~~

4、各自做commit、push、pull等操作。



<br/><br/><br/>

---

