(function() {
  'use strict';

  angular
    .module('spark')
    .controller('CompanyDetailEditController', CompanyDetailEditController);

  /** @ngInject */
  function CompanyDetailEditController ( $log, company ) {
    $log.debug('Entered CompanyDetailEditController');
    var vm = this;


    activate();

    function activate() {
    }

  }
})();
