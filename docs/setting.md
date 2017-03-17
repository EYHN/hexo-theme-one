# 基本设置

下列设置中标注支持数组的，若没有明确说明，就是指允许接收数组数据在前端随机选择。

例如：

```
head:
    favicon: 
      - "/img/favicon.png"
      - "/img/favicon2.png"
```
上述设置可以随机站点图标。

</br>

# head

## slogan <font size="2">string | string[] 支持数组</font>

标语

## defaultPrimaryColor <font size="2">string | string[] 支持数组</font>

默认主色

## defaultAccentColor <font size="2">string | string[] 支持数组</font>

默认强调色

</br>


# head

## favicon <font size="2">string | string[] 支持数组</font>

站点图标

</br>

# img

## avatar <font size="2">string | string[] 支持数组</font>

用户头像

## left_pic <font size="2">string | string[] 支持数组</font>

首页左边的图片

## right_pic <font size="2">string | string[] 支持数组</font>

首页右边的图片（在移动端不会显示）

## post_thumbnail <font size="2">string | string[] 支持数组</font>

默认文章图片

## drawerHeaderBg <font size="2">string | string[] 支持数组</font>

侧边栏图片

</br>

# comment

## duoshuo

## shortName <font size="2">string</font>

`shortName`可以在多说后台获取

</br>

# Drawer <font size="2">object[]</font>

> 这个稍微有点复杂,同时功能强大,最下面有例子

侧边栏列表数组

## title <font size="2">string</font>

侧边栏项目标题

## type <font size="2">string</font>

侧边栏项目类型

* sitelink: 相对站内路径
* hr: 分隔线
* page: 路由到page
* link: 绝对url (站内路径请使用sitelink)

不填写点击就没有任何反应。

## href <font size="2">string</font>

> 当type为 sitelink 或 link 时生效

目标url

## icon <font size="2">string</font>

material图标名

## nested <font size="2">object[]</font>

子目录数组

## initiallyOpen <font size="2">boolean</font>

> 当指定nested时生效

为`true`时默认展开

例：

```
Drawer:
    -
      title: 首页
      type: sitelink
      href: /
      icon: home
    -
      title: hr
      type: hr
    -
      title: 关于我
      type: page
      name: 关于我
      icon: account_circle
    -
      title: Indox
      initiallyOpen: true
      icon: inbox
      nested:
        - 
          title: Starred
          type: link
          href: "https://www.baidu.com/"
          icon: search
```