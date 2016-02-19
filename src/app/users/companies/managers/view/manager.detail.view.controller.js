(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyManagerDetailViewController', CompanyManagerDetailViewController);

  /** @ngInject */
  function CompanyManagerDetailViewController ( $log, $state, place, manager ) {
    $log.debug('Entered CompanyManagerDetailViewController');
    var vm = this;

    vm.manager = manager;
    vm.place = place;

    vm.goToManagerDetailViewState = goToManagerDetailViewState;

    activate();

    function activate() {
    }

    function goToManagerDetailViewState() {
      var managerDetailViewState = $state.current.name.replace(/view/g, 'edit');
      $state.go(managerDetailViewState, {managerId: vm.manager.id});
    }
  }
})();
