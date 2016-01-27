(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyEmployeeFormController', CompanyEmployeeFormController);

  /** @ngInject */
  function CompanyEmployeeFormController ( $log, $state, models, company, entity, section, employee ) {
    $log.debug('Entered CompanyEmployeeFormController');
    var vm = this;

    vm.employee = employee;
    vm.entity = entity;
    vm.section = section;

    // Place where to add the newly created employee.
    // In case Section is empty, this means that the place where to add the employee is
    // the injected `entity`, otherwise add the employee to the injected `section`.
    vm.place = angular.equals({}, vm.section) ? vm.entity : vm.section;

    vm.saveEmployee = saveEmployee;

    activate();

    function activate() {
      vm.isNewEmployee = _.isEmpty(vm.employee);
      employee.entity = entity.id;
      employee.section = angular.equals({}, vm.section) ? null : vm.section.id;
      employee.company = company.id;
    }

    function saveEmployee ( employee, isValid ) {

      if ( isValid ) {
        if ( vm.isNewEmployee ) {
          employee = models.restangularizeElement(null, employee, 'clientemployees');
          employee.post().then(saveEmployeeSuccessFn, saveEmployeeErrorFn);
        } else {
          employee.put().then(saveEmployeeSuccessFn, saveEmployeeErrorFn);
        }
      }

      function saveEmployeeSuccessFn ( response ) {
        if ( vm.isNewEmployee ) {
          vm.place.addEmployee(response);
          vm.employee = response;
        }
        goToEmployeeDetailViewState();
      }
      function saveEmployeeErrorFn () {
        // TODO deal with the error
      }
    }

    function goToEmployeeDetailViewState () {
      var employeeDetailViewState = $state.current.name.replace(/(create|detail\.edit)/g, 'detail.view');
      $state.go(employeeDetailViewState, {employeeId: vm.employee.id});
    }
  }
})();
