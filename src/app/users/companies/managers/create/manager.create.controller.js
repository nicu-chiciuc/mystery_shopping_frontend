(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyManagerCreateController', CompanyManagerCreateController);

  /** @ngInject */
  function CompanyManagerCreateController ( $log, $state, models, user, company, place, manager ) {
    $log.debug('Entered CompanyManagerCreateController');
    console.log(place);
    var vm = this;

    vm.manager = manager;

    vm.saveManager = saveManager;

    activate();

    function activate() {
      vm.isNewManager = _.isEmpty(vm.manager);
      manager.place_id = place.id;
      manager.place_type = place.contentType;
      manager.company = company.id;
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
        }
        goToManagerDetailViewState();
      }
      function saveManagerErrorFn () {
        // TODO deal with the error
      }
    }

    function goToManagerDetailViewState () {
      var managerDetailViewState = $state.current.name.replace(/create/g, 'detail.view');
      $state.go(managerDetailViewState, {managerId: vm.manager.id});
    }
  }
})();
