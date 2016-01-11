(function() {
  'use strict';

  angular
    .module('spark')
    .factory('models', models);

  /** @ngInject */
  function models ( Restangular, modelManager ) {
    var modelsFactory = {
      projects: projects,
      questionnaires: questionnaires,
      restangularizeElement: restangularizeElement,
      restangularizeCollection: restangularizeCollection,
      manager: modelManager
    };

    return modelsFactory;


    function projects () {
      return Restangular.service('projects');
    }

    function questionnaires () {
      return Restangular.service('questionnaires');
    }

    function restangularizeElement ( object, model ) {
      Restangular.restangularizeElement(null, object, model);
      return object;
    }

    function restangularizeCollection ( object, model ) {
      Restangular.restangularizeCollection(null, object, model);
      return object;
    }
  }
})();
