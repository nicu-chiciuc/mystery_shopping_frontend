/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('CompanyManagerModel', CompanyManagerModel);

  /** @ngInject */
  function CompanyManagerModel ( AbstractAccountModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var companyManager = this;

      angular.extend(companyManager, AbstractAccountModel);
      companyManager.initializeAbstract();
    }
  }
})();
