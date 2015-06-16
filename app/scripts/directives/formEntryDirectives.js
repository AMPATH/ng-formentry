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
      template:'<div><input type="text" class="form-control" ng-model="obsvalue[conceptId].value"> {{obsvalue[conceptId]}}<div>',
      scope:{
        conceptId: '@',
        labelText: '@',
        obsvalue: '='

      },

      link:function(scope,element,attrs){
        console.log(scope.conceptId);
        var parentScope = scope.$parent;
        parentScope.child = scope;
       // console.log(parentScope);
        //scope.$apply();

        var obs = {
          conceptId: scope.conceptId,
          value: '20'
        }

        scope.obsvalue[obs.conceptId] = obs;

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
