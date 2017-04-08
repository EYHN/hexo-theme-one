import { array_randS } from '../../lib/random';
import Grid from '../grid/grid';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as React from 'react';
import { connect } from 'react-redux';
import AppState from '../../stateI';
const style = require("./footer.less")

interface FooterProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme
  className?: string
  style?:React.CSSProperties
  rightText?: string
  centerText?: string
}

class Footer extends React.Component<FooterProps, undefined>{
  render(){
    return (
      <div className={style.footer} style={{
          ...this.props.style
        }}>
        <div 
          className={style.footerCanve}
          style={{
            backgroundColor:this.props.muiTheme.palette.primary1Color,
            color:this.props.muiTheme.palette.alternateTextColor
          }}
          >
          <Grid className={style.grid}>
            <p className={style.s1}>
              <span>Powered by </span>
              <a href="https://hexo.io" target="_blank" style={{
                color:this.props.muiTheme.palette.alternateTextColor
              }}>Hexo</a>
              <br/>
              <span>Theme - </span>
              <a href="https://github.com/EYHN/hexo-theme-one" target="_blank" style={{
                color:this.props.muiTheme.palette.alternateTextColor
              }}>one</a>
            </p>
            <span className={style.s2}>
              {this.props.centerText || ""}
            </span>
            <p className={style.s3}>
              {this.props.rightText || ""}
            </p>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let {footer=["",""]} = state.theme
  let [center = "",right = ""] = footer;
  return {
    centerText: array_randS(center),
    rightText: array_randS(right)
  }
}

let FooterX = connect<AppState, FooterProps, FooterProps>(mapStateToProps)(Footer as any)

let FooterS =  muiThemeable()(FooterX);

export default FooterS;