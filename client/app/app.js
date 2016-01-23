'use strict';

angular.module('etixbookApp', [
  'etixbookApp.auth',
  'etixbookApp.admin',
  'etixbookApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ui.bootstrap.showErrors'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
