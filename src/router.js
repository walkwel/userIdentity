import React from 'react'
import {Switch,Route} from 'react-router-dom'
import App from './components/app'
// import Courses from './pages/coursePage'
// import {CourseDetail} from './components/courses/'
// import {LoginRoute, PrivateRoute} from './privateRoute';
// import PrivateInstructorRoute from './privateInstructorRoute';
// import {Paths} from './components/path/path';
// import AddPath from './components/path/createPath'
// import Login from './components/login'
// import Page404 from './components/404'

const Root=()=>(
  <Switch>
    {/* <PrivateInstructorRoute path="/courses/:id" component={CourseDetail} /> */}
    {/* <PrivateRoute path="/courses" exact component={Courses} />
    <PrivateRoute path="/path" component={Paths} />
    <LoginRoute path="/login" component={Login} />
    <Route path="/addpath" exact component={AddPath} /> */}
    <Route path="/" exact component={App} />
  </Switch>
)

export default Root
