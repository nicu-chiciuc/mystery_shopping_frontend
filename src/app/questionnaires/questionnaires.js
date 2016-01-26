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
        parent: 'authenticated',
        url: '/questionnaires',
        template: '<div ui-view></div>',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('questionnaires.create', {
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
      .state('questionnaires.list', {
        url: '/list',
        templateUrl: 'app/questionnaires/list/questionnaire-template-list.html',
        controller: 'CompanyListController as vm',
        resolve: {
          questionnaires: function ( models ) { return models.questionnaires().getList(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('questionnaires.detail', {
        abstract: true,
        url: '/{companyId:int}',
        template: '<div ui-view></div>',
        resolve: {
          company: function ( $stateParams, models ) { return models.questionnaires().one($stateParams.companyId).get(); }
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
        //templateUrl: 'app/questionnaires/detail/edit/company-detail-edit.html',
        //controller: 'CompanyDetailViewController as vm',
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
