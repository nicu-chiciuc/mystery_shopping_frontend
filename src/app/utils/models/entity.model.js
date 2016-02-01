/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('EntityModel', EntityModel);

  /** @ngInject */
  function EntityModel ( SectionModel, CompanyManagerModel, CompanyEmployeeModel, contentTypes, Restangular ) {
    var defaultZoomCoefficient = 14;  // Default zoom coefficient that has the rigth distance to see streets and understand where the entity is locates.

    var Model = {
      initialize: initialize,
      addSection: addSection,
      addEmployee: addEmployee,
      addManager: addManager,
      mergeCoordinates: mergeCoordinates,
      splitCoordinates: splitCoordinates
    };

    return Model;


    function initialize () {
      var entity = this;

      entity.contentType = contentTypes.entity;

      _.forEach(entity.sections, function ( section ) {
        Restangular.restangularizeElement(null, section, 'sections');
        angular.extend(section, SectionModel);
        section.initialize();
      });

      _.forEach(entity.managers, function ( manager ) {
        Restangular.restangularizeElement(null, manager, 'clientmanagers');
        angular.extend(manager, CompanyManagerModel);
        manager.initialize();
      });

      _.forEach(entity.employees, function ( employee ) {
        Restangular.restangularizeElement(null, employee, 'clientemployees');
        angular.extend(employee, CompanyEmployeeModel);
        employee.initialize();
      });
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

    function mergeCoordinates () {
      // TODO create a directive that will append automatically the 'z' char to the zoomCoefficient
      var entity = this;
      var zoomCoefficient = entity.zoomCoefficient || defaultZoomCoefficient;  // 14 is the default zoom coefficient close enough to see streets
      if ( entity.latitude && entity.longitude ) {
        entity.coordinates = [entity.latitude, entity.longitude, zoomCoefficient + 'z'].join(',');
      }
    }

    function splitCoordinates () {
      var entity = this,
          coordinates;

      if ( entity.coordinates ) {
        coordinates = entity.coordinates.split(',');
        entity.latitude = coordinates[0];
        entity.longitude = coordinates[1];
        entity.zoomCoefficient = +coordinates[2];
      }
    }

  }
})();
