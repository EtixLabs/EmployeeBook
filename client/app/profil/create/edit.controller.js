'use strict';

(function() {

	class ProfilEditController {

		constructor($http, $state, $scope, Upload, $q) {
			this.$q = $q;
			this.$http = $http;
			this.scope = $scope;
			this.Upload = Upload;
			$scope.savebtntitle = "Update";
			$scope.tabIsActive = [{active:true},{active:false},{active:false},{active:false}];
			$scope.form = {};

			$http.get('/api/profils/'+$state.params.slug).then(response => {
				$scope.form = response.data;
				// Transform dates to js date objects
				$scope.form.birthday = new Date($scope.form.birthday);
				$scope.form.startDate = new Date($scope.form.startDate);
			});
			$scope.format = 'dd/MM/yyyy';
 		}

		submitProfilCreate() {
			this.scope.error = false;
			this.scope.loading = true;
			// Save form data
			this.$http.put('/api/profils/'+this.scope.form.slug, this.scope.form)
			.then(data => {
				console.log('Sucess');
				console.log(data);
			})
			.then(() => {
				return this.$q.all([
					this.scope.form.profilePicture ? this.Upload.upload({
						url: '/api/profils/upload',
						data: {
							file: this.scope.form.profilePicture,
							type: 'profilePicture',
							user: this.scope.form.slug
						}
					}) : this.$q.resolve(),
					this.scope.form.coverPhoto ? this.Upload.upload({
						url: '/api/profils/upload',
						data: {
							file: this.scope.form.coverPhoto,
							type: 'coverPhoto',
							user: this.scope.form.slug
						}
					}) : this.$q.resolve()
				]);
			})
			.catch(err => {
				this.scope.error = true;
				//TODO : Handle Error in a nice way
				console.log('Error');
				console.log(err);
			}).finally(() => {
				this.scope.loading = false;
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
	.controller('ProfilEditController', ProfilEditController);

})();
