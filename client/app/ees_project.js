(function () {
	'use strict';

	angular.module('ees_project', [])
		.controller('Main', Main);

	Main.$inject = ['$scope'];
	function Main($scope) {
		var vm = this;
		vm.isEdit = false;
		vm.task = {
			name: "Bio Surveys",
			img: "",
			total: 0,
			resources: []
		};

		vm.addResource = {
			name: 'Select a Resource',
			rate: 0.0,
			img: "",
			hours: 0,
			employees: "",
			index:0
		};
		vm.addToTask = addToTask;
		vm.removeFromTask = removeFromTask;
		vm.clear = clearResource;
		vm.editResource = editResource;

		function editResource(index) {
			vm.isEdit = true;
			vm.addResource = vm.task.resources[index];
		}

		function removeFromTask(resourceIndex) {
			vm.task.resources.splice(resourceIndex, 1);
			calcTotal();
		}

		function addToTask(resource) {
			if (!vm.isEdit) {
				vm.task.resources.push(resource);
			}
			clearResource();
			vm.isEdit = false;
			calcTotal();
		}

		function clearResource() {
			$('#resName').val('');
			vm.addResource = {};
			vm.isEdit = true;
		}

		function calcTotal() {
			vm.task.total = 0;
			angular.forEach(vm.task.resources, function (value, i) {
				vm.task.total += value.rate * value.hours;
			});
		}
		setAutocomplete();

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
									index:i
									
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
							index:ui.item.index
						};
						$scope.$apply();
					}
				});	//end autocomplete
		}//end setAutocomplete
		
		
	}
})();