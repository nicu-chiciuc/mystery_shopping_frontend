(function() {
  'use strict';

  angular
    .module('spark')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($scope, $state, $rootScope, $log, models, msUtils, Authentication, principal) {
    var vm = this;

    vm.msUtils = msUtils;

    vm.login = login;

    activate();

    function activate() {
      // If the user is authenticated, they should not be here.
      //if (AuthToken.isAuthenticated()) {
      //  $location.url('/');
      //}
    }

    function login() {
      Authentication.login(vm.username, vm.password)
        .then(
          function ( response ) {
            angular.extend(response.data.user, models.manager.UserModel);
            response.data.user.initialize();
            principal.authenticate(response.data);

            if ( $rootScope.returnToState ) {
              $state.go($rootScope.returnToState, $rootScope.toStateParams);
            } else {
              $state.go('home');
            }
          },
          function ( error ) { $log.error(error); }
        );

      if ($scope.returnToState) $state.go($scope.returnToState.name, $scope.returnToStateParams);
      else $state.go('home');
    }
  }
})();
