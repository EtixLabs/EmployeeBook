'use strict';

(function() {

	class ProfilCreateController {

		constructor($http, $state, $scope) {
			this.$http = $http;
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

		loadMovies(query) {
			return this.$http
			.get('http://api.themoviedb.org/3/search/movie?api_key=4202b53ab0dc6770cb78e14743844a9a&query='+query)
			.then(response => {
				console.log(response.data.results);
				return response.data.results.map(function(obj){
					var newObj = {};
					newObj.id = obj.id;
					newObj.title = obj.title;
					newObj.poster_path = obj.poster_path;
					newObj.release_date = obj.release_date;
					newObj.overview = obj.overview;					
					return newObj;
				});
			});
		}
	}

	angular.module('etixbookApp')
	.controller('ProfilCreateController', ProfilCreateController);

})();