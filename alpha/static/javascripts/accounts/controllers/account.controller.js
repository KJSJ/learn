(function () {
	'use strict';

	angular
		.module('alpha.accounts.controllers')
		.controller('AccountController', AccountController);

	AccountController.$inject = ['$location', '$routeParams', 'Posts','Account','Snackbar'];

	function AccountController($location, $routeParams, Posts, Account, Snackbar) {
		var vm = this;

		vm.account = undefined;
		vm.posts = [];

		activate();

		//actions to be performed when this controller is instantiated
		function activate() {
			var username = $routeParams.username.substr(1);

			Account.get(username).then(accountSuccessFn, accountErrorFn);
			Posts.get(username).then(postsSuccessFn, postsErrorFn);

			//update account on viewmodel
			function accountSuccessFn(data, status, headers, config) {
				vm.account = data.data;
			}

			//redirect to index and show error snackbar
			function accountErrorFn(data, status, headers, config) {
				$location.url('/');
				Snackbar.error('That user does not exist.');
			}

			//update posts on viewmodel
			function postsSuccessFn(data, status, headers, config) {
				vm.posts = data.data;
			}

			//show error snackbar
			function postsErrorFn(data, status, headers, config) {
				Snackbar.error(data.data.error);
			}
		}
	}
})();