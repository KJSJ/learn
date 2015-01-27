(function () {
	'use strict';

	angular
		.module('alpha.fbpage.controllers')
		.module('GraphSearchController', GraphSearchController);

	GraphSearchController.$inject = ['$location','$scope'];

	function GraphSearchController($location, $scope) {
		var vm = this;

		vm.search = search;
		vm.result = [];

		vm.search()

		function activate() {

		}
	}


})