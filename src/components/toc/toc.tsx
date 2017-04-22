import { toc } from '../context/context';
import * as React from 'react';
import * as _ from 'underscore';
let style = require("./toc.less")

interface TocProps {
  toc:toc,
  secondLevel?:boolean,
  active?:boolean,
  read?:Function,
  unread?:Function
}

export default class Toc extends React.Component<TocProps, undefined>{
  scrollListener:any;
  readed:boolean;
  componentDidMount()
  {
    let bodyDom = $("body");
    let windowDom = $(window);
    let listenDom = $("#" + this.props.toc.anchor);
    this.scrollListener = _.throttle((e:JQueryEventObject)=>{
      if (listenDom.offset().top <= bodyDom.scrollTop() + listenDom.height() + 64) {
        if(this.readed == false){
          this.props.read();
        }
        this.readed = true;
      } else {
        if(this.readed == true){
          this.props.unread();
        }
        this.readed = false;
      }
    },100);
    $(window).scroll(this.scrollListener)
  }
  componentWillUnmount()
  {
    $(window).unbind("scroll", this.scrollListener);
  }
  onClickLink(){
    $("html,body").animate({scrollTop:$("#" + this.props.toc.anchor).offset().top - 64})
  }
  render(){
    return (
      <li className={style.Toc + " " + (this.props.active?style.active:"") + " " + (this.props.secondLevel?style.secondLevel:"")}>
        <a className={style.tocLink} onClick={this.onClickLink.bind(this)}>{this.props.toc.content}</a>
      </li>
    )
  }
}