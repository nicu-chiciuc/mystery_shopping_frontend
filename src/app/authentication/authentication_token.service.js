(function() {
  'use strict';

  angular
    .module('spark')
    .factory('AuthToken', AuthToken);

  /** @ngInject */
  function AuthToken($log, localStorageService) {
    var AuthenticationToken = {
      getAuthenticatedAccount: getAuthenticatedAccount,
      isAuthenticated: isAuthenticated,
      setAuthenticatedAccount: setAuthenticatedAccount,
      unauthenticate: unauthenticate
    };

    return AuthenticationToken;


    /**
     * @name getAuthenticatedAccount
     * @desc Return the currently authenticated account
     * @returns {object|undefined} Account if authenticated, else `undefined`
     */
    function getAuthenticatedAccount() {
      return {user: true};
      var authenticatedAccount = localStorageService.get('authenticatedAccount');
      if ( !authenticatedAccount ) {
        return;
      }

      authenticatedAccount = JSON.parse(authenticatedAccount);
      if ( angular.isDefined(authenticatedAccount.user) ) {
        authenticatedAccount.user = angular.extend(authenticatedAccount.user, ModelManager.AccountModel);
      }
      return authenticatedAccount;
    }

    /**
     * @name isAuthenticated
     * @desc Check if the current user is authenticated
     * @returns {boolean} True is user is authenticated, else false.
     */
    function isAuthenticated() {
      return !!localStorageService.get('authenticatedAccount');
    }

    /**
     * @name setAuthenticatedAccount
     * @desc Stringify the account object and store it in a cookie
     * @param {Object} account The account object to be stored
     * @returns {undefined}
     */
    function setAuthenticatedAccount(account) {
      if(localStorageService.isSupported) {
        $log.debug('localStorage is supported on this browser.');
      }
      localStorageService.set('authenticatedAccount', JSON.stringify(account));
    }

    /**
     * @name unauthenticate
     * @desc Delete the cookie where the user object is stored
     * @returns {undefined}
     */
    function unauthenticate() {
      localStorageService.remove('authenticatedAccount');
    }

  }
})();
