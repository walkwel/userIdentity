import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import {compose} from 'redux'
import {getUserType} from './helpers/';

export const PrivateInstructorRouteComponent = ({auth, publicCourses,component: Component,...rest}) => {
    return (
        <div>
            {isLoaded(auth) && publicCourses
                ? !isEmpty(auth)
                    ?  <Route {...rest} exact render={ (props) =><Component 
                            userType={getUserType(auth, publicCourses, props.match.params.id)}  
                            {...props}  
                        />
                        }  />
                    : <Redirect to='/login' />
                : <Redirect to='/login' />
            }
            
        </div>
    )     
}

const PrivateInstructorRoute = compose(
    firebaseConnect( (props, store) => [
        {
            path:'courses',
            storeAs: 'publicCourses'
        }      
    ] ),
    connect( ({firebase}) => ({ auth: firebase.auth, publicCourses: firebase.ordered.publicCourses }) )
)(PrivateInstructorRouteComponent)

export default PrivateInstructorRoute;