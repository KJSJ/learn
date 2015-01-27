/**
* Authentication
*/
(function () {
	'use strict';

	angular
		.module('alpha.authentication.services')
		.factory('Authentication', Authentication);

	Authentication.$inject = ['$cookies', '$http'];

	/**
	* @namespace authentication
	* @returns {Factory}
	*/
	function Authentication($cookies, $http) {
		/**
		* @name Authentication
		* @desc The Factory to be returned
		*/
		var Authentication = {
			getAuthenticatedAccount: getAuthenticatedAccount,
			isAuthenticated: isAuthenticated,
			login: login,
			logout: logout,
			register: register,
			setAuthenticatedAccount: setAuthenticatedAccount,
			unaunthenticate: unaunthenticate
		};

		return Authentication;

		/////////////

		/**
		* @name register
		* @desc Try to register a new user
		* @param {string} username The username entered by the user
		* @param {string} password The password entered by the user
		* @param {string} email The email entered by the user
		* @return {Promise}
		* @memberoOf alpha.authentication.services.Authentication
		*/
		
		function register(email, password, username) {
			return $http.post('/api/v1/accounts/', {
				username: username,
				password: password,
				email: email
			}).then(registerSuccessFn, registerErrorFn);
		
			function registerSuccessFn(data, status, headers, config) {
				Authentication.login(email,password);
			}

			function registerErrorFn(data, status, headers, config) {
				console.error('Register Failed!')
			}
		}

		function getAuthenticatedAccount() {
			if (!$cookies.authenticatedAccount) {
				return;
			}

			return JSON.parse($cookies.authenticatedAccount);
		}

		function isAuthenticated() {
			return !!$cookies.authenticatedAccount;
		}

		function setAuthenticatedAccount(account) {
			$cookies.authenticatedAccount = JSON.stringify(account);
		}

		function unaunthenticate() {
			delete $cookies.authenticatedAccount;
		}

		function login(email, password) {
			return $http.post('/api/v1/auth/login/', {
				email: email, password: password
			}).then(loginSuccessFn, loginErrorFn);
		
			function loginSuccessFn(data, status, headers, config) {
				Authentication.setAuthenticatedAccount(data.data);

				window.location ='/';
			}

			function loginErrorFn(data, status, headers, config) {
				console.error('Login Failed!')
			}
		}	

		function logout() {
			return $http.post('api/v1/auth/logout/')
				.then(logoutSuccessFn, logoutErrorFn);

			function logoutSuccessFn(data, status, headers, config) {
				Authentication.unaunthenticate();

				window.location = '/';
			}

			function logoutErrorFn(data, status, headers, config) {
				console.error('Logout Failed!');
			}
		}
	}
})();

(function () {
	'use strict';

	angular
		.module('alpha.authentication.services')
		.factory('Facebook', Facebook);

	Facebook.$inject = ['$q', '$window', '$rootScope'];

	/**
	* @namespace authentication
	* @returns {Factory}
	*/
	function Facebook($q, $window, $rootScope) {
		/**
		* @name Authentication
		* @desc The Factory to be returned
		*/
		var Facebook = {
			
		};

		return Facebook;

		var resolve = function(errval, retval, deferred) {
	    $rootScope.$apply(function() {
	        if (errval) {
		    deferred.reject(errval);
	        } else {
		    retval.connected = true;
	            deferred.resolve(retval);
	        }
	    });
        }

		function _login() {
		    var deferred = $q.defer();
	            //first check if we already have logged in
		    FB.getLoginStatus(function(response) {
		        if (response.status === 'connected') {
		            // the user is logged in and has authenticated your
			    // app
			    console.log("fb user already logged in");
			    deferred.resolve(response);
			} else {
			    // the user is logged in to Facebook, 
			    // but has not authenticated your app
			    FB.login(function(response){
			        if(response.authResponse){
				    console.log("fb user logged in");
				    resolve(null, response, deferred);
				}else{
				    console.log("fb user could not log in");
				    resolve(response.error, null, deferred);
				}
			    });
			 }
		     });
			
	     return deferred.promise;
	 }
	}
})();