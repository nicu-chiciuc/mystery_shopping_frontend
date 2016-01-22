/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('CompanyModel', CompanyModel);

  /** @ngInject */
  function CompanyModel () {
    var Model = {
      initialize: initialize,
      addDepartment: addDepartment
    };

    return Model;


    function initialize () {
      var company = this;
    }

    function addDepartment ( department ) {
      var company = this;
      company.departments.push(department);
    }
  }
})();
