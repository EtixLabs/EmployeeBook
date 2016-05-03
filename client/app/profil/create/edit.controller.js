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

 		// Returns true if the given file is a file to be uploaded (File object)
 		isFileUpload(file) {
 			return angular.isObject(file);
 		}

		submitProfilCreate() {
			this.scope.error = false;
			this.scope.loading = true;

			// Create array of uploads queries (will be then passed to Upload.upload())
			let uploads = [];
			['image', 'cover'].forEach(type => {
				if (this.isFileUpload(this.scope.form[type])) {
					uploads.push({
						url: '/api/profils/upload',
						data: {
							type,
							file: this.scope.form[type],
							user: this.scope.form._id
						}
					});
					// Remove from form (sent separately)
					delete this.scope.form[type];
				}
			});

			// Save form data
			this.$http.put('/api/profils/'+this.scope.form.slug, this.scope.form)
			.then(res => {
				console.log('Sucess');
				this.scope.form = res.data;
			})
			.then(() => {
				return this.$q.all(uploads.map(this.Upload.upload));
			})
			.then(results => {
				results.forEach(result => {
					let imgType = result.config.data.type;
					this.scope.form[imgType] = result.data[imgType];
				});
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
