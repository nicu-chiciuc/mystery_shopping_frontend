/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('EntityModel', EntityModel);

  /** @ngInject */
  function EntityModel () {
    var Model = {
      initialize: initialize,
      addSection: addSection,
      addEmployee: addEmployee,
      addManager: addManager
    };

    return Model;


    function initialize () {
      var entity = this;
    }

    function addSection ( section ) {
      var entity = this;
      entity.sections.push(section);
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
