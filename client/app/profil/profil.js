'use strict';

angular.module('etixbookApp')
.config(function ($stateProvider) {
  $stateProvider
  .state('create', {
    url: '/profil/create',
    templateUrl: 'app/profil/create/create.html',
    authenticate: false,
    controller: 'ProfilCreateController'
    // authenticate: 'admin'
  })
  .state('edit', {
    url: '/profil/edit/:slug',
    templateUrl: 'app/profil/create/edit.html',
    authenticate: false,
    controller: 'ProfilEditController'
    // authenticate: 'admin'
  })
  .state('profil', {
    url: '/profil/:slug',
    templateUrl: 'app/profil/profil.html',
    authenticate: false,
    controller: 'ProfilController',
    controllerAs: 'profilCtrl'
  });
})
.filter('ageFilter', function () {
  function calculateAge(birthday) {
    var birthday = new Date(birthday).getTime();
    var ageDifMs = Date.now() - birthday;
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  return function (birthdate) {
    return calculateAge(birthdate);
  };
})
.filter('profilLocation', function () {
  return function (location) {
    var fullLocation = "";
    switch (location) {
      case "lu":
      fullLocation = "Luxembourg";
      break;
      default:
        if (location) {
          console.log("This location : "+location+" should be handled");
        }
      return location;
    }
    return fullLocation;
  };
});
//# sourceMappingURL=profil.js.map
