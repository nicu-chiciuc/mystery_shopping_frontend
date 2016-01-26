(function () {
  'use strict';

  angular
    .module('spark')
    .factory('AuthenticationInterceptor', AuthenticationInterceptor);

  /** @ngInject */
  function AuthenticationInterceptor( $log, authStorage ) {
    var interceptor = {
      request: addToken
    };

    return interceptor;

    function addToken(config) {
      var authObject = authStorage.getAuthenticatedAccount();

      //$log.debug(authObject);

      if (authObject && authObject.token) {
        console.log(authObject);
        config.headers = config.headers || {};
        config.headers.Authorization = 'JWT ' + authObject.token;
      }
      return config;
    }
  }
})();
