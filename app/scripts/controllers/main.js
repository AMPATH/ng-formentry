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
  /*
  Testing how to using radio buttons
   */

    /*
    Always initialize the binding object to allow for two-way binding
     Initializing the binding object for the radio buttons
     */

    $scope.data={selectedItem:{}};

    /*
    Test function to see what is selected when the user selects/clicks a given radio button
     */
    $scope.test=function(){
      console.log("parent Scope Val: ");
      //console.log( $scope.data.selectedItem);

      for (var key in $scope.data.selectedItem)
      {
        /*
        When logging this object I noticed that one the properties was being lost (concepId) for the subsquent objects
        Even though it works fine to my expectation am not very sure if these code my crumble
         */
        console.log('Concept Question Key: '+key);
        console.log('Selected Concept Answer Key: '+$scope.data.selectedItem[key].value);
      }
    }

    /*
    Autocomplete fields for locations
    Initializing the scope
     */
    $scope.locations={};//list of locations
    $scope.location={};//selected location
    $scope.getLocations=function(search)
    {
      $scope.locations=Obs.getLocation(search);

    };


    $scope.formData={
      patientuuid:'',
      encounterDate:'',
      encounterLocation:'',
      encounterProvider:'',
      weight:'',
      temperature:'',
      pulse:'',
      obs:{length:0}
    };
//obs.length !== 0
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

    /*
    This method is being used to build JSON object for the encounter that can be passed for posting
     */
    function getEncounter(){
      return {
        encounterType:'8d5b2be0-c2cc-11de-8d13-0010c6dffd0f',
        patient:  $scope.patient.selected.uuid,
        encounterDatetime:$scope.dt,
        location: $scope.location.selected.uuid,
        obs: getObs($scope.formData.obs)
      };
    }

    /*
    Function to get all the obs on the form and generate a JSON with obs array
     */
    function getObs(obsData){
      var obs = [];

      for (var key in obsData)
      {
        if(key !=='length')
        obs.push(
          {
            concept:obsData[key].conceptId,
            value:obsData[key].value
          }

        );
        console.log(key+":"+obsData[key].value);
      }

      /*
      Obs from Test radio buttons
       */

      for (var key in $scope.data.selectedItem)
      {
        obs.push(
          {
            concept:key,
            value:$scope.data.selectedItem[key].value
          }
        )
      }
      return obs;
    }
    function toJson(data){
      console.log(data);
      var converted = angular.toJson(data);
      console.log(converted);
      return converted;
    }

    $scope.patient={}; //selected patient

    $scope.patients={};
    $scope.getResults=function(searchText)
    {
      $scope.patients=Obs.getPatient(searchText);
      //return data.results;
    }


    /*
    Date picker Methods
     */
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
