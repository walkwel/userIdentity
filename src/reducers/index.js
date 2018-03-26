import { combineReducers } from 'redux'

// add reducers
import { firebaseReducer } from 'react-redux-firebase';
import CourseReducer from './course';
export default  combineReducers({
  firebase: firebaseReducer,
  courses: CourseReducer
});