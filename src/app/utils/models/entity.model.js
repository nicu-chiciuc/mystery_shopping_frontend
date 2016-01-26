/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('EntityModel', EntityModel);

  /** @ngInject */
  function EntityModel ( SectionModel ) {
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

      _.forEach(entity.sections, function ( section ) {
        angular.extend(section, SectionModel);
        section.initialize();
      })
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
      entity.coordinates = [entity.latitude, entity.longitude, zoomCoefficient + 'z'].join(',');
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
