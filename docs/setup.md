# 安装

在安装前请先确保安装最新的 nodejs 和 [hexo](https://hexo.io/)。

> 较旧的版本可能出现难以判断的错误

## 创建新博客（强烈建议创建新的hexo）

```
$ hexo init <hexo-folder>
$ cd <hexo-folder>
$ npm install
```

> PS： 本主题需要额外安装模块:`lodash.pick`
> 
> 在hexo目录中运行
> ```
> npm i lodash.pick --save
> ```

## clone 本主题

```
$ git clone https://github.com/EYHN/hexo-theme-one.git
$ cd hexo-theme-one
$ npm i
```

## 安装

修改目录中的build.cson文件中的hexo路径为：

```
<hexo-folder>/themes/one
```

运行

```
$ npm run hexo
```

[下一篇 基本设置](./setting.md)

[回到首页](./README.md)