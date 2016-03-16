/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .controller('QuestionnaireTemplateCreateController', QuestionnaireTemplateCreateController);

  /** @ngInject */
  function QuestionnaireTemplateCreateController ( $log, $scope, $filter, $mdMedia, $mdDialog, msUtils, models, user, questionnaireTemplate, dragulaService ) {
    $log.debug('Entered QuestionnaireTemplateCreateController');
    $log.debug(questionnaireTemplate);
    var vm = this;
    var originatorEv;

    vm.msUtils = msUtils;

    vm.questionnaireTemplate = questionnaireTemplate;
    vm.questionnaireTemplate.template_blocks = vm.questionnaireTemplate.template_blocks || [];
    vm.questionnaireTemplate.is_editable = angular.isDefined(vm.questionnaireTemplate.id)
      ? vm.questionnaireTemplate.is_editable
      : true;

    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    vm.addBlock = addBlock;
    vm.showBlockTitleDialog = showBlockTitleDialog;
    vm.showAddQuestionDialog = showAddQuestionDialog;
    vm.deleteBlock = deleteBlock;
    vm.reivewQuestionWeights = reivewQuestionWeights;

    vm.saveQuestionnaireTemplate = saveQuestionnaireTemplate;

    vm.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };

    activate();

    function activate() {
      vm.isNewQuestionnaireTemplate = !vm.questionnaireTemplate.id;
      if ( vm.isNewQuestionnaireTemplate ) {
        vm.questionnaireTemplate = models.restangularizeElement(null, vm.questionnaireTemplate, 'templatequestionnaires');
      } else {
        vm.questionnaireTemplate.initialize();
      }

      dragulaService.options($scope, 'block-1', {
        moves: function (el, container, handle) {
          return handle.className.indexOf('handle-1') > -1;
        }
      });
      dragulaService.options($scope, 'block-2', {
        moves: function (el, container, handle) {
          return handle.className.indexOf('handle-2') > -1;
        }
      });
      dragulaService.options($scope, 'block-3', {
        moves: function (el, container, handle) {
          return handle.className.indexOf('handle-3') > -1;
        }
      });
    }

    function saveQuestionnaireTemplate ( questionnaireTemplate, isValid, nextState ) {
      if ( isValid ) {
        vm.questionnaireTemplate = models.restangularCopy(questionnaireTemplate);
        questionnaireTemplate.postProcess();
        if ( !questionnaireTemplate.id ) {
          questionnaireTemplate.tenant = user.tenantId;
          //questionnaireTemplate = models.restangularizeElement(null, questionnaireTemplate, 'templatequestionnaires');
          questionnaireTemplate.post().then(saveQuestionnaireTemplateSuccessFn, saveQuestionnaireTemplateErrorFn);
        } else {
          questionnaireTemplate.put().then(saveQuestionnaireTemplateSuccessFn, saveQuestionnaireTemplateErrorFn);
        }
      }

      function saveQuestionnaireTemplateSuccessFn ( response ) {
        console.log(response);
        vm.questionnaireTemplate = response;
      }
      function saveQuestionnaireTemplateErrorFn () {
        // TODO deal with the error
      }
    }

    function addBlock ( ev, parentBlock ) {
      var block = {};
      block.template_blocks = [];
      block.template_questions = [];

      if ( vm.questionnaireTemplate.id ) {
        // In case the questionnaire is already saved, add its id to the new
        // block that we are about to create.
        block.questionnaire_template = vm.questionnaireTemplate.id;
      }

      angular.extend(block, models.manager.TemplateQuestionnaireBlockModel);
      block.initialize(vm.questionnaireTemplate.childBlocksProp, vm.questionnaireTemplate.childQuestionsProp, parentBlock);

      parentBlock.addChildBlock(block);
      showBlockTitleDialog(ev, block, parentBlock, true);
    }

    function showBlockTitleDialog ( ev, block, parentBlock, isNewBlock ) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
      $mdDialog.show({
        controller: 'EditBlockDialogController as vm',
        templateUrl: 'app/questionnaires/modals/edit_block/edit-block-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        fullscreen: useFullScreen,
        escapeToClose: false,
        locals: {
          block: block,
          parentBlock: parentBlock,
          isNewBlock: isNewBlock
        }
      })
        .then(function(returnedBlock) {
          block.title = returnedBlock.title;
          block.weight = returnedBlock.weight;
        });
    }

    function showAddQuestionDialog ( ev, block, questionnaireTemplate, isNewQuestion ) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
      $mdDialog.show({
        controller: 'AddQuestionnaireQuestionDialogController as vm',
        templateUrl: 'app/questionnaires/modals/add_questionnaire_question/add-question-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        escapeToClose: false,
        fullscreen: useFullScreen,
        locals: {
          question: {},
          block: block,
          questionnaireTemplate: questionnaireTemplate,
          isNewQuestion: isNewQuestion
        }
      })
        .then(function(question) {
          block.addQuestion(question);
        });
    }

    function deleteBlock ( ev, block, parentBlock ) {
      var confirm = $mdDialog.confirm()
        .title($filter('translate')('QUESTIONNAIRE.BLOCK.DELETE_DIALOG.TITLE'))
        .textContent($filter('translate')('QUESTIONNAIRE.BLOCK.DELETE_DIALOG.TEXT_CONTENT'))
        .ariaLabel($filter('translate')('QUESTIONNAIRE.BLOCK.DELETE_DIALOG.ARIA_LABEL'))
        .targetEvent(ev)
        .ok($filter('translate')('BUTTON.DELETE'))
        .cancel($filter('translate')('BUTTON.CANCEL'));

      $mdDialog.show(confirm).then(function() {
        if ( block.id ) {
          block = models.restangularizeElement(null, block, 'templateblocks');
          block.prepareForSave();
          block.remove().then(deleteBlockSuccessFn, deleteBlockErrorFn);
        } else {
          deleteBlockSuccessFn();
        }
        function deleteBlockSuccessFn ( questionnaire ) {
          parentBlock.nextBlockPositionNumber -= 1;
          if ( questionnaire ) {
            vm.questionnaireTemplate = models.restangularizeElement(null, questionnaire, 'templatequestionnaires');
          } else {
            _.remove(parentBlock.template_blocks, function (childBlock) {
              return childBlock.title === block.title;
            });
          }
        }
        function deleteBlockErrorFn () {
          // TODO deal with the error
        }
      });
    }

    function reivewQuestionWeights ( ev, block ) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
      $mdDialog.show({
        controller: 'ReviewQuestionnaireQuestionWeightsDialogController as vm',
        templateUrl: 'app/questionnaires/modals/review_question_weights/review-question-weights-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        escapeToClose: false,
        fullscreen: useFullScreen,
        locals: {
          block: block
        }
      });
    }
  }
})();
