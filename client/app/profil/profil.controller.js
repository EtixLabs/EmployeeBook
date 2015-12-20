'use strict';

(function() {

	class ProfilController {

		constructor($http, $state, $scope) {
			this.$http = $http

			$http.get('/api/profils/'+$state.params.slug).then(response => {
				$scope.profil = response.data;
				console.log($scope.profil);
			});
		}
	}

	angular.module('etixbookApp')
	.controller('ProfilController', ProfilController);

})();