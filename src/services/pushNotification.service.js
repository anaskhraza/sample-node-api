/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/

const data = require('../data');
// const admin = require('../admin');
const admin = require('firebase-admin');
var serviceAccount = require('../patternpush-firebase.json');
// const TAFFY = require('taffy');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://pushpattern-351ea.firebaseio.com',
});

const saveDataToLocalStorage = (data) => {
  var a = [];
  // Parse the serialized data back into an aray of objects
  a = JSON.parse(localStorage.getItem('session')) || [];
  // Push the new data (whether it be an object or anything else) onto the array
  a.push(data);
  // Alert the array value
  // alert(a); // Should be something like [Object array]
  // Re-serialize the array back into a string and store it in localStorage
  localStorage.setItem('session', JSON.stringify(a));

  return true;
};

const getDataToLocalStorage = (data) => {
  var devices = [];
  // Parse the serialized data back into an aray of objects
  devices = JSON.parse(localStorage.getItem('session')) || [];

  return devices;
  // Push the new data (whether it be an object or anything else) onto the array
};

const get = function (_id) {
  return getAll().find((account) => account._id == _id);
};

const getAll = function () {
  return data.Accounts;
};

const notification_options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24,
};

const post = function (req, res) {
  // console.log('params', req);
  // const registrationToken = req.body.registrationToken;
  // const message = req.body.message;
  const options = notification_options;

  var registrationToken = '';

  var message = {
    notification: {
      title: '$FooCorp up 1.43% on the day',
      body:
        '$FooCorp gained 11.80 points to close at 835.67, up 1.43% on the day.',
    },
    data: {
      score: '850',
      time: '2:45',
    },
    token: registrationToken,
  };

  try {
    admin
      .messaging()
      .send(message, false)
      .then((response) => {
        res.status(200).send('Notification sent successfully');
      })
      .catch((error) => {
        console.log('error', error);
      });
  } catch (e) {
    console.log('catches ', e);
  }
  // res.send('Done');
};

const prepareNotificationDevices = (request, number, isFlag) => {
  const rows = request.params.rows;
  const columns = request.params.columns;
  const midRow = parseInt(columns / 2, 10) - 1;
  const matrix = columns / rows;
  var arrays = [];
  const devices = getDataToLocalStorage();
  if (devices.length >= 15 && columns >= 5) {
    while (devices.length > 0) arrays.push(a.splice(0, columns));

    arrays.forEach((deviceArray, columns) => {
      if (deviceArray.length === rows) {
        switch (number) {
          case 1: {
            var device = deviceArray[row - 1];
            notificationObject(device, 'yellow');
          }
          case 2: {
            if (columns == 0) {
              deviceArray.forEach((device, index) => {
                notificationObject(device, 'yellow');
              });
            } else if (columns < midRow) {
              var device = deviceArray[row - 1];
              notificationObject(device, 'yellow');
            } else if (columns > midRow) {
              var device = deviceArray[row - 1];
              notificationObject(device, 'yellow');
            } else if (columns == midRow) {
              var device = deviceArray[row - 1];
              notificationObject(device, 'yellow');
            } else if (columns == row - 1) {
              var device = deviceArray[row - 1];
              notificationObject(device, 'yellow');
            }
          }
        }
      }
    });
  }
};

const notificationObject = (device, color) => {
  const data = {
    key: 'color',
    value: color,
  };

  return data;
};

const registerDevice = (req, res) => {
  try {
    const request = req.params;
    const parseRequest = JSON.parse(request);

    const response = saveDataToLocalStorage(parseRequest);
    res.status(200).send(response);
  } catch (e) {
    console.log('catches ', e);
    res.status(200).send(false);
  }
};

module.exports = {
  get,
  getAll,
  post,
  registerDevice,
};
