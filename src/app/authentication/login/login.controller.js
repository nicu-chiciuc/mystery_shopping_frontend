(function() {
  'use strict';

  angular
    .module('spark')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $state, $log, Authentication, principal) {
    var vm = this;

    vm.login = login;

    activate();

    function activate() {
      // If the user is authenticated, they should not be here.
      //if (AuthToken.isAuthenticated()) {
      //  $location.url('/');
      //}
    }

    function login() {
      Authentication.login(vm.email, vm.password)
        .then(
          function ( user ) { principal.authenticate(user); },
          function ( error ) { $log.error(error); }
        );

      if ($scope.returnToState) $state.go($scope.returnToState.name, $scope.returnToStateParams);
      else $state.go('home');
    }
  }
})();
