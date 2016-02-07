(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig ( $stateProvider ) {
    $stateProvider
      .state('projects', {
        abstract: true,
        parent: 'authenticated',
        url: '/projects',
        template: '<div ui-view></div>',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('projects.create', {
        url: '/new',
        templateUrl: 'app/projects/new/project-form.html',
        controller: 'ProjectFormController as vm',
        resolve: {
          companies: function ( models ) { return models.companies().getList(); },
          projectManagers: function ( models ) { return models.projectManagers().getList(); },
          projectWorkers: function ( models ) { return models.projectWorkers().getList(); },
          tenantConsultants: function ( models ) { return models.tenantConsultants().getList(); },
          questionnaireTemplates: function ( models ) { return models.questionnaireTemplates().getList(); },
          scripts: function ( models ) { return models.scripts().getList(); },
          shoppers: function ( models ) { return models.shoppers().getList(); },
          project: function () { return {}; }
        }
      })
      .state('projects.list', {
        url: '/list',
        templateUrl: 'app/projects/list/project-list.html',
        controller: 'ProjectListController as vm',
        resolve: {
          projects: function ( models ) { return models.projects().getList(); }
        }
      })
      .state('projects.detail', {
        abstract: true,
        url: '/{projectId:int}',
        template: '<div ui-view></div>',
        resolve: {
          companies: function ( models ) { return models.companies().getList(); },
          projectManagers: function ( models ) { return models.projectManagers().getList(); },
          projectWorkers: function ( models ) { return models.projectWorkers().getList(); },
          tenantConsultants: function ( models ) { return models.tenantConsultants().getList(); },
          questionnaireTemplates: function ( models ) { return models.questionnaireTemplates().getList(); },
          scripts: function ( models ) { return models.scripts().getList(); },
          project: function ( $stateParams, models ) { return models.projects().one($stateParams.projectId).get(); },
          shoppers: function ( models ) { return models.shoppers().getList(); }
        }
      })
      .state('projects.detail.edit', {
        url: '/edit',
        templateUrl: 'app/projects/new/project-form.html',
        controller: 'ProjectFormController as vm'
      })
      .state('projects.detail.view', {
        url: '/view',
        templateUrl: 'app/projects/view/project-view.html',
        controller: 'ProjectController as vm'
      })

    ;

  }

})();
