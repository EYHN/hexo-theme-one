import MenuItem from 'material-ui/MenuItem';
import MDDrawer from 'material-ui/Drawer';
import * as React from 'react';
import ColorChoose from '../colorChoose/colorChoose'
import HomeIcon from  'material-ui/svg-icons/action/home'
import SideHander from '../sideHander/sideHander'

interface DrawerProps {
  open?:boolean,
  onRequestChange?: (opening: boolean, reason: string) => void
}

interface DrawerState {

}

export default class Drawer extends React.Component<DrawerProps, DrawerState>{
  render() {
    return (
      <MDDrawer
        open={this.props.open}
        docked={false}
        onRequestChange={this.props.onRequestChange.bind(this)}
      >
        <SideHander></SideHander>
        <MenuItem  leftIcon={<HomeIcon/>}>Home</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
        <ColorChoose/>
      </MDDrawer>
    )
  }
}