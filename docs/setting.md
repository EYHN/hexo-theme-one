# 基本设置

> 主题目录下_config.yml的简单设置。

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

# 标语

slogan <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

# 默认主色

defaultPrimaryColor <small style="font-size:14px"><i>string | string[ ] 支持数组</i></small>

# 默认强调色

defaultAccentColor <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

</br>


# head

## 站点图标

favicon <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

</br>

# img 图像

## 用户头像 (avater)

avatar <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

## 首页左边的图片

left_pic <small style="font-size:14px"><i>string | string[] 支持数组</i></small>


## 首页右边的图片（在移动端不会显示）

right_pic <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

## 默认文章图片

post_thumbnail <small style="font-size:14px"><i>string | string[] 支持数组</i></small>

## 侧边栏图片

drawerHeaderBg <small style="font-size:14px"><i>string | string[] 支持数组</i></small>


</br>

# colorPicker <small style="font-size:14px"><i>boolean</i></small>

是否显示侧边抽屉中的取色器。默认为false

</br>

# comment 评论框

## disqus
disqus: shortName: "xxx"
填入自己的shortname即可。
> 现已停止对多说的支持。

</br>

# Drawer 侧边栏抽屉

<small style="font-size:14px"><i>object[]</i></small>

> 本功能略微复杂,但功能亦很强大,最下面有示例。

## 侧边栏列表数组

title <small style="font-size:14px"><i>string</i></small>


## 侧边栏项目标题

type <small style="font-size:14px"><i>string</i></small>

侧边栏项目类型

* sitelink: 相对站内路径
* hr: 分隔线
* page: 路由到page
* link: 绝对url (站内路径请使用sitelink)

不填写点击就没有任何反应。

> href <small style="font-size:14px"><i>string</i></small>：当type为 sitelink 或 link 时生效

## 目标url

icon <small style="font-size:14px"><i>string</i></small>

## material图标名

nested <small style="font-size:14px"><i>object[]</i></small>

## 子目录数组

initiallyOpen <small style="font-size:14px"><i>boolean</i></small>

> 当指定nested时生效

为`true`时默认展开

例如：

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