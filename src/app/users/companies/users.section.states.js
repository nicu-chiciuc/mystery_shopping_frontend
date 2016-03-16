/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('companies.detail.departments.detail.entities.detail.sections.detail.managers', {
        abstract: true,
        url: '/managers',
        template: '<div ui-view></div>'
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.managers.create', {
        url: '/new',
        templateUrl: 'app/users/companies/managers/create/manager-create.html',
        controller: 'CompanyManagerCreateController as vm',
        resolve: {
          manager: function () { return {}; },
          place: function ( section ) { return section; }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.managers.detail', {
        abstract: true,
        url: '/{managerId:int}',
        template: '<div ui-view></div>',
        resolve: {
          manager: function ( $stateParams, section ) {
            return _.find(section.managers, function ( manager ) {
              return manager.id === $stateParams.managerId;
            });
          },
          place: function ( section ) { return section; }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.managers.detail.view', {
        url: '/detail',
        templateUrl: 'app/users/companies/managers/view/manager-detail-view.html',
        controller: 'CompanyManagerDetailViewController as vm'
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.managers.detail.edit', {
        url: '/edit',
        templateUrl: 'app/users/companies/managers/create/manager-create.html',
        controller: 'CompanyManagerCreateController as vm'
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.employees', {
        abstract: true,
        url: '/employees',
        template: '<div ui-view></div>'
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.employees.create', {
        url: '/new',
        templateUrl: 'app/users/companies/employees/create/employee-form.html',
        controller: 'CompanyEmployeeFormController as vm',
        resolve: {
          employee: function () { return {}; },
          place: function ( section ) { return section; }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.employees.detail', {
        abstract: true,
        url: '/{employeeId:int}',
        template: '<div ui-view></div>',
        resolve: {
          employee: function ( $stateParams, section ) {
            return _.find(section.employees, function ( employee ) {
              return employee.id === $stateParams.employeeId;
            });
          },
          place: function ( section ) { return section; }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.employees.detail.view', {
        url: '/detail',
        templateUrl: 'app/users/companies/employees/view/employee-detail-view.html',
        controller: 'CompanyEmployeeDetailViewController as vm'
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.employees.detail.edit', {
        url: '/edit',
        templateUrl: 'app/users/companies/employees/create/employee-form.html',
        controller: 'CompanyEmployeeFormController as vm'
      })

    ;
  }

})();
