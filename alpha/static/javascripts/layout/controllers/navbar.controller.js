(function () {
	'use strict';

	angular
		.module('alpha.layout.controllers')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$scope', '$location','Authentication', 'Snackbar', 'Fbpage'];

	function NavbarController($scope, $location, Authentication, Snackbar, Fbpage) {
		var vm = this;
	
		vm.redirect = redirect;
		vm.keyword = '';
		vm.logout = logout;
		vm.fblogin = fblogin;

		function logout(){
			Authentication.logout();
		}

		function redirect(){
			$location.path('/search/'+vm.keyword);
		}

		function fblogin(){
			window.location = '/api/v1/social/login/facebook/?next=';
		}
	}
})();