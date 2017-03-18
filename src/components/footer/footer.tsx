import * as React from 'react';
import { connect } from 'react-redux';
import AppState from '../../stateI';
import muiThemeable from 'material-ui/styles/muiThemeable';
import Grid from '../grid/grid';
const style = require("./footer.less")

interface FooterProps {
  muiTheme?: __MaterialUI.Styles.MuiTheme
  className?: string
  style?:React.CSSProperties
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
              Copyright © 2016 - 2017 EYHN
            </span>
            <p className={style.s3}>
            1
            </p>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  
  return {

  }
}

let FooterX = connect<AppState, FooterProps, FooterProps>(mapStateToProps)(Footer as any)

let FooterS =  muiThemeable()(FooterX);

export default FooterS;