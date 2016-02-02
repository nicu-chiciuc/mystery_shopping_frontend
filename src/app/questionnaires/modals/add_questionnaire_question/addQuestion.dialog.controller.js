(function() {
  'use strict';

  angular
    .module('spark')
    .controller('AddQuestionnaireQuestionDialogController', AddQuestionnaireQuestionDialogController);

  /** @ngInject */
  function AddQuestionnaireQuestionDialogController ( $log, $scope, $mdDialog, models ) {
    $log.debug('Entered AddQuestionnaireQuestionDialogController');

    $scope.question = {
      type: 's',
      template_question_choices: []
    };

    angular.extend($scope.question, models.manager.TemplateQuestionnaireQuestionModel);
    $scope.question.initialize();

    $scope.updateQuestionType = updateQuestionType;
    $scope.addChoice = addChoice;
    $scope.addQuestion = addQuestion;
    $scope.removeChoice = removeChoice;


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

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  }
})();
