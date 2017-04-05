import { DrawerItemI } from '../../Interfaces/theme';
import { buildPath } from '../../lib/History';
import { array_randS } from '../../lib/random';
import AppState from '../../stateI';
import ColorChoose from '../colorChoose/colorChoose';
import SideHander from '../sideHander/sideHander';
import Divider from 'material-ui/Divider';
import MDDrawer from 'material-ui/Drawer';
import DropDownMenu from 'material-ui/DropDownMenu';
import FontIcon from 'material-ui/FontIcon';
import { ListItem } from 'material-ui/List';
import MenuItem from 'material-ui/MenuItem';
import AccountCircleIcon from 'material-ui/svg-icons/action/account-circle';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import HomeIcon from 'material-ui/svg-icons/action/home';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import SvgIcon from 'material-ui/SvgIcon';
import * as React from 'react';
import { connect } from 'react-redux';
import routerHistory from '../../lib/History';
const style = require("./Drawer.less")
const url = require('url');

interface DrawerProps {
  open?: boolean
  onRequestChange?: (opening: boolean, reason: string) => void
  phone?: boolean
  onTouchTap: () => void
  itemList?: DrawerItemI[]
  avatar?:string
  siteUrl?:string
  headerBg?:string
  colorPicker?: boolean
  author?:string
  siteTitle?:string
  siteSlogan?:string
}

interface DrawerState {

}

class Drawer extends React.Component<DrawerProps, DrawerState>{
  getIcon(icon:string | {type:string,date:any,style:any}){
    if (typeof icon === "undefined"){
      return undefined;
    }
    if (typeof icon === "string"){
      return <FontIcon className="material-icons">{icon}</FontIcon>
    }
    if (typeof icon === "object"){
      let {
        type="svg",
        date="",
        style={},
        ...props
      } = icon;
      switch (type){
        case "svg":
          return <SvgIcon style={style} dangerouslySetInnerHTML={{ __html: date }} {...props}>
          </SvgIcon >;
        default:
        break;
      }
    }
    return undefined;
  }
  renderItems(item: DrawerItemI) {
    switch (item.type) {
      case "sitelink":
        return <ListItem onTouchTap={this.props.onTouchTap}
          primaryText={item.title}
          onClick={()=>{routerHistory.push(buildPath(item.href))}}
          key={item.title + item.type}
          initiallyOpen={item.initiallyOpen}
          className={style.ListItem} leftIcon={this.getIcon(item.icon)}
          nestedItems={this.renderLists(item.nested)} />;
      case "link":
        return <ListItem onTouchTap={this.props.onTouchTap}
          primaryText={item.title}
          onClick={()=>{window.open(item.href)}}
          key={item.title + item.type}
          initiallyOpen={item.initiallyOpen}
          className={style.ListItem} leftIcon={this.getIcon(item.icon)}
          nestedItems={this.renderLists(item.nested)} />;
      case "hr":
        return <Divider className={style.divider} key={item.title + item.type} />;
      case "page":
        return <ListItem onTouchTap={this.props.onTouchTap}
          primaryText={item.title}
          className={style.ListItem}
          key={item.title + item.type}
          initiallyOpen={item.initiallyOpen}
          onClick={()=>{routerHistory.push(buildPath("/page/" + item.name + "/"))}}
          leftIcon={this.getIcon(item.icon)}
          nestedItems={this.renderLists(item.nested)} />;
      default:
        return <ListItem className={style.ListItem}
          primaryText={item.title}
          leftIcon={this.getIcon(item.icon)}
          initiallyOpen={item.initiallyOpen}
          key={item.title + item.type}
          nestedItems={this.renderLists(item.nested)} />
    }
  }
  renderLists(itemList: DrawerItemI[]): JSX.Element[] {
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
    let {phone = false , avatar="",siteUrl="",headerBg = "",colorPicker = false,author,siteTitle,siteSlogan=""} = this.props
    return (
      <MDDrawer
        open={this.props.open}
        docked={false}
        onRequestChange={this.props.onRequestChange.bind(this)}
        width={phone ? 250 : 300}
        className={style.Drawer}
      >
        <SideHander className={style.sideHander} author={author} slogan={siteSlogan} background={url.resolve(siteUrl,headerBg)} Avatar={url.resolve(siteUrl,avatar)}></SideHander>
        {
          this.renderLists(this.props.itemList)
        }
        <Divider className={style.divider} />
        <footer className={style.footer}>
          <span>{siteTitle}</span>
          <br/>
          <span>Power by {author}</span>
          <br/>
          <span>Theme - <a target="_blank" href={"https://github.com/EYHN/hexo-theme-one"} >EYHN/one</a></span>
        </footer>
        {
          colorPicker?<ColorChoose />:undefined
        }
      </MDDrawer>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  let { img = {},uiux = {},colorPicker = false } = state.theme;
  let { siteUrl = "",author,title } = state.site
  let { slogan = "" } = uiux;
  return {
    phone: state.windowSize.smaller.than.phone,
    itemList: state.theme.Drawer,
    avatar: array_randS(img.avatar),
    headerBg: array_randS(img.drawerHeaderBg),
    siteUrl: siteUrl,
    colorPicker: colorPicker,
    author: author,
    siteTitle:title,
    siteSlogan: slogan
  }
}


const DrawerX = connect<AppState, DrawerProps, DrawerProps>(mapStateToProps)(Drawer as any)

export default DrawerX;