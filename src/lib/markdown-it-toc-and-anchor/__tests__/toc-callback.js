import test from "ava"

import mdIt from "./utils/md-it"

test.cb("markdown-it-toc-and-anchor toc-callback", (t) => {
  const callback = function(tocMarkdown, tocArray, tocHtml) {
    t.is(
      tocMarkdown,
      "* [Heading](#heading)\n",
      "should work with disabled toc insertion + callback, returning toc only"
    )
    t.deepEqual(
      tocArray,
      [
        {
          content: "Heading",
          anchor: "heading",
          level: 1,
        },
      ],
      "should work with disabled toc insertion + callback, returning toc only"
    )
    t.is(
      tocHtml,
      `<ul class="markdownIt-TOC">
<li><a href="#heading">Heading</a></li>
</ul>\n`,
      "should work with disabled toc insertion + callback, returning toc only"
    )
  }

  t.is(
    mdIt(
      "# Heading",
      {
        tocCallback: callback,
      }
    ),
    "<h1 id=\"heading\">Heading</h1>\n",
    "should work with disabled toc insertion + callback, returning heading only"
  )

  t.end()
})

test.cb("markdown-it-toc-and-anchor toc-callback-toc", (t) => {
  const callback = function(tocMarkdown, tocArray, tocHtml) {
    t.is(
      tocMarkdown,
      "* [Heading](#heading)\n",
      "should work with enabled toc insertion + callback, returning toc only"
    )
    t.deepEqual(
      tocArray,
      [
        {
          content: "Heading",
          anchor: "heading",
          level: 1,
        },
      ],
      "should work with enabled toc insertion + callback, returning toc only"
    )
    t.is(
      tocHtml,
      `<ul class="markdownIt-TOC">
<li><a href="#heading">Heading</a></li>
</ul>\n`,
      "should work with enabled toc insertion + callback, returning toc only"
    )
  }

  t.is(
    mdIt(
      `@[toc]
# Heading`,
      {
        toc: true,
        tocCallback: callback,
      }
    ),
    `<p><ul class="markdownIt-TOC">
<li><a href="#heading">Heading</a></li>
</ul>
</p>
<h1 id="heading">Heading</h1>\n`,
    "should also work with callback, returning toc and heading"
  )

  t.end()
})

test.cb("markdown-it-toc-and-anchor toc-callback-md", (t) => {
  const callback = function(tocMarkdown, tocArray, tocHtml) {
    t.is(
      tocMarkdown,
      "* [Heading](#heading)\n",
      `should work with disabled toc insertion +
      callback in md options, returning toc only`
    )
    t.deepEqual(
      tocArray,
      [
        {
          content: "Heading",
          anchor: "heading",
          level: 1,
        },
      ],
      `should work with disabled toc insertion +
      callback in md options, returning toc only`
    )
    t.is(
      tocHtml,
      `<ul class="markdownIt-TOC">
<li><a href="#heading">Heading</a></li>
</ul>\n`,
      `should work with disabled toc insertion +
      callback in md options, returning toc only`
    )
  }

  t.is(
    mdIt(
      "# Heading",
      {},
      {
        tocCallback: callback,
      }
    ),
    "<h1 id=\"heading\">Heading</h1>\n",
    `should work with disabled toc insertion +
    callback in md options, returning heading only`
  )

  t.end()
})

test.cb("markdown-it-toc-and-anchor toc-callback-env", (t) => {
  const callback = function(tocMarkdown, tocArray, tocHtml) {
    t.is(
      tocMarkdown,
      "* [Heading](#heading)\n",
      `should work with disabled toc insertion +
      callback in md render env, returning toc only`
    )
    t.deepEqual(
      tocArray,
      [
        {
          content: "Heading",
          anchor: "heading",
          level: 1,
        },
      ],
      `should work with disabled toc insertion +
      callback in md render env, returning toc only`
    )
    t.is(
      tocHtml,
      `<ul class="markdownIt-TOC">
<li><a href="#heading">Heading</a></li>
</ul>\n`,
      `should work with disabled toc insertion +
      callback in md render env, returning toc only`
    )
  }

  t.is(
    mdIt(
      "# Heading",
      {},
      {},
      {
        tocCallback: callback,
      }
    ),
    "<h1 id=\"heading\">Heading</h1>\n",
    `should work with disabled toc insertion +
    callback in md render env, returning heading only`
  )

  t.end()
})