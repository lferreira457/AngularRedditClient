'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ui.router',
    'ngAnimate',
    'ngStorage',
    'angular-loading-bar',
    'myApp.customFilters',
    'myApp.view1',
    'myApp.view2',
    'myApp.version'
])

.config(['$urlRouterProvider', function($urlRouterProvider) {
    $urlRouterProvider.otherwise('view1/r/webdev');
}])

.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}])

.controller('mainController', function() {
    this.menuClosed = false;
  
    this.toggleMenu = function() {
        this.menuClosed = !this.menuClosed;
    }
});