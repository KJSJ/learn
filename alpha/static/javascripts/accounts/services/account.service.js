(function () {
	'use strict';

	angular
		.module('alpha.accounts.services')
		.factory('Account', Account);

	Account.$inject = ['$http'];

	function Account($http) {
		var Account = {
			destroy: destroy,
			get: get,
			update: update
		};

		return Account;

		//destroy the account with username 'username'
		function destroy(username) {
			return $http.delete('/api/v1/accounts/' + username + '/');
		}

		//gets the account with the username 'username'
		function get(username) {
			return $http.get('/api/v1/accounts/' + username +'/');
		}

		//update the account with the username ' username'
		function update(username, account) {
			return $http.put('/api/v1/accounts/' + username + '/' , account);
		}
	}
})();