(function () {
	'use strict';

	angular.module('ees_project', ['ngAnimate', 'xeditable'])
		.run(function (editableOptions, editableThemes) {
			editableThemes.bs3.inputClass = 'input-sm';
			editableThemes.bs3.buttonsClass = 'btn-sm';
			editableOptions.theme = 'bs3';
		})
		.controller('Main', Main);

	Main.$inject = ['$scope'];
	function Main($scope) {
		var vm = this;
		vm.isEdit = false;
		vm.project = {
			name: 'Click to add a title',
			client: '',
			totalCost: '',
			tasks: []
		};

		vm.addResource = {
			name: 'Select a Resource',
			rate: 0.0,
			img: "",
			hours: 0,
			employees: "",
			index: 0
		};
		vm.addTask = addTask;
		vm.addToTask = addToTask;
		vm.removeFromTask = removeFromTask;
		vm.clear = clearResource;
		vm.editResource = editResource;
		vm.resourceVisible = false;
		vm.toggleResource = toggleResource;
		vm.showProject = false;

		activate();

		function activate() {
			setAutocomplete();
		}

		function toggleResource() {
			var ele = $('#resource');
			if (vm.resourceVisible) {

				ele.hide('slide', {}, 1000);

			} else {
				ele.show('slide', {}, 500);
				$('#resName').focus();
			}
			vm.resourceVisible = !vm.resourceVisible;
		}

		function editResource(index) {
			vm.isEdit = true;
			vm.addResource = vm.task.resources[index];
		}

		function removeFromTask(resourceIndex) {
			vm.task.resources.splice(resourceIndex, 1);
			calcTotal();
		}

		function addToTask(resource, taskId) {

			vm.project.tasks[taskId].resources.push(resource);

			clearResource();
			vm.isEdit = false;
			calcTotal();
		}

		function addTask() {

			var task = {
				name: '',
				img: '',
				total: 0,
				resources: []
			};

			vm.project.tasks.push(task);
			//$scope.$apply();

		}

		function clearResource() {
			$('#resName').val('');
			vm.addResource = {};
			vm.isEdit = true;
		}

		function calcTotal() {
			vm.project.totalCost = 0;
			angular.forEach(vm.project.tasks, function (task, i) {
				task.total = 0;
				angular.forEach(task.resources, function (resource, i) {
					task.total += resource.rate * resource.hours;
				});
				vm.project.totalCost += task.total;
			});

		}

		function setAutocomplete() {
			$('#resName')
				.autocomplete({
					source: function (request, response) {
						$.getJSON('data_service.ashx', request, function (data) {
							var suggestions = [];
							$.each(data, function (i, val) {
								suggestions.push({
									label: val.name,
									id: val.value,
									rate: val.rate,
									img: val.img,
									employees: val.employees,
									index: i

								});
							});
							response(suggestions);
						});
					},
					minLength: 1,
					select: function (event, ui) {
						vm.addResource = {
							name: ui.item.label,
							rate: ui.item.rate,
							hours: 0,
							img: ui.item.img,
							employees: ui.item.employees,
							index: ui.item.index
						};
						$scope.$apply();
					}
				});	//end autocomplete
		}//end setAutocomplete
		
		
	}
})();