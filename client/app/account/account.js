'use strict';

angular.module('etixbookApp')
.config(function($stateProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'app/account/login/login.html',
    controller: 'LoginController',
    controllerAs: 'vm'
  })
  .state('logout', {
    url: '/logout?referrer',
    referrer: 'main',
    template: '',
    controller: function($state, Auth) {
      var referrer = $state.params.referrer ||
      $state.current.referrer ||
      'main';
      Auth.logout();
      $state.go(referrer);
    }
  });
})
.run(function($rootScope, Auth, $state) {
  $rootScope.$on('$stateChangeStart', function(event, next, nextParams, current) {
    if (next.name === 'logout' && current && current.name && !current.authenticate) {
      next.referrer = current.name;
    }
    if (next.authenticate && !Auth.isLoggedIn()){
      $state.transitionTo("login");
      event.preventDefault();
    }
  });
});
