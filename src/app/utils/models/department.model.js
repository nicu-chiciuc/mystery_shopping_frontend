/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('DepartmentModel', DepartmentModel);

  /** @ngInject */
  function DepartmentModel () {
    var Model = {
      initialize: initialize,
      addEntity: addEntity
    };

    return Model;


    function initialize () {
      var department = this;
    }

    function addEntity ( entity ) {
      var department = this;
      department.entities.push(entity);
    }
  }
})();
