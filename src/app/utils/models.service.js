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
      companies: companies,
      projectManagers: projectManagers,
      projectWorkers: projectWorkers,
      tenantConsultants: tenantConsultants,
      questionnaireTemplates: questionnaireTemplates ,
      scripts: scripts,
      shoppers: shoppers,
      industries: industries,
      countries: countries,
      cities: cities,
      evaluations: evaluations,
      companyManagers: companyManagers,
      evaluationassessmentlevels: evaluationassessmentlevels,
      restangularizeElement: restangularizeElement,
      restangularizeCollection: restangularizeCollection,
      restangularCopy: restangularCopy,
      crossIndexTemplates: crossIndexTemplates,
      dashboardTemplates: dashboardTemplates,
      manager: modelManager
    };

    return modelsFactory;


    function projects () {
      return Restangular.service('projects');
    }

    function questionnaires () {
      return Restangular.service('questionnaires');
    }

    function companies () {
      return Restangular.service('companies');
    }

    function projectManagers () {
      return Restangular.service('tenantprojectmanagers');
    }

    function projectWorkers () {
      return Restangular.service('projectworkers');
    }

    function tenantConsultants () {
      return Restangular.service('tenantconsultants');
    }

    function industries () {
      return Restangular.service('industries');
    }

    function countries () {
      return Restangular.service('countries');
    }

    function cities () {
      return Restangular.service('cities');
    }

    function evaluations () {
      return Restangular.service('evaluations');
    }

    function questionnaireTemplates () {
      return Restangular.service('templatequestionnaires');
    }

    function scripts () {
      return Restangular.service('scripts');
    }

    function shoppers () {
      return Restangular.service('shoppers');
    }

    function companyManagers () {
      return Restangular.service('clientmanagers');
    }

    function evaluationassessmentlevels () {
      return Restangular.service('evaluationassessmentlevels');
    }

    function crossIndexTemplates () {
      return Restangular.service('crossindextemplates');
    }

    function dashboardTemplates () {
      return Restangular.service('dashboard/templates');
    }

    function restangularizeElement ( parent, object, model ) {
      Restangular.restangularizeElement(parent, object, model);
      return object;
    }

    function restangularizeCollection ( parent, object, model ) {
      Restangular.restangularizeCollection(parent, object, model);
      return object;
    }

    function restangularCopy ( object ) {
      return Restangular.copy(object);
    }
  }
})();
