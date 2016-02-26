/* global _:false */
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

      user.tenantId = 1;
      console.log('User initialized!');
    }

    function hasRole ( role ) {

    }

    function hasAnyRole ( roles ) {

    }

  }
})();
