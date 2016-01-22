(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EntityCreateController', EntityCreateController);

  /** @ngInject */
  function EntityCreateController ( $log, $state, models, cities, company, department, entity ) {
    $log.debug('Entered EntityCreateController');
    var vm = this;

    console.log(company);
    console.log(department);
    console.log(entity);
    console.log(cities);
    vm.company = company;
    vm.department = department;
    vm.entity = entity;
    vm.cities = cities;

    vm.saveEntity = saveEntity;
    vm.citySelected = citySelected;

    activate();

    function activate() {
    }

    function saveEntity ( entity, isValid, nextState ) {
      entity.tenant = 1;
      entity.department = department.id;
      entity = models.restangularizeElement(null, entity, 'entities');
      if ( isValid ) {
        entity.save().then(saveEntitySuccessFn, saveEntityErrorFn);
      }

      function saveEntitySuccessFn ( response ) {
        department.addEntity(response);
        $state.go(nextState, {entityId: response.id});
      }
      function saveEntityErrorFn () {
        // TODO deal with the error
      }
    }

    function citySelected ( cities, cityId ) {
      vm.entity.sector = null;
      var selectedCity = _.find(cities, function ( city ) {
        return city.id == cityId;
      });
      console.log(selectedCity);
      vm.sectors = selectedCity.sectors || [];
    }

  }
})();
