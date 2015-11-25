(function() {
'use strict';

	angular
		.module('ees_project')
		.controller('Project', Project);

	Project.$inject = ['projectModelService'];
	function Project(projectModelService) {
		var pvm = this;
		pvm.name = projectModelService.name;
		pvm.addTask = addTask;
		
		function addTask() {
			var task = {
				name:'',
				total:0,
				resources:[]
			};
			projectModelService.tasks.push(task);
		}

	}
})();