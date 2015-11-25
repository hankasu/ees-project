(function() {
'use strict';

	angular
		.module('ees_project')
		.controller('taskModalCtrl', taskModalCtrl);

	taskModalCtrl.$inject = ['$scope','$uibModalInstance','taskName'];
	function taskModalCtrl($scope, $uibModalInstance, taskName) {
		$scope.taskName = taskName;
		$scope.ok = function () {
			$uibModalInstance.close();
			console.log($scope.taskName);
		}
		
		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		}
	}
})();