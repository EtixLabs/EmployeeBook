'use strict';

angular.module('etixbookApp')
  .directive('profilCover', () => ({
    templateUrl: 'app/profil/cover/cover.html',
    restrict: 'E'
    // controller: 'NavbarController',
    // controllerAs: 'nav'
  }))
  .directive('profilSidebar', () => ({
  	templateUrl: 'app/profil/sidebar/sidebar.html',
  	restrict: 'E'
  }));
