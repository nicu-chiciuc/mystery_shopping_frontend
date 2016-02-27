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
          roles: ['tenantproductmanager', 'tenantprojectmanager', 'tenantconsultant', 'clientmanager', 'clientemployee', 'shopper']
        },
        controller: 'MainController as main'
      })
      .state('authenticated', {
        templateUrl: 'app/authentication/authenticated.html',
        abstract: true,
        resolve: {
          user: function (authorization) {
            return authorization.authorize();
          },
          companies: function (models, principal) {
            if (principal.isInAnyRole(['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant'])) {
              return models.companies().getList({simple: true});
            } else {
              return [];
            }
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
      .state('companySelected', {
        parent: 'authenticated',
        template: '<div ui-view layout="row" flex="100"></div>',
        abstract: true,
        resolve: {
          company: function ( managementFlow ) {
            return managementFlow.authorizeCompany();
          }
        }//,
        //controller: 'SideMenuController as vm'
      })
      .state('chooseCompany', {
        parent: 'authenticated',
        template: '<md-content layout="row" flex="100" layout-align="center center">' +
        '<h2 class="md-display-1">{{ "ACTIONS.CHOOSE_COMPANY" | translate }}</h2>' +
        '</md-content>',
        controller: function ( sideMenu ) {
          sideMenu.unsetCurrentCompany();
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('chooseProject', {
        parent: 'companySelected',
        template: '<md-content layout="row" flex="100" layout-align="center center">' +
        '<h2 class="md-display-1">{{ "ACTIONS.CHOOSE_PROJECT" | translate }}</h2>' +
        '</md-content>',
        controller: function ( sideMenu ) {
          sideMenu.unsetCurrentProject();
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('projectSelected', {
        abstract: true,
        parent: 'authenticated',
        template: '<div ui-view layout="row" flex="100"></div>',
        //template: 'Choose a project to manage',
        resolve:  {
          project: function ( managementFlow, $state, $rootScope ) {
            return managementFlow.authorizeProject();
          }
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
