/*
 * angular-flex-picklist
 * flexPicklist directive for AngularJS
 * By Alejandro Planos
 */

/*! Copyright (c) 2016 Alejandro Planos and contributors | Licensed under the MIT license */

/*jslint browser: true*/
/*global angular, document*/

(function () {
    'use strict';
    var scripts, currentScriptPath, index, filtered;
    scripts = document.getElementsByTagName('script');
    currentScriptPath = scripts[scripts.length - 1].src;
    currentScriptPath = currentScriptPath.slice(0, currentScriptPath.lastIndexOf('/') + 1);
    angular.module('angularflexPicklist', ['simplePagination'])
        .directive('flexPicklist', ['Pagination', function (Pagination) {
            return {
                restrict: 'E',
                scope: {
                    searchPlaceHolder: '@',
                    target: '=',
                    source: '='
                },
                templateUrl: currentScriptPath + 'angular-flex-picklist.html',
                link: function (scope, element, attrs) {
                    if (element === null) { return new Error(); }
                    scope.showMoveAll = attrs.showMoveAll && attrs.showMoveAll.toLowerCase() !== 'false';
                    scope.showDeleteButton = attrs.showDeleteButton && attrs.showDeleteButton.toLowerCase() !== 'false';
                    scope.initializePicklist = function () {
                        scope.search = {};
                        scope.targetPagination = Pagination.getNew(3);
                        scope.targetPagination.numPages = Math.ceil(scope.target.length / scope.targetPagination.perPage);
                        scope.sourcePagination = Pagination.getNew(3);
                        scope.sourcePagination.numPages = Math.ceil(scope.source.length / scope.sourcePagination.perPage);
                    };
                    scope.updateFilteredItems = function () {
                        if (scope.search.optionsRightFilter !== '') {
                            filtered = scope.target.filter(scope.filterRightItems);
                            scope.targetPagination.numPages = Math.ceil(filtered.length / scope.targetPagination.perPage);
                        } else {
                            scope.targetPagination.numPages = Math.ceil(scope.target.length / scope.targetPagination.perPage);
                        }
                        if (scope.search.optionsLeftFilter !== '') {
                            filtered = scope.source.filter(scope.filterLeftItems);
                            scope.sourcePagination.numPages = Math.ceil(filtered.length / scope.sourcePagination.perPage);
                        } else {
                            scope.sourcePagination.numPages = Math.ceil(scope.source.length / scope.sourcePagination.perPage);
                        }
                    };
                    scope.moveItemRight = function () {
                        if (scope.selectedLeftItem === null || !angular.isDefined(scope.selectedLeftItem.id)) {
                            return;
                        }
                        index = scope.source.indexOf(scope.selectedLeftItem);
                        scope.target.push(scope.selectedLeftItem);
                        scope.source.splice(index, 1);
                        scope.updateFilteredItems();
                        scope.selectLeftItem(null);
                    };
                    scope.moveAllItemsRight = function () {
                        scope.source.forEach(function (item) {
                            scope.target.push(item);
                        });
                        scope.source = [];
                        scope.updateFilteredItems();
                    };
                    scope.deleteLeftItem = function (item) {
                        scope.selectedRightItem = item;
                        scope.moveItemLeft();
                    };
                    scope.moveItemLeft = function () {
                        if (scope.selectedRightItem === null || !angular.isDefined(scope.selectedRightItem.id)) {
                            return;
                        }
                        index = scope.target.indexOf(scope.selectedRightItem);
                        scope.source.push(scope.selectedRightItem);
                        scope.target.splice(index, 1);
                        scope.updateFilteredItems();
                        scope.selectRightItem(null);
                    };
                    scope.moveAllItemsLeft = function () {
                        scope.target.forEach(function (item) {
                            scope.source.push(item);
                        });
                        scope.target = [];
                        scope.updateFilteredItems();
                    };
                    scope.selectRightItem = function (item) {
                        scope.selectedRightItem = item;
                    };
                    scope.selectLeftItem = function (item) {
                        scope.selectedLeftItem = item;
                    };
                    scope.filterRightItems = function (item) {
                        if (!angular.isDefined(scope.search.optionsRightFilter) || scope.search.optionsRightFilter === '') {
                            return true;
                        }
                        var str = scope.search.optionsRightFilter;
                        return (item.title.toLowerCase().indexOf(str) >= 0 || item.description.toLowerCase().indexOf(str) >= 0);
                    };
                    scope.filterLeftItems = function (item) {
                        if (!angular.isDefined(scope.search.optionsLeftFilter) || scope.search.optionsLeftFilter === '') {
                            return true;
                        }
                        var str = scope.search.optionsLeftFilter;
                        return (item.title.toLowerCase().indexOf(str) >= 0 || item.description.toLowerCase().indexOf(str) >= 0);
                    };
                    scope.onLeftItemFilterChange = function () {
                        filtered = scope.source.filter(scope.filterLeftItems);
                        scope.sourcePagination.numPages = Math.ceil(filtered.length / scope.sourcePagination.perPage);
                    };
                    scope.onRightItemFilterChange = function () {
                        filtered = scope.target.filter(scope.filterRightItems);
                        scope.targetPagination.numPages = Math.ceil(filtered.length / scope.targetPagination.perPage);
                    };
                    scope.initializePicklist();
                }
            };
        }]);
}());