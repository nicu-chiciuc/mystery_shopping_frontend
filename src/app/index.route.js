(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController as main'
      })
      .state('authenticated', {
        templateUrl: 'app/authentication/authenticated.html',
        abstract: true,
        resolve: {
          user: function (AuthToken, $state, $q, $log) {
            $log.debug('Inside resolve of authenticated state');
            return AuthToken.getAuthenticatedAccount();
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
        url: '/companies',
        templateUrl: 'app/clients/companies/list/company_list.html',
        controller: 'CompanyFormController as vm'
      })
      .state('companies.new', {
        url: '/new',
        templateUrl: 'app/clients/companies/company_form.html',
        controller: 'CompanyFormController as vm'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
