'use strict';
module.exports = function(app) {
  var TwilioHandlers = require('../controllers/TwilioController.js');
  //var AdminHandlers = require('../controllers/AdminController.js');
  //var WorkRequestHandlers = require('../controllers/WorkRequestController.js');
  // var PatientHandlers = require('../controllers/PatientController.js');

  app.route('/sms')
    .post(TwilioHandlers.sms);

  app.route('/display_customer')
    .get(TwilioHandlers.display_customer);

  app.route('/display_order')
    .get(TwilioHandlers.display_order);

  app.route('/display_booking')
    .get(TwilioHandlers.display_booking);

  app.route('/edit_customer')
    .post(TwilioHandlers.edit_customer);

  app.route('/edit_order')
    .post(TwilioHandlers.edit_order);

  app.route('/edit_booking')
    .post(TwilioHandlers.edit_booking);

  app.route('/save')
    .post(TwilioHandlers.save);


  app.route('/admin_login')
    .post(TwilioHandlers.admin_login);

};
