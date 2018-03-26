import React from 'react'
import PropTypes from 'prop-types'

import withStyles from 'material-ui/styles/withStyles'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Hidden from 'material-ui/Hidden'
import Menu from 'material-ui/Menu'

import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import MoreVertIcon from 'material-ui-icons/MoreVert'

// firebase
import { firebaseConnect, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Button from 'material-ui/Button/Button';

import AppDrawer from './AppDrawer'
import { AppBarMenuItemsExport } from './AppDrawerElements'

import { APP_SETTING } from './config'


const styles = theme => ({
  '@global': {
    html: {
      background: theme.palette.background.default,
      WebkitFontSmoothing: 'antialiased',
      MozOsxFontSmoothing: 'grayscale',
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      height: '100%',
      margin: 0,
    },
    'div[id=root]': {
      height: '100%'
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100%',
    width: '100%',
  },
  appBarTitle: {
    flex: 1,
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - ' + APP_SETTING.DrawerWidth + 'px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: APP_SETTING.DrawerWidth,
    },
  },
  content: {
    width: '100%',
    padding: theme.spacing.unit,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - ' + APP_SETTING.DrawerWidth + 'px)',
    },
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
      padding: theme.spacing.unit * 3,
    },
  },
});

class AppFrame extends React.Component {
  state = {
    mobileDrawerOpen: false,
    dropdownAnchorEl: null,
    dropdownMenuOpen: false,
  };
  handleDrawerClose = () => {
    this.setState({ mobileDrawerOpen: false });
  };

  handleDrawerToggle = () => {
    this.setState({ mobileDrawerOpen: !this.state.mobileDrawerOpen });
  };

  handleMenuOpen = event => {
    this.setState({ dropdownMenuOpen: true, dropdownAnchorEl: event.currentTarget });
  };

  handleMenuclose = () => {
    this.setState({ dropdownMenuOpen: false });
  };

  handleLogout = () => {
    this.setState({ dropdownMenuOpen: false });
    this.props.firebase.auth().signOut()
  }


  render() {
    const { children, classes, auth, firebase, pageTitle } = this.props;
    let appSidebarClasses = `${classes.drawer} app-sidebar`;
    return (
      <div className={classes.root}>
          <div className={classes.appFrame}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <Hidden lgUp implementation="css">
                {/* <IconButton
                  color="contrast"
                  aria-label="Open Drawer"
                  onClick={this.handleDrawerToggle}
                >
                  <MenuIcon />
                </IconButton> */}
              </Hidden>
              <Typography className={classes.appBarTitle} type="title" color="inherit" noWrap>
              {pageTitle}
              </Typography>
              {isEmpty(auth)
                  ? <Button color="contrast" className={classes.button} onClick={() => firebase.login({ provider: 'google', type: 'popup' })}>Login With Google</Button>
                  : <div>
                    <span> Welcome {auth.displayName} !</span>
                    <IconButton
                      aria-label="More"
                      aria-owns="Open right Menu"
                      aria-haspopup="true"
                      onClick={this.handleMenuOpen}
                      className={classes.menuButtonRight}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
              }
              <Menu
                id="menuRight"
                anchorEl={this.state.dropdownAnchorEl}
                open={this.state.dropdownMenuOpen}
              >
                <AppBarMenuItemsExport onClick={this.handleMenuclose.bind(this)} logout={this.handleLogout.bind(this)}  />
              </Menu>
            </Toolbar>
          </AppBar>

          {/* <AppDrawer
            className={appSidebarClasses}
            onRequestClose={this.handleDrawerClose}
            mobileDrawerOpen={this.state.mobileDrawerOpen}
          /> */}
          <main className={classes.content}>
            {children}
          </main>
        </div>
      </div>
    )
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
};

//export default withStyles(styles)(AppFrame);
const AppFrameWithFirebase = compose(
  firebaseConnect(),
  connect(({ firebase }) => ({ auth: firebase.auth}))
)(AppFrame)

export default withStyles(styles)(AppFrameWithFirebase);
