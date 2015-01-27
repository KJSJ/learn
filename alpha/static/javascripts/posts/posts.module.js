(function () {
	'use strict';

	angular
		.module('alpha.posts', [
			'alpha.posts.controllers',
			'alpha.posts.directives',
			'alpha.posts.services'
		]);

	angular
		.module('alpha.posts.controllers', []);

	angular
		.module('alpha.posts.directives', ['ngDialog']);

	angular
		.module('alpha.posts.services', []);
})();