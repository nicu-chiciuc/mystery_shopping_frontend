/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TenantProjectManagerModel', TenantProjectManagerModel);

  /** @ngInject */
  function TenantProjectManagerModel ( AbstractAccountModel, contentTypes ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var projectManager = this;

      projectManager.contentTypeId = contentTypes.tenantprojectmanager;

      angular.extend(projectManager.user, AbstractAccountModel);
      projectManager.user.initializeAbstract();
    }
  }
})();
