(function () {
	'use strict';

	angular
		.module('alpha.config')
		.config(config);

	config.$inject = ['$locationProvider'];


	function config($locationProvider) {
		$locationProvider.html5Mode(true);
		$locationProvider.hashPrefix('!');
	}
})();

	/**
	* @name config
	* @desc Enable HTML5 routing
	*/