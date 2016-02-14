(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig( $stateProvider ) {
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
          countries: function ( models ) { return models.countries().getList(); },
          company: function () { return {}; }
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
        url: '/{companyId:int}',
        template: '<div ui-view></div>',
        resolve: {
          //company: function ( $stateParams, models ) { return models.companies().one($stateParams.companyId).get(); }
          company: function ( managementFlow ) {
            return managementFlow.authorizeCompany();
          }
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
        //templateUrl: 'app/companies/detail/edit/company-detail-edit.html',
        //controller: 'CompanyDetailViewController as vm',
        templateUrl: 'app/companies/create/company-create.html',
        controller: 'CompanyCreateController as vm',
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
        url: '/new',
        templateUrl: 'app/companies/departments/create/department-create.html',
        controller: 'DepartmentCreateController as vm',
        resolve: {
          department: function () { return {}; }
        }
      })
      .state('companies.detail.departments.detail', {
        abstract: true,
        url: '/{departmentId:int}',
        template: '<div ui-view></div>',
        resolve: {
          department: function ( $stateParams, company ) {
            return _.find(company.departments_repr, function ( department ) {
              return department.id === $stateParams.departmentId;
            });
          }
        }
      })
      .state('companies.detail.departments.detail.view', {
        url: '/detail',
        templateUrl: 'app/companies/departments/detail/view/department-detail-view.html',
        controller: 'DepartmentDetailViewController as vm'
      })
      .state('companies.detail.departments.detail.edit', {
        url: '/edit',
        templateUrl: 'app/companies/departments/create/department-create.html',
        controller: 'DepartmentCreateController as vm'
      })
      .state('companies.detail.departments.detail.entities', {
        abstract: true,
        url: '/entities',
        template: '<div ui-view></div>'
      })
      .state('companies.detail.departments.detail.entities.create', {
        url: '/new',
        templateUrl: 'app/companies/departments/entities/create/entity-create.html',
        controller: 'EntityCreateController as vm',
        resolve: {
          entity: function () { return {}; },
          cities: function ( models ) { return models.cities().getList(); }
        }
      })
      .state('companies.detail.departments.detail.entities.detail', {
        abstract: true,
        url: '/{entityId:int}',
        template: '<div ui-view></div>',
        resolve: {
          entity: function ( $stateParams, department ) {
            return _.find(department.entities, function ( entity ) {
              return entity.id === $stateParams.entityId;
            });
          }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.view', {
        url: '/detail',
        templateUrl: 'app/companies/departments/entities/detail/view/entity-detail-view.html',
        controller: 'EntityDetailViewController as vm'
      })
      .state('companies.detail.departments.detail.entities.detail.edit', {
        url: '/edit',
        templateUrl: 'app/companies/departments/entities/create/entity-create.html',
        controller: 'EntityCreateController as vm',
        resolve: {
          cities: function ( models ) { return models.cities().getList(); }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.sections', {
        abstract: true,
        url: '/sections',
        template: '<div ui-view></div>'
      })
      .state('companies.detail.departments.detail.entities.detail.sections.create', {
        url: '/new',
        templateUrl: 'app/companies/departments/entities/sections/create/section-create.html',
        controller: 'SectionCreateController as vm',
        resolve: {
          section: function () { return {}; }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail', {
        abstract: true,
        url: '/{sectionId:int}',
        template: '<div ui-view></div>',
        resolve: {
          section: function ( $stateParams, entity ) {
            return _.find(entity.sections, function ( section ) {
              return section.id === $stateParams.sectionId;
            });
          }
        }
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.view', {
        url: '/detail',
        templateUrl: 'app/companies/departments/entities/sections/detail/view/section-detail-view.html',
        controller: 'SectionDetailViewController as vm'
      })
      .state('companies.detail.departments.detail.entities.detail.sections.detail.edit', {
        url: '/edit',
        templateUrl: 'app/companies/departments/entities/sections/create/section-create.html',
        controller: 'SectionCreateController as vm'
      })

    ;
  }

})();
