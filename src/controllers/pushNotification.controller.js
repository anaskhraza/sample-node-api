/*
  This program and the accompanying materials are
  made available under the terms of the Eclipse Public License v2.0 which accompanies
  this distribution, and is available at https://www.eclipse.org/legal/epl-v20.html
  
  SPDX-License-Identifier: EPL-2.0
  
  Copyright IBM Corporation 2020
*/

const pushNotificationService = require('../services/pushNotification.service');

const post = function (req, res) {
  // console.log('req', req);
  pushNotificationService.post(req, res);
  // console.log('res', res);
};

const get = function (req, res) {
  res.send('Cannot get');
};

const registerDevice = function (req, res) {
  pushNotificationService.registerDevice(req);
};

module.exports = {
  post,
  get,
  registerDevice,
};
