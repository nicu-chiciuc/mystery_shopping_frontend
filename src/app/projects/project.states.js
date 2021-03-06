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
        parent: 'companySelected',
        url: '/projects',
        template: '<div ui-view flex></div>',
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
          projects: function ( managementFlow ) { return managementFlow.getCompany().getList('projects'); }
        }
      })
      .state('projects.detail', {
        abstract: true,
        url: '/{projectId:int}',
        template: '<div ui-view></div>',
        resolve: {
          companies: function ( models ) { return models.companies().getList(); },
          projectManagers: function ( models ) { return models.projectManagers().getList(); },
          tenantConsultants: function ( models ) { return models.tenantConsultants().getList(); },
          questionnaireTemplates: function ( models ) { return models.questionnaireTemplates().getList(); },
          scripts: function ( models ) { return models.scripts().getList(); },
          project: function ( $stateParams, models, managementFlow ) { return managementFlow.getCompany().one('projects', $stateParams.projectId).get(); },
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
