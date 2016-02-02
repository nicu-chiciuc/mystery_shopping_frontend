(function() {
  'use strict';

  angular
    .module('spark')
    .controller('QuestionnaireTemplateCreateController', QuestionnaireTemplateCreateController);

  /** @ngInject */
  function QuestionnaireTemplateCreateController ( $log, $scope, $filter, $mdMedia, $mdDialog, models, user, questionnaireTemplate, dragulaService ) {
    $log.debug('Entered QuestionnaireTemplateCreateController');
    $log.debug(user);
    var vm = this;

    vm.questionnaireTemplate = questionnaireTemplate;
    vm.questionnaireTemplate.template_blocks = vm.questionnaireTemplate.template_blocks || [];

    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    vm.addBlock = addBlock;
    vm.showEditBlockTitleDialog = showEditBlockTitleDialog;
    vm.showAddQuestionDialog = showAddQuestionDialog;

    vm.saveQuestionnaireTemplate = saveQuestionnaireTemplate;

    vm.questionnaireTemplate.template_blocks = [
      {

        "id": 2,
        "template_block_questions": [],
        "questionnaire_template": 2,
        "lft": 1,
        "rght": 12,
        "tree_id": 1,
        "level": 0,
        "title": "Albert",
        "weight": "0.9000",
        "parent_block": null
      },
      {
        "id": 3,
        "template_block_questions": [
          {
            "id": 1,
            "questionnaire_template": 2,
            "template_block": 3,
            "question_body": "Question#1",
            "type": "sYes [::] 5 || No [::] 0 || NA [::] -1",
            "max_score": 2
          },
          {
            "id": 2,
            "questionnaire_template": 2,
            "template_block": 3,
            "question_body": "Question#2",
            "type": "sYes [::] 5 || No [::] 0 || NA [::] -1",
            "max_score": 5
          }
        ],
        "questionnaire_template": 2,
        "lft": 2,
        "rght": 3,
        "tree_id": 1,
        "level": 1,
        "title": "Bert",
        "weight": "1.0000",
        "parent_block": 2
      }
    ];

    vm.nestedQuestionnaireTemplate = {
      "title": "Questionnaire#2",
      "description": "Shank pastrami pork chop alcatra rump, pork belly pig tongue shankle cupim. Prosciutto venison meatloaf leberkas. Beef ribs shankle cow alcatra jerky. Doner boudin swine turkey turducken. Cupim ball tip brisket doner, sausage prosciutto ham hock tongue pork chuck. Pork tail prosciutto, doner ribeye alcatra frankfurter pastrami.",
      "tenant": 1,
      "template_blocks": [
        {
          "id": 2,
          "template_block_questions": [],
          "questionnaire_template": 2,
          "lft": 1,
          "rght": 12,
          "tree_id": 1,
          "level": 0,
          "title": "Albert",
          "weight": 50,
          "parent_block": null,
          template_blocks: [
            {
              "id": 3,
              "template_block_questions": [
                {
                  "id": 1,
                  "questionnaire_template": 2,
                  "template_block": 3,
                  "question_body": "Question#1",
                  "type": "s",
                  "max_score": 2
                },
                {
                  "id": 2,
                  "questionnaire_template": 2,
                  "template_block": 3,
                  "question_body": "Question#2",
                  "type": "m",
                  "max_score": 5
                },
                {
                  "id": 3,
                  "questionnaire_template": 2,
                  "template_block": 3,
                  "question_body": "Question#3",
                  "type": "t",
                  "max_score": 5
                },
                {
                  "id": 4,
                  "questionnaire_template": 2,
                  "template_block": 3,
                  "question_body": "Question#4",
                  "type": "d",
                  "max_score": 5
                }
              ],
              "questionnaire_template": 2,
              "lft": 2,
              "rght": 3,
              "tree_id": 1,
              "level": 1,
              "title": "Bert",
              "weight": "1.0000",
              "parent_block": 2,
              "template_blocks": []
            },
            {
              "id": 4,
              "template_block_questions": [],
              "questionnaire_template": 2,
              "lft": 4,
              "rght": 11,
              "tree_id": 1,
              "level": 1,
              "title": "Chuck",
              "weight": "1.0000",
              "parent_block": 2,
              template_blocks: [
                {
                  "id": 5,
                  "template_block_questions": [],
                  "questionnaire_template": 2,
                  "lft": 5,
                  "rght": 6,
                  "tree_id": 1,
                  "level": 2,
                  "title": "Donna",
                  "weight": "1.0000",
                  "parent_block": 4,
                  "template_blocks": []
                },
                {
                  "id": 6,
                  "template_block_questions": [],
                  "questionnaire_template": 2,
                  "lft": 7,
                  "rght": 8,
                  "tree_id": 1,
                  "level": 2,
                  "title": "Eddie",
                  "weight": "1.0000",
                  "parent_block": 4,
                  "template_blocks": []
                },
                {
                  "id": 7,
                  "template_block_questions": [],
                  "questionnaire_template": 2,
                  "lft": 9,
                  "rght": 10,
                  "tree_id": 1,
                  "level": 2,
                  "title": "Fred",
                  "weight": "1.0000",
                  "parent_block": 4,
                  "template_blocks": []
                }
              ]
            }
          ]
        },
        {
          "id": 8,
          "template_block_questions": [],
          "questionnaire_template": 2,
          "lft": 1,
          "rght": 12,
          "tree_id": 1,
          "level": 0,
          "title": "Petea",
          "weight": 50,
          "parent_block": null,
          template_blocks: []
        }
      ]
    };

    $scope.questionnaire = {
      title: 'Title',
      description: 'Description here',
      template_blocks: []
    };

    $scope.questionnaire = vm.nestedQuestionnaireTemplate;
    angular.extend($scope.questionnaire, models.manager.TemplateQuestionnaireModel);
    $scope.questionnaire.initialize();

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
      questionnaireTemplate.tenant = user.tenantId;
    }

    function addBlock ( parentBlock ) {
      var block = {};
      block.template_blocks = [];
      block.template_block_questions = [];
      block.title = $filter('translate')('QUESTIONNAIRE.DIALOG.BLOCK_TITLE');

      parentBlock.template_blocks.push(block);
    }

    function showEditBlockTitleDialog ( ev, block, parentBlock ) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
      $mdDialog.show({
        controller: 'EditBlockDialogController as vm',
        templateUrl: 'app/questionnaires/modals/edit_block/edit-block-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen,
        locals: {
          block: block,
          parentBlock: parentBlock
        }
      })
        .then(function(updatedBlock) {
          block.title = updatedBlock.title;
          block.weight = updatedBlock.weight;
        });
    }

    function showAddQuestionDialog ( ev, block ) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
      $mdDialog.show({
        controller: 'AddQuestionnaireQuestionDialogController as vm',
        templateUrl: 'app/questionnaires/modals/add_questionnaire_question/add-question-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: useFullScreen
      })
        .then(function(question) {
          block.template_block_questions.push(question);
        });
    }
  }
})();
