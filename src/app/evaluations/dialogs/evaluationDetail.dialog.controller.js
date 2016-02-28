(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationDetailDialogController', EvaluationDetailDialogController);

  /** @ngInject */
  function EvaluationDetailDialogController ( $log, $scope, $filter, $mdDialog, $mdToast, msUtils, models, evaluation ) {
    $log.debug('Entered EvaluationDetailDialogController');
    $log.debug(evaluation);
    var vm = this;

    vm.msUtils = msUtils;

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
        var translationKey = status === 'draft'
          ? 'TOAST.EVALUATION_SAVED_AS_DRAFT'
          : 'TOAST.EVALUATION_SUBMITTED';

        $mdToast.show(
          $mdToast.simple()
            .textContent($filter('translate')(translationKey))
            .theme('success-toast')
            .hideDelay(3000)
        );
        $mdDialog.hide(response);
      }
      function saveEvaluationErrorFn () {
        $mdToast.show(
          $mdToast.simple()
            .textContent(vm.msUtils.translation.genericSaveErrorToast('EVALUATION.HEADING_SINGULAR'))
            .theme('fail-toast')
            .hideDelay(5000)
        );
      }
    }
  }
})();
