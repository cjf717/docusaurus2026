---
title: MarkDown添加图片的三种方式
date: 2023-02-01 15:37:56
categories: 编程
tags: ['markdown']
cover: https://file.crazywong.com/gh/jerryc127/butterfly_cdn@2.1.0/top_img/index.jpg
---

Markdown 插入图片有三种方法，各种 Markdown 编辑器的插图方式也都包含在这三种方法之内。
插图最基础的格式：

> `![Alt text](图片链接 'optional title')`

## 插入本地图片

只需要在基础语法的括号中填入图片的位置路径即可，支持绝对路径和相对路径。
例如：

```
![avatar](/home/picture/1.png)

```

## 插入网络图片

只需要在基础语法的括号中填入图片的网络链接即可，现在已经有很多免费/收费图床和方便传图的小工具可选。
例如：

```
![avatar](http://baidu.com/pic/doge.png)

```

![网络图片](https://file.crazywong.com/gh/jerryc127/CDN/img/butterfly-docs-01-cover.png)

## 把图片存入 markdown 文件

用 base64 转码工具把图片转成一段字符串，然后把字符串填到基础格式中链接的那个位置。
基础用法：

```
![avatar](data:image/png;base64,iVBORw0......)
```

这个时候会发现插入的这一长串字符串会把整个文章分割开，非常影响编写文章时的体验。如果能够把大段的 base64 字符串放在文章末尾，然后在文章中通过一个 id 来调用，文章就不会被分割的这么乱了。
比如：

```
![avatar][doge]

[doge]:data:image/png;base64,iVBORw0......
```

然后，base64 的图片编码如何得来？

图片转化为 base64 字符串

```python
import base64
f=open（'723.png'，'rb'）#二进制方式打开图文件
ls_f=base64.b64encode（f.read（））#读取文件内容，转换为base64编码
f.close（）
print（ls_f）
```

base64 字符串转化为图片

```python
import base64
bs='iVBORWOKGgOAAAANSUhEUg..'  # 太长了省略
imgdata=base64.b64decode(bs)
file=open('2.jpg','wb')
file.write(imgdata)
file.close()
```

代码区域

```
[base64str]: data:image/png;base64,iVBORw0KGg...
```
