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
      vm.unsetProject = unsetProject;
      vm.goToCompanyDetailsPage = function ( pageType ) {
        $state.go('companies.detail.' + pageType, {companyId: vm.managementFlow.getCompany().id});
      };
      vm.goToProjectDetailsPage = function ( pageType ) {
        $state.go('projects.detail.' + pageType, {projectId: vm.managementFlow.getProject().id});
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

      function unsetProject () {
        //managementFlow.unsetCompany();
        $rootScope.returnToState = $rootScope.toState;
        $rootScope.returnToStateParams = $rootScope.toStateParams;
        $state.go('chooseProject');
      }
    }
  }

})();
