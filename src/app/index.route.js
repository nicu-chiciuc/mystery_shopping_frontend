(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        parent: 'authenticated',
        url: '/',
        templateUrl: 'app/main/main.html',
        data: {
          roles: ['tenantproductmanager']
        },
        controller: 'MainController as main'
      })
      .state('authenticated', {
        templateUrl: 'app/authentication/authenticated.html',
        abstract: true,
        resolve: {
          user: function ( authorization ) {
            return authorization.authorize();
          }
        },
        controller: 'SideMenuController as vm'
        //onEnter: function ($log, user) {
        //  $log.debug('OnEnter event');
        //  $log.debug(user);
        //  user.initialize();
        //}
          //onExit: function (user) {
          //  user.close();
          //}
      })
      .state('accessdenied', {
        parent: 'authenticated',
        url: '/denied',
        data: {
          roles: []
        },
        templateUrl: 'denied.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: 'app/authentication/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
        data: {
          roles: []
        }
      })
      .state('projects', {
        parent: 'authenticated',
        url: '/projects',
        templateUrl: 'app/projects/list/project-list.html',
        controller: 'Project1Controller as vm',
        resolve: {
          projects: function ( models ) { return models.projects().getList(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('projects.edit', {
        url: '/{id:int}',
        templateUrl: 'app/projects/edit/project-edit-form.html',
        resolve: {
          companies: function ( models ) { return models.companies().getList(); },
          projectManagers: function ( models ) { return models.projectManagers().getList(); },
          projectWorkers: function ( models ) { return models.projectWorkers().getList(); },
          questionnaireTemplates: function ( models ) { return models.questionnaireTemplates().getList(); },
          scripts: function ( models ) { return models.scripts().getList(); },
          project: function ( $stateParams, models ) { return models.projects().one($stateParams.id).get(); },
          shoppers: function ( models ) { return models.shoppers().getList(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        },
        controller: 'ProjectController as vm'
      })
      .state('projects.create', {
        url: '/new',
        templateUrl: 'app/projects/new/project-initial-form.html',
        resolve: {
          companies: function ( models ) { return models.companies().getList(); },
          projectManagers: function ( models ) { return models.projectManagers().getList(); },
          projectWorkers: function ( models ) { return models.projectWorkers().getList(); },
          questionnaireTemplates: function ( models ) { return models.questionnaireTemplates().getList(); },
          scripts: function ( models ) { return models.scripts().getList(); },
          shoppers: function ( models ) { return models.shoppers().getList(); },
          project: function () { return {}; }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        },
        controller: 'ProjectFormController as vm'
      })
      .state('projects.create.methodology', {
        url: '/methodology',
        templateUrl: 'app/projects/new/project-methodology-form.html',
        //resolve: {
          //questionnaireTemplates: function ( models ) { return []; return models.questionnaireTemplates().getList(); },
          //scripts: function ( models ) { return models.scripts().getList(); }
        //},
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        },
        controller: 'ProjectFormController as vm'
      })
      .state('projects.create.methodology.places', {
        url: '/new',
        templateUrl: 'app/projects/new/project-places-form.html',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        },
        controller: 'ProjectFormController as vm'
      })
      .state('projects.create.methodology.places.shoppers', {
        url: '/new',
        templateUrl: 'app/projects/new/project-shoppers-form.html',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        },
        controller: 'ProjectFormController as vm'
      })
      .state('projects.create.methodology.places.shoppers.reviewers', {
        url: '/new',
        templateUrl: 'app/projects/new/project-reviewers-form.html',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        },
        controller: 'ProjectFormController as vm'
      })

    ;

    $urlRouterProvider.otherwise('/');
  }

})();
