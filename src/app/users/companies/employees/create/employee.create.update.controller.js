(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyEmployeeFormController', CompanyEmployeeFormController);

  /** @ngInject */
  function CompanyEmployeeFormController ( $log, $state, models, msUtils, user, company, entity, section, place, employee ) {
    $log.debug('Entered CompanyEmployeeFormController');
    var vm = this;

    vm.employee = employee;
    vm.company = company;
    vm.entity = entity;
    vm.section = section;
    vm.place = place;
    vm.user = user;

    vm.msUtils = msUtils;

    vm.isNewEmployee = !vm.employee.id;

    vm.saveEmployee = saveEmployee;

    activate();
    function activate() {
      vm.employee.entity = vm.entity.id;
      vm.employee.section = vm.section.id ? vm.section.id : null;
      vm.employee.company = vm.company.id;

      if ( vm.isNewEmployee ) {
        vm.employee.tenant = vm.user.tenantId;
      }
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
        } else {
          vm.employee.fullName = response.fullName;
          vm.employee.job_title = response.job_title;
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
