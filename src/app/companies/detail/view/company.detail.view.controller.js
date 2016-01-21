(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyDetailViewController', CompanyDetailViewController);

  /** @ngInject */
  function CompanyDetailViewController ( $log, company ) {
    $log.debug('Entered CompanyDetailViewController');
    var vm = this;

    vm.company = company;


    activate();

    function activate() {
    }

  }
})();
