/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/

const data = require('../data');
const admin = require('../admin');

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
      .send(message, options)
      .then((response) => {
        res.status(200).send('Notification sent successfully');
      })
      .catch((error) => {
        console.log("error", error);
      });
  } catch (e) {
    console.log('catches ', e);
  }
  // res.send('Done');
};

module.exports = {
  get,
  getAll,
  post,
};
