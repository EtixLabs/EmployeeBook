/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 'use strict';
 import User from '../api/user/user.model';
 import Question from '../api/question/question.model';
 import Profil from '../api/profil/profil.model';
 import questions from './questions.js';

// No users seed, use LDAP
 User.find({}).removeAsync();

Question.find({}).removeAsync()
.then(function() {
  Question.createAsync(questions)
})
.then(function() {
  console.log('finished populating questions');
});

Profil.find({}).removeAsync()
.then(function() {
  Profil.createAsync({
    email: 'anas.aitali@etixgroup.com',
    firstName: 'Anas',
    lastName: 'Ait Ali',
    nickname: 'Prophete',
    position: 'Lead software engineer',
    startDate: new Date('01.03.2015'),
    location: 'lu',
    hometown: 'Lyon, France',
    birthday: new Date('01.10.1991 01:00:00'),
    languages: ['fr', 'gb'],
    education: {
      studies: 'Master of information technology - Epitech',
      location: 'Lyon, France'
    },
    interests: 'Kitesurf, ski, skydive',
    about: [{
      question: questions[0]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[1]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[2]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[3]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[4]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[5]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[6]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[7]._id,
      answer: 'Lorem ipsum from db'
    }],
    playlist: '<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify_france%3Aplaylist%3A6dBHkT4MaNoBhsQhC1bz4P" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'
  }, {
    email: 'jeremy.letang@etixgroup.com',
    firstName: 'Jérémy',
    lastName: 'Letang',
    nickname: 'Balek',
    position: 'Lead software engineer',
    startDate: new Date('01.03.2015'),
    location: 'lu',
    hometown: 'Bordeaux, France',
    birthday: new Date('05.29.1990 01:00:00'),
    languages: ['fr', 'gb'],
    education: {
      studies: 'Master of information technology - Epitech',
      location: 'Bordeaux, France'
    },
    interests: 'Chasse et pêche',
    movies: [{
      id: "378772",
      title: "The-Froze-Nose-Knows",
      poster_path: "/3xq8sqqqGdyNU49Od7IZDm7u1TS.jpg",
      release_date: "1970-11-18",
      overview: "The Aardvark shiveringly pursues the Ant after a snowfall has covered their habitat."
    }],
    about: [{
      question: questions[0]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[1]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[2]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[3]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[4]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[5]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[6]._id,
      answer: 'Lorem ipsum from db'
    },{
      question: questions[7]._id,
      answer: 'Lorem ipsum from db'
    }],
    playlist: '<iframe src="https://embed.spotify.com/?uri=spotify%3Auser%3Aspotify_france%3Aplaylist%3A6dBHkT4MaNoBhsQhC1bz4P" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>'
  }
  )
  .then(function() {
    console.log('finished populating profils');
  })
});
