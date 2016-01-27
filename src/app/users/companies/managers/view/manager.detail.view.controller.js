(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyManagerDetailViewController', CompanyManagerDetailViewController);

  /** @ngInject */
  function CompanyManagerDetailViewController ( $log, $state, models, user, company, place, companyManager ) {
    $log.debug('Entered CompanyManagerDetailViewController');
    console.log(companyManager);
    var vm = this;

    vm.companyManager = companyManager;
    vm.place = place;

    activate();

    function activate() {
    }
  }
})();
