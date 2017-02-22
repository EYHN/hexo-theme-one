import * as React from 'react';
import * as _ from "underscore"
import * as $ from "jquery"
let style = require("./fixedAt.less")

interface FixedAtProps extends React.HTMLProps<HTMLDivElement> {
  fixedHeight:number
}

interface FixedAtState {
  className: string;
}

export default class FixedAt extends React.Component<FixedAtProps, FixedAtState>{
  scrollListener: (e: any) => void;
  constructor(){
    super();
    this.state = {
      className:""
    }
  }
  componentDidMount() {
    let bodyDom = $("body");
    let windowDom = $(window);
    let top = true;
    let oldScrollTop = bodyDom.scrollTop();
    this.scrollListener = _.throttle((e: any) => {
      let scrollTop = bodyDom.scrollTop()
      if (scrollTop < this.props.fixedHeight) {
        if (this.state.className != "") {
          this.setState({
            ...this.state,
            className: ""
          });
        }
      } else if (this.state.className != style.fixed) {
        this.setState({
          ...this.state,
          className: style.fixed
        });
      }
      oldScrollTop = scrollTop;
    }, 40);
    this.scrollListener({});
    $(window).scroll(this.scrollListener);
  }
  componentWillUnmount() {
    $(window).unbind("scroll", this.scrollListener);
  }
  render(){
    let divProps = {
      ...this.props
    }
    delete divProps.fixedHeight;
    return (
      <div {
        ...divProps
      } ref="listenObj" className={
        (this.props.className || "") + " " + this.state.className
      }>
        {
          this.props.children
        }
      </div>
    )
  }
}