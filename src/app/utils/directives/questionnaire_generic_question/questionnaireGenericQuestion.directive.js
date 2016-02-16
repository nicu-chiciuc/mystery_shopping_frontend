(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msQuestionnaireGenericQuestion', msQuestionnaireGenericQuestion);

  /** @ngInject */
  function msQuestionnaireGenericQuestion () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/questionnaire_generic_question/questionnaire-generic-question.html',
      scope: {
        question: '='
      },
      controller: QuestionnaireGenericQuestionController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function QuestionnaireGenericQuestionController ( $mdMedia, $mdDialog ) {
      var vm = this;

      vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

      vm.showEditQuestionDialog = showEditQuestionDialog;


      function showEditQuestionDialog ( ev, question, isNewQuestion ) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
        $mdDialog.show({
          controller: 'AddQuestionnaireQuestionDialogController as vm',
          templateUrl: 'app/questionnaires/modals/add_questionnaire_question/add-question-dialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          escapeToClose: false,
          fullscreen: useFullScreen,
          locals: {
            question: question,
            isNewQuestion: isNewQuestion
          }
        })
          .then(function(returnedBlock) {
            block.title = returnedBlock.title;
            block.weight = returnedBlock.weight;
          });
      }
    }
  }

})();
