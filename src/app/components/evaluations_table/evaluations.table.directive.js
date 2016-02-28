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
    function EvaluationsTableController ( $log, $scope, $filter, $mdMedia, $mdDialog, evaluationPlanning ) {
      $log.debug('Entered EvaluationsTableController');

      var vm = this;
      var originatorEv;

      $scope.selectedRows = [];
      $scope.selected = [];

      $scope.tableOptions = {
        autoSelect: false,
        largeEditDialog: true,
        rowSelection: false
      };

      vm.viewEvaluationDetails = viewEvaluationDetails;
      vm.deleteEvaluation = deleteEvaluation;

      vm.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };


      function viewEvaluationDetails ( ev, evaluation ) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
        $mdDialog.show({
          controller: 'EvaluationDetailDialogController as vm',
          templateUrl: 'app/evaluations/dialogs/evaluation-detail-dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          escapeToClose: false,
          fullscreen: true,
          locals: {
            evaluation: evaluation
          }
        })
          .then(function(updatedEvaluation) {
            evaluation.questionnaire_repr = updatedEvaluation.questionnaire_repr;
            evaluation.status = updatedEvaluation.status;
            evaluation.canBeSubmitted = updatedEvaluation.canBeSubmitted;
            evaluation.statusCssClass[evaluation.status] = true;
          });
      }

      function deleteEvaluation ( ev, evaluation ) {
        var confirm = $mdDialog.confirm()
          .title($filter('translate')('EVALUATION.DELETE_DIALOG.TITLE'))
          .textContent($filter('translate')('EVALUATION.DELETE_DIALOG.TEXT_CONTENT'))
          .ariaLabel($filter('translate')('EVALUATION.DELETE_DIALOG.ARIA_LABEL'))
          .targetEvent(ev)
          .ok($filter('translate')('BUTTON.DELETE'))
          .cancel($filter('translate')('BUTTON.CANCEL'));

        $mdDialog.show(confirm).then(function() {
          evaluationPlanning.removeEvaluation(evaluation);
        });
      }
    }
  }

})();
