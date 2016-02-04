/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TenantConsultantModel', TenantConsultantModel);

  /** @ngInject */
  function TenantConsultantModel ( AbstractAccountModel, contentTypes ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var tenantConsultant = this;

      tenantConsultant.contentTypeId = contentTypes.tenantconsultant;

      angular.extend(tenantConsultant.user, AbstractAccountModel);
      tenantConsultant.user.initializeAbstract();
    }
  }
})();
