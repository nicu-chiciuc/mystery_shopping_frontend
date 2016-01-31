(function() {
  'use strict';

  angular
    .module('spark')
    .factory('modelManager', modelManager);

  /** @ngInject */
  function modelManager( ProjectModel, TemplateQuestionnaireModel, ProjectWorkerModel, ProjectManagerModel, UserModel, CompanyModel, DepartmentModel, EntityModel, SectionModel, TemplateQuestionnaireQuestionModel, TemplateQuestionnaireBlockModel ) {
    var manager = {
      ProjectModel: ProjectModel,
      TemplateQuestionnaireModel: TemplateQuestionnaireModel,
      ProjectWorkerModel: ProjectWorkerModel,
      ProjectManagerModel: ProjectManagerModel,
      UserModel: UserModel,
      CompanyModel: CompanyModel,
      DepartmentModel: DepartmentModel,
      EntityModel: EntityModel,
      SectionModel: SectionModel,
      TemplateQuestionnaireQuestionModel: TemplateQuestionnaireQuestionModel,
      TemplateQuestionnaireBlockModel: TemplateQuestionnaireBlockModel
    };

    return manager;
  }
})();
