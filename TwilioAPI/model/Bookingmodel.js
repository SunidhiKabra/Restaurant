'use strict';
const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var BookingSchema = new Schema({
  customerNo: {
    type: String,
  },
  Timeslotreq: {
    type: Date,
  },
  TimeSlotAss: {
    type: Date
  },
  ReservationMadeAt: {
    type: Date,
    default: Date.now
    },
  Adults: {
    type: Number
  },
  Kids: {
    type: Number
  },
  SpecialRequests: {
    type: String,
    default:" "
  },
  DisabilityAccomodation: {
    type: Boolean,
    default:'false'
  },
  Alerted:{
    type:Boolean,
    default:'false'
  },
  Name: {
    type: String,
    required: 'kindly enter the name of booker',
    default:" "
  },
  MenuPreOrdered: {
    type: Boolean,
    default:'false'
  },
  Friends: [{
    type: String
  }]
});

mongoose.model('booking', BookingSchema);
