'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the Admin'
  },
  email: {
    type: String,
    required: 'Kindly enter the email of the Admin'
  },
  username: {
    type: String,
    required: 'Kindly enter the weight of the Admin'
  },
  password: {
    type: String,
    required: 'Kindly enter the passwors of the Admin'
  }
});


module.exports = mongoose.model('Admin', AdminSchema);
