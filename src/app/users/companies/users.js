(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('companies.detail.managers', {
        abstract: true,
        url: '/managers',
        template: '<div ui-view></div>'
      })
      .state('companies.detail.managers.create', {
        url: '/new',
        templateUrl: 'app/users/companies/managers/create/department-create.html',
        controller: 'CompanyManagerCreateController as vm',
        resolve: {
          companyManager: function () { return {}; }
        }
      })
      .state('companies.detail.managers.detail', {
        abstract: true,
        url: '/{companyManagerId:int}',
        template: '<div ui-view></div>',
        resolve: {
          companyManager: function ( $stateParams, models ) {
            return models.companyManagers().one().get($stateParams.companyManagerId);
          }
        }
      })
      .state('companies.detail.managers.detail.view', {
        url: '/detail',
        templateUrl: 'app/companies/departments/detail/view/department-detail-view.html',
        controller: 'DepartmentDetailViewController as vm'
      })
      .state('companies.detail.managers.detail.edit', {
        url: '/edit',
        templateUrl: 'app/companies/departments/create/department-create.html',
        controller: 'DepartmentCreateController as vm'
      })

    ;
  }

})();
