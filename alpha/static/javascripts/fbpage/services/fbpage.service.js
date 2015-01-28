(function () {
	'use strict';

	angular
		.module('alpha.fbpage.services')
		.factory('Fbpage', Fbpage);

	Fbpage.$inject = ['$http'];

	function Fbpage($http) {

	var Fbpage =  {
		search: search
	};

	return Fbpage;

		function search(keyword, successfn, errorfn) {
			return $http.post('/api/v1/fbpage/?search='+ keyword).success(successfn).error(errorfn);
		}
	}
})();