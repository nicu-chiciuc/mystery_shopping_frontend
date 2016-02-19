(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyEmployeeDetailViewController', CompanyEmployeeDetailViewController);

  /** @ngInject */
  function CompanyEmployeeDetailViewController ( $log, $state, place, employee ) {
    $log.debug('Entered CompanyEmployeeDetailViewController');
    var vm = this;

    vm.employee = employee;
    vm.place = place;

    vm.goToEmployeeDetailViewState = goToEmployeeDetailViewState;

    activate();

    function activate() {
    }

    function goToEmployeeDetailViewState() {
      var employeeDetailViewState = $state.current.name.replace(/view/g, 'edit');
      $state.go(employeeDetailViewState, {employeeId: vm.employee.id});
    }
  }
})();
