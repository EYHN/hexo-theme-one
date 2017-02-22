import * as React from 'react';
var style = require("./grid.less");
var cardstyle = require("../card/card.less");

interface GridProps{
  className?:string
}

export default class Grid extends React.Component<GridProps, undefined>{
  render() {
    return (
      <div className={style.Grid + " " + (this.props.className || "")}>
        { this.props.children }
      </div>
    )
  }
}