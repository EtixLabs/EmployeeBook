'use strict';

angular.module('etixbookApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('profil', {
        url: '/profil',
        templateUrl: 'app/profil/profil.html',
        authenticate: false
        // controller: 'MainController',
        // controllerAs: 'main'
      });
  });
