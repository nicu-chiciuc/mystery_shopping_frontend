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
          roles: []
        },
        controller: 'MainController as main'
      })
      .state('authenticated', {
        templateUrl: 'app/authentication/authenticated.html',
        abstract: true,
        resolve: {
          user: function ( authorization ) {
            authorization.authorize();
          }
        }
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
        controllerAs: 'vm'
      })
      .state('clients', {
        parent: 'authenticated',
        url: '/clients',
        templateUrl: 'app/clients/clients.html',
        controller: 'ClientController as vm',
        resolve: {
          clients: function ( user, models ) { return models.clients().getList(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('clients.new', {
        url: '/new',
        templateUrl: 'app/clients/new/client-form.html',
        controller: 'ClientFormController as vm'
      })
      .state('clients.edit', {
        url: '/{id:int}/edit',
        templateUrl: 'app/clients/edit/client-form.html',
        controller: 'ClientFormController as vm'
      })
      .state('clients.detail', {
        url: '/{id:int}',
        templateUrl: 'app/clients/detail/client-detail.html',
        controller: 'ClientController as vm'
      })
      .state('companies', {
        parent: 'authenticated',
        resolve: {
          company: function () { return {}; }
        },
        data: {
          roles: []
        },
        url: '/companies',
        templateUrl: 'app/clients/companies/list/company_list.html',
        controller: 'CompanyFormController as vm'
      })
      .state('companies.new', {
        url: '/new',
        templateUrl: 'app/clients/companies/company_form.html',
        controller: 'CompanyFormController as vm'
      })
      .state('projects', {
        parent: 'authenticated',
        url: '/projects',
        templateUrl: 'app/projects/projects.html',
        controller: 'ProjectController as vm',
        resolve: {
          projects: function ( models ) { return []; return models.projects().getList(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('projects.create', {
        url: '/new',
        templateUrl: 'app/projects/new/project-initial-form.html',
        resolve: {
          clients: function ( models ) { return models.clients().getList(); },
          projectManagers: function ( models ) { return models.projectManagers().getList(); },
          projectWorkers: function ( models ) { return models.projectWorkers().getList(); },
          questionnaireTemplates: function ( models ) { return models.questionnaireTemplates().getList(); },
          scripts: function ( models ) { return models.scripts().getList(); },
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
