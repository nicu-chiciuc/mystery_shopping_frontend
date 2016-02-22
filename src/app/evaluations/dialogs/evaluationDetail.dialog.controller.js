(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationDetailDialogController', EvaluationDetailDialogController);

  /** @ngInject */
  function EvaluationDetailDialogController ( $log, $scope, $mdDialog, models, evaluation ) {
    $log.debug('Entered EvaluationDetailDialogController');
    $log.debug(evaluation);
    var vm = this;

    vm.evaluation = evaluation;
    vm.questionCheckboxListOptions = {
      labelProp: 'text',
      valueProp: 'id'
    };

    vm.saveEvaluation = saveEvaluation;

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    activate();

    function activate() {
    }

    function saveEvaluation ( status ) {
      vm.evaluation.questionnaire = _.cloneDeep(vm.evaluation.questionnaire_repr);
      angular.extend(vm.evaluation.questionnaire, models.manager.QuestionnaireModel);

      vm.evaluation.questionnaire.postProcess();
      vm.evaluation.status = status;

      vm.evaluation.put().then(saveEvaluationSuccessFn, saveEvaluationErrorFn);

      function saveEvaluationSuccessFn ( response ) {
        $mdDialog.hide(response);
      }
      function saveEvaluationErrorFn () {
        // TODO deal with the error
      }
    }
  }
})();
