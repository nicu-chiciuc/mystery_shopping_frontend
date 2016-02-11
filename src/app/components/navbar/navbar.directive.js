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
    function NavbarController( $rootScope, $state, principal, managementFlow, sideMenu ) {
      var vm = this;
      var originatorEv;

      vm.managementFlow = managementFlow;
      vm.sideMenu = sideMenu;

      vm.logout = logout;
      vm.unsetCompany = unsetCompany;
      vm.goToCompanyDetailsPage = function () {
        $state.go('companies.detail.edit', {companyId: vm.managementFlow.getCompany().id});
      };

      vm.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };

      function logout () {
        principal.authenticate(null);
        $state.go('login');
      }

      function unsetCompany () {
        //managementFlow.unsetCompany();
        $rootScope.returnToState = $rootScope.toState;
        $rootScope.returnToStateParams = $rootScope.toStateParams;
        $state.go('chooseCompany');
      }
    }
  }

})();
