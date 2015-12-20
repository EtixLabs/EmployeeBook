'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var profilCtrlStub = {
  index: 'profilCtrl.index',
  show: 'profilCtrl.show',
  create: 'profilCtrl.create',
  update: 'profilCtrl.update',
  destroy: 'profilCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var profilIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './profil.controller': profilCtrlStub
});

describe('Profil API Router:', function() {

  it('should return an express router instance', function() {
    expect(profilIndex).to.equal(routerStub);
  });

  describe('GET /api/profils', function() {

    it('should route to profil.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'profilCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/profils/:id', function() {

    it('should route to profil.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'profilCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/profils', function() {

    it('should route to profil.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'profilCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/profils/:id', function() {

    it('should route to profil.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'profilCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/profils/:id', function() {

    it('should route to profil.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'profilCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/profils/:id', function() {

    it('should route to profil.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'profilCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
