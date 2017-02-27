import MenuItem from 'material-ui/MenuItem';
import MDDrawer from 'material-ui/Drawer';
import * as React from 'react';
import Divider from 'material-ui/Divider';
import ColorChoose from '../colorChoose/colorChoose'
import HomeIcon from  'material-ui/svg-icons/action/home'
import AccountCircleIcon from  'material-ui/svg-icons/action/account-circle'
import SideHander from '../sideHander/sideHander'
import DropDownMenu from 'material-ui/DropDownMenu';
const style = require("./Drawer.less")
import ActionGrade from 'material-ui/svg-icons/action/grade';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import {List, ListItem} from 'material-ui/List';
import { connect } from 'react-redux';
import AppState from '../../stateI';

interface DrawerProps {
  open?:boolean,
  onRequestChange?: (opening: boolean, reason: string) => void
  phone?: boolean
}

interface DrawerState {

}

class Drawer extends React.Component<DrawerProps, DrawerState>{
  render() {
    let {phone = false} = this.props
    return (
      <MDDrawer
        open={this.props.open}
        docked={false}
        onRequestChange={this.props.onRequestChange.bind(this)}
        width={phone ?250:300}
        className={style.Drawer}
      >
        <SideHander className={style.sideHander}></SideHander>
        <ListItem className={style.ListItem} leftIcon={<HomeIcon color=""/>}>首页</ListItem>
        <Divider className={style.divider} />
        <ListItem className={style.ListItem} leftIcon={<AccountCircleIcon color=""/>}>关于我</ListItem>
        <ListItem className={style.ListItem}
              primaryText="Inbox"
              leftIcon={<ContentInbox />}
              initiallyOpen={true}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem 
                  className={style.ListItem}
                  key={1}
                  primaryText="Starred"
                  leftIcon={<ActionGrade />}
                />
              ]}
            />
        <ColorChoose/>
      </MDDrawer>
    )
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    phone: state.windowSize.smaller.than.phone
  }
}


const DrawerX = connect<AppState, DrawerProps, DrawerProps>(mapStateToProps)(Drawer as any)

export default DrawerX;