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
  <div>
    <Divider />
    <List>
    <Link className="linkStyle" to="/">
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      </Link>
       <Link className="linkStyle" to="/courses">
        <ListItem button>
          <ListItemIcon>
          <StarIcon />
          </ListItemIcon>
          <ListItemText primary="Courses" />
        </ListItem>
        </Link>
        <Link className="linkStyle" to="/path">
        <ListItem button>
        <ListItemIcon>
        <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Paths" />
      </ListItem>
      </Link>
    </List>
    <Divider />
    <List>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <StarIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
      
    </List>
  </div>
)
  }
}


function btn_logout() {
  console.log("CLICK!")
}

const AppBarMenuItems = ({ onClick, logout }) => (
  <div>
    <MenuItem onClick={() => { onClick(); btn_logout(); }}>My account</MenuItem>
    <MenuItem onClick={() => { logout(); btn_logout(); }}>Logout</MenuItem>
  </div>
)



export const AppBarMenuItemsExport = AppBarMenuItems;


export default withStyles(styles)(DrawerMenuItems);