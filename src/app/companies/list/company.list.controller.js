(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyListController', CompanyListController);

  /** @ngInject */
  function CompanyListController ( $log, companies ) {
    $log.debug('Entered CompanyListController');
    var vm = this;

    vm.companies = companies;
    console.log(companies);

    activate();

    function activate() {
    }

  }
})();
