(function () {
	'use strict';

	angular.module('ees_project', [])
		.controller('Main', Main);
	
	//Main.$inject = [];
	function Main() {
		var vm = this;
		vm.task = {
				name: "Bio Surveys",
				img: "",
				total: 2650,
				resources: [
					{
						name: "Biologist",
						rate: 70,
						hours: 4,
						total: 0,
						img: "biology.jpg",
						candidates: "Kylan Frye, Tae Hiller, Amanda Stenjem, Matt Zabka",
					},
					{
						name: "Project Manager",
						rate: 100,
						hours: 10,
						total: 0,
						img: "project_management.jpg",
						candidates: "Burak, Fox, Herring, Watts, Smith, Zahratka",
					},

				]
			}
		};
})();