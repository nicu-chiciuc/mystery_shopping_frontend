/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('DepartmentModel', DepartmentModel);

  /** @ngInject */
  function DepartmentModel ( EntityModel ) {
    var Model = {
      initialize: initialize,
      addEntity: addEntity,
      addEmployee: addEmployee,
      addManager: addManager
    };

    return Model;


    function initialize () {
      var department = this;

      _.forEach(department.entities, function ( entity ) {
        angular.extend(entity, EntityModel);
        entity.initialize();
      });
    }

    function addEntity ( entity ) {
      var department = this;
      department.entities.push(entity);
    }

    function addEmployee ( employee ) {
      var entity = this;
      entity.employees.push(employee);
    }

    function addManager ( manager ) {
      var entity = this;
      entity.managers.push(manager);
    }

  }
})();
