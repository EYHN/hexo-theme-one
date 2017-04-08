import * as React from 'react';
import * as _ from 'underscore';
let style = require("./fixedAt.less")

interface FixedAtProps extends React.HTMLProps<HTMLDivElement> {
  fixedHeight:number
  fixedClassName?:string
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
      } else if (this.state.className != style.fixed + " " + this.props.fixedClassName) {
        this.setState({
          ...this.state,
          className: style.fixed + " " + this.props.fixedClassName
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
    let {fixedHeight,fixedClassName,...divProps} = this.props;
    return (
      <div {
        ...divProps
      } ref="listenObj" className={
        (this.props.className || "") + " " + this.state.className
      } >
        {
          this.props.children
        }
      </div>
    )
  }
}