'use strict';

/**
 * @ngdoc function
 * @name ngFormentryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngFormentryApp
 */
angular.module('ngFormentryApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
