import { array_randS } from '../../lib/random';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as React from 'react';
import * as Helmet from 'react-helmet';
import { connect } from 'react-redux';
import AppState from '../../stateI';
const url = require('url');

interface HeaderState {

}

interface HeaderProps {
  favicon?: string,
  muiTheme?: __MaterialUI.Styles.MuiTheme,
  author?: string,
  description?: string,
  siteUrl?: string,
  siteTitle?: string,
  appbarTitle?:string
}

class Header extends React.Component<HeaderProps, HeaderState>{
  render() {
    let {favicon, muiTheme, author, description, siteUrl, siteTitle,appbarTitle} = this.props;
    let link = [];
    let meta = [];
    let title = siteTitle;
    if (typeof appbarTitle !== "undefined" && appbarTitle != "" && appbarTitle != siteTitle){
      title = appbarTitle + ' | ' + title;
    }
    if (typeof favicon !== "undefined") {
      favicon = url.resolve(siteUrl, favicon)
      link.push(
        { rel: "icon shortcut",type: "image/icon", href: favicon },
        { rel: "icon", sizes: "192x192", href: favicon },
        { rel: "apple-touch-icon", href: favicon }
      );
    }
    meta.push(
      { name: "theme-color", content: muiTheme.appBar.color }
    )
    if (typeof author !== "undefined") {
      meta.push(
        { name: "author", content: author }
      )
    }
    if (typeof description !== "undefined") {
      meta.push(
        { name: "description", content: description }
      )
    }
    return (
      <Helmet
        link={
          link
        }
        meta={
          meta
        }
        title={
          title
        }
      />
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let {head = {}} = state.theme;
  let {title:appbarTitle} = state.nav;
  let {author, description, siteUrl,title} = state.site;
  return {
    siteUrl: siteUrl,
    favicon: array_randS(head.favicon),
    author: author,
    description: description,
    siteTitle: title,
    appbarTitle: appbarTitle
  }
}


let HeaderX = connect(mapStateToProps)(Header as any)

let HeaderS = muiThemeable()(HeaderX);

export default HeaderS;