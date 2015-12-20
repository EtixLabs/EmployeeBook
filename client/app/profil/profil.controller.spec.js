'use strict';

describe('Controller: ProfilCtrl', function () {

  // load the controller's module
  beforeEach(module('etixbookApp'));

  var ProfilCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProfilCtrl = $controller('ProfilCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
