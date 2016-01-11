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
      clients: clients,
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

    function clients () {
      return Restangular.service('clients');
    }

    function restangularizeElement ( parent, object, model ) {
      Restangular.restangularizeElement(parent, object, model);
      return object;
    }

    function restangularizeCollection ( parent, object, model ) {
      Restangular.restangularizeCollection(parent, object, model);
      return object;
    }
  }
})();
