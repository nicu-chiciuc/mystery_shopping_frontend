(function() {
  'use strict';

  angular
    .module('spark')
    .controller('AddQuestionnaireQuestionDialogController', AddQuestionnaireQuestionDialogController);

  /** @ngInject */
  function AddQuestionnaireQuestionDialogController ( $log, $scope, $mdDialog, models, question, isNewQuestion ) {
    $log.debug('Entered AddQuestionnaireQuestionDialogController');

    $scope.question = question || {
      type: 's',
      template_question_choices: [],
      max_score: 0,
      weight: 0
    };
    console.log($scope.question);

    switch ($scope.question.type) {
      case 's':
            $scope.selectedIndex = 1;
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
