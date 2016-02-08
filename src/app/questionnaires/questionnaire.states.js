(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig( $stateProvider ) {
    $stateProvider
      .state('questionnaires', {
        abstract: true,
        parent: 'companySelected',
        url: '/questionnaires',
        template: '<div ui-view></div>',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('questionnaires.list', {
        url: '/list',
        templateUrl: 'app/questionnaires/list/questionnaire-list.html',
        controller: 'QuestionnaireListController as vm',
        resolve: {
          questionnaires: function ( models ) { return models.questionnaires().getList(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('questionnaires.templates', {
        abstract: true,
        url: '/templates',
        template: '<div ui-view></div>'
      })
      .state('questionnaires.templates.create', {
        url: '/new',
        templateUrl: 'app/questionnaires/create/questionnaire-template-create.html',
        controller: 'QuestionnaireTemplateCreateController as vm',
        resolve: {
          questionnaireTemplate: function () { return {}; }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('questionnaires.templates.list', {
        url: '/list',
        templateUrl: 'app/questionnaires/list/questionnaire-list.html',
        controller: 'QuestionnaireListController as vm',
        resolve: {
          questionnaires: function ( models ) { return models.questionnaireTemplates().getList(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('questionnaires.templates.detail', {
        abstract: true,
        url: '/{templateQuestionnaireId:int}',
        template: '<div ui-view></div>',
        resolve: {
          questionnaire: function ( $stateParams, models ) { return models.questionnaireTemplates().one($stateParams.templateQuestionnaireId).get(); }
        }
      })
      .state('questionnaires.templates.detail.view', {
        url: '/detail',
        templateUrl: 'app/questionnaires/detail/view/company-detail-view.html',
        controller: 'CompanyDetailViewController as vm'
      })
      .state('questionnaires.templates.detail.edit', {
        url: '/edit',
        templateUrl: 'app/questionnaires/create/company-create.html',
        controller: 'CompanyCreateController as vm',
        resolve: {
          industries: function ( models ) { return models.industries().getList(); },
          countries: function ( models ) { return models.countries().getList(); }
        }
      })
      .state('questionnaires.templates.detail.fillIn', {
        url: '/fill-in',
        templateUrl: 'app/questionnaires/detail/fill_in/questionnaire-fill-in.html',
        controller: 'QuestionnaireFillInController as vm'
      })
      .state('questionnaires.detail', {
        abstract: true,
        url: '/{questionnaireId:int}',
        template: '<div ui-view></div>',
        resolve: {
          questionnaire: function ( $stateParams, models ) { return models.questionnaires().one($stateParams.questionnaireId).get(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('questionnaires.detail.view', {
        url: '/detail',
        templateUrl: 'app/questionnaires/detail/view/company-detail-view.html',
        controller: 'CompanyDetailViewController as vm'
      })
      .state('questionnaires.detail.edit', {
        url: '/edit',
        templateUrl: 'app/questionnaires/create/company-create.html',
        controller: 'CompanyCreateController as vm',
        resolve: {
          industries: function ( models ) { return models.industries().getList(); },
          countries: function ( models ) { return models.countries().getList(); }
        }
      })
    ;
  }

})();
