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
}))
.directive('validFile', () => ({
  require: 'ngModel',
  link: function (scope, el, attrs, ngModel) {
    ngModel.$render = function () {
      ngModel.$setViewValue(el.val());
    };

    el.bind('change', function () {
      console.log("here");
      scope.$apply(function () {
        ngModel.$render();
      });
    });
  }
}));
