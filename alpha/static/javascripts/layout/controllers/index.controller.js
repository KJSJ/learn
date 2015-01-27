(function () {
	'use strict';

	angular
		.module('alpha.layout.controllers')
		.controller('IndexController', IndexController);

	IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar', 'dbService'];

	function IndexController($scope, Authentication, Posts, Snackbar, dbService) {
		var vm = this;

		vm.isAuthenticated = Authentication.isAuthenticated();
		vm.posts = [];
		vm.show = [];

		vm.get = get;

		vm.get('/static/db.json');


		activate();

   
    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberOf alpha.layout.controllers.IndexController
     */

     	function get(api){
     		vm.getmsg = '';
     		dbService.get(api, getPass, getFail);
     	}

     	function getPass(data) {
     		vm.show = data;
     	}

     	function getFail(data) {
     		vm.getmsg = data;
     	}

    	function activate(){
	     	Posts.all().then(postsSuccessFn,postsErrorFn);

	     	$scope.$on('post.created', function (event, post) {
	     		vm.posts.unshift(post);
	     	});

	     	$scope.$on('post.created.error', function() {
	     		vm.posts.shift();
	     	});
     	}

     	function postsSuccessFn(data, status, headers, config) {
     		vm.posts = data.data;
     	}

     	function postsErrorFn(data, status, headers, config) {
     		Snackbar.error(data.error);
     	}
    }
})();