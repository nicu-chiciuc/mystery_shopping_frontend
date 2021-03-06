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
      addDepartment: addDepartment,
      getEntityOfASection: getEntityOfASection,
      getEntityRepr: getEntityRepr
    };

    return Model;


    function initialize () {
      var company = this;

      _.forEach(company.departments_repr, function ( department ) {
        angular.extend(department, DepartmentModel);
        department.initialize();
      });
    }

    function addDepartment ( department ) {
      var company = this;
      company.departments_repr.push(department);
    }

    function getEntityOfASection ( sectionId ) {
      var company = this;
      var foundEntity = undefined;

      _.forEach(company.departments_repr, function (department) {
        foundEntity = foundEntity || department.getEntityOfASection(sectionId);
      });

      return foundEntity;
    }

    function getEntityRepr ( entityId ) {
      var company = this;
      var foundEntity = undefined;

      _.forEach(company.departments_repr, function (department) {
        foundEntity = foundEntity || department.getEntityRepr(entityId);
      });

      return foundEntity;
    }
  }
})();
