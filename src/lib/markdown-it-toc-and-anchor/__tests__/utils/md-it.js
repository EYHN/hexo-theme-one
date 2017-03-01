import markdownIt from "markdown-it"

import markdownItTocAndAnchor from "../../../src"

export default (md, options = {}, mdOptions = {}, renderEnv = {}) => {
  const mdIt = markdownIt({
    html: true,
    linkify: true,
    typography: true,

    ...mdOptions,
  })
    .use(markdownItTocAndAnchor, {

      // disable main features
      // make tests easier to write
      toc: false,
      anchorLink: false,

      ...options,
    })

  const mdRender = []
  if (typeof md === "string") {
    return mdIt.render(md, renderEnv)
  }
  else if (md.constructor === Array) {
    for (const s of md) {
      mdRender.push(mdIt.render(s, renderEnv))
    }
    return mdRender
  }
}
