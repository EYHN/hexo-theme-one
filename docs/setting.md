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

# uiux

## slogan <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

标语

## defaultPrimaryColor <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

默认主色

## defaultAccentColor <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

默认强调色

</br>


# head

## favicon <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

站点图标

</br>

# img

## avatar <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

用户头像

## left_pic <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

首页左边的图片

## right_pic <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

首页右边的图片（在移动端不会显示）

## post_thumbnail <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

默认文章图片

## drawerHeaderBg <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

侧边栏图片

</br>

# colorPicker <small style="font-size:14px"><i>boolean</i></small>

是否显示侧边抽屉中的取色器。默认为false

</br>

# comment

## duoshuo

## shortName <small style="font-size:14px"><i>string</i></small>

`shortName`可以在多说后台获取

</br>

# Drawer <small style="font-size:14px"><i>object[]</i></small>

> 这个稍微有点复杂,同时功能强大,最下面有例子

侧边栏列表数组

## title <small style="font-size:14px"><i>string</i></small>

侧边栏项目标题

## type <small style="font-size:14px"><i>string</i></small>

侧边栏项目类型

* sitelink: 相对站内路径
* hr: 分隔线
* page: 路由到page
* link: 绝对url (站内路径请使用sitelink)

不填写点击就没有任何反应。

## href <small style="font-size:14px"><i>string</i></small>

> 当type为 sitelink 或 link 时生效

目标url

## icon <small style="font-size:14px"><i>string</i></small>

material图标名

## nested <small style="font-size:14px"><i>object[]</i></small>

子目录数组

## initiallyOpen <small style="font-size:14px"><i>boolean</i></small>

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

[下一篇  文章 Front-matter](./Post-Front-matter.md)

[回到首页](./README.md)