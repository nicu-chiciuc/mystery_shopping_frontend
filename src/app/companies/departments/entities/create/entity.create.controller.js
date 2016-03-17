(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EntityCreateController', EntityCreateController);

  /** @ngInject */
  function EntityCreateController ( $log, $state, msUtils, models, user, company, department, entity ) {
    $log.debug('Entered EntityCreateController');
    var vm = this;

    vm.company = company;
    vm.department = department;
    vm.entity = entity;

    vm.msUtils = msUtils;

    vm.isNewEntity = !vm.entity.id;
    vm.noCache = false;

    vm.saveEntity = saveEntity;
    vm.citySelected = citySelected;
    vm.querySearch = querySearch;
    vm.selectedCityChange = selectedCityChange;

    activate();

    function activate() {
      if ( vm.isNewEntity ) {
        angular.extend(vm.entity, models.manager.EntityModel);
      } else {
        vm.sectors = vm.entity.city_repr.sectors || [];
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

    function citySelected ( city ) {
      vm.entity.sector = null;
      vm.sectors = city.sectors || [];
    }

    function goToEntityDetailViewState () {
      var entityDetailViewState = $state.current.name.replace(/(create|detail\.edit)/g, 'detail.view');
      $state.go(entityDetailViewState, {entityId: vm.entity.id, departmentId: vm.entity.department});
    }

    function querySearch ( q ) {
      return models.cities().getList({q: q}).then(getCitySuccessFn, getCityErrorFn);

      function getCitySuccessFn ( response ) {
        return response;
      }
      function getCityErrorFn () {
        // TODO deal with the error
      }
    }

    function selectedCityChange ( city ) {
      vm.entity.city = city.id;
      vm.citySelected(city);
    }

  }
})();
