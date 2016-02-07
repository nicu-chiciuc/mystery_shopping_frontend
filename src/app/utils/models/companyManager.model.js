/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('CompanyManagerModel', CompanyManagerModel);

  /** @ngInject */
  function CompanyManagerModel ( AbstractAccountModel, contentTypes ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var companyManager = this;

      companyManager.contentTypeId = contentTypes.clientmanager;

      angular.extend(companyManager, AbstractAccountModel);
      companyManager.initializeAbstract();
    }
  }
})();
