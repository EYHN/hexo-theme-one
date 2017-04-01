# 文章 Front-matter

下列设置中标注支持数组的，若没有明确说明，就是指允许接收数组数据在前端随机选择。

</br>

Front-matter 是文件最上方以 --- 分隔的区域，用于指定个别文件的变量，举例来说：

```
title: Hello World
date: 2013/7/13 20:46:25
---
```

</br>

## JSON Front-matter

除了 YAML 外，你也可以使用 JSON 来编写 Front-matter，只要将 --- 代换成 ;;; 即可。

```
"title": "Hello World",
"date": "2013/7/13 20:46:25"
;;;
```

# 参数

| 参数       | 描述      | 备注       |
|:---------:|:---------:|:----------:|
title       | 标题       |            |
date        | 建立日期    | 文件建立日期 |
tags        | 标签       |            |
categories  | 分类       |            |
thumbnail: 支持数组 文章图片
primarycolor: 支持数组 文章主色
accentcolor: 支持数组 文章强调色

[下一篇  页面 Front-matter](./Page-Front-matter.md)

[回到首页](./README.md)