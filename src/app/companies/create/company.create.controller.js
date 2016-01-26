(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyCreateController', CompanyCreateController);

  /** @ngInject */
  function CompanyCreateController ( $log, $state, models, industries, countries, company, user ) {
    $log.debug('Entered CompanyCreateController');
    var vm = this;

    vm.company = company;

    vm.industries = industries;
    vm.countries = countries;

    vm.saveCompany = saveCompany;

    activate();

    function activate() {
      vm.isNewCompany = _.isEmpty(vm.company);
    }

    function saveCompany ( company, isValid, nextState ) {

      if ( isValid ) {
        if ( vm.isNewCompany ) {
          company.tenant = user.tenantId;
          company = models.restangularizeElement(null, company, 'companies');
          company.post().then(saveCompanySuccessFn, saveCompanyErrorFn);
        } else {
          company.put().then(saveCompanySuccessFn, saveCompanyErrorFn);
        }
      }

      function saveCompanySuccessFn ( response ) {
        $state.go(nextState, {companyId: response.id});
      }
      function saveCompanyErrorFn () {
        // TODO deal with the error
      }
    }
  }
})();
