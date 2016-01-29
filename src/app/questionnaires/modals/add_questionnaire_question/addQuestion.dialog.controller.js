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
      choices: []
    };

    $scope.updateQuestionType = updateQuestionType;
    $scope.addChoice = addChoice;
    $scope.addQuestion = addQuestion;
    $scope.removeChoice = removeChoice;


    function updateQuestionType ( type ) {
      $scope.question.type = type;
    }

    function addChoice ( event ) {
        $scope.question.choices.push({});
    }

    function removeChoice ( index ) {
      $scope.question.choices.splice(index, 1);
    }

    function addQuestion ( question ) {
      angular.extend(question, models.manager.QuestionnaireQuestionModel);
      question.initialize();
      question.postProcess();
      $mdDialog.hide(question);
    }

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  }
})();
