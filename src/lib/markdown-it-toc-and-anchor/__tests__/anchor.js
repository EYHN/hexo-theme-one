import test from "ava"

import mdIt from "./utils/md-it"

test("markdown-it-toc-and-anchor anchor", (t) => {
  t.is(
    mdIt(
      `@[toc]
# 'Heading' ?
# $.lel!
# $.lel?
`,
      { anchorLink: true }
    ),
/* eslint-disable max-len */
  `<p></p>
<h1 id="heading"><a class="markdownIt-Anchor" href="#heading">#</a> 'Heading' ?</h1>
<h1 id="lel"><a class="markdownIt-Anchor" href="#lel">#</a> $.lel!</h1>
<h1 id="lel-2"><a class="markdownIt-Anchor" href="#lel-2">#</a> $.lel?</h1>\n`,
/* eslint-enable max-len */
    "should add anchors"
  )

  t.is(
    mdIt(
      `@[toc]
# 'Heading' ?
# $.lel!
# $.lel?
`,
      {
        anchorLink: true,
        anchorLinkBefore: false,
      }
    ),
/* eslint-disable max-len */
  `<p></p>
<h1 id="heading">'Heading' ? <a class="markdownIt-Anchor" href="#heading">#</a></h1>
<h1 id="lel">$.lel! <a class="markdownIt-Anchor" href="#lel">#</a></h1>
<h1 id="lel-2">$.lel? <a class="markdownIt-Anchor" href="#lel-2">#</a></h1>\n`,
/* eslint-enable max-len */
    "should add anchors after"
  )

  t.is(
    mdIt(
      `@[toc]
# Heading`,
      {
        anchorLink: true,
        anchorClassName: "anchor",
        anchorLinkSymbol: "",
        anchorLinkSymbolClassName: "octicon octicon-link",
        anchorLinkSpace: false,
      }
    ),
    `<p></p>
<h1 id="heading"><a class="anchor" href="#heading">` +
    "<span class=\"octicon octicon-link\"></span></a>Heading</h1>\n",
    "should support GitHub style anchor link"
  )
})
