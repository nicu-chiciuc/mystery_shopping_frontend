(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig( $stateProvider ) {
    $stateProvider
      .state('evaluations', {
        abstract: true,
        parent: 'projectSelected',
        url: '/evaluations',
        templateUrl: 'app/evaluations/evaluation-wrapper-page.html',
        resolve: {
          evaluations: function ( managementFlow ) {
            return managementFlow.getProject().getList('evaluations');
          },
          project: function ( managementFlow ) { return managementFlow.getProject(); },
          company: function ( managementFlow ) { return managementFlow.getCompany(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('evaluations.list', {
        url: '/list',
        views: {
          evaluationList: {
            templateUrl: 'app/evaluations/list/evaluation-list.html',
            controller: 'EvaluationListController as vm'
          }
        }
      })
      .state('evaluations.plan', {
        url: '/plan',
        views: {
          'planToolbar': {
            templateUrl: 'app/components/evaluations_planning/evaluation-plan-toolbar.html',
            controller: 'EvaluationPlanToolbarController as vm'
          },
          'evaluationList': {
            templateUrl: 'app/evaluations/list/evaluation-list.html',
            controller: 'EvaluationListController as vm'
          },
          'evaluationToolbar': {
            templateUrl: 'app/components/evaluations_toolbar/evaluation-page-toolbar.html',
            controller: 'EvaluationToolbarController as vm'
          }
        }
      })
      .state('evaluations.detail', {
        abstract: true,
        url: '/{evaluationId:int}',
        template: '<div ui-view></div>',
        resolve: {
          evaluation: function ( $stateParams, models ) { return models.evaluations().one($stateParams.evaluationId).get(); }
        }
      })
      .state('evaluations.detail.view', {
        url: '/detail',
        templateUrl: 'app/evaluations/view/evaluation-view.html',
        controller: 'EvaluationViewController as vm'
      })
      .state('evaluations.detail.edit', {
        url: '/edit',
        templateUrl: 'app/evaluations/create/evaluation-form.html',
        controller: 'EvaluationFormController as vm'
      })
    ;
  }

})();
