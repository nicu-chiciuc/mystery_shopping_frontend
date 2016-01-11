(function() {
  'use strict';

  angular
    .module('spark')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($location, $log, Authentication, AuthToken) {
    var vm = this;

    vm.login = login;

    activate();

    function activate() {
      // If the user is authenticated, they should not be here.
      if (AuthToken.isAuthenticated()) {
        $location.url('/');
      }
    }

    function login() {
      Authentication.login(vm.email, vm.password)
        .then(null, function (error) { $log.error(error); });
    }
  }
})();
