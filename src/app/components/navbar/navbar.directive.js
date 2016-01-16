(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msNavbar', msNavbar);

  /** @ngInject */
  function msNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController( $state, principal ) {
      var vm = this;

      vm.logout = logout;

      function logout () {
        principal.authenticate(null);
        $state.go('login');
      }
    }
  }

})();
