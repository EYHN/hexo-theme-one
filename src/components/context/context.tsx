import * as React from 'react';
import * as $ from 'jquery'
let style = require("./context.less");

interface contextProps {
  id?:string,
  className?:string,
  html?:string,
  excerpt?:string
}

function removeHTMLTag(str: String) {
  str = str.replace(/<\/?[^>]*>/g, '');
  str = str.replace(/[ | ]*\n/g, '\n');
  str = str.replace(/ /ig, '');
  return str;
}

export default class Context extends React.Component<contextProps, undefined>{
  excerpt() {
    let {excerpt: e = ""} = this.props
    return removeHTMLTag(e.toString());
  }
  putHTMLin()
  {
    if(this.props.html){
      $(this.refs['body']).html(this.props.html)
    }
  }
  componentDidMount() {
    this.putHTMLin();
  }
  componentDidUpdate(){
    this.putHTMLin();
  }
  render() {
    let {id,className = ''} = this.props
    return (
      <div id={id} ref="body" className={className + " " + style.context}>
        {
          this.excerpt()
        }
      </div>
    )
  }
}