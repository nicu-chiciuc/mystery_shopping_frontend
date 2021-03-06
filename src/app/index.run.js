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
    _.forEach([
      ['projects', 'ProjectModel'],
      ['tenantprojectmanagers', 'TenantProjectManagerModel'],
      ['tenantconsultants', 'TenantConsultantModel'],
      ['companies', 'CompanyModel'],
      ['departments', 'DepartmentModel'],
      ['entities', 'EntityModel'],
      ['sections', 'SectionModel'],
      ['questionnaires', 'QuestionnaireModel'],
      ['templatequestionnaires', 'TemplateQuestionnaireModel'],
      ['crossindextemplates', 'CrossIndexTemplates'],
      ['shoppers', 'ShopperModel'],
      ['evaluations', 'EvaluationModel'],
      ['evaluationassessmentlevels', 'EvaluationAssessmentLevelModel'],
      ['clientmanagers', 'CompanyManagerModel'],
      ['clientemployees', 'CompanyEmployeeModel'],
      ['dashboard/templates', 'DashboardTemplate']
    ],
      function (modelData) {

        Restangular.extendModel(modelData[0], function (obj) {
          angular.extend(obj, modelManager[ modelData[1] ]);
          obj.initialize();
          return obj;
        });
      }
    );

    // Models that are initialized differently
    Restangular.extendModel('templateblocks', function (obj) {
      angular.extend(obj, modelManager.TemplateQuestionnaireBlockModel);
      obj.initialize('template_blocks', 'template_questions');
      return obj;
    });

    Restangular.extendModel('templatequestions', function (obj) {
      angular.extend(obj, modelManager.TemplateQuestionnaireQuestionModel);
      return obj;
    });

    $log.debug('runBlock end');
  }

})();
