
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors')({origin: true});

exports.passwordHashing = functions.database.ref('/courses/{courseId}/pass').onCreate(event => {   
  const password = event.data.val().toString();
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return event.data.ref.parent.child('pass').set(hash);
});

exports.checkPassword = functions.https.onRequest( (req,res) => {
  cors( req, res, ()  => {
    if(req.body.password && req.body.coursePassword) {
      const password = req.body.password;
      const hash = req.body.coursePassword;
      res.send({status:bcrypt.compareSync(password, hash)});
    } else{
      res.status(401).send('forbidden!')
    }
  })
})

exports.downloadEvents = functions.https.onRequest((request, response) => {
  const { token, start, stop = 0 } = request.query

  if (token) {
    admin.database().ref('api_tokens/' + token).once('value').then(snapshot => {
      if (snapshot.val()) {
        const ref = admin.database().ref('logged_events')
        let promise
        let startFrom
        let stopAt

        if (!start) {
          if (stop) {
            stopAt = Date.now() - stop * 24 * 60 * 60 * 1000
            promise = ref.once('value').orderByChild('createdAt').endAt(stopAt)
          } else {
            promise = ref.once('value')
          }
        } else {
          if (stop) {
            stopAt = Date.now() - stop * 24 * 60 * 60 * 1000
            startFrom = Date.now() - (start + 1) * 24 * 60 * 60 * 1000
            promise = ref.orderByChild('createdAt').startAt(startFrom).endAt(stopAt).once('value')
          } else {
            startFrom = Date.now() - (start + 1) * 24 * 60 * 60 * 1000
            promise = ref.orderByChild('createdAt').startAt(startFrom).once('value')
          }
        }

        promise.then(snapshot2 => {
          const log_object = snapshot2.val()
          if (log_object) {
            response.send(log_object)
          } else {
            response.send("No data");
          }
        })
      } else {
        response.send("Invalid token");
      }
    })
  } else {
    response.send("Token is missing");
  }
});
