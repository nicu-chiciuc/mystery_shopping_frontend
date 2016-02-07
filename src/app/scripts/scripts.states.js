(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig( $stateProvider ) {
    $stateProvider
      .state('scripts', {
        abstract: true,
        parent: 'companySelected',
        url: '/scripts',
        template: '<div ui-view></div>',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('scripts.create', {
        url: '/new',
        templateUrl: 'app/scripts/create/script-form.html',
        controller: 'ScriptFormController as vm',
        resolve: {
          script: function () { return {}; }
        }
      })
      .state('scripts.list', {
        url: '/list',
        templateUrl: 'app/scripts/list/script-list.html',
        controller: 'ScriptListController as vm',
        resolve: {
          scripts: function ( models ) { return models.scripts().getList(); }
        }
      })
      .state('scripts.detail', {
        abstract: true,
        url: '/{scriptId:int}',
        template: '<div ui-view></div>',
        resolve: {
          script: function ( $stateParams, models ) { return models.scripts().one($stateParams.scriptId).get(); }
        }
      })
      .state('scripts.detail.view', {
        url: '/detail',
        templateUrl: 'app/scripts/view/script-view.html',
        controller: 'ScriptViewController as vm'
      })
      .state('scripts.detail.edit', {
        url: '/edit',
        templateUrl: 'app/scripts/create/script-form.html',
        controller: 'ScriptFormController as vm'
      })
    ;
  }

})();
