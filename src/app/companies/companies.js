(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('companies', {
        abstract: true,
        parent: 'authenticated',
        url: '/companies',
        template: '<div ui-view></div>',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('companies.create', {
        url: '/new',
        templateUrl: 'app/companies/create/company-create.html',
        controller: 'CompanyCreateController as vm',
        resolve: {
          industries: function ( models ) { return models.industries().getList(); },
          countries: function ( models ) { return models.countries().getList(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('companies.list', {
        url: '/list',
        templateUrl: 'app/companies/list/company-list.html',
        controller: 'CompanyListController as vm',
        resolve: {
          companies: function ( models ) { return models.companies().getList(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('companies.detail', {
        abstract: true,
        url: '/{id:int}',
        template: '<div ui-view></div>',
        resolve: {
          company: function ( $stateParams, models ) { return models.companies().one($stateParams.id).get(); }
        },
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('companies.detail.view', {
        url: '/detail',
        templateUrl: 'app/companies/detail/view/company-detail-view.html',
        controller: 'CompanyDetailViewController as vm'
      })
      .state('companies.detail.edit', {
        url: '/edit',
        templateUrl: 'app/companies/detail/edit/company-detail-edit.html',
        controller: 'CompanyDetailViewController as vm',
        resolve: {
          industries: function ( models ) { return models.industries().getList(); },
          countries: function ( models ) { return models.countries().getList(); }
        }
      })
      .state('companies.detail.departments', {
        abstract: true,
        url: '/departments',
        template: '<div ui-view></div>'
      })
      .state('companies.detail.departments.create', {
        url: '/departments',
        templateUrl: 'app/companies/departments/create/department-create.html'
      });
  }

})();
