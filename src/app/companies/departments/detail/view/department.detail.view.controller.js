(function() {
  'use strict';

  angular
    .module('spark')
    .controller('DepartmentDetailViewController', DepartmentDetailViewController);

  /** @ngInject */
  function DepartmentDetailViewController ( $log, company, department ) {
    $log.debug('Entered DepartmentDetailViewController');
    var vm = this;

    vm.company = company;
    vm.department = department;

    activate();

    function activate() {
    }

  }
})();
