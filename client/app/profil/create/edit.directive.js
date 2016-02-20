'use strict';

angular.module('etixbookApp')
.directive('profilFormEdit', () => ({
  templateUrl: 'app/profil/create/profilform.html',
  restrict: 'E',
  controller: 'ProfilEditController',
  controllerAs: 'ctrl'
  }));
