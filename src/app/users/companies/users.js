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
          manager: function () { return {}; },
          place: function ( department ) { return department; }
        }
      })
      .state('companies.detail.departments.detail.managers.detail', {
        abstract: true,
        url: '/{managerId:int}',
        template: '<div ui-view></div>',
        resolve: {
          manager: function ( $stateParams, department ) {
            return _.find(department.managers, function ( manager ) {
              return manager.id === $stateParams.managerId;
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
      .state('companies.detail.departments.detail.entities.detail.managers', {
        abstract: true,
        url: '/managers',
        template: '<div ui-view></div>'
      })
      .state('companies.detail.departments.detail.entities.detail.managers.create', {
        url: '/new',
        templateUrl: 'app/users/companies/managers/create/manager-create.html',
        controller: 'CompanyManagerCreateController as vm',
        resolve: {
          manager: function () { return {}; },
          place: function ( entity ) { return entity; }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.managers.detail', {
        abstract: true,
        url: '/{managerId:int}',
        template: '<div ui-view></div>',
        resolve: {
          manager: function ( $stateParams, entity ) {
            return _.find(entity.managers, function ( manager ) {
              return manager.id === $stateParams.managerId;
            });
          },
          place: function ( entity ) { return entity; }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.managers.detail.view', {
        url: '/detail',
        templateUrl: 'app/users/companies/managers/view/manager-detail-view.html',
        controller: 'CompanyManagerDetailViewController as vm'
      })
      .state('companies.detail.departments.detail.entities.detail.managers.detail.edit', {
        url: '/edit',
        templateUrl: 'app/users/companies/managers/create/manager-create.html',
        controller: 'CompanyManagerCreateController as vm'
      })
      .state('companies.detail.departments.detail.entities.detail.employees', {
        abstract: true,
        url: '/employees',
        template: '<div ui-view></div>'
      })
      .state('companies.detail.departments.detail.entities.detail.employees.create', {
        url: '/new',
        templateUrl: 'app/users/companies/employees/create/employee-form.html',
        controller: 'CompanyEmployeeFormController as vm',
        resolve: {
          employee: function () { return {}; },
          section: function () { return {}; },
          place: function ( entity ) { return entity; }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.employees.detail', {
        abstract: true,
        url: '/{employeeId:int}',
        template: '<div ui-view></div>',
        resolve: {
          employee: function ( $stateParams, entity ) {
            return _.find(entity.employees, function ( employee ) {
              return employee.id === $stateParams.employeeId;
            });
          },
          section: function () { return {}; },
          place: function ( entity ) { return entity; }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.employees.detail.view', {
        url: '/detail',
        templateUrl: 'app/users/companies/employees/view/employee-detail-view.html',
        controller: 'CompanyEmployeeDetailViewController as vm'
      })
      .state('companies.detail.departments.detail.entities.detail.employees.detail.edit', {
        url: '/edit',
        templateUrl: 'app/users/companies/employees/create/employee-form.html',
        controller: 'CompanyEmployeeFormController as vm'
      })

    ;
  }

})();
