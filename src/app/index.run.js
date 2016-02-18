(function() {
  'use strict';

  angular
    .module('spark')
    .run(runBlock);

  /** @ngInject */
  function runBlock ( $rootScope, $state, $stateParams, $filter, $log, formlyConfig, formlyValidationMessages, Restangular, modelManager, authorization, principal ) {

    formlyValidationMessages.messages.required = getRequiredMessage;
      function getRequiredMessage ($viewValue, $modelValue, scope) {
      if (scope.useGenericMessage) {
        return $filter('translate')('VALIDATION_MESSAGE.GENERIC.FIELD_IS_REQUIRED');
      } else {
        return $filter('translate')('VALIDATION_MESSAGE.SPECIFIC_FIELD_IS_REQUIRED', {FIELD_NAME: scope.to.label});
      }
    }

    // Config checkbox list template for angular-formly.
    formlyConfig.setType({
      name: 'checkbox-list',
      templateUrl: 'app/utils/formly_templates/checkbox-list-template.html'
    });

    formlyConfig.extras.errorExistsAndShouldBeVisibleExpression = 'fc.$touched || form.$submitted';

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

    Restangular.extendModel('projectworkers', function (obj) {
      angular.extend(obj, modelManager.ProjectWorkerModel);
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

    Restangular.extendModel('shoppers', function (obj) {
      angular.extend(obj, modelManager.ShopperModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('plannedevaluations', function (obj) {
      angular.extend(obj, modelManager.PlannedEvaluationModel);
      obj.initialize();
      return obj;
    });

    Restangular.extendModel('evaluationassessmentlevels', function (obj) {
      angular.extend(obj, modelManager.EvaluationAssessmentLevelModel);
      obj.initialize();
      return obj;
    });

    $log.debug('runBlock end');
  }

})();
