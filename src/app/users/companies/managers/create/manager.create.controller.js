(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyManagerCreateController', CompanyManagerCreateController);

  /** @ngInject */
  function CompanyManagerCreateController ( $log, $state, models, user, companyManager ) {
    $log.debug('Entered CompanyManagerCreateController');
    var vm = this;

    vm.companyManager = companyManager;

    vm.saveCompanyManager = saveCompanyManager;

    activate();

    function activate() {
    }

    function saveCompanyManager ( companyManager, isValid, nextState ) {
      companyManager = models.restangularizeElement(null, companyManager, 'clientmanagers');
      if ( isValid ) {
        companyManager.save().then(saveCompanyManagerSuccessFn, saveCompanyManagerErrorFn);
      }

      function saveCompanyManagerSuccessFn ( response ) {
        $state.go(nextState, {companyId: response.id});
      }
      function saveCompanyManagerErrorFn () {
        // TODO deal with the error
      }
    }
  }
})();
