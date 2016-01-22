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
      addEntity: addEntity
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
  }
})();
