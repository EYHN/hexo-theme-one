import { toc } from '../context/context';
import * as React from 'react';
import Toc from '../toc/toc';
let style = require("./tocList.less");


interface TocListProps {
  tocArray: toc[],
  className?:string
}

export default class TocList extends React.Component<TocListProps, undefined>{
  getTocNodes(tocArray: toc[]) {
    let node: React.ReactNode[] = [];
    tocArray.forEach((value) => {
      node.push(<Toc key={value.anchor} toc={value}></Toc>);
    })
    return node;
  }
  render() {
    return (
      <ol className={style.tocList + " " + (this.props.className || "")}>
        {
          this.getTocNodes(this.props.tocArray)
        }
        {
          this.props.children
        }
      </ol>
    )
  }
}