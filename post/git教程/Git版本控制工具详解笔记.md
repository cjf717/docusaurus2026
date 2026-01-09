---
title: Git版本控制工具详解笔记
date: 2023-09-11 09:00:00
categories: 编程
tags: ["git"]
---

> 说明：本笔记根据coderwhy在前端系统课《前端工程化基础》的《Git版本控制工具详解》所写笔记。

> 本教程分了2天讲解，详细分析并演示了git的各种操作。第1天遇到了本地分支和远程分支名称不一致，导致push远程仓库不成功的情况。第2天花了较多时间讲解处理此问题的方法和意见。讲清楚了tag标签和banch分支的不同作用，push中解决冲突的方法是merge合并。工作流的作用是在不同版本中开发，避免主分支出问题影响正常使用。

# 合并本地仓库与远程仓库完全不相干的项目

前言，在本地已经存在一个项目，远程仓库也存在一个项目。由于没有建立关联，直接pull或者push都会出错。

1. 添加远程仓库：`git remote add <shortname> <url>`
2. 从远程仓库fetch代码：从远程仓库获取最新的代码 `get fetch`
3. 给当前分支设置一个跟踪分支:`git branch --set-upstream-to=origin/master`
4. 合并不相干的历史: `git merge --allow-unrelated-histories`
5. 获取到代码后合并到本地仓库: `git merge`
6. 将远程仓库的代码下载到本地仓库: `git pull`
7. 将本地仓库的代码推送到远程仓库: `git push`，强制更新`git push -f`(==非必要不使用==)


## 一. 问题的处理

### 1.1. 设置上游分支(跟踪分支)

```shell
git fetch
git branch --set-upstream-to=origin/main
```



### 1.2. 合并没有共同base分支

```shell
git merge --allow-unrelated-histories
```





### 1.3. Github的使用

#### 1.3.1. GitHub的作用



#### 1.3.2. GitHub查找和下载开源项目



#### 1.3.3. GitHub创建远程仓库

```shell
# 初始化本地仓库
git init

# 添加远程仓库
git remote add origin xxxx


# 从远程仓库获取内容
git fetch
git branch --set-upstream-to=origin/main
git merge --allow-unrelated-histories

# git push
git config push.default upstream

# 换一种做法
git checkout main
```



### 1.4. Gitlab的使用







## 二. git tag

```shell
git tag v1.0.0

git tag

git tag -d v1.0.0

# 将本地tag push远程仓库
git push origin v1.0.0
git push origin --tags

# 删除远程的tag
git push origin -d v1.0.0
```





## 三. git的原理(git如何保存内容)

```shell
git add .
# .git/objects/00 40

git commit -m "aaa"
# .git/object/eb -> 提交信息/作者/tree
# .git/object/aa
# aaa.js -> 00
# bbb.js -> 40
```







## 四. 分支结构

### 4.1. 本地分支的使用

创建分支

```shell
git branch testing
git checkout testing
# 合并
git checkout -b testing
```



合并分支

```shell
git merge testing
git add .
git commit -m ""
```



查看所有的分支

```shell
git branch

# 删除本地分支
git branch -d testing
```



### 4.2. 远程分支的操作

```shell
# 初始化本地仓库
git init

# 添加远程仓库
git remote add origin xxxx


# 从远程仓库获取内容
git fetch
git branch --set-upstream-to=origin/main
git merge --allow-unrelated-histories

# git push
git config push.default upstream

# 换一种做法
git checkout main
```



推送一个远程分支:

```shell
git push origin develop

# 李四操作
git checkout develop
```



删除远程分支

```shell
git push origin -d develop
```



### 4.3. git flow工作流

第一图:

* master: 记录主要的版本
* develop: 开发版本
* topic: 新主题



第二图:

* master: 记录主要的版本
  * tag
* hotfix: 热修复
  * merge master
  * merge develop
* develop: 开发分支
* release: 上线的分支
  * merge master
  * merge develop
* feature: 新特性





### 4.4. git rebase

* 改变某一个分支base, 目的让log的历史记录更加的简洁
* 黄金原则: 不要在主分支中使用rebase





## 五. Git中常见的命令总结

基础的命令: (必须掌握)

```shell
git clone xxxxxxxx

git add .
git commit -m "xxxx"

git pull ->(git fetch + git merge)
git push
```



进阶的命令:

* main
* develop
* feature

```shell
git checkout develop
# 1.检查服务器是否有origin/develop这个分支
# 2.创建一个本地的develop分支
# 3.让本地的develop分支自动跟踪origin/develop
# 4.切换到develop分支

git add .
git commit -m ""
git pull
git push
```



高级的命令:

```shell
git tag

git checkout -b develop
git push origin develop

git merge develop
git rebase
```
