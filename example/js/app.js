(function () {
    var app = angular.module('app', ['angularflexPicklist']);
	
	app.controller('AppController', function($scope){
		
		$scope.itemsSource = [
			{
				id: 1,
				title: "Item 1",
				description: "Item 1 Description"
			},
			{
				id: 2,
				title: "Item 2",
				description: "Item 2 Description"
			},
			{
				id: 3,
				title: "Item 3",
				description: "Item 3 Description"
			}
		];
		
		$scope.itemsTarget = [];
				
		
	});
	
}());