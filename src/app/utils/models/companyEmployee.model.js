/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('CompanyEmployeeModel', CompanyEmployeeModel);

  /** @ngInject */
  function CompanyEmployeeModel ( AbstractAccountModel, contentTypes ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var companyEmployee = this;

      companyEmployee.contentTypeId = contentTypes.clientemployee;

      angular.extend(companyEmployee, AbstractAccountModel);
      companyEmployee.initializeAbstract();
    }
  }
})();
