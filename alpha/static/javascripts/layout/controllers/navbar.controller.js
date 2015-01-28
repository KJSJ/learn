(function () {
	'use strict';

	angular
		.module('alpha.layout.controllers')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$scope', 'Authentication', 'Snackbar', 'Fbpage'];

	function NavbarController($scope, Authentication, Snackbar, Fbpage) {
		var vm = this;
		vm.search = searchQuery;
		vm.keyword = '';
		vm.logout = logout;
		vm.results = null;

		function logout(){
			Authentication.logout();
		}

		function searchQuery(){
			if (!vm.keyword) return;
			Fbpage.search(vm.keyword, searchPass, searchFail);
		}

		function searchPass(data){
			vm.results = data.results;
			if(isEmpty(vm.results)){
				vm.results = null;
			}
		}

		function searchFail(data){
			Snackbar.error('Searching Error!');
		}
	}
})();