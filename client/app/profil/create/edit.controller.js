'use strict';

(function() {

	class ProfilEditController {

		constructor($http, $state, $scope) {
			this.$http = $http;
			this.scope = $scope;
			$scope.form = {};
			this.scope.is_loading = true;
			$http.get('/api/profils/'+$state.params.slug).then(response => {
				$scope.form = response.data;
			});

			$scope.format = 'dd/MM/yyyy';
 		}

		submitProfilCreate() {
			console.log("Form submitted");
			console.log(this.scope.form);
			// this.$http.post('/api/profils', this.scope.form)
			// .then(response => {
			// 	console.log(response);
			// });
		}

		loadMovies(query) {
			return this.$http
			.get('http://api.themoviedb.org/3/search/movie?api_key=4202b53ab0dc6770cb78e14743844a9a&query='+query)
			.then(response => {
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
	.controller('ProfilEditController', ProfilEditController);

})();