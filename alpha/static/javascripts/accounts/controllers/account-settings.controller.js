(function () {
	'use strict';

	angular
		.module('alpha.accounts.controllers')
		.controller('AccountSettingsController', AccountSettingsController);

	AccountSettingsController.$inject = [
		'$location', '$routeParams', 'Authentication', 'Account', 'Snackbar'
	];

	function AccountSettingsController($location, $routeParams, Authentication, Account, Snackbar) {
		var vm = this;

		vm.destroy = destroy;
		vm.update = update;

		activate();

		function activate() {
			var authenticatedAccount = Authentication.getAuthenticatedAccount();
			var username = $routeParams.username.substr(1);

			//redirect if not logged in
			if (!authenticatedAccount) {
				$location.url('/');
				Snackbar.error('You are not authorized to view this page.');
			} else {
				//redirect if logged in, but not the owner of this account
				if (authenticatedAccount.username !== username) {
					debugger;
					$location.url('/');
					Snackbar.error('You are not authorized to view this page.');
				}
			}

			Account.get(username).then(accountSuccessFn, accountErrorFn);

			//update account for view
			function accountSuccessFn(data, status, headers, config) {
				vm.account = data.data;
			}

			//redirect to index
			function accountErrorFn(data, status, headers,config) {
				$location.url('/');
				Snackbar.error('This user does not exist.');
			}
		}

		//destroy this account
		function destroy() {
			Account.destroy(vm.account).then(accountSuccessFn, accountErrorFn);

			//redirect to index and display success snackbar
			function accountSuccessFn(data, status, headers, config) {
				Authentication.unauthenticate();
				window.location = '/';

				Snackbar.show('Your account has been deleted.');
			}

			//display error snackbar
			function accountErrorFn(data, status, headers, config) {
				Snackbar.error(data.error);
			}
		}

		//update this account
		function update() {
			var username = $routeParams.username.substr(1);

			Account.update(username, vm.account).then(accountSuccessFn, accountErrorFn);

			//show success snackbar
			function accountSuccessFn(data, status, headers, config) {
				Snackbar.show('Your account has been updated.');
			}

			//show error snackbar
			function accountErrorFn(data, status, headers, config) {
				Snackbar.error(data.error);
			}
		}
	}
})();