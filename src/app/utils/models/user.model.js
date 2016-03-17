(function() {
  'use strict';

  angular
    .module('spark')
    .factory('UserModel', UserModel);

  /** @ngInject */
  function UserModel () {
    var Model = {
      initialize: initialize,
      hasRole: hasRole,
      hasAnyRole: hasAnyRole
    };

    return Model;


    function initialize () {
      var user = this;

      if ( user.tenant_repr ) {
        user.tenantId = user.tenant_repr.id;
      }
    }

    function hasRole () {

    }

    function hasAnyRole () {

    }

  }
})();
