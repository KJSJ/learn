(function () {
	'use strict';

	angular
		.module('alpha.posts.services')
		.factory('Posts', Posts);

	Posts.$inject = ['$http'];

	function Posts($http) {
		var Posts = {
			all: all,
			get: get,
			create: create
		};

		return Posts;

		function all() {
			return $http.get('/api/v1/posts/');
		}

		function create(content) {
			return $http.post('/api/v1/posts/', {
				content: content
			});
		}

		function get(id) {
			return $http.get('/api/v1/accounts/' + id + '/posts/');
		}
	}
})();