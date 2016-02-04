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

    ;

    $urlRouterProvider.otherwise('/');
  }

})();
