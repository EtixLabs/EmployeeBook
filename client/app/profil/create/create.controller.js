'use strict';

(function() {

	class ProfilCreateController {

		constructor($http, $state, $scope) {
			this.$http = $http
			$scope.form = {};

			$http.get('/api/questions/').then(response => {
				$scope.questions = response.data;
				$scope.form.about = [];
				angular.forEach($scope.questions, function(obj) {
					$scope.form.about.push({question: obj, answer:""} );
				});
			});

			$scope.format = 'dd/MM/yyyy';
		}

		submitProfilCreate() {
			console.log("lol");
			alert('Submit bro!');
		}
	}

	angular.module('etixbookApp')
	.controller('ProfilCreateController', ProfilCreateController);

})();