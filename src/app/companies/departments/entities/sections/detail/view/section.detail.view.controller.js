(function() {
  'use strict';

  angular
    .module('spark')
    .controller('SectionDetailViewController', SectionDetailViewController);

  /** @ngInject */
  function SectionDetailViewController ( $log, company, department, entity, section ) {
    $log.debug('Entered SectionDetailViewController');
    var vm = this;

    vm.company = company;
    vm.department = department;
    vm.entity = entity;
    vm.section = section;

    activate();

    function activate() {
    }

  }
})();
