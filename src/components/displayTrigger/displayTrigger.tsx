import * as React from 'react';
import * as $ from "jquery"

interface DisplayTriggerProps {
  onDisplay: (event: JQueryEventObject) => any;
  className?:string
}

export default class DisplayTrigger extends React.Component<DisplayTriggerProps, undefined>{
  scrollListener: (e: JQueryEventObject) => any
  componentDidMount() {
    let listenDom = $(this.refs['DisplayTrigger'])
    let bodyDom = $("body");
    let windowDom = $(window);
    let isOnDisplay = false;
    this.scrollListener = (e) => {
      let sum = document.documentElement.scrollHeight;
      if (listenDom.offset().top <= bodyDom.scrollTop() + windowDom.height()) {
        if (isOnDisplay == false) {
          this.props.onDisplay(e);
        }
        isOnDisplay = true
      } else {
        isOnDisplay = false
      }
    }
    $(window).bind("scroll", this.scrollListener);
  }
  componentWillUnmount() {
    $(window).unbind("scroll", this.scrollListener);
  }
  render() {
    let {className = ''} = this.props;
    return <div ref="DisplayTrigger" className={className}>
      {
        this.props.children
      }
    </div>
  }
}