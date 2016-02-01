/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('DepartmentModel', DepartmentModel);

  /** @ngInject */
  function DepartmentModel ( EntityModel, CompanyManagerModel, contentTypes, Restangular ) {
    var Model = {
      initialize: initialize,
      addEntity: addEntity,
      addManager: addManager
    };

    return Model;


    function initialize () {
      var department = this;

      department.contentType = contentTypes.department;

      _.forEach(department.entities, function ( entity ) {
        Restangular.restangularizeElement(null, entity, 'entities');
        angular.extend(entity, EntityModel);
        entity.initialize();
      });

      _.forEach(department.managers, function ( manager ) {
        Restangular.restangularizeElement(null, manager, 'clientmanagers');
        angular.extend(manager, CompanyManagerModel);
        manager.initialize();
      });
    }

    function addEntity ( entity ) {
      var department = this;
      department.entities.push(entity);
    }

    function addManager ( manager ) {
      var department = this;
      department.managers.push(manager);
    }

  }
})();
