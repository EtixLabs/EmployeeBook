'use strict';

var app = require('../..');
var request = require('supertest');

var newProfil;

describe('Profil API:', function() {

  describe('GET /api/profils', function() {
    var profils;

    beforeEach(function(done) {
      request(app)
        .get('/api/profils')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          profils = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(profils).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/profils', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/profils')
        .send({
          name: 'New Profil',
          info: 'This is the brand new profil!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newProfil = res.body;
          done();
        });
    });

    it('should respond with the newly created profil', function() {
      expect(newProfil.name).to.equal('New Profil');
      expect(newProfil.info).to.equal('This is the brand new profil!!!');
    });

  });

  describe('GET /api/profils/:id', function() {
    var profil;

    beforeEach(function(done) {
      request(app)
        .get('/api/profils/' + newProfil._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          profil = res.body;
          done();
        });
    });

    afterEach(function() {
      profil = {};
    });

    it('should respond with the requested profil', function() {
      expect(profil.name).to.equal('New Profil');
      expect(profil.info).to.equal('This is the brand new profil!!!');
    });

  });

  describe('PUT /api/profils/:id', function() {
    var updatedProfil

    beforeEach(function(done) {
      request(app)
        .put('/api/profils/' + newProfil._id)
        .send({
          name: 'Updated Profil',
          info: 'This is the updated profil!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProfil = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProfil = {};
    });

    it('should respond with the updated profil', function() {
      expect(updatedProfil.name).to.equal('Updated Profil');
      expect(updatedProfil.info).to.equal('This is the updated profil!!!');
    });

  });

  describe('DELETE /api/profils/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/profils/' + newProfil._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when profil does not exist', function(done) {
      request(app)
        .delete('/api/profils/' + newProfil._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
