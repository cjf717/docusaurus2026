---
title: git常用操作
date: 2023-09-07 13:50:45
categories: 编程
tags: [git]
---

## git 规范管理代码
### 提交规范

```
git add .
// git commit -m "first commit"
npm run commit
// git remote add origin git@gitee.com:jeff-chan/***.git
// git remote add origin https://gitee.com/jeff-chan/***/.git
git push -u origin "master"
```

### 分支操作

创建分支
我们在计算机上只能访问本地分支，在将分支推送到远程仓库之前，需要先创建一个本地分支。
可以使用以下命令来创建分支：

```
git checkout <branch>
```

加上-b 就可以在创建新的分支之后，直接切换到新创建的分支上：

```
git checkout -b <branch>
```

如果想将新建的本地分支推送到远程仓库，以在远程仓库添加这个分支。可以执行以下命令：

```
git push -u origin <branch>
```

### 取消修改

取消修改有三种情况：

- 1）未使用 git add
  未将修改文件添加到暂存区，可以使用以下命令来撤销所有还没有加入到缓存区的修改：
  ```
  git checkout -- <filename>
  ```
  需要注意，此文件不会删除新建的文件，因为新建的文件还没加入到 Git 管理系统中，所以对 Git 来说事未知的，需要手动删除。
- 2）已使用 git add
  已将修改文件添加到暂存区，未使用 git commit 提交缓存这种情况下，相当于撤销了 git add 命令对于文件修改的缓存：
  `git reset HEAD <filename>`
  上面的命令可以撤销指定文件的缓存，要想放弃所有文件的缓存，可以执行以下命令：
  git reset HEAD
  需要注意，在使用此命令后，本地的修改并不会消失，而会回到第一种情况。要想撤销本地的修改，执行第一种情况中的命令即可。
  除此之外，还可以指定返回到 N 次提交之前的阶段，执行以下命令即可：
  ```
  git reset HEAD~N
  ```
  这样就能退回到 n 个版本之前，同样不会修改本地文件的内容，这些新的内容会变成未更新到缓存区的状态。
- 3）已使用 git commit
  已提交缓存这种情况下，可以使用以下命令来回退到上一次 commit 的状态：
  ```
  git reset --hard HEAD^
  ```
  也可以使用以下命令来回退到任意版本：
  `git reset --hard <commit_id>`
  注意，使用 git log 命令来查看 git 提交历史和 commit id。

### 恢复删除内容

这是一个很重要的命令，假如你回退到某个旧版本，现在想恢复到新版本，又找不到新版本的 commit id 怎么办？Git 提供了下面的命令用来记录每一次命令：

```
git reflog show HEAD
git reflog
```

执行之后输出如下：(略)

可以看到，最左侧黄色字体就是修改的 commit id，根据这个 id 就可以将代码恢复到对应节点位置。`HEAD@{n}`表示 HEAD 更改历史记录，最近的操作在上面。
假如需要把代码回退到 HEAD@{5}处，可以执行以下命令：

```
git reset --hard HEAD@{5}
```

或者执行下面的命令：

```
git reset --hard 8a0fd74
```

需要注意，如果有任何本地修改，该命令也会将其销毁，因此在 reset 之前建议使用 stash 将本地修改储存。

### 标签操作

- （1）展示标签: `git tag`
- （2）创建标签: `git tag <tag_name>`
  git tag v1.0.0
  通常遵循的命名模式如下：
  ```
  v<major>.<minor>.<patch>
  ```
  major（主版本号）：重大变化
  minor（次要版本号）：版本与先前版本兼容
  patch（补丁号）：bug 修复
  除此之外，我们还可以为特定的 commit 创建标签，其命令格式如下：
  ```
  git tag <tagname> <commit_sha>
  ```
  以上面的的形式创建的标签都属于轻量标签，下面来看看如何创建一个附注标签。
  在创建标签时，可以添加一个-a 标志以创建一个带备注的标签，备注信息使用-m message 来指定：
  ```
  git tag -a <tagname> -m "<message>"
  ```
- （3）推送标签
  标签创建完成之后就可以使用以下命令将其推送到远程仓库：
  ```
  git push origin --tags
  ```
  以上命令会将本地所有 tag 都推送到远程仓库。如果想推送指定标签，可以执行以下命令：
  ```
  git push origin <tagname>
  ```
- （4）切换标签
  可以使用以下命令来切换标签：
  ```
  git checkout <tagname>
  ```
- （5）删除标签
  可以使 用以下命令来删除本地仓库指定标签：
  ```
  git tag -d <tagname>
  ```
  可以使用以下命令来删除远程仓库指定标签：
  ```
  git push origin :refs/tags/<tagname>
  ```
  也可以使用以下命令来删除远程仓库的指定标签：
  ```
  git push origin --delete <tagname>
  ```
- （6）拉取标签
  可以使用以下命令来将远程仓库的标签拉取（同步）到当前分支：
  ```
  git fetch --tags
  ```
- （7）检出标签
  检出标签实际上就是在标签的基础上进行其他开发或操作。需要以标签指定的版本为基础版本，新建一个分支，继续其他的操作。执行以下命令即可：
  ```
  git checkout -b <branch> <tagname>
  ```

### github pages 配置

- github 发布静态网站所在目录只能是根目录或者 docs，要在 hexo 中发布文件夹为 public 作为目录，使用 git subtree 命令。[参考文章](https://blog.csdn.net/mrliucx/article/details/125574957)
  1. 建立新的分支 github-pages。
  2. subtree push 到远程仓库。如果存在多个仓库，需要指定仓库。
  3. 选择 github 发布的分支。

```
git checkout -b github-pages
git subtree push --prefix=public github github-pages
```

参考文章：

- 前端充电宝(CUGGZ)[公众号](https://mp.weixin.qq.com/s/Ua-sHxolJ6f2QwTEkQrA0Q)
