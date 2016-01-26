/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('CompanyModel', CompanyModel);

  /** @ngInject */
  function CompanyModel ( DepartmentModel ) {
    var Model = {
      initialize: initialize,
      addDepartment: addDepartment
    };

    return Model;


    function initialize () {
      var company = this;

      _.forEach(company.departments, function ( department ) {
        angular.extend(department, DepartmentModel);
        department.initialize();
      });
    }

    function addDepartment ( department ) {
      var company = this;
      company.departments_repr.push(department);
    }
  }
})();
