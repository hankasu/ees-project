(function () {
	'use strict';

	angular
		.module('ees_project')
		.factory('projectModelService', projectModelService);

	projectModelService.$inject = ['$rootScope'];
	function projectModelService($rootScope) {
		var project = {
			name:'',
			client:'',
			total:0,
			tasks:[]
		};
		
		return project;
	}
})();