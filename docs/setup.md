# 安装

在安装前请先确保安装最新的 nodejs 和 [hexo](https://hexo.io/)。

> 较旧的版本可能出现难以预料的错误

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
> 完成安装即可，无需更多设置。

## 下载本主题

在[https://github.com/EYHN/hexo-theme-one/releases](https://github.com/EYHN/hexo-theme-one/releases)下载最新版本的主题，解压到hexo的themes目录.

## 安装

将本主题设置为hexo默认主题。

并重命名主题目录中的 `_config.yml.example` 为 `_config.yml`

[下一篇 基本设置](./setting.md)

[回到首页](./README.md)