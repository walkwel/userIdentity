import { combineReducers } from 'redux'

// add reducers
import { firebaseReducer } from 'react-redux-firebase';
export default  combineReducers({
  firebase: firebaseReducer
});