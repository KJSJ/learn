(function () {
	'use strict';

	angular
		.module('alpha.authentication', [
			'alpha.authentication.controllers',
			'alpha.authentication.services'
		]);

	angular
		.module('alpha.authentication.controllers', []);

	angular
		.module('alpha.authentication.services',['ngCookies']);
})();