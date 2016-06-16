(function() {
    'use strict';

    angular
        .module('spark')
        .controller('GridPanelWidgetSettingsController', GridPanelWidgetSettingsController);

    /** @ngInject */
    function GridPanelWidgetSettingsController($log, $scope, $mdDialog, widget, dashboard) {
        $log.debug('Entered GridPanelDashboardController');
        var vm = this;

        vm.cancel = cancel;
        vm.save = save;
        
        vm.availableLocations = dashboard.dataManager.getLocations();
        
        vm.availableBlocks = dashboard.dataManager.getBlocks();

        function save () {

        }

        function cancel () {
            $mdDialog.cancel();
        }
    }

})();