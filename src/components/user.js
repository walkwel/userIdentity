import React, { Component, PropTypes } from 'react'
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';

import { firebaseConnect, isEmpty, isLoaded } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'

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

class User extends Component {
    constructor(props) {
        super(props)

    }

    identifyUser=(role)=>{
        this.props.firebase.set(`usersRole/${this.props.auth.uid}`,role)
      }

    render() {
        const {classes,userRole} = this.props
        console.log(userRole);
        return (
                <div className={classes.root}>
                {!isLoaded(userRole) ? <h5> Loading </h5> 
                : isEmpty(userRole)
                ? 
                <Grid container spacing={24}>
                      <Grid item xs={4}>
                        <Paper className={classes.paper}>
                        <Button color="primary" onClick={()=>this.identifyUser('User')} className={classes.button}>
                      User
                    </Button>
                        </Paper>
                      </Grid>
                      <Grid item xs={4}>
                        <Paper className={classes.paper}>
                        <Button color="primary" className={classes.button} onClick={()=>this.identifyUser('Admin')}>
                      Admin
                    </Button>
                        </Paper>
                      </Grid>
                      <Grid item xs={4}>
                        <Paper className={classes.paper}>
                        <Button color="primary" className={classes.button} onClick={()=>this.identifyUser('Shopkeeper')}>
                      ShopKeeper
                    </Button>
                        </Paper>
                      </Grid>
                    </Grid>
                :
                <div> 
                  {userRole &&  <h2> Welcome {userRole}</h2> }
                </div>
                }
                  </div>
        )
    }
}

User.propTypes = {

}

const UserWithFirebase = compose(
    firebaseConnect( (props, store) => [
        {
            path:`usersRole/${props.auth.uid}`,
            storeAs: 'userRole'
        }      
    ] ),
    connect(({ firebase }) => ({ auth: firebase.auth ,userRole :firebase.data.userRole}))
  )(User)

  export default withStyles(styles)(UserWithFirebase);