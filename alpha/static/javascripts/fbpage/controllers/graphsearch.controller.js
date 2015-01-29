(function () {
	'use strict';

	angular
		.module('alpha.fbpage.controllers')
		.controller('GraphSearchController', GraphSearchController);

	GraphSearchController.$inject = ['$scope', '$location','$routeParams','Snackbar','Fbpage'];

	function GraphSearchController($scope, $location, $routeParams, Snackbar, Fbpage) {
		var vm = this;
		var keyword = $routeParams.keyword;
		// console.log(keyword) 

		vm.keyword = keyword;
		vm.search = searchQuery;
		searchQuery();
		isEmpty();
		vm.result = null;

		function searchQuery() {
			if (!vm.keyword) return;
			Fbpage.search(vm.keyword, searchPass, searchFail);
		}

		function isEmpty(obj) {
			for (var prop in obj) {
				if (obj.hasOwnProeprty(prop))
					return false;
			}
			return true;
		}

		function searchPass(data) {
			vm.results = data;
			console.log(vm.results)
			if(isEmpty(vm.results)){
				vm.results = null;
			}
		}

		function searchFail(data) {
			Snackbar.error('Searching Error!');
		}

	}
})();