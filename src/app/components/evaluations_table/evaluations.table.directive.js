(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msEvaluationsTable', msEvaluationsTable);

  /** @ngInject */
  function msEvaluationsTable() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/evaluations_table/evaluations-table.html',
      scope: {
        evaluations: '='
      },
      controller: EvaluationsTableController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function EvaluationsTableController ( $log, $scope ) {
      $log.debug('Entered EvaluationsTableController');

      $scope.selectedRows = [];
      $scope.selected = [];

    }
  }

})();
