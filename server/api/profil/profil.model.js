'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var QuestionSchema = new Schema({
	question: String
});
var Question = mongoose.model('Question', QuestionSchema);

var ProfilSchema = new Schema({
	updated: { type: Date, default: Date.now },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	nickname: { type: String, required: false },
	position: { type: String, required: true },
	startDate: { type: Date, required: true },
	location: { type: String, required: true },
	hometown: { type: String, required: true },
	birthday: { type: Date, required: true },
	languages: { type: [String], required: true },
	education: { 
		studies: { type: String, required: true },
		location: { type: String, required: true }
	},
	interests: { type: String, required: true },
	movies: { type: [String], required: false },
	about: [{
		question: { type: ObjectId, ref: 'Question' },
		answer: String
	}],
	playlist: { type: String, required: false }
});

var slug = require('mongoose-friendly-id');
ProfilSchema.plugin(slug, ['firstName', 'lastName']);
var Profil = mongoose.model('Profil', ProfilSchema);

module.exports = {
	Question: Question, 
	Profil: Profil
};