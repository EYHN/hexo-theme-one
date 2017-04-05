# 安装

在安装前请先确保安装最新的 nodejs 和 [hexo](https://hexo.io/)。

> 较旧的版本可能出现难以预料的错误

## 创建新博客

>强烈建议创建新的hexo

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

将本主题设置为hexo默认主题。（在站点配置文件里将默认主题字段设置为与存放主题的文件夹相同的值）

并重命名主题目录中的 `_config.yml.example` 为 `_config.yml`，依据需要进行修改。

## 设置

请继续阅读文档。

**如果设置过程中遇到问题可以查看 [huaji8.top 的配置](https://github.com/EYHN/HexoBlogKit)**

> 设置中标注「支持数组」的，若没有明确说明，就是指允许接收数组数据在前端随机选择。

[下一篇 基本设置](./setting.md)

[回到首页](./README.md)