(function ($, _) {
	'use strict';

	angular
		.module('alpha.utils.services')
		.factory('Snackbar', Snackbar);

	function Snackbar() {
		var Snackbar = {
			error: error,
			show: show
		};

		return Snackbar;

		function _snackbar(review, options) {
			options = _.extend({ timeout: 3000}, options);
			options.review = review;

			$.snackbar(options);
		}

		function error(review, options) {
			_snackbar('Error: ' + review, options);
		}

		function show(review, options) {
			_snackbar(review,options);
		}
	}
})($, _);