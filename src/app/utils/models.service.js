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
      projectManagers: projectManagers,
      projectWorkers: projectWorkers,
      questionnaireTemplates: questionnaireTemplates ,
      scripts: scripts,
      shoppers: shoppers,
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
      return Restangular.service('companies');
    }

    function projectManagers () {
      return Restangular.service('tenantprojectmanagers');
    }

    function projectWorkers () {
      return Restangular.service('projectworkers');
    }

    function questionnaireTemplates () {
      return Restangular.service('questionnairetemplates');
    }

    function scripts () {
      return Restangular.service('scripts');
    }

    function shoppers () {
      return Restangular.service('shoppers');
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
