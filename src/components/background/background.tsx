import { MuiTheme } from 'material-ui/styles';
import * as React from 'react';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as $ from "jquery"
import * as _ from "underscore"
let style = require('./background.less');

interface BackgroundProps {
  muiTheme?: MuiTheme
}

interface BackgroundState {
  top:number
}

export class Background extends React.Component<BackgroundProps, BackgroundState>{
  scrollListener: () => void;
  constructor() {
    super();
    this.state = {
      top:0
    }
  }
  componentDidMount() {
    let listenDom = $(this.refs['DisplayTrigger'])
    let bodyDom = $("body");
    let windowDom = $(window);
    let isOnDisplay = false;
    this.scrollListener = _.debounce(() => {
        let sum = bodyDom.scrollTop();
        this.setState({
          top: sum / 2
        });
    },10);
    this.scrollListener();
    $(window).bind("scroll", this.scrollListener);
  }
  componentWillUnmount() {
    $(window).unbind("scroll", this.scrollListener);
  }
  render() {
    return (
      <div>
        <div className={style.ColorBackground} style={{
          backgroundColor:this.props.muiTheme.appBar.color,
          transform: `translateY(${this.state.top}px)`
        }}></div>
      </div>
    )
  }
}

let BackgroundS = muiThemeable()(Background);

export default BackgroundS;