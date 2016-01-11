/* global window:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('Authentication', Authentication);

  /** @ngInject */
  function Authentication($http, toastr, Restangular, AuthToken, urls) {
    var Auth = {
      login: login,
      logout: logout,
      register: register
    };

    return Auth;

    function register(email, password, confirmPassword) {
      var newUser = {
        confirm_password: confirmPassword,
        password: password,
        email: email
      };

      Restangular.restangularizeElement(null, newUser, 'users');
      newUser.save().then(registerSuccessFn, registerErrorFn);

      function registerSuccessFn() {  // data, status, headers, config
        Authentication.login(email, password);
      }

      function registerErrorFn() {  // data, status, headers, config
        // TODO deal with the error
      }
    }

    function login(email, password) {
      return $http.post(urls.DOMAIN_URL + 'api-token-auth/', {email: email, password: password})
        .then(loginSuccessFn, loginErrorFn);

      function loginSuccessFn( response ) {  // data, status, headers, config
        AuthToken.setAuthenticatedAccount(response.data);

        window.location = '/';
      }

      function loginErrorFn() {  // data, status, headers, config
        // TODO deal with the error
        toastr.error('Incorrect email or password.', 'Error!');
      }
    }

    function logout() {
      AuthToken.unauthenticate();
      window.location = '/';
    }
  }
})();
