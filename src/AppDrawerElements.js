import React from 'react'

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import {Link} from 'react-router-dom'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'
import StarIcon from 'material-ui-icons/Star'
import { withStyles } from 'material-ui/styles';


const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

 class DrawerMenuItems extends React.Component {
  constructor(props){
    super(props)
    this.state = { open: false };
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render(){
    return(
  null
)
  }
}

const AppBarMenuItems = ({ onClick, logout }) => (
  <div>
    <MenuItem onClick={() => { onClick();}}>My account</MenuItem>
    <MenuItem onClick={() => { logout(); }}>Logout</MenuItem>
  </div>
)



export const AppBarMenuItemsExport = AppBarMenuItems;


export default withStyles(styles)(DrawerMenuItems);