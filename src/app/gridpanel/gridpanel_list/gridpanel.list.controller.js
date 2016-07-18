(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelListController', GridPanelListController);

  /** @ngInject */
  function GridPanelListController($log, $state, project, evaluations, projectDashboards) {
    $log.debug('Entered GridPanelListController');
    var vm = this;

    vm.dashboards = projectDashboards;
    vm.editDashboard = editDashboard;
    vm.removeDashboard = removeDashboard;

    function editDashboard (dashboard) {
      $state.go('gridpanel.edit', {currentDashboardId: dashboard.id});
      // $state.go('gridpanel.create');
    }

    function removeDashboard (dashboard) {
      dashboard.remove(dashboard.id).then(
        function (resp) {
          console.log('good', resp);
        },
        function (resp) {
          console.log('bad', resp);
        }
      );
    }

  }
})();
