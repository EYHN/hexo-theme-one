# 页面 Front-matter


</br>
## 简介

Front-matter 是文件最上方以 --- 分隔的区域，用于指定个别文件的变量，举例来说：

```
title: Hello World
date: 2013/7/13 20:46:25
---
```

</br>

## JSON Front-matter

除了 YAML 外，你也可以使用 JSON 来编写 Front-matter，只要将 --- 代换成 ;;; 即可。

> ```
> "title": "Hello World",
> "date": "2013/7/13 20:46:25"
> ;;;
> ```

# 参数

| 参数       | 描述      | 默认值       |
|:---------:|:---------:|:----------:|
title       | 标题       | -
date        | 建立日期    | 文件建立日期
comments    | 是否开启评论功能 | 默认为 true
thumbnail   | 页面图片    | -
primarycolor| 文章主色    | -
accentcolor | 文章强调色  | -
background  | 开启背景     | 默认为 true
toc         | 开启toc导航  | 默认为 true
html        | 跳过markdown解析 | 默认为 false

[下一篇 颜色](./color.md)

[回到首页](./README.md)