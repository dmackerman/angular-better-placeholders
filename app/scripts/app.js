'use strict';

var app = angular.module('PlaceholderDemoApp', ['angularBetterPlaceholder'])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
  });