const admin = require('firebase-admin');

var serviceAccount = require("../patternpush-firebase.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pushpattern-351ea.firebaseio.com"
})

module.exports.admin = admin

