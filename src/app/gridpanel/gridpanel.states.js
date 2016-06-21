(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('gridpanel', {
        abstract: true,
        url: '/gridpanel',
        parent: 'projectSelected',
        template: '<div ui-view flex></div>',
        resolve: {
          project: function (managementFlow) {
            return managementFlow.getProject();
          },
          evaluations: function (managementFlow) {
            return managementFlow.getProject().getList('evaluations');
          }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('gridpanel.create', {
        abstract: false,
        url: '/create',
        templateUrl: 'app/gridpanel/gridpanel_dashboard/gridpanel-dashboard.html',
        controller: 'GridPanelDashboardController as vm',
        resolve: {
          currentDashboard: function () {return {}}
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('gridpanel.list', {
        url: '/list',
        template: 'testing the test'
      })
      .state('gridpanel.edit', {
        abstract: false,
        url: '/create',
        templateUrl: 'app/gridpanel/gridpanel_dashboard/gridpanel-dashboard.html',
        controller: 'GridPanelDashboardController as vm',
        resolve: {
          currentDashboard: function () {
            return {};
          }
        }
      })
  }
}
)();
