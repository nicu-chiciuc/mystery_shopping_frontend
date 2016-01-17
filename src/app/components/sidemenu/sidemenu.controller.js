(function() {
  'use strict';

  angular
    .module('spark')
    .controller('SideMenuController', SideMenuController);

  /** @ngInject */
  function SideMenuController ( $scope, $log, $state, user, sideMenu ) {
    $log.debug('Entered SideMenuController');
    var vm = this;

    this.isOpen = sideMenu.isSectionSelected;
    this.isSelected = sideMenu.isPageSelected;
    this.toggleOpen = sideMenu.toggleSelectSection;
    this.autoFocusContent = false;

    $scope.sideMenu = sideMenu;
    $scope.isSelected = sideMenu.isPageSelected;
    $scope.isOpen = sideMenu.isSectionSelected;

    activate();

    function activate() {
    }

  }
})();
