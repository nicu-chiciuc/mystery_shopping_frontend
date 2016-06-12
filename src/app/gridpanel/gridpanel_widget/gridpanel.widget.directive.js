(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msGridPanelWidget', msGridPanelWidget);

  /** @ngInject */
  function msGridPanelWidget() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/gridpanel/gridpanel_widget/gridpanel-widget.html',
      scope: {
        // checkboxListElements: '=',
        // checkboxListOptions: '=',
        // targetList: '='
      },
      controller: GridPanelWidgetController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function GridPanelWidgetController () {
      var vm = this;
    }
  }
})();
