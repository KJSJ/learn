(function () {
	'use strict';

	angular
		.module('alpha.fbpage.controllers')
		.controller('PageDetailController', PageDetailController);

	PageDetailController.$inject = ['$http','$routeParams', 'Fbpage' ,'Snackbar'];

	function PageDetailController($http, $routeParams, Fbpage, Snackbar) {
		var vm = this;
		var id = $routeParams.id;
		vm.results = null;

		vm.put = put;
		put();

		function put() {
			$http.put('/api/v1/fbpage/',$routeParams.id).success(successFN).error(errorFN);
		}

		function successFN (data) {
			vm.results = data;
			console.log(vm.results)
		}

		function errorFN (data){
			Snackbar.error('Page not Found!');
		}
	}
})();