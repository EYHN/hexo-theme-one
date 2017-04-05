import AppState from '../../stateI';
import { MuiTheme } from 'material-ui/styles';
import * as React from 'react';
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import * as _ from 'underscore';
import muiThemeable from 'material-ui/styles/muiThemeable';
let style = require('./background.less');

interface BackgroundProps {
  muiTheme?: MuiTheme
  images?:{
    url:string
    key:string
  }[]
  fullModel?:boolean
}

interface BackgroundState {
  top: number
}

export class Background extends React.Component<BackgroundProps, BackgroundState>{
  scrollListener: () => void;
  constructor() {
    super();
    this.state = {
      top: 0
    }
  }
  componentDidMount() {
    let listenDom = $(this.refs['DisplayTrigger'])
    let bodyDom = $("body");
    let windowDom = $(window);
    let isOnDisplay = false;
    this.scrollListener = _.throttle(() => {
      let sum = bodyDom.scrollTop();
      this.setState({
        top: Math.min(sum / 1.5,270)
      });
    }, 10);
    this.scrollListener();
    $(window).bind("scroll", this.scrollListener);
  }
  componentWillUnmount() {
    $(window).unbind("scroll", this.scrollListener);
  }
  getBGNode() {
    let {images = []} = this.props
    let nodes: React.ReactNode[] = [];
    images.forEach((value) => {
      nodes.push(
        <div className={style.bgImg} style={{ backgroundImage: "url(" + value.url + ")" }} key={value.key}></div>
      )
    })
    return nodes
  }
  render() {
    let {fullModel = false} = this.props;
    return (
      <div>
        <div className={style.ColorBackground + " " + (fullModel?style.fullModel:"")} style={{
          backgroundColor: this.props.muiTheme.appBar.color,
          transform: `translateY(${this.state.top}px)`
        }}>
          <ReactCSSTransitionGroup transitionName="bg-img" transitionEnterTimeout={1} transitionLeaveTimeout={450} className={style.CSSTransitionGroup}>
            {
              this.getBGNode()
            }
          </ReactCSSTransitionGroup>
        </div>
        <div className={style.shadow}>
          
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    images: state.background.backgroundImg,
    fullModel: state.nav.fullModel
  }
}

const BackgroundX = connect<AppState, BackgroundProps, BackgroundProps>(mapStateToProps)(Background as any)

const BackgroundS = muiThemeable()(BackgroundX);

export default BackgroundS;