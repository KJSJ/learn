/** 
* Register controller
* @namespace
*/
(function () {
	'use strict';

	angular
		.module('alpha.authentication.controllers')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$location', '$scope', 'Authentication'];

	/**
	* namespace RegisterController
	*/
	function RegisterController($location, $scope, Authentication) {
		var vm = this;

		vm.register = register;

		/**
		* @name register
		* @desc Register a new user
		* @memberOf thinkster.authentication.controllers.RegisterController
		*/
		function activate(){
			//if the user is authenticated, they should not be here
			if (Authentication.isAuthenticated()) {
				$location.url('/');
			}
		}

		function register() {
			Authentication.register(vm.email, vm.password, vm.username);
		}
	}
})();
