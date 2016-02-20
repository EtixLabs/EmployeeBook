/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

 'use strict';
 import User from '../api/user/user.model';
 import Question from '../api/question/question.model';
 import Profil from '../api/profil/profil.model';

 User.find({}).removeAsync()
 .then(function() {
  User.createAsync({
    provider: 'local',
    name: 'Test User',
    email: 'test@example.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@example.com',
    password: 'admin'
  })
  .then(function() {
    console.log('finished populating users');
  });
});

var questions = [
  new Question({
    question: 'Your motto ?'
  }),
  new Question({
    question: 'Your personal dream ?'
  }),
  new Question({
    question: 'Can you cook ? Any specialty ?'
  }),
  new Question({
    question: 'What about your family ?'
  }),
  new Question({
    question: 'Any Super Power ?'
  }),
  new Question({
    question: 'If you had the chance to meet a famous person who would he/she be ?'
  }),
  new Question({
    question: 'Which 3 questions would you ask him/her ?'
  }),
  new Question({
    question: 'Best trip ever ?'
  })
 ];

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
