(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EntityCreateController', EntityCreateController);

  /** @ngInject */
  function EntityCreateController ( $log, $state, msUtils, models, user, cities, company, department, entity ) {
    $log.debug('Entered EntityCreateController');
    var vm = this;

    vm.company = company;
    vm.department = department;
    vm.entity = entity;
    vm.cities = cities;

    vm.msUtils = msUtils;

    vm.isNewEntity = !vm.entity.id;

    vm.saveEntity = saveEntity;
    vm.citySelected = citySelected;

    activate();

    function activate() {
      if ( vm.isNewEntity ) {
        angular.extend(entity, models.manager.EntityModel);
      }
      vm.entity.tenant = user.tenantId;
      vm.entity.department = vm.department.id;
    }

    function saveEntity ( entity, isValid ) {
      if ( isValid ) {
        entity.mergeCoordinates();
        entity = models.restangularizeElement(null, entity, 'entities');
        if ( vm.isNewEntity ) {
          entity.post().then(saveEntitySuccessFn, saveEntityErrorFn);
        } else {
          entity.put().then(saveEntitySuccessFn, saveEntityErrorFn);
        }
      }

      function saveEntitySuccessFn ( response ) {
        if ( vm.isNewEntity ) {
          department.addEntity(response);
          vm.entity = response;
        }
        goToEntityDetailViewState();
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
      vm.sectors = selectedCity.sectors || [];
    }

    function goToEntityDetailViewState () {
      var entityDetailViewState = $state.current.name.replace(/(create|detail\.edit)/g, 'detail.view');
      $state.go(entityDetailViewState, {entityId: vm.entity.id, departmentId: vm.entity.department});
    }

  }
})();
