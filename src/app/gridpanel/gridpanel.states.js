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
          // evaluations: function (managementFlow) {
          //   return managementFlow.getProject().getList('evaluations');
          // },
          currentUser: function (principal) {
            return principal.identity();
          },

          // Test of getting evaluations of all projects
          evaluations: function ($q, managementFlow) {
            var projEvals = _.map(managementFlow.getProjectList(),
              function (project) {
                return project.getList('evaluations')
              });

            return $q.all(projEvals).then(function (resp) {
              var allEvals = Array.prototype.concat.apply([], resp);
              allEvals = _.map(allEvals,
                function (evaluation) {
                  return evaluation.plain();
                });

              return allEvals;
            });
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
