angular.module('ngFormentryApp')
  .factory('PayloadFactory', [function () {

  var factoryDefinition = {

  };

  factoryDefinition.Obs = function (conceptUuid, value) {
		  this.concept = conceptUuid;
		  this.value = value;
  };

  factoryDefinition.ObsArray = function (objectArray, conceptUuidMember, valueMember, commaDelimitedIndexesToExclude) {
		var obsArray = [];

    for (var obs in objectArray) {
      var conceptUuid = null;
      var value = null;
      
      for (var key in objectArray[obs]) {
        if (key === conceptUuidMember)
          conceptUuid = objectArray[obs][key];

        if (key === valueMember)
          value = objectArray[obs][key];
      }

      if (conceptUuid)
        obsArray.push(new factoryDefinition.Obs(conceptUuid, value));

    }
    return obsArray;
  };
  
  factoryDefinition.Encounter = function(encounterTypeUuid,patientUuid,encounterDatetime,locationUuid,convertedObs){
    this.encounterType = encounterTypeUuid;
    this.patient = patientUuid;
    this.encounterDatetime= encounterDatetime;
    this.location = locationUuid;
    this.obs= convertedObs;
  };
  return factoryDefinition;

}]);