(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msEvaluationsTable', msEvaluationsTable);

  /** @ngInject */
  function msEvaluationsTable () {
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
    function EvaluationsTableController ( $log, $scope, $filter, $mdMedia, $mdDialog ) {
      $log.debug('Entered EvaluationsTableController');

      var vm = this;

      $scope.selectedRows = [];
      $scope.selected = [];

      vm.viewEvaluationDetails = viewEvaluationDetails;


      function viewEvaluationDetails ( ev, evaluation ) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
        $mdDialog.show({
          controller: 'EvaluationDetailDialogController as vm',
          templateUrl: 'app/evaluations/dialogs/evaluation-detail-dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          escapeToClose: false,
          fullscreen: useFullScreen,
          locals: {
            evaluation: evaluation
          }
        })
          .then(function(evaluation) {
          });
      }
    }
  }

})();
