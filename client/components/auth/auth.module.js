'use strict';

angular.module('etixbookApp.auth', [
  'etixbookApp.constants',
  'etixbookApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
