/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('SectionModel', SectionModel);

  /** @ngInject */
  function SectionModel ( CompanyManagerModel, CompanyEmployeeModel, contentTypes, Restangular ) {
    var Model = {
      initialize: initialize,
      addEmployee: addEmployee,
      addManager: addManager
    };

    return Model;


    function initialize () {
      var section = this;

      section.contentType = contentTypes.section;

      _.forEach(section.managers, function ( manager ) {
        Restangular.restangularizeElement(null, manager, 'clientmanagers');
        angular.extend(manager, CompanyManagerModel);
        manager.initialize();
      });

      _.forEach(section.employees, function ( employee ) {
        Restangular.restangularizeElement(null, employee, 'clientemployees');
        angular.extend(employee, CompanyEmployeeModel);
        employee.initialize();
      });
    }

    function addEmployee ( employee ) {
      var section = this;
      section.employees.push(employee);
    }

    function addManager ( manager ) {
      var section = this;
      section.managers.push(manager);
    }

  }
})();
