(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyManagerCreateController', CompanyManagerCreateController);

  /** @ngInject */
  function CompanyManagerCreateController ( $log, $state, models, user, company, place, companyManager ) {
    $log.debug('Entered CompanyManagerCreateController');
    console.log(place);
    var vm = this;

    vm.companyManager = companyManager;

    vm.saveCompanyManager = saveCompanyManager;

    activate();

    function activate() {
      vm.isNewCompanyManager = _.isEmpty(vm.companyManager);
      companyManager.place_id = place.id;
      companyManager.place_type = place.contentType;
      companyManager.company = company.id;
    }

    function saveCompanyManager ( companyManager, isValid, nextState ) {

      if ( isValid ) {
        if ( vm.isNewCompanyManager ) {
          companyManager = models.restangularizeElement(null, companyManager, 'clientmanagers');
          companyManager.post().then(saveCompanyManagerSuccessFn, saveCompanyManagerErrorFn);
        } else {
          companyManager.put().then(saveCompanyManagerSuccessFn, saveCompanyManagerErrorFn);
        }
      }

      function saveCompanyManagerSuccessFn ( response ) {
        if ( vm.isNewCompanyManager ) {
          place.addManager(response);
        }
        $state.go(nextState, {companyManagerId: response.id});
      }
      function saveCompanyManagerErrorFn () {
        // TODO deal with the error
      }
    }
  }
})();
