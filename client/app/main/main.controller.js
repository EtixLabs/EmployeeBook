'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
    this.profils = [];

    $http.get('/api/profils').then(response => {
      this.profils = response.data;
    });
  }
}

angular.module('etixbookApp')
  .controller('MainController', MainController);

})();
