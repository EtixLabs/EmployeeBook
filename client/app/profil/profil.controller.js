'use strict';

(function() {

	class ProfilController {

		constructor($http, $state, $scope) {
			this.$http = $http

			$http.get('/api/profils/'+$state.params.slug).then(response => {
				$scope.profil = response.data;
			});
		}
	}

	angular.module('etixbookApp')
	.controller('ProfilController', ProfilController);

})();