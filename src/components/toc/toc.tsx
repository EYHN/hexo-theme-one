import { toc } from '../context/context';
import * as React from 'react';
let style = require("./toc.less")

interface TocProps {
  toc:toc
}

export default class Toc extends React.Component<TocProps, undefined>{
  render(){
    return (
      <li className={style.toc}>
        <a className={style.tocLink}>{this.props.toc.content}</a>
      </li>
    )
  }
}