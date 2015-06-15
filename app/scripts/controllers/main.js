'use strict';

/**
 * @ngdoc function
 * @name ngFormentryApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngFormentryApp
 */
angular.module('ngFormentryApp')
  .controller('MainCtrl', ['$scope','ObsService', function ($scope, Obs) {
    console.log($scope);

    var obs=this;
    console.log(obs.weight);
    $scope.formData={
      patientuuid:'',
      encounterDate:'',
      encounterLocation:'',
      encounterProvider:'',
      weight:'50',
      temperature:'37',
      pulse:''
    };

    $scope.conceptIds = [];


    $scope.obsvalue="Hallo World";
   console.log("log input value: "+$scope);
    //console.log("pulse:" +  $scope.random);
    $scope.submit = function(){
      console.log($scope.concept-id);
      var jsonEncounter = toJson(getEncounter());
      //Obs.encounterSave($scope.formData);
    };

    function getEncounter(){
      return {
        encounterType:'8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
        patient:'8244f7d2-86fe-4138-b42c-6d757aa694ac',
        encounterDatetime:'2015-06-11T11:28:20Z',
        obs: getObs()
      };
    }

    function getObs(){
      var obs = [];
      obs.push({
        person:'8244f7d2-86fe-4138-b42c-6d757aa694ac',
        obsDatetime:'2015-06-11',
        concept:'a8a65fee-1350-11df-a1f1-0026b9348838',
        value:$scope.formData.temperature
      });
      obs.push({
        person:'8244f7d2-86fe-4138-b42c-6d757aa694ac',
        obsDatetime:'2015-06-11',
        concept:'a8a65f12-1350-11df-a1f1-0026b9348838',
        value:$scope.formData.pulse
      });
      obs.push({
        person:'8244f7d2-86fe-4138-b42c-6d757aa694ac',
        obsDatetime:'2015-06-11',
        concept:$scope.conceptId,
        value:$scope.formData.weight
      });
      return obs;
    }
    function toJson(data){
      console.log(data);
      var converted = angular.toJson(data);
      console.log(converted);
      return converted;
    }

  }]);
