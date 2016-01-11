(function() {
  'use strict';

  angular
    .module('spark')
    .factory('modelManager', modelManager);

  /** @ngInject */
  function modelManager( ProjectModel, QuestionnaireModel ) {
    var manager = {
      ProjectModel: ProjectModel,
      QuestionnaireModel: QuestionnaireModel
    };

    return manager;
  }
})();
