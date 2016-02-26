(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig( $stateProvider ) {
    $stateProvider
      .state('shoppers', {
        abstract: true,
        parent: 'authenticated',
        url: '/shoppers',
        template: '<div ui-view flex></div>',
        data: {
          roles: ['tenantprojectmanager', 'tenantproductmanager', 'tenantconsultant']
        }
      })
      .state('shoppers.create', {
        url: '/new',
        templateUrl: 'app/users/shoppers/create/shopper-form.html',
        controller: 'ShopperFormController as vm',
        resolve: {
          shopper: function () { return {}; }
        }
      })
      .state('shoppers.list', {
        url: '/list',
        templateUrl: 'app/users/shoppers/list/shopper-list.html',
        controller: 'ShopperListController as vm',
        resolve: {
          shoppers: function ( models ) { return models.shoppers().getList(); }
        }
      })
      .state('shoppers.detail', {
        abstract: true,
        url: '/{shopperId:int}',
        template: '<div ui-view flex></div>',
        resolve: {
          shopper: function ( $stateParams, models ) {
            return models.shoppers().one($stateParams.shopperId).get();
          }
        }
      })
      .state('shoppers.detail.view', {
        url: '/detail',
        templateUrl: 'app/users/shoppers/view/shopper-view.html',
        controller: 'ShopperViewController as vm'
      })
      .state('shoppers.detail.edit', {
        url: '/edit',
        templateUrl: 'app/users/shoppers/create/shopper-form.html',
        controller: 'ShopperFormController as vm'
      })
    ;
  }

})();
