(function() {
  'use strict';

  angular
    .module('spark')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig ( $stateProvider ) {
    $stateProvider
      .state('admin', {
        parent: 'authenticated',
        url: '/',
        template: '<div ui-view></div>',
        data: {
          roles: ['tenantproductmanager']
        }
      })
      .state('admin.uploadLocalities', {
        templateUrl: 'app/settings/admin/upload/country_localities/upload-localities-form.html',
        controller: 'AdminUploadLocalitiesController as vm'
      });
  }
})();
