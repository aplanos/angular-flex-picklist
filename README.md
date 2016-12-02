# angular-flex-picklist
An object oriented picklist with filtering for angular

## Angular Requirements
* angular-flex-picklist zero and higher _requires_ Angular 1.4.x or higher and it has been tested with Angular 1.4.7.

## Bootstrap Requirements
* angular-flex-picklist zero and higher _requires_ Bootstrap CSS version 3.x or higher

## SimplePagination Requirements
* angular-flex-picklist zero and higher _requires_ ng-simplePagination version 1 or higher

## Using angular-flex-picklist

### Adding dependency to your project

When you are done downloading all the dependencies and project files the only remaining part is to add dependencies on the `angularflexPicklist` AngularJS module:

```js
angular.module('yourModule', ['angularflexPicklist']);
```

### Define the source and target lists on the controller.

```js
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
```

### Render the picklist on the view

Basic options

```html
<flex-picklist target="itemsTarget" source="itemsSource"></flex-picklist>
```

Extended Options

```html
<flex-picklist search-place-holder="Search" 
			   target="itemsTarget" 
			   source="itemsSource" 
			   show-move-all="true" 
			   show-delete-button="true">
			   </flex-picklist>
```
