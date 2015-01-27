(function () {

	angular
		.module('alpha.fbpage.controllers')
		.controller('UserCtrl', 
		['$scope','$location', 'Facebook',
			function($scope, $location, Facebook /*we will write this factory next*/){
	        
			$scope.login_fb = function(){
			Facebook.login().then(function(response){
               //we come here only if JS sdk login was successful so lets 
               //make a request to our new view. I use Restangular, one can
               //use regular http request as well.
			var reqObj = {"access_token": response.authResponse.accessToken,
                          "backend": "facebook"};
				var u_b = Restangular.all('sociallogin/');
				u_b.post(reqObj).then(function(response) {
					$location.path('/home');
				}, function(response) { /*error*/
					console.log("There was an error", response);
                   //deal with error here. 
				});  
			});
		}
})();