(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('companies.detail.departments.detail.managers', {
        abstract: true,
        url: '/managers',
        template: '<div ui-view></div>'
      })
      .state('companies.detail.departments.detail.managers.create', {
        url: '/new',
        templateUrl: 'app/users/companies/managers/create/manager-create.html',
        controller: 'CompanyManagerCreateController as vm',
        resolve: {
          companyManager: function () { return {}; },
          place: function ( department ) { return department; }
        }
      })
      .state('companies.detail.departments.detail.managers.detail', {
        abstract: true,
        url: '/{companyManagerId:int}',
        template: '<div ui-view></div>',
        resolve: {
          companyManager: function ( $stateParams, department ) {
            return _.find(department.managers, function ( manager ) {
              return manager.id === $stateParams.companyManagerId;
            });
          },
          place: function ( department ) { return department; }
        }
      })
      .state('companies.detail.departments.detail.managers.detail.view', {
        url: '/detail',
        templateUrl: 'app/users/companies/managers/view/manager-detail-view.html',
        controller: 'CompanyManagerDetailViewController as vm'
      })
      .state('companies.detail.departments.detail.managers.detail.edit', {
        url: '/edit',
        templateUrl: 'app/users/companies/managers/create/manager-create.html',
        controller: 'CompanyManagerCreateController as vm'
      })

    ;
  }

})();
