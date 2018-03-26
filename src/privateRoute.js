import React from 'react'
import {Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {compose} from 'redux'


export const PrivateRouteComponent = ({auth, ...rest}) => (
    <div>
        {isLoaded(auth)
            ? !isEmpty(auth)
                ? <Route {...rest} />
                : <Redirect to='/login' />
            : 'Loading'
        }
        
    </div>
)

export const AuthRoute = ({auth, ...rest}) => (
    <div>
        {isLoaded(auth)
            ? !isEmpty(auth)
                ? <Redirect to='/' />
                : <Route {...rest} />
            : 'Loading'
        }
        
    </div>
)

export const PrivateRoute = compose(
    firebaseConnect(),
    connect( ({firebase}) => ({ auth: firebase.auth }) )
)(PrivateRouteComponent)

export const LoginRoute = compose(
    firebaseConnect(),
    connect( ({firebase}) => ({ auth: firebase.auth }) )
)(AuthRoute)

