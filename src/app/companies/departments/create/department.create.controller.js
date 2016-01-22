(function() {
  'use strict';

  angular
    .module('spark')
    .controller('DepartmentCreateController', DepartmentCreateController);

  /** @ngInject */
  function DepartmentCreateController ( $log, $state, models, company, department ) {
    $log.debug('Entered DepartmentCreateController');
    var vm = this;

    console.log(company);
    vm.company = company;
    vm.department = department;

    vm.saveDepartment = saveDepartment;

    activate();

    function activate() {
    }

    function saveDepartment ( department, isValid, nextState ) {
      department.tenant = 1;
      department.company = company.id;
      department = models.restangularizeElement(null, department, 'departments');
      if ( isValid ) {
        department.save().then(saveDepartmentSuccessFn, saveDepartmentErrorFn);
      }

      function saveDepartmentSuccessFn ( response ) {
        company.addDepartment(response);
        $state.go(nextState, {departmentId: response.id});
      }
      function saveDepartmentErrorFn () {
        // TODO deal with the error
      }
    }

  }
})();
