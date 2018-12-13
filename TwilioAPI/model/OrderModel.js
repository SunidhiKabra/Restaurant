'use strict';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var OrderSchema = new Schema({
  GroupNumber: {
    type: String,
    required: 'Kindly enter the group number the order is for',

  },
  Starters: {
    type: String,
  },
  MainCourse: {
    type: String,
  },
  Drinks:{
    type: String,
  },
    Desserts:{
    type: String,
  }

});

mongoose.model('order', OrderSchema);
