(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        parent: 'companySelected',
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
          }//,
          //companies: function ( models ) { return models.companies().getList({simple: true}); }
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
      .state('companySelected', {
        parent: 'authenticated',
        template: '<div ui-view></div>',
        abstract: true,
        resolve: {
          company: function ( managementFlow ) {
            return managementFlow.authorizeCompany();
          }
        },
        controller: 'SideMenuController as vm'
      })
      .state('chooseCompany', {
        parent: 'authenticated',
        template: 'Choose a company to manage',
        resolve: {
          companies: function ( models ) { return models.companies().getList({simple: true}); }
        },
        controller: function ( sideMenu, companies, $state ) {
          sideMenu.setCompanyList(companies);
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
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
