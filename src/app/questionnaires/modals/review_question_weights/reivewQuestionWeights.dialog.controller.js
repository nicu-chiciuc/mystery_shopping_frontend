(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ReviewQuestionnaireQuestionWeightsDialogController', ReviewQuestionnaireQuestionWeightsDialogController);

  /** @ngInject */
  function ReviewQuestionnaireQuestionWeightsDialogController ( $log, $scope, $filter, $mdDialog, $mdToast, msUtils, models, block ) {
    $log.debug('Entered ReviewQuestionnaireQuestionWeightsDialogController');
    $log.debug(block);
    $scope.msUtils = msUtils;

    $scope.block = block;

    $scope.saveReviewChanges = saveReviewChanges;
    $scope.updateAvailableWeight = updateAvailableWeight;

    activate();


    function activate () {
      $scope.block.setInitialWeights();
      _.forEach($scope.block.template_questions, function (question) {
        question.newWeight = question.weight;
        question.newWeightToDisplay = question.weightToDisplay;
      });
    }

    function saveReviewChanges ( block, isValid ) {
      var questionToSave = models.restangularizeElement(null, block.template_questions[0], 'templatequestions');

      if ( isValid ) {
        questionToSave.postProcess();
        questionToSave.put().then(saveQuestionSuccessFn, saveQuestionErrorFn);
        questionToSave.parentBlock = $scope.block;
      }

      function saveQuestionSuccessFn () {
        $mdToast.show(
          $mdToast.simple()
            .textContent($scope.msUtils.translation.genericSaveSuccessToast('QUESTIONNAIRE.QUESTION.HEADING'))
            .theme('success-toast')
            .hideDelay(3000)
        );

        $mdDialog.hide();
      }
      function saveQuestionErrorFn () {
        $mdToast.show(
          $mdToast.simple()
            .textContent($scope.msUtils.translation.genericSaveErrorToast('QUESTIONNAIRE.QUESTION.HEADING'))
            .theme('fail-toast')
            .hideDelay(5000)
        );
      }
    }

    $scope.cancel = function() {
      $scope.block.resetInitialWeights();
      $mdDialog.cancel();
    };

    function updateAvailableWeight ( question ) {
      var availableWeight = $scope.msUtils.number.strip($scope.block.computeAvailableWeight());

      // On any action with weight inputs, remove all tooltips.
      $scope.block.removeQuestionExceededWeightsTooltips();

      if ( availableWeight >= 0 ) {
        question.newWeight = question.newWeightToDisplay / $scope.block.weightToDisplay * 100;
        question.setWeight(question.newWeight);
      } else {
        question.newWeightToDisplay = question.weightToDisplay;
        question.tooltip = $filter('translate')('QUESTIONNAIRE.QUESTION.AVAILABLE_WEIGHT_EXCEEDED', {MAX_AMOUNT: $scope.block.weightToDisplay});
        question.showTooltip = true;
      }
    }
  }
})();
