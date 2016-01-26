/* global window:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('Authentication', Authentication);

  /** @ngInject */
  function Authentication($http, toastr, Restangular, urls) {
    var Auth = {
      login: login,
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

    function login(username, password) {
      return $http.post(urls.DOMAIN_URL + 'api-token-auth/', {username: username, password: password});
    }

  }
})();
