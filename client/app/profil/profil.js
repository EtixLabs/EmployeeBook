'use strict';

angular.module('etixbookApp')
.config(function($stateProvider) {
  $stateProvider
  .state('profil', {
    url: '/:slug',
    templateUrl: 'app/profil/profil.html',
    authenticate: false,
    controller: 'ProfilController',
    controllerAs: 'profilCtrl'
  });
})
.filter('ageFilter', function() {
  function calculateAge(birthday) {
    var birthday = new Date(birthday).getTime();
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
 return function(birthdate) { 
   return calculateAge(birthdate);
 }; 
});