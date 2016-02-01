/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('CompanyEmployeeModel', CompanyEmployeeModel);

  /** @ngInject */
  function CompanyEmployeeModel ( AbstractAccountModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var companyEmployee = this;

      angular.extend(companyEmployee, AbstractAccountModel);
      companyEmployee.initializeAbstract();
    }
  }
})();
