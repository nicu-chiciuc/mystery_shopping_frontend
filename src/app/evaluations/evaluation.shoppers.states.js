(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig( $stateProvider ) {
    $stateProvider
      .state('shopperevaluations', {
        abstract: true,
        parent: 'authenticated',
        url: '/evaluations',
        templateUrl: 'app/evaluations/evaluation-wrapper-page.html',
        resolve: {
          evaluations: function ( models ) {
            return models.evaluations().getList();
          }
        },
        data: {
          roles: ['shopper']
        }
      })
      .state('shopperevaluations.list', {
        url: '/list',
        views: {
          evaluationList: {
            templateUrl: 'app/evaluations/list/evaluation-list.html',
            controller: 'EvaluationListController as vm'
          }
        }
      })
    ;
  }

})();
