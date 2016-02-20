'use strict';

angular.module('etixbookApp')
.directive('profilFormCreate', () => ({
  templateUrl: 'app/profil/create/profilform.html',
  restrict: 'E',
  controller: 'ProfilCreateController',
  controllerAs: 'ctrl'
  }));
