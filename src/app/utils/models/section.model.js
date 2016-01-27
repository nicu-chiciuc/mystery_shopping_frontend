/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('SectionModel', SectionModel);

  /** @ngInject */
  function SectionModel ( contentTypes, Restangular ) {
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
      });

      _.forEach(section.employees, function ( manager ) {
        Restangular.restangularizeElement(null, manager, 'clientemployees');
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
