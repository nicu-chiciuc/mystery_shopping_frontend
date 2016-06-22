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
          currentDashboard: function () {
            return null;
          }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('gridpanel.list', {
        url: '/list',
        templateUrl: 'app/gridpanel/gridpanel_list/gridpanel-list.html',
        controller: 'GridPanelListController as vm',
        resolve: {
          projectDashboards: function (models, project) {
            return models.dashboardTemplates().getList({project: project.id});
          }
        }
      })
      .state('gridpanel.edit', {
        abstract: false,
        url: '/edit/{currentDashboardId:int}',
        templateUrl: 'app/gridpanel/gridpanel_dashboard/gridpanel-dashboard.html',
        controller: 'GridPanelDashboardController as vm',
        resolve: {
          currentDashboard: function (models, $stateParams) {
            return models.dashboardTemplates().one($stateParams.currentDashboardId).get();
          }
        }
      })
  }
}
)();
