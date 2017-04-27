import { toc } from '../context/context';
import * as React from 'react';
import Toc from '../toc/toc';
let style = require("./tocList.less");


interface TocListProps {
  tocArray: toc[],
  className?:string
}

interface TocListState {
  tocIndex: number
}

export default class TocList extends React.Component<TocListProps, TocListState>{
  readA:Set<number> = new Set();
  updateIndex(){
    let index:number = 0;
    this.readA.forEach((value)=>{
      index = Math.max(value,index);
    })
    this.setState({
      tocIndex: index
    });
  }
  getTocNodes(tocArray: toc[]) {
    let firstLevel:number = tocArray
      .map((value)=>value.level)
      .reduce((pre, cur) => Math.min(pre, cur),999)
    let node: React.ReactNode[] = [];
    tocArray.forEach((value,index) => {
      let isSecondLevel = value.level !== firstLevel
      node.push(<Toc key={value.anchor} toc={value} secondLevel={isSecondLevel} active={index == this.state.tocIndex} read={()=>{
        this.readA.add(index);
        this.updateIndex();
      }} unread={
        ()=>{
          this.readA.delete(index);
          this.updateIndex();
        }
      }
      ></Toc>);
    })
    return node;
  }
  constructor(){
    super();
    this.state = {
      tocIndex:0
    }
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