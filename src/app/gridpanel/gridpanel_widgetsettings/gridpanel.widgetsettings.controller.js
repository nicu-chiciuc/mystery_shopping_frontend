(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelWidgetSettingsController', GridPanelWidgetSettingsController)

  /** @ngInject */
  function GridPanelWidgetSettingsController($log, $scope, $mdDialog, widget, dashboard, evaluations, ClassificationManager) {
    $log.debug('Entered GridPanelDashboardController');
    var vm = this;

    vm.widget = widget;
    vm.oldWidgetTitle = widget.title;
    vm.cancel = cancel;
    vm.save = save;
    vm.categoryTypeClick = categoryTypeClick;
    vm.childCallback = childCallback;

    ClassificationManager.recalculateAvailableForWidget(evaluations, widget);


    function childCallback (tree, node, state) {
      ClassificationManager.recalculateAvailableForWidget(evaluations, widget);
    }


    function categoryTypeClick (category, wrappedCategoryType) {
      ClassificationManager.recalculateAvailableForWidget(evaluations, widget);
    }


    function save () {
      var splitted = vm.widget.graphType.split(',');

      ClassificationManager.setWidgetData(widget, splitted[0], splitted[1], evaluations);

      $mdDialog.hide();
    }

    function cancel () {
      vm.widget.title = vm.oldWidgetTitle;
      $mdDialog.cancel();
    }
  }

})();
