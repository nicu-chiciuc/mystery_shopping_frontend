(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EntityDetailViewController', EntityDetailViewController);

  /** @ngInject */
  function EntityDetailViewController ( $log, company, department, entity ) {
    $log.debug('Entered EntityDetailViewController');
    var vm = this;

    vm.company = company;
    vm.department = department;
    vm.entity = entity;

    activate();

    function activate() {
    }

  }
})();
