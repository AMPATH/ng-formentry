/**
 * Created by developer on 6/12/15.
 */
'use strict';

/**
 * @ngdoc function
 * @name ngFormentryApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the ngFormentryApp
 */
angular.module('ngFormentryApp')
  .directive('obs',function(){
    return{
      restrict:'E',
      template:'<div><input type="text" class="form-control" ng-model="obsvalue"> {{obsvalue}}<div>',
      scope:{
        conceptId: '@',
        labelText: '@',
        obsvalue: '='
      },
      link:function(scope,element,attrs){
        console.log(scope.conceptId);

       //todo
      }
    }
  })
  .directive('htmlForm',function(){
    return{
      restrict:'E',
      trunsclude:true,
      template:'<div ng-transclude=""></div>'
    }
  })
;
