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
    //console.log($scope);

    $scope.locations={};
    $scope.location={};
    $scope.selectLocations=[];
    $scope.testLocations={};

    $scope.getLocations=function(search)
    {
      $scope.locations=Obs.getLocation(search);

      for (i in $scope.locations.results)
      {
        $scope.testLocations=Obs.getLocationByuuid(i.uuid);
        $scope.selectLocations.push($scope.testLocations);
      }

      console.log($scope.selectLocations);
    };

    function getLocations()
    {
     var result=Obs.getLocation();
      var location;

      console.log("Testing locations");
      console.log(result.$resolved);
      if (result.$resolved)
      {
        for (i in result.results)
        {
          location = Obs.getLocationByuuid(i.uuid);
          console.log(location);
          $scope.selectLocations.push(location)
        }
      }
       return $scope.selectLocations;
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var obs=this;
    console.log(obs.weight);
    $scope.formData={
      patientuuid:'',
      encounterDate:'',
      encounterLocation:'',
      encounterProvider:'',
      weight:'50',
      temperature:'37',
      pulse:'',
      obs:{}
    };

    $scope.child = {};
    $scope.child=$scope;
    console.log("Logging Child Scope")
    console.log($scope);


    $scope.obsvalue="Hallo World";

    //console.log("pulse:" +  $scope.random);
    $scope.submit = function(){
      //console.log($scope.concept-id);
      //var jsonEncounter = toJson(getEncounter());
      //
      console.log($scope.patient);
      console.log("expected rest object: ");
      console.log(JSON.stringify(getEncounter()));
      Obs.encounterSave(JSON.stringify(getEncounter()));
    };

    function getEncounter(){
      return {
        encounterType:'8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
        patient:  $scope.patient.selected.uuid,
        encounterDatetime:$scope.dt,
        location: $scope.location.selected.uuid,
        obs: getObs($scope.formData.obs)
      };
    }

    function getObs(obsData){
      var obs = [];

      for (var key in obsData)
      {
        obs.push(
          {
            concept:key,
            value:obsData[key].value
          }

        )
        console.log(key+":"+obsData[key].value);
      }
      return obs;
    }
    function toJson(data){
      console.log(data);
      var converted = angular.toJson(data);
      console.log(converted);
      return converted;
    }

    $scope.selected={};
    $scope.patient={};

    $scope.results={};
    $scope.getResults=function(searchText)
    {
      $scope.results=Obs.getPatient(searchText);
      //return data.results;
    }
    ///Date picker Methods
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.clear = function () {
      $scope.dt = null;
    };

    // Disable weekend selection
    $scope.disabled = function(date, mode) {
      return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
    };

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
      $event.preventDefault();
      $event.stopPropagation();

      $scope.opened = true;
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];

    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var afterTomorrow = new Date();
    afterTomorrow.setDate(tomorrow.getDate() + 2);
    $scope.events =
      [
        {
          date: tomorrow,
          status: 'full'
        },
        {
          date: afterTomorrow,
          status: 'partially'
        }
      ];

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0,0,0,0);

        for (var i=0;i<$scope.events.length;i++){
          var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };

  }]);
