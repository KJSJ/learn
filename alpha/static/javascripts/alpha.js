(function () {
	'use strict';

	angular
		.module('alpha', [
			'alpha.authentication',
			'alpha.config', 
			// 'alpha.accounts', //remove this one to show setting page
			'alpha.posts',
			'alpha.fbpage',
			'alpha.layout',
			'alpha.utils',
			'ngRoute'
		]);

	angular
		.module('alpha.config', []);

	angular
		.module('alpha')
		.run(run);

	run.$inject=['$http'];

	/**
	* @name run
	* @desc Update xsrf $http headers to allign with Django's defaults
	*/

	function run($http) {
		$http.defaults.xsrfHeaderName = 'X-CSRFToken';
		$http.defaults.xsrfCookieName = 'csrftoken';
	}
})();