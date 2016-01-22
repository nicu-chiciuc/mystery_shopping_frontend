/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('SectionModel', SectionModel);

  /** @ngInject */
  function SectionModel () {
    var Model = {
      initialize: initialize,
      addEmployee: addEmployee,
      addManager: addManager
    };

    return Model;


    function initialize () {
      var section = this;
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
