'use strict';

/**
 * @ngdoc function
 * @name ngFormentryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngFormentryApp
 */
angular.module('ngFormentryApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
