/**
 * Created by developer on 6/12/15.
 */
angular.module('ngFormentryApp')
  .factory('ObsService',['$resource','$http','$base64',function($resource,$http, Base64){
    var baseUrl = "https://test1.ampath.or.ke:8443/amrs/ws/rest/v1/";
    var serviceDefinition = {

    };

    var obsData = [
      {
        "person":"8244f7d2-86fe-4138-b42c-6d757aa694ac",
        "obsDatetime":"2015-06-12",
        "concept":"a8a65fee-1350-11df-a1f1-0026b9348838",
        "value":"35"
      },
      {
        "person":"8244f7d2-86fe-4138-b42c-6d757aa694ac",
        "obsDatetime":"2015-06-12",
        "concept":"a8a65f12-1350-11df-a1f1-0026b9348838",
        "value":"100"
      }
    ]


    var encData={
      "encounterType":"8d5b2be0-c2cc-11de-8d13-0010c6dffd0f",
      "patient":"8244f7d2-86fe-4138-b42c-6d757aa694ac",
      "encounterDatetime":"2015-06-11T11:28:20Z",
      "obs":obsData
    }




//obs/:uuid
    serviceDefinition.getResource = function(){
      return $resource(baseUrl + 'obs/:uuid',
        {uuid: '@uuid'},
        {query: {method: "GET", isArray: false}}
      );
    }

    serviceDefinition.getEncounterResource = function(){
      return $resource(baseUrl + 'encounter/:uuid',
        {uuid: '@uuid'},
        {query: {method: "GET", isArray: false}}
      );
    }
    serviceDefinition.obsGet = function(obs){
      authdata = Base64.encode('admin' + ':' + 'Admin123');
      $http.defaults.headers.common.Authorization = 'Basic ' + authdata;

      return serviceDefinition.getResource().get({uuid:'095c168e-1352-11df-a1f1-0026b9348838'},function(data){

        console.log(data);
      });
    }

    serviceDefinition.obsSave = function(obs){
      authdata = Base64.encode('admin' + ':' + 'Admin123');
      $http.defaults.headers.common.Authorization = 'Basic ' + authdata;

      for(i=0;i<obsData.length;i++)
      {
        console.log(obsData[i]);
        serviceDefinition.getResource().save(obsData[i],function(data){

          console.log(data);
        });
      }

    };

    serviceDefinition.encounterSave = function(enc){
      authdata = Base64.encode('admin' + ':' + 'Admin123');
      $http.defaults.headers.common.Authorization = 'Basic ' + authdata;


        console.log(encData);
        serviceDefinition.getEncounterResource().save(encData,function(data){

          console.log(data);
        });


    };
    return serviceDefinition;
  }]);
