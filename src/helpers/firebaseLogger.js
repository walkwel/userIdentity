import firebase from 'firebase'

const nonLoggedReduxEvents = [
    '@@reactReduxFirebase/AUTHENTICATION_INIT_STARTED',
    '@@reactReduxFirebase/AUTHENTICATION_INIT_FINISHED',
    "@@reactReduxFirebase/SET_LISTENER",
    "@@reactReduxFirebase/START",
]

export const firebaseLogger = store => next => action => {
    const database = firebase.database();
    const index = nonLoggedReduxEvents.indexOf(action.type);
    if(index === -1){
        let object = {
            type:action.type, 
            created:Date.now(),
            isAnonymous: firebase.auth().currentUser ? firebase.auth().currentUser.isAnonymous : null,
            uid:firebase.auth().currentUser ? firebase.auth().currentUser.uid : null,
            data:action.payload || null
        }
        database.ref('logged_events').push(object)
    }
    next(action);
};
