/**
 * Bar schema
 **/
 

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Bar = new Schema({
    barName: String,
    state: String,
    going: [String],
    goingNumber: Number
});

module.exports = mongoose.model('Bar', Bar);