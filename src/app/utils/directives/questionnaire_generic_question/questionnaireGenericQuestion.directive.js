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
        question: '=',
        block: '='
      },
      controller: QuestionnaireGenericQuestionController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function QuestionnaireGenericQuestionController ( $filter, $mdMedia, $mdDialog ) {
      var vm = this;
      var originatorEv;

      vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

      vm.showEditQuestionDialog = showEditQuestionDialog;
      vm.deleteQuestion = deleteQuestion;

      vm.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };


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
          .then(function(question) {
            // TODO save the question on the server
          });
      }

      function deleteQuestion ( ev, question ) {
        var confirm = $mdDialog.confirm()
          .title($filter('translate')('QUESTIONNAIRE.QUESTION.DELETE_DIALOG.TITLE'))
          .textContent($filter('translate')('QUESTIONNAIRE.QUESTION.DELETE_DIALOG.TEXT_CONTENT'))
          .ariaLabel($filter('translate')('QUESTIONNAIRE.QUESTION.DELETE_DIALOG.ARIA_LABEL'))
          .targetEvent(ev)
          .ok($filter('translate')('BUTTON.DELETE'))
          .cancel($filter('translate')('BUTTON.CANCEL'));

        $mdDialog.show(confirm).then(function() {
          if ( question.id ) {
            question.remove().then(deleteQuestionSuccessFn, deleteQuestionErrorFn);
          } else {
            deleteQuestionSuccessFn();
          }
          function deleteQuestionSuccessFn () {
            var removalProp = question.id ? 'id' : 'question_body';
            _.remove(vm.block.template_questions, function (templateQuestion) {
              return templateQuestion[removalProp] === question[removalProp];
            });

          //  TODO update parentBlock's question weights
          }
          function deleteQuestionErrorFn () {
            // TODO deal with the error
          }
        });
      }
    }
  }

})();
