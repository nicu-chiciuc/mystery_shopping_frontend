(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyCreateController', CompanyCreateController);

  /** @ngInject */
  function CompanyCreateController ( $log, $state, models, industries, countries, user ) {
    $log.debug('Entered CompanyCreateController');
    $log.debug(user);
    var vm = this;

    vm.industries = industries;
    vm.countries = countries;

    vm.saveCompany = saveCompany;

    activate();

    function activate() {
    }

    function saveCompany ( company, isValid, nextState ) {
      company.tenant = 1;
      company = models.restangularizeElement(null, company, 'companies');
      if ( isValid ) {
        company.save().then(saveCompanySuccessFn, saveCompanyErrorFn);
      }

      function saveCompanySuccessFn ( response ) {
        $state.go(nextState, {id: response.id});
      }
      function saveCompanyErrorFn () {
        // TODO deal with the error
      }
    }
  }
})();