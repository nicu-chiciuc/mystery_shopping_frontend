(function() {
  'use strict';

  angular
    .module('spark')
    .controller('SideMenuController', SideMenuController);

  /** @ngInject */
  function SideMenuController ( $scope, $log, $state, principal, sideMenu, companies ) {
    $log.debug('Entered SideMenuController');
    var vm = this;

    vm.isOpen = sideMenu.isSectionSelected;
    vm.isSelected = sideMenu.isPageSelected;
    vm.setCompany = sideMenu.setCompany;
    vm.setProject = sideMenu.setProject;
    vm.toggleOpen = sideMenu.toggleSelectSection;

    vm.autoFocusContent = false;
    $scope.sideMenu = sideMenu;
    $scope.isSelected = sideMenu.isPageSelected;
    $scope.isOpen = sideMenu.isSectionSelected;

    activate();

    function activate() {
      if ( principal.isInTenantRole() ) {
        $scope.sideMenu.setCompanyList(companies);
      }
    }

  }
})();
