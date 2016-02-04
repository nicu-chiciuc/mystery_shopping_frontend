/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TenantProductManagerModel', TenantProductManagerModel);

  /** @ngInject */
  function TenantProductManagerModel ( AbstractAccountModel, contentTypes ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var productManager = this;

      productManager.contentTypeId = contentTypes.tenantproductmanager;

      angular.extend(productManager.user, AbstractAccountModel);
      productManager.user.initializeAbstract();
    }
  }
})();
