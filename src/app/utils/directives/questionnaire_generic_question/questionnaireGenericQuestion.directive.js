/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msQuestionnaireGenericQuestion', msQuestionnaireGenericQuestion);

  /** @ngInject */
  function msQuestionnaireGenericQuestion ( models ) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/questionnaire_generic_question/questionnaire-generic-question.html',
      scope: {
        question: '=',
        block: '=',
        questionnaire: '=',

        isLink: '=',
        crossIndexParent: '='
      },
      controller: QuestionnaireGenericQuestionController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function QuestionnaireGenericQuestionController ( $filter, $mdMedia, $mdDialog, models ) {
      var vm = this;
      var originatorEv;

      vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

      vm.showEditQuestionDialog = showEditQuestionDialog;
      vm.deleteQuestion = deleteQuestion;
      vm.removeQuestionFromCrossIndex = removeQuestionFromCrossIndex;
      vm.addToCrossIndex = addToCrossIndex;

      vm.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      };

      function removeQuestionFromCrossIndex ( ev, question, crossIndex ) {
        _.remove(crossIndex.question_templates, function (question_template) {
          return question_template.question_template === question.id;
        });

        models.restangularizeElement(null, crossIndex, 'crossindextemplates');

        crossIndex.put().then(
          function () {
            console.log('is good');
          },
          function () {
            console.log('not is good');
          }
        )
      }

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
            block: vm.block,
            questionnaireTemplate: vm.questionnaire,
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
            question = models.restangularizeElement(null, question, 'templatequestions');
            question.postProcess();
            question.remove().then(deleteQuestionSuccessFn, deleteQuestionErrorFn);
          } else {
            deleteQuestionSuccessFn();
          }
          function deleteQuestionSuccessFn () {
            var removalProp = question.id ? 'id' : 'question_body';
            _.remove(vm.block.template_questions, function (templateQuestion) {
              return templateQuestion[removalProp] === question[removalProp];
            });
            vm.block.nextQuestionPositionNumber -= 1;

          //  TODO update parentBlock's question weights
          }
          function deleteQuestionErrorFn () {
            // TODO deal with the error
          }
        });
      }

      function addToCrossIndex ( questionnaire, question, crossIndex ) {
        questionnaire.addQuestionToCrossIndex(question, crossIndex);
      }
    }
  }

})();
