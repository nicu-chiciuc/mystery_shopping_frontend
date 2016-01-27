(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyEmployeeDetailViewController', CompanyEmployeeDetailViewController);

  /** @ngInject */
  function CompanyEmployeeDetailViewController ( $log, $state, entity, section, employee ) {
    $log.debug('Entered CompanyEmployeeDetailViewController');
    console.log(employee);
    var vm = this;

    vm.employee = employee;
    vm.entity = entity;
    vm.section = section;

    // Place where to add the newly created employee.
    // In case Section is empty, this means that the place where to add the employee is
    // the injected `entity`, otherwise add the employee to the injected `section`.
    vm.place = angular.equals({}, vm.section) ? vm.entity : vm.section;

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
