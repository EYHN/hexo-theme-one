import { barMenu, MenuItemI } from '../../Interfaces/theme';
import { buildPath } from '../../lib/History';
import routerHistory from '../../lib/History';
import { array_randS } from '../../lib/random';
import AppState from '../../stateI';
import { Card, CardMedia, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import SocialShare from 'material-ui/svg-icons/social/share';
import * as React from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
const url = require('url');
var style = require('./logoCard.less')

interface LogoCardProps {
  img?: string,
  title?: string
  homeToolBar?: barMenu[]
  siteUrl?:string
}

class LogoCard extends React.Component<LogoCardProps, undefined>{

  renderItems(item: MenuItemI) {
    let icon;
    if (typeof item.icon != undefined) icon = <FontIcon className="material-icons">{item.icon}</FontIcon>;
    switch (item.type) {
      case "sitelink":
        return <MenuItem
          primaryText={item.title}
          onClick={() => { routerHistory.push(buildPath(item.href))}}
          key={item.title + item.type}
          className={style.ListItem} leftIcon={icon}
          menuItems={this.renderLists(item.nested)} />;
      case "link":
        return <MenuItem
          primaryText={item.title}
          onClick={() => { window.open(item.href) }}
          key={item.title + item.type}
          className={style.ListItem} leftIcon={icon}
          menuItems={this.renderLists(item.nested)} />;
      case "hr":
        return <Divider className={style.divider} key={item.title + item.type} />;
      case "page":
        return <MenuItem
          primaryText={item.title}
          className={style.ListItem}
          key={item.title + item.type}
          onClick={() => { routerHistory.push(buildPath("/page/" + item.name + "/")) }}
          leftIcon={icon}
          menuItems={this.renderLists(item.nested)} />;
      default:
        return <MenuItem className={style.ListItem}
          primaryText={item.title}
          leftIcon={icon}
          key={item.title + item.type}
          menuItems={this.renderLists(item.nested)} />
    }
  }
  renderLists(itemList: MenuItemI[]): JSX.Element[] {
    if (typeof itemList === "undefined" || itemList.length == 0) return undefined;
    return itemList.map((value) => {
      return this.renderItems(value)
    })
  }

  renderMenu(itemList: barMenu[]): JSX.Element[] {
    return itemList.map((value,index) => {
      let {items = [],icon} = value;
      return (<IconMenu
        key={index}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        iconButtonElement={<IconButton iconClassName="material-icons">{icon}</IconButton>}
      >
        {
          this.renderLists(items)
        }
      </IconMenu>)
    })
  }

  render() {
    let {img = "", title = "",homeToolBar = [],siteUrl = "/"} = this.props
    img = url.resolve(siteUrl, img);
    return (
      <Card className={style.LogoCard}>
        <CardMedia>
          <div
            className={style.CardImage}
            style={{ backgroundImage: "url(" + img + ")" }}
          >
          </div>
        </CardMedia>
        <div className={style.CardBottom}>
          <CardText>
            {
              title
            }
          </CardText>
          <div className="flexFull"></div>
          {
            this.renderMenu(homeToolBar)
          }
        </div>
      </Card>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { site = {}, theme = {} } = state;
  let { title = '' } = site;
  let { img = {},homeToolBar=[] } = theme;
  return {
    title,
    siteUrl: site.siteUrl,
    img: array_randS(img.right_pic),
    homeToolBar
  }
}

let LogoCardX = connect<AppState, LogoCardProps, LogoCardProps>(mapStateToProps)(LogoCard as any)

export default LogoCardX