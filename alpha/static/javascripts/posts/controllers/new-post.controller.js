(function () {
	'use strict';

	angular
		.module('alpha.posts.controllers')
		.controller('NewPostController', NewPostController);

	NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts'];

	function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts) {
		var vm = this;

		vm.submit = submit;

		function submit() {
			$rootScope.$broadcast('post.created', {
				review: vm.review,
				author: {
					username: Authentication.getAuthenticatedAccount().username
				}
			});

			$scope.closeThisDialog();

			Posts.create(vm.review).then(createPostSuccessFn, createPostErrorFn);

			function createPostSuccessFn(data,status,headers,config) {
				Snackbar.show('Success! Review Posted.');
			}

			function createPostErrorFn(data,status,headers,config) {
				$rootScope.$broadcast('post.created.error');
				Snackbar.error(data.error);
			}
		}
	}
})();