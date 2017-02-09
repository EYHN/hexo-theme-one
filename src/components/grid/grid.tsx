import * as React from 'react';
var style = require("./grid.less");
var cardstyle = require("../card/card.less");

export default class Grid extends React.Component<undefined, undefined>{
  render() {
    return (
      <div className={style.Grid}>
        { this.props.children }
      </div>
    )
  }
}