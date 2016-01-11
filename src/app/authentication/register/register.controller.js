(function() {
  'use strict';

  angular
    .module('spark')
    .controller('RegisterController', RegisterController);

  /** @ngInject */
  function RegisterController($location, $scope, Authentication, AuthToken) {
    var vm = this;

    vm.register = register;

    activate();

    function activate() {
      // If the user is authenticated, they should not be here.
      if (AuthToken.isAuthenticated()) {
        $location.url('/');
      }
    }

    function register() {
      Authentication.register(vm.email, vm.password, vm.confirmPassword);
    }
  }
})();
