import MenuItem from 'material-ui/MenuItem';
import MDDrawer from 'material-ui/Drawer';
import * as React from 'react';

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
        <MenuItem>Menu Item</MenuItem>
        <MenuItem>Menu Item 2</MenuItem>
      </MDDrawer>
    )
  }
}