(function() {
  'use strict';

  angular
    .module('spark')
    .controller('AddQuestionnaireQuestionDialogController', AddQuestionnaireQuestionDialogController);

  /** @ngInject */
  function AddQuestionnaireQuestionDialogController ( $log, $scope, $mdDialog, $mdToast, msUtils, models, question, block, questionnaireTemplate, isNewQuestion ) {
    $log.debug('Entered AddQuestionnaireQuestionDialogController');

    $scope.msUtils = msUtils;

    $scope.isNewQuestion = isNewQuestion;
    $scope.block = block;
    $scope.questionnaireTemplate = questionnaireTemplate;

    $scope.question = $scope.isNewQuestion
      ? {
        type: 's',
        template_question_choices: [],
        max_score: 0,
        weight: 0,
        order: $scope.block.nextQuestionPositionNumber,
        questionnaire_template: $scope.questionnaireTemplate.id,
        template_block: $scope.block.id
      }
      : question;

    switch ($scope.question.type) {
      case 's':
            $scope.selectedIndex = 0;
            break;
      case 'm':
            $scope.selectedIndex = 1;
            break;
      case 't':
            $scope.selectedIndex = 2;
            break;
      case 'd':
            $scope.selectedIndex = 3;
            break;
    }

    $scope.updateQuestionType = updateQuestionType;
    $scope.addChoice = addChoice;
    $scope.addQuestion = addQuestion;
    $scope.saveQuestion = saveQuestion;
    $scope.removeChoice = removeChoice;

    activate();


    function activate () {
      $scope.question = models.restangularizeElement(null, $scope.question, 'templatequestions');
      if ( $scope.isNewQuestion ) {
        $scope.question.initialize($scope.block);
      }
      $scope.question.backupInitialQuestion();
    }

    function updateQuestionType ( type ) {
      $scope.question.updateQuestionType(type);
    }

    function addChoice () {
        $scope.question.addChoice();
    }

    function removeChoice ( index ) {
      $scope.question.removeChoice(index);
    }

    function addQuestion ( question ) {
      question.postProcess();
      $mdDialog.hide(question);
    }

    function saveQuestion ( question, isValid ) {
      if ( isValid ) {
        question.postProcess();
        question[question.id ? 'put' : 'post']().then(saveQuestionSuccessFn, saveQuestionErrorFn);
        question.parentBlock = $scope.block;
      }

      function saveQuestionSuccessFn ( response ) {
        if ( $scope.isNewQuestion ) {
          question.id = response.id;
        }
        question.cleanUpdateSiblingsIdentifiers();

        $mdToast.show(
          $mdToast.simple()
            .textContent($scope.msUtils.translation.genericSaveSuccessToast('QUESTIONNAIRE.QUESTION.HEADING'))
            .theme('success-toast')
            .hideDelay(3000)
        );

        $mdDialog.hide(question);
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
      $scope.question.restoreInitialQuestion();
      $scope.question.postProcess();
      $scope.question.parentBlock = $scope.block;
      //$scope.$apply();
      $mdDialog.cancel();
    };

  }
})();
