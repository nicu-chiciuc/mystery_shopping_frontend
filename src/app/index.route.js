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
        controller: 'MainController',
        controllerAs: 'main'
      })

      .state('authenticated', {
        templateUrl: 'app/authentication/authenticated.html',
        abstract: true,
        resolve: {
          user: function (AuthToken, $state, $q) {
          return AuthToken.getAuthenticatedAccount().then(
            function ( account ) { return account.user; },
            // must return a rejected promise in order to stay in rejected-mode
            function () { return $q.reject( $state.go('login') ); });
          },
          onEnter: function (user) {
            user.initialize();
          }
          //onExit: function (user) {
          //  user.close();
          //}
        }
      })
      .state('authentication.login', {
        url: '/login',
        templateUrl: 'app/authentication/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
      })
      .state('clients', {
        parent: 'authenticated',
        url: '/clients',
        templateUrl: 'app/clients/clients.html',
        controller: 'ClientController',
        controllerAs: 'vm',
        resolve: {
          clients: function ( user, models ) { return models.clients().getList(); }
        }
      })
      .state('clients.new', {
        parent: 'authenticated',
        url: '/new',
        templateUrl: 'app/clients/new/client-form.html',
        controller: 'ClientFormController',
        controllerAs: 'vm'
      })
      .state('clients.edit', {
        parent: 'authenticated',
        url: '/{id:int}/edit',
        templateUrl: 'app/clients/edit/client-form.html',
        controller: 'ClientFormController',
        controllerAs: 'vm'
      })
      .state('clients.detail', {
        parent: 'authenticated',
        url: '/{id:int}',
        templateUrl: 'app/clients/detail/client-detail.html',
        controller: 'ClientController',
        controllerAs: 'vm'
      })
    ;

    $urlRouterProvider.otherwise('/');
  }

})();
