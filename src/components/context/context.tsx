import * as React from 'react';
import { googleTranslate } from '../../lib/translate';
import IconButton from 'material-ui/IconButton';
import TranslateIcon from 'material-ui/svg-icons/action/translate';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
let style = require("./context.less");

interface contentProps {
  id?: string,
  className?: string,
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
  loadToc: boolean = false;
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
        this.sourceText = html;
        this.setState({
          content: html
        })
        setTimeout(() => {
          this.props.toc($(this.refs["body"]).find("a.headerlink").toArray().map((dom) => {
            return {
              anchor: $(dom).parent().attr("id"),
              content: $(dom).parent().text(),
              level: parseInt($(dom).parent()[0].tagName.charAt(1))
            }
          }));
        }, 0)
        this.loadToc = true;
      }
    }
  }
  async translate(l: string) {
    if (this.sourceText) {
      let res = await googleTranslate("zh-CN", l, this.sourceText);
      let content = JSON.parse("\"" + res.result + "\"") as string;
      content = content.replace(/\/ /g, "/")
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
  renderContent() {
    let content = this.state.content;
    if (!content || content == "") {
      content = this.excerpt();
    }
    $(this.refs['body']).html(content);
  }
  componentDidUpdate() {
    this.putHTMLin();
    this.renderContent();
  }
  componentDidMount() {
    this.putHTMLin();
    this.renderContent();
  }
  render() {
    let {id, className = '', translate} = this.props
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
              <MenuItem primaryText="English" onClick={this.translate.bind(this, "en")} />
              <MenuItem primaryText="日本語" onClick={this.translate.bind(this, "ja")} />
            </IconMenu>
            : undefined
        }
        <div ref="body" className={className + " " + style.context} id="post-content">
        </div>
      </div>
    )
  }
}