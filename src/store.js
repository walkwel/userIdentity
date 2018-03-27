import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import * as firebase from 'firebase';
//import rootSaga from './sagas/';
// import reducers
import reducers from './reducers/';


// firebase config
const firebaseConfig = {
    apiKey: "AIzaSyATRoJMlZPGrxjjbF9VOQCU-lrW0aTTW7s",
    authDomain: "userauth-dcc56.firebaseapp.com",
    databaseURL: "https://userauth-dcc56.firebaseio.com",
    projectId: "userauth-dcc56",
    storageBucket: "",
    messagingSenderId: "1067857840402"
};
firebase.initializeApp(firebaseConfig);
const config = {
  userProfile: 'users',
  enableLogging: false,
  attachAuthIsReady: true,
}

const createStoreWithFirebase = composeWithDevTools(
  reactReduxFirebase(firebase, config),
)(createStore)

const store = createStoreWithFirebase(reducers)

export default store;