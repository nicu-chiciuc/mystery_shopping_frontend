(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationDetailDialogController', EvaluationDetailDialogController);

  /** @ngInject */
  function EvaluationDetailDialogController ( $log, $scope, $mdDialog, evaluation ) {
    $log.debug('Entered EvaluationDetailDialogController');
    $log.debug(evaluation);
    var vm = this;

    vm.evaluation = evaluation;
    vm.questionCheckboxListOptions = {
      labelProp: 'text',
      valueProp: 'id'
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    activate();

    function activate() {
    }
  }
})();
