import * as React from 'react';
import * as ReactDOM from 'react-dom'
const duoshuocss = require("!style!css!less!../duoshuocss/embed.less")

const js = require("!file-loader!./embed.min.js");
const marked = require("!file-loader!./marked.min.js");

$("body").append(`<script src="${js}" />`);
$("body").append(`<script src="${marked}" />`);

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
