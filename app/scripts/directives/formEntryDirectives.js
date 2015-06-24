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
  .directive('obsRadio', function () {
  return {
    restrict: 'E',
    template: '<div>' +
    '<label ng-repeat="answer in conceptAnswers">' +
    '  <input type="radio" name="{{concept}}" ng-value="{{answer}}" ng-model="obsvalue[index].value">' +
    ' {{testLabels[answer]}}  ' +
    '</label> ' +
    '</div> <!-- <div>currently selected: {{obsvalue[concept].value}}</div>-->',
    scope: {
      conceptId: '@',  //one way binding to allow question concept to be passed to the template
      conceptAnswerId: '@',  //one way binding to allow answer concepts to be passed to the template
      answerLabels: '@', //one way binding to allow labels to be passed to the template
      obsvalue: '=' //two-way binding scope object
    },
    link: function (scope, element, attrs) {

      //scope.obsvalue = {}; //initialize the object in the child/isolate scope to allow two-way data binding
      scope.index =scope.obsvalue.length;
      /*
      For consistency throughout this code we'll create Obs object with properties :
      1. conceptId - which will represent the question concept in OpenMRS and
      2. value - which will represent the value entered/selected by the user.
      The value property should be able to store string values of all type
       */


      //Obs object to store Question concept and entered/selected value
      var obs = {
        conceptId: scope.conceptId,
        value: ''
      };


      //Creating the key/value object
      scope.obsvalue[scope.index] = obs;

      scope.obsvalue.length++;


      scope.conceptAnswers = scope.conceptAnswerId.split(',');//converting the answer ids/uuids into an array for rendering
      console.log(scope.conceptAnswers);
      scope.concept = scope.conceptId; // get the question conceptId
      console.log(scope.concept);
      scope.conceptTestLabels = scope.answerLabels.split(','); //converting the answer labels into an array for rendering

      console.log(scope.conceptTestLabels.length + ' : ' + +scope.conceptAnswers.length)

      if (scope.conceptTestLabels.length == scope.conceptAnswers.length) {
        scope.testLabels = {}; //dictionary object (key/value)
        for (var i = 0; i < scope.conceptAnswers.length; i++) {
          //Creating a key/value pair of labels
          //The uuid will be treated as the key and associated label will be the value
          scope.testLabels[scope.conceptAnswers[i]] = scope.conceptTestLabels[i];
        }
        console.log(scope.testLabels["123"]);

      }
      else {
        element.html('Error')
      }
    }
  }
})
  .directive('obs', function () {
  return {
    restrict: 'E',
    template: '<div><input type="text" class="form-control" ng-model="obsvalue[index].value"> <!--{{obsvalue[index]}}--><div>',
    scope: {
      conceptId: '@',
      labelText: '@',
      obsvalue: '='


    },

    link: function (scope, element, attrs) {
      console.log(scope.conceptId);


      var obs = {
        conceptId: scope.conceptId,
        value: '20'// this should be changed to blank in production
      }

      scope.index =scope.obsvalue.length;

      scope.obsvalue[scope.index] = obs;

      scope.obsvalue.length++;


      //creating a dictionary with a key/value pair
      // where the key is the conceptId and
      // the value is the obj having conceptId and the value entered by the user



    }
  }
})
  .directive('htmlForm', function () {
  return {
    restrict: 'E',
    trunsclude: true,
    template: '<div ng-transclude=""></div>'
  }
});
