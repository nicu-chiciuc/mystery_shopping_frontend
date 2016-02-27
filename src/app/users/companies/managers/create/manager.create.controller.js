(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyManagerCreateController', CompanyManagerCreateController);

  /** @ngInject */
  function CompanyManagerCreateController ( $log, $state, msUtils, models, user, company, place, manager ) {
    $log.debug('Entered CompanyManagerCreateController');

    var vm = this;

    vm.company = company;
    vm.manager = manager;
    vm.place = place;
    vm.user = user;

    vm.msUtils = msUtils;

    vm.isNewManager = !vm.manager.id;

    vm.saveManager = saveManager;

    activate();

    function activate() {
      vm.manager.place_id = vm.place.id;
      vm.manager.place_type = vm.place.contentType;
      vm.manager.company = vm.company.id;

      if ( vm.isNewManager ) {
        vm.manager.tenant = vm.user.tenantId;
      }
    }

    function saveManager ( manager, isValid ) {

      if ( isValid ) {
        if ( vm.isNewManager ) {
          manager = models.restangularizeElement(null, manager, 'clientmanagers');
          manager.post().then(saveManagerSuccessFn, saveManagerErrorFn);
        } else {
          manager.put().then(saveManagerSuccessFn, saveManagerErrorFn);
        }
      }

      function saveManagerSuccessFn ( response ) {
        if ( vm.isNewManager ) {
          place.addManager(response);
          vm.manager = response;
        } else {
          vm.manager.fullName = response.fullName;
          vm.manager.job_title = response.job_title;
        }
        goToManagerDetailViewState();
      }
      function saveManagerErrorFn () {
        // TODO deal with the error
      }
    }

    function goToManagerDetailViewState () {
      var managerDetailViewState = $state.current.name.replace(/(create|detail\.edit)/g, 'detail.view');
      $state.go(managerDetailViewState, {managerId: vm.manager.id});
    }
  }
})();
