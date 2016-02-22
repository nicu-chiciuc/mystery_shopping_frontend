(function() {
  'use strict';

  angular
    .module('spark')
    .controller('QuestionnaireTemplateCreateController', QuestionnaireTemplateCreateController);

  /** @ngInject */
  function QuestionnaireTemplateCreateController ( $log, $scope, $filter, $mdMedia, $mdDialog, models, user, questionnaireTemplate, dragulaService ) {
    $log.debug('Entered QuestionnaireTemplateCreateController');
    $log.debug(questionnaireTemplate);
    var vm = this;
    var originatorEv;

    vm.questionnaireTemplate = questionnaireTemplate;
    vm.questionnaireTemplate.template_blocks = vm.questionnaireTemplate.template_blocks || [];

    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    vm.addBlock = addBlock;
    vm.showBlockTitleDialog = showBlockTitleDialog;
    vm.showAddQuestionDialog = showAddQuestionDialog;
    vm.deleteBlock = deleteBlock;

    vm.saveQuestionnaireTemplate = saveQuestionnaireTemplate;

    vm.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };


    vm.questionnaireTemplate = models.restangularizeElement(null, vm.questionnaireTemplate, 'templatequestionnaires');

    activate();

    function activate() {
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
        vm.questionnaireTemplate = _.cloneDeep(questionnaireTemplate);
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
      //block.title = $filter('translate')('QUESTIONNAIRE.DIALOG.BLOCK_TITLE');

      angular.extend(block, models.manager.TemplateQuestionnaireBlockModel);
      block.initialize(vm.questionnaireTemplate.childBlocksProp, vm.questionnaireTemplate.childQuestionsProp);

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

    function showAddQuestionDialog ( ev, block, isNewQuestion ) {
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
          block.remove().then(deleteBlockSuccessFn, deleteBlockErrorFn);
        } else {
          deleteBlockSuccessFn();
        }
        function deleteBlockSuccessFn ( questionnaire ) {
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
  }
})();
