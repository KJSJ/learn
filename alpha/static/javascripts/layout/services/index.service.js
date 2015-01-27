(function () {
	'use strict';

	angular
		.module('alpha.layout.services')
		.factory('dbService', dbService);

	dbService.$inject = ['$http'];
	function dbService($http) {
		var dbService = {get: get};

		return dbService;

		function get(api, p, f) {
			return $http.get(api).success(p).error(f);
		}
	}
})();