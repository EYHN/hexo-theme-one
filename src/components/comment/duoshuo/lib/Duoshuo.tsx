import * as React from 'react';
import * as ReactDOM from 'react-dom'
import * as MarkdownIt from 'markdown-it'

if (typeof window.duoshuoQuery !== "undefined"){
  window.mdIt = new MarkdownIt({
    html: true,
    linkify: true
  });

  const duoshuocss = require("!style!css!less!../duoshuocss/embed.less")

  const js = require("!raw-loader!./embed.min.js");

  $("body").append(`<script>${js}</script>`);
}

interface DuoshuoProps {
    thread: string,
    shortName: string,
    url: string,
    author: string
}

declare const DUOSHUO:any;

export default class Duoshuo extends React.Component<DuoshuoProps, undefined>{
  static defaultProps = {
    shortName: '',
    thread: '',
    url: ''
  }
  constructor() {
    super();
  }
  _fresh() {
    let {
      thread,
      url,
      author
    } = this.props;
    url = url || window.location.toString();
    let container = $(this.refs["cp-duoshuo"])[0];
    let el = document.createElement('div');
    el.setAttribute('data-thread-key', thread);
    el.setAttribute('data-url', url);
    el.setAttribute('data-title', thread);
    el.setAttribute('data-author-key', author);
    container.innerHTML = '';
    container.appendChild(el);
    DUOSHUO.EmbedThread(el);
  }
  componentDidMount() {
    this._fresh();
  }
  render() {
    return (
      <div>
        <div ref="cp-duoshuo"></div>
      </div>
    );
  }
}
