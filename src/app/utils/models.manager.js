(function() {
  'use strict';

  angular
    .module('spark')
    .factory('modelManager', modelManager);

  /** @ngInject */
  function modelManager (
    ProjectModel,
    ResearchMethodologyModel,
    TemplateQuestionnaireModel,
    ProjectWorkerModel,
    TenantProductManagerModel,
    TenantProjectManagerModel,
    TenantConsultantModel,
    UserModel,
    CompanyModel,
    DepartmentModel,
    EntityModel,
    SectionModel,
    TemplateQuestionnaireQuestionModel,
    TemplateQuestionnaireBlockModel,
    CompanyManagerModel,
    CompanyEmployeeModel,
    ShopperModel
  ) {
    var manager = {
      ProjectModel: ProjectModel,
      ResearchMethodologyModel: ResearchMethodologyModel,
      TemplateQuestionnaireModel: TemplateQuestionnaireModel,
      ProjectWorkerModel: ProjectWorkerModel,
      TenantProductManagerModel: TenantProductManagerModel,
      TenantProjectManagerModel: TenantProjectManagerModel,
      TenantConsultantModel: TenantConsultantModel,
      UserModel: UserModel,
      CompanyModel: CompanyModel,
      DepartmentModel: DepartmentModel,
      EntityModel: EntityModel,
      SectionModel: SectionModel,
      TemplateQuestionnaireQuestionModel: TemplateQuestionnaireQuestionModel,
      TemplateQuestionnaireBlockModel: TemplateQuestionnaireBlockModel,
      CompanyManagerModel: CompanyManagerModel,
      CompanyEmployeeModel: CompanyEmployeeModel,
      ShopperModel: ShopperModel
    };

    return manager;
  }
})();
