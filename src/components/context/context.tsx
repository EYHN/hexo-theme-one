import * as React from 'react';
import * as MarkdownIt from 'markdown-it'
import { googleTranslate } from '../../lib/translate';
import IconButton from 'material-ui/IconButton';
import TranslateIcon from 'material-ui/svg-icons/action/translate';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
let style = require("./context.less");
let markdownItTocAndAnchor = require('../../lib/markdown-it-toc-and-anchor/index.js').default;
var hljs = require('highlight.js'); // https://highlightjs.org/

require('!style-loader!css-loader!highlight.js/styles/github.css'); // https://highlightjs.org/

let md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
})
  .use(markdownItTocAndAnchor, {
    anchorLink: false
  });

interface contentProps {
  id?: string,
  className?: string,
  markdown?: boolean,
  content?: string,
  excerpt?: string,
  translate?: boolean
  toc?: (tocArray: toc[]) => void
}

export function removeHTMLTag(str: string) {
  str = str.replace(/<\/?[^>]*>/g, '');
  str = str.replace(/[ | ]*\n/g, '\n');
  str = str.replace(/ /ig, '');
  return str;
}

export interface toc {
  anchor: string,
  content: string,
  level: number
}

interface contentState {
  content: string
}

export default class Content extends React.Component<contentProps, contentState>{
  sourceText: string;
  translated: boolean;
  constructor() {
    super();
    this.state = {
      content: ""
    }
  }
  excerpt() {
    let {excerpt: e = ""} = this.props
    return removeHTMLTag(e.toString());
  }
  putHTMLin() {
    if (this.props.content) {
      if (this.state.content == "") {
        let html = this.props.content;
        if (this.props.markdown) {
          html = md.render(this.props.content, {
            tocCallback: (tocMarkdown: any, tocArray: toc[], tocHtml: any) => {
              if (this.props.toc) {
                this.props.toc(tocArray);
              }
            }
          })
        }
        this.sourceText = html;
        this.setState({
          content: html
        })
      }
    }
  }
  async translate(l:string) {
    if (this.sourceText) {
      let res = await googleTranslate("zh-CN", l, this.sourceText);
      let content = JSON.parse("\"" + res.result + "\"") as string;
      content = content.replace(/\/ /g, "/")
      console.log(content)
      this.setState({
        content: content
      })
      this.translated = true
    }
  }
  distranslate() {
    if (this.translated) {
      this.setState({
        content: this.sourceText
      })
      this.translated = false
      return false
    }
  }
  componentDidUpdate() {
    this.putHTMLin();
  }
  componentDidMount() {
    this.putHTMLin();
  }
  render() {
    let {id, className = '', translate} = this.props
    let content = this.state.content;
    if (!content || content == "") {
      content = this.excerpt();
    }
    return (
      <div id={id}>
        {
          translate ?
            <IconMenu
              iconButtonElement={<IconButton onClick={this.distranslate.bind(this)}><TranslateIcon /></IconButton>}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              maxHeight={272}
              className={style.tools}
            >
              <MenuItem primaryText="English" onClick={this.translate.bind(this,"en")} />
              <MenuItem primaryText="日本語" onClick={this.translate.bind(this,"ja")} />
            </IconMenu>
            : undefined
        }
        <div ref="body" className={className + " " + style.context} dangerouslySetInnerHTML={{ __html: content }}>
        </div>
      </div>
    )
  }
}