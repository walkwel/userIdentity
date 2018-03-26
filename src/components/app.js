import React,{Component} from 'react'
import AppFrame from '../AppFrame'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import { firebaseConnect, isEmpty } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

import User from './user'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class App extends Component{

  constructor(){
    super()
    this.state={}
  }

  render(){
    const {auth} = this.props;
    return(
  <div>
  <AppFrame >
  {auth.uid &&  <User auth = {auth}/>
}  </AppFrame>
  </div>
)
  }
}
const AppFrameWithFirebase = compose(
  firebaseConnect(),
  connect(({ firebase }) => ({ auth: firebase.auth }))
)(App)
export default withStyles(styles)(AppFrameWithFirebase);