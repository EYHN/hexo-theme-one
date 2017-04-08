# 高级设置

## head

如果你想在 `html` 文档 `head` 标签中添加内容可以在 `source` 文件夹中创建 .md 或 .html 文件，文件头必须为

```
layout: 'head'
---
```

<details open>
<summary>例子: </summary>

这是我添加 `piwik` 服务的例子。

/source/piwik.html
``` html
layout: 'head'
---
<!-- Piwik -->
<script type="text/javascript">
  var _paq = _paq || [];
  /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  (function() {
    var u="//piwik.huaji8.top/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', '1']);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
  })();
</script>
<!-- End Piwik Code -->
```

</details>