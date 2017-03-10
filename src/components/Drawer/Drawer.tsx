import MenuItem from 'material-ui/MenuItem';
import MDDrawer from 'material-ui/Drawer';
import * as React from 'react';
import Divider from 'material-ui/Divider';
import ColorChoose from '../colorChoose/colorChoose'
import HomeIcon from 'material-ui/svg-icons/action/home'
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle'
import SideHander from '../sideHander/sideHander'
import DropDownMenu from 'material-ui/DropDownMenu';
const style = require("./Drawer.less")
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import { List, ListItem } from 'material-ui/List';
import { connect } from 'react-redux';
import { History } from "history"
import AppState from '../../stateI';
import { DrawerIten } from '../../Interfaces/theme';
import FontIcon from 'material-ui/FontIcon';
import { array_randS } from '../../lib/random';
import { hashHistory } from 'react-router';
const url = require('url');

interface DrawerProps {
  open?: boolean
  onRequestChange?: (opening: boolean, reason: string) => void
  phone?: boolean
  onTouchTap: () => void
  itemList?: DrawerIten[]
  avatar?:string
  siteUrl?:string
  headerBg?:string
}

interface DrawerState {

}

class Drawer extends React.Component<DrawerProps, DrawerState>{
  renderItems(item: DrawerIten) {
    let icon;
    if(typeof item.icon != undefined)icon = <FontIcon className="material-icons">{item.icon}</FontIcon>;
    switch (item.type) {
      case "sitelink":
        return <ListItem onTouchTap={this.props.onTouchTap}
          primaryText={item.title}
          href={hashHistory.createHref(item.href)}
          key={item.title + item.type}
          initiallyOpen={item.initiallyOpen}
          className={style.ListItem} leftIcon={icon}
          nestedItems={this.renderLists(item.nested)} />;
      case "link":
        return <ListItem onTouchTap={this.props.onTouchTap}
          primaryText={item.title}
          href={item.href}
          key={item.title + item.type}
          initiallyOpen={item.initiallyOpen}
          className={style.ListItem} leftIcon={icon}
          nestedItems={this.renderLists(item.nested)} />;
      case "hr":
        return <Divider className={style.divider} key={item.title + item.type} />;
      case "page":
        return <ListItem onTouchTap={this.props.onTouchTap}
          primaryText={item.title}
          className={style.ListItem}
          key={item.title + item.type}
          initiallyOpen={item.initiallyOpen}
          href={hashHistory.createHref("/page/" + item.name)}
          leftIcon={icon}
          nestedItems={this.renderLists(item.nested)} />;
      default:
        return <ListItem className={style.ListItem}
          primaryText={item.title}
          leftIcon={icon}
          initiallyOpen={item.initiallyOpen}
          key={item.title + item.type}
          nestedItems={this.renderLists(item.nested)} />
    }
  }
  renderLists(itemList: DrawerIten[]): JSX.Element[] {
    if(typeof itemList === "undefined") return [];
    let res:JSX.Element[] = [];
    itemList.forEach((value) => {
      res.push(
        this.renderItems(value)
      );
    })
    return res;
  }
  render() {
    let {phone = false , avatar="",siteUrl="",headerBg = ""} = this.props
    return (
      <MDDrawer
        open={this.props.open}
        docked={false}
        onRequestChange={this.props.onRequestChange.bind(this)}
        width={phone ? 250 : 300}
        className={style.Drawer}
      >
        <SideHander className={style.sideHander} background={headerBg} Avatar={url.resolve(siteUrl,avatar)}></SideHander>
        {
          this.renderLists(this.props.itemList)
        }
        <ColorChoose />
      </MDDrawer>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { img = {},uiux = {} } = state.theme;
  let {siteUrl = ""} = state.site
  return {
    phone: state.windowSize.smaller.than.phone,
    itemList: state.theme.Drawer,
    avatar: array_randS(img.avatar),
    headerBg: array_randS(img.drawerHeaderBg),
    siteUrl: siteUrl
  }
}


const DrawerX = connect<AppState, DrawerProps, DrawerProps>(mapStateToProps)(Drawer as any)

export default DrawerX;