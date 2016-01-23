'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

var QuestionSchema = new Schema({
	question: String
});

module.exports = mongoose.model('Question', QuestionSchema);
