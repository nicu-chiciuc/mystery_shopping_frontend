(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelDashboardController', GridPanelDashboardController);

  /** @ngInject */
  function GridPanelDashboardController ( $log, project, $scope ) {
    $log.debug('Entered GridPanelDashboardController');
    var vm = this;

    activate();



    function activate() {
      $scope.standardItems = [
        { sizeX: 2, sizeY: 1, row: 0, col: 0 },
        { sizeX: 2, sizeY: 2, row: 0, col: 2 },
        { sizeX: 1, sizeY: 1, row: 0, col: 4 },
        { sizeX: 1, sizeY: 1, row: 0, col: 5 },
        // { sizeX: 2, sizeY: 1, row: 1, col: 0 },
        // { sizeX: 1, sizeY: 1, row: 1, col: 4 },
        // { sizeX: 1, sizeY: 2, row: 1, col: 5 },
        // { sizeX: 1, sizeY: 1, row: 2, col: 0 },
        // { sizeX: 2, sizeY: 1, row: 2, col: 1 },
        // { sizeX: 1, sizeY: 1, row: 2, col: 3 },
        // { sizeX: 1, sizeY: 1, row: 2, col: 4 }
      ];

      $scope.gridsterOpts = {
        resizable: {

          stop: function (event, $element, widget) {
            console.log('gridster resized');
            console.log(event);
            console.log($element);
            console.log(widget);
            $scope.$broadcast('refresh-yourself');
          }
        }
      };

      $scope.$on('gridster-resized', function(sizes, gridster) {
        console.log('gridster-resized from dashboard');
      });
    }

  }
})();
