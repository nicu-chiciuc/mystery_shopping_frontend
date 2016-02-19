(function() {
  'use strict';

  angular
    .module('spark')
    .controller('DepartmentCreateController', DepartmentCreateController);

  /** @ngInject */
  function DepartmentCreateController ( $log, $state, msUtils, models, user, company, department ) {
    $log.debug('Entered DepartmentCreateController');
    var vm = this;

    vm.company = company;
    vm.department = department;

    vm.msUtils = msUtils;

    vm.isNewDepartment = !vm.department.id;

    vm.saveDepartment = saveDepartment;

    activate();

    function activate() {
      vm.department.tenant = user.tenantId;
      vm.department.company = vm.company.id;
    }

    function saveDepartment ( department, isValid ) {
      if ( isValid ) {
        department = models.restangularizeElement(null, department, 'departments');
        if ( vm.isNewDepartment ) {
          department.post().then(saveDepartmentSuccessFn, saveDepartmentErrorFn);
        } else {
          department.put().then(saveDepartmentSuccessFn, saveDepartmentErrorFn);
        }
      }

      function saveDepartmentSuccessFn ( response ) {
        if ( vm.isNewDepartment ) {
          company.addDepartment(response);
          vm.department = response;
        }
        goToDepartmentDetailViewState();
      }
      function saveDepartmentErrorFn () {
        // TODO deal with the error
      }
    }

    function goToDepartmentDetailViewState () {
      var departmentDetailViewState = $state.current.name.replace(/(create|detail\.edit)/g, 'detail.view');
      $state.go(departmentDetailViewState, {departmentId: vm.department.id});
    }

  }
})();
