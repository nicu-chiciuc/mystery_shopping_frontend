(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelSettingsController', GridPanelSettingsController);

  /** @ngInject */
  function GridPanelSettingsController($log, $mdDialog, dashboard) {
    $log.debug('Entered GridPanelListController');
    var vm = this;

    vm.dashboard = dashboard;
    vm.oldTitle = vm.dashboard.title;
    vm.oldPublishStatus = vm.dashboard.published;

    vm.save = save;
    vm.cancel = cancel;

    console.log('inside gridpanel settings');

    function save () {
      $mdDialog.hide();
    }

    function cancel () {
      vm.dashboard.title = vm.oldTitle;
      vm.dashboard.published = vm.oldPublishStatus;

      $mdDialog.hide();
    }
  }
})();
