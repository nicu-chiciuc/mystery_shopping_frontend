/* global window:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('principal', principal);

  /** @ngInject */
  function principal( $q, localStorageService, models ) {
    var _identity = undefined,
      _authenticated = false;

    var principal = {
      isIdentityResolved: isIdentityResolved,
      isAuthenticated: isAuthenticated,
      isInRole: isInRole,
      isInAnyRole: isInAnyRole,
      authenticate: authenticate,
      identity: identity
    };

    return principal;

    function isIdentityResolved () {
      return angular.isDefined(_identity);
    }

    function isAuthenticated () {
      return _authenticated;
    }

    function isInRole ( role ) {
      if (!_authenticated || !_identity.roles) return false;

      return _identity.roles.indexOf(role) != -1;
    }

    function isInAnyRole ( roles ) {
      if (!_authenticated || !_identity.roles) return false;

      for (var i = 0; i < roles.length; i++) {
        if (this.isInRole(roles[i])) return true;
      }

      return false;
    }

    function authenticate ( identity ) {
      _identity = identity;
      _authenticated = identity !== null;

      // for this demo, we'll store the identity in localStorage. For you, it could be a cookie, sessionStorage, whatever
      if (identity) localStorageService.set('authenticatedAccount', angular.toJson(identity));
      else localStorageService.remove('authenticatedAccount');
    }

    function identity ( force ) {
      var deferred = $q.defer();

      if (force === true) _identity = undefined;

      // check and see if we have retrieved the identity data from the server. if we have, reuse it by immediately resolving
      if (angular.isDefined(_identity)) {
        deferred.resolve(_identity);

        return deferred.promise;
      }

      _identity = angular.fromJson(localStorageService.get("authenticatedAccount"));
      if ( _identity && _identity.user ) {
        _identity.user = angular.extend(_identity.user, models.manager.UserModel);
      }

      _identity = {name: 'Iulian', roles: ['tenantproductmanager']};
      this.authenticate(_identity);
      deferred.resolve(_identity);

      return deferred.promise;
    }
  }
})();
