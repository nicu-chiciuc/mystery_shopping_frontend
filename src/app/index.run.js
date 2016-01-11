(function() {
  'use strict';

  angular
    .module('spark')
    .run(runBlock);

  /** @ngInject */
  function runBlock ( $log, Restangular, modelManager ) {

    // Extending Restangular endpoints with corresponding models
    Restangular.extendModel('projects', function (obj) {
      return angular.extend(obj, modelManager.ProjectModel);
    });

    Restangular.extendModel('questionnaires', function (obj) {
      return angular.extend(obj, modelManager.QuestionnaireModel);
    });

    $log.debug('runBlock end');
  }

})();
