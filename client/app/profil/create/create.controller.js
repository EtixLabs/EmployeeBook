'use strict';

(function() {

	class ProfilCreateController {

		constructor($http, $state, $scope) {
			this.$http = $http;
			this.scope = $scope;
			$scope.savebtntitle = "Save";
			$scope.tabIsActive = [{active:true},{active:false},{active:false},{active:false}];
			$scope.form = {};

			$http.get('/api/questions/').then(response => {
				var questions = response.data;
				$scope.form.about = [];
				angular.forEach(questions, function(obj) {
					$scope.form.about.push({question: obj, answer:""} );
				});
			});

			$scope.format = 'dd/MM/yyyy';
 		}

		submitProfilCreate() {
			console.log("Form submitted");
			console.log(this.scope.form);
			this.$http.post('/api/profils', this.scope.form)
			.success(data => {
				console.log('Sucess');
				console.log(data);
			})
			.catch(err => {
				//TODO : Handle Error in a nice way
				console.log('Error');
				console.log(err);
			});
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
	.controller('ProfilCreateController', ProfilCreateController);

})();