(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('gridpanel', {
        abstract: false,
        parent: 'projectSelected',
        url: '/gridpanel',
        templateUrl: 'app/gridpanel/gridpanel_dashboard/gridpanel-dashboard.html',
        controller: 'GridPanelDashboardController as vm',
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
  }
}
)();
