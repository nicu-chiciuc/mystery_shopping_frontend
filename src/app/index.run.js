(function() {
  'use strict';

  angular
    .module('spark')
    .run(runBlock);

  /** @ngInject */
  function runBlock ( $rootScope, $log, Restangular, modelManager, authorization, principal ) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toStateParams) {
      // track the state the user wants to go to; authorization service needs this
      $rootScope.toState = toState;
      $rootScope.toStateParams = toStateParams;
      // if the principal is resolved, do an authorization check immediately. otherwise,
      // it'll be done when the state it resolved.
      if (principal.isIdentityResolved()) authorization.authorize();
    });

    // Extending Restangular endpoints with corresponding models
    Restangular.extendModel('projects', function (obj) {
      angular.extend(obj, modelManager.ProjectModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('tenantprojectmanagers', function (obj) {
      angular.extend(obj, modelManager.TenantProjectManagerModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('tenantconsultants', function (obj) {
      angular.extend(obj, modelManager.TenantConsultantModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('companies', function (obj) {
      angular.extend(obj, modelManager.CompanyModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('departments', function (obj) {
      angular.extend(obj, modelManager.DepartmentModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('entities', function (obj) {
      angular.extend(obj, modelManager.EntityModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('sections', function (obj) {
      angular.extend(obj, modelManager.SectionModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('questionnaires', function (obj) {
      angular.extend(obj, modelManager.QuestionnaireModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('templatequestionnaires', function (obj) {
      angular.extend(obj, modelManager.TemplateQuestionnaireModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('templateblocks', function (obj) {
      angular.extend(obj, modelManager.TemplateQuestionnaireBlockModel);
      obj.initialize('template_blocks', 'template_questions');
      return obj;
    });

    Restangular.extendModel('templatequestions', function (obj) {
      angular.extend(obj, modelManager.TemplateQuestionnaireQuestionModel);
      return obj;
    });

    Restangular.extendModel('shoppers', function (obj) {
      angular.extend(obj, modelManager.ShopperModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('evaluations', function (obj) {
      angular.extend(obj, modelManager.EvaluationModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('evaluationassessmentlevels', function (obj) {
      angular.extend(obj, modelManager.EvaluationAssessmentLevelModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('clientmanagers', function (obj) {
      angular.extend(obj, modelManager.CompanyManagerModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('clientemployees', function (obj) {
      angular.extend(obj, modelManager.CompanyEmployeeModel);
      obj.initialize();
      return obj;
    });

    $log.debug('runBlock end');
  }

})();
