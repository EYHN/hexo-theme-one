import * as React from 'react';
import * as ReactDOM from 'react-dom'
const duoshuocss = require("!style!css!less!../duoshuocss/embed.less")

const MaterialIconseot = require("../../../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.eot");
const MaterialIconsttf = require("../../../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.ttf");
const MaterialIconswoff = require("../../../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff");
const MaterialIconswoff2 = require("../../../../../node_modules/material-design-icons/iconfont/MaterialIcons-Regular.woff2");

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
        <style>
          {
            `
            @font-face {
              font-family: 'Material Icons';
              font-style: normal;
              font-weight: 400;
              src: url(${MaterialIconseot}); /* For IE6-8 */
              src: local('Material Icons'),
                  local('MaterialIcons-Regular'),
                  url(${MaterialIconswoff2}) format('woff2'),
                  url(${MaterialIconswoff}) format('woff'),
                  url(${MaterialIconsttf}) format('truetype');
            }
            `
          }
        </style>
        <div ref="cp-duoshuo"></div>
      </div>
    );
  }
}
