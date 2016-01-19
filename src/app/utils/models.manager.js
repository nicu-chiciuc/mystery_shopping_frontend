(function() {
  'use strict';

  angular
    .module('spark')
    .factory('modelManager', modelManager);

  /** @ngInject */
  function modelManager( ProjectModel, QuestionnaireModel, ProjectWorkerModel, ProjectManagerModel, UserModel ) {
    var manager = {
      ProjectModel: ProjectModel,
      QuestionnaireModel: QuestionnaireModel,
      ProjectWorkerModel: ProjectWorkerModel,
      ProjectManagerModel: ProjectManagerModel,
      UserModel: UserModel
    };

    return manager;
  }
})();
