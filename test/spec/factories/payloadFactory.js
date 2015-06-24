'use strict';

describe('Factory: payloadFactory', function () {

  // load the factory module
  beforeEach(module('ngFormentryApp'));
  
  var payloadFactory;

  beforeEach(inject(function ($injector) {
    payloadFactory = $injector.get('PayloadFactory');
  }));
  
  var expectedObsArray = [
    {
      concept:'obsWithValue',
      value: 10
    },
    {
      concept:'obsWithoutValue',
      value:null
    }
  ];
  
  var objectContainingValidObsObjects = {
    hivStatus:{
      conceptUuid:'obsWithValue',
      value:10
    },
    hasKids:{
      conceptUuid:'obsWithoutValue'      
    }
  };


  it('should have the payload factory defined', function () {
    expect(payloadFactory).toBeDefined();
    expect(payloadFactory.Obs).toBeDefined();
    expect(payloadFactory.ObsArray).toBeDefined();
    expect(payloadFactory.Encounter).toBeDefined();
  });
  
  it('should create the minimum required obs object',function(){
     var conceptUuid = 'test';
     var value = 10;
     var obs = new payloadFactory.Obs(conceptUuid,value);
     expect(obs).toBeDefined();
     expect(obs.concept).toBeDefined();
     expect(obs.value).toBeDefined();
     expect(obs.concept).toBe(conceptUuid);
     expect(obs.value).toEqual(value);
     
  });
  
  it('should create an array of valid obs given an object which contain valid obs objects',function(){
     var obs = payloadFactory.ObsArray(objectContainingValidObsObjects,'conceptUuid','value');//
     expect(obs).toBeDefined();
     expect(obs.length).toEqual(2);
     expect(compareObsArray(obs,expectedObsArray)).toEqual(true);
  });
  
  function compareObs(obs1,obs2){
    var conceptEquivalence=  (obs1.concept === obs2.concept);
    var valueEquivalence = (obs1.value === obs2.value);
    return conceptEquivalence && valueEquivalence;
  }
  
  function compareObsArray(array1, array2){
    if(array1.length !== array2.length) return false;
    
    for(var i = 0; i<array1.length;i++){
      var obsEquivalent = compareObs(array1[i],array2[i]);
      if(obsEquivalent === false) return false;
    }
    return true;
  }
  
  
 
  
});