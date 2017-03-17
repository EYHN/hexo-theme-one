# 安装

在安装前请先确保安装最新的 nodejs 和 [hexo](https://hexo.io/)。

> 较旧的版本可能出现难以判断的错误

## 创建新博客（强烈建议创建新的hexo）

```
$ hexo init <folder>
$ cd <folder>
$ npm install
```

> PS： 本主题需要额外安装模块:`lodash.pick`
> 
> 在hexo目录中运行
> ```
> npm i lodash.pic --save
> ```

## clone 本主题

```
$ git clone https://github.com/EYHN/hexo-theme-one.git
```

## 安装

修改目录中的build.cson文件中的hexo路径为：

```
<hexo-folder>/themes/one
```

运行

```
$ gulp hexo
```

[回到首页](./README.md)