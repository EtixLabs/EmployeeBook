'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var ProfilSchema = new Schema({
	updated: { type: Date, default: Date.now },
	email: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	nickname: { type: String, required: false },
	image: { type: String, required: false, default: null },
	cover: { type: String, required: false, default: null },
	position: { type: String, required: false },
	startDate: { type: Date, default: Date.now },
	location: { type: String, required: false },
	hometown: { type: String, required: false },
	birthday: { type: Date, default: Date.now },
	languages: { type: [String], required: false },
	education: {
		studies: { type: String, required: false },
		location: { type: String, required: false }
	},
	interests: { type: String, required: false },
	movies: [{
		id : {type: String, required: false},
		title : {type: String, required: false},
		poster_path : {type: String, required: false},
		release_date : {type: String, required: false},
		overview : {type: String, required: false}
	}],
	about: [{
		question: { type: ObjectId, ref: 'Question' },
		answer: String
	}],
	playlist: { type: String, required: false }
});

var slug = require('mongoose-friendly-id');
ProfilSchema.plugin(slug, ['firstName', 'lastName']);

module.exports =  mongoose.model('Profil', ProfilSchema);
