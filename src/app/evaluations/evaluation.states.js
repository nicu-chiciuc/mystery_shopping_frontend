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
        parent: 'authenticated',
        url: '/evaluations',
        template: '<div ui-view></div>',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('evaluations.list', {
        url: '/list',
        templateUrl: 'app/evaluations/list/evaluation-list.html',
        controller: 'EvaluationListController as vm',
        resolve: {
          evaluations: function ( models ) { return models.evaluations().getList(); }
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
