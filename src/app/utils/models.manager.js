(function() {
  'use strict';

  angular
    .module('spark')
    .factory('modelManager', modelManager);

  /** @ngInject */
  function modelManager( ProjectModel, QuestionnaireModel, ProjectWorkerModel, ProjectManagerModel, UserModel, CompanyModel, DepartmentModel, EntityModel, SectionModel, QuestionnaireQuestionModel ) {
    var manager = {
      ProjectModel: ProjectModel,
      QuestionnaireModel: QuestionnaireModel,
      ProjectWorkerModel: ProjectWorkerModel,
      ProjectManagerModel: ProjectManagerModel,
      UserModel: UserModel,
      CompanyModel: CompanyModel,
      DepartmentModel: DepartmentModel,
      EntityModel: EntityModel,
      SectionModel: SectionModel,
      QuestionnaireQuestionModel: QuestionnaireQuestionModel
    };

    return manager;
  }
})();
