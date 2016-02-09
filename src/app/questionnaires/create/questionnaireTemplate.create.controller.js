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
    vm.showBlockTitleDialog = showBlockTitleDialog;
    vm.showAddQuestionDialog = showAddQuestionDialog;

    vm.saveQuestionnaireTemplate = saveQuestionnaireTemplate;

    vm.questionnaireTemplate.template_blocks = [
      {

        "id": 2,
        "template_questions": [],
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
        "template_questions": [
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
          "template_questions": [],
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
              "template_questions": [
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
              "weight": 20,
              "parent_block": 2,
              "template_blocks": []
            },
            {
              "id": 4,
              "template_questions": [],
              "questionnaire_template": 2,
              "lft": 4,
              "rght": 11,
              "tree_id": 1,
              "level": 1,
              "title": "Chuck",
              "weight": 25,
              "parent_block": 2,
              template_blocks: [
                {
                  "id": 5,
                  "template_questions": [],
                  "questionnaire_template": 2,
                  "lft": 5,
                  "rght": 6,
                  "tree_id": 1,
                  "level": 2,
                  "title": "Donna",
                  "weight": 5,
                  "parent_block": 4,
                  "template_blocks": []
                },
                {
                  "id": 6,
                  "template_questions": [],
                  "questionnaire_template": 2,
                  "lft": 7,
                  "rght": 8,
                  "tree_id": 1,
                  "level": 2,
                  "title": "Eddie",
                  "weight": 5,
                  "parent_block": 4,
                  "template_blocks": []
                },
                {
                  "id": 7,
                  "template_questions": [],
                  "questionnaire_template": 2,
                  "lft": 9,
                  "rght": 10,
                  "tree_id": 1,
                  "level": 2,
                  "title": "Fred",
                  "weight": 5,
                  "parent_block": 4,
                  "template_blocks": []
                }
              ]
            }
          ]
        },
        {
          "id": 8,
          "template_questions": [],
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

    var json = {
      availableWeight: 0,
      childBlocksProp: "template_blocks",
      childQuestionsProp: "template_questions",
      description: "Description here",
      questionChoicesProp: "template_question_choices",
      template_blocks: [
        {
          level: 1,
          lft: 2,
          newWeight: 90,
          previousWeight: 9,
          rght: 3,
          showTooltip: false,
          template_questions: [
            {
              answer_choices: [],
              isChoiceQuestion: true,
              isDateQuestion: false,
              isTextQuestion: false,
              max_score: 5,
              question_body: "Like?",
              template_question_choices: [
                {
                  score: 5,
                  text: "Da",
                  weight: 0.5
                },
                {
                  weight: 0.5,
                  text: "Nu",
                  score: 0
                }],
              type: "s"
            }
          ],
          title: "1.1",
          weight: 0.9
        },
        {
          availableWeight: 0,
          initialWeight: 90,
          latestPosition: 3,
          level: 0,
          lft: 1,
          newWeight: 90,
          previousWeight: 9,
          rght: 4,
          showTooltip: false,
          template_questions: [],
          title: "1",
          weight: 0.9
        },
        {
          level: 0,
          lft: 1,
          newWeight: 10,
          previousWeight: 1,
          rght: 2,
          showTooltip: false,
          template_questions: [
            {
              answer_choices: [],
              isChoiceQuestion: false,
              isDateQuestion: false,
              isTextQuestion: true,
              max_score: 0,
              question_body: "Compunere",
              template_question_choices: [],
              type: "t"
            }
          ],
          title: "2",
          weight: 0.1
        }
      ],
      tenant: 1,
      title: "Title",
      weight: 100
    };

    $scope.questionnaire = {
      title: 'Title',
      description: 'Description here',
      template_blocks: []
    };

    //$scope.questionnaire = vm.nestedQuestionnaireTemplate;
    //angular.extend($scope.questionnaire, models.manager.TemplateQuestionnaireModel);
    //$scope.questionnaire.initialize();
    $scope.questionnaire = models.restangularizeElement(null, $scope.questionnaire, 'templatequestionnaires');

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
      $scope.questionnaire = _.cloneDeep(questionnaireTemplate);
      questionnaireTemplate.postProcess();
      if ( !questionnaireTemplate.id ) {
        questionnaireTemplate.tenant = user.tenantId;
        //questionnaireTemplate = models.restangularizeElement(null, questionnaireTemplate, 'templatequestionnaires');
        questionnaireTemplate.post().then(saveQuestionnaireTemplateSuccessFn, saveQuestionnaireTemplateErrorFn);
      } else {
        questionnaireTemplate.put().then(saveQuestionnaireTemplateSuccessFn, saveQuestionnaireTemplateErrorFn);
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
      block.initialize();

      parentBlock.template_blocks.push(block);
      showBlockTitleDialog(ev, block, parentBlock, true);
    }

    function showBlockTitleDialog ( ev, block, parentBlock, isNewBlock ) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
      $mdDialog.show({
        controller: 'EditBlockDialogController as vm',
        templateUrl: 'app/questionnaires/modals/edit_block/edit-block-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        fullscreen: useFullScreen,
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
          block.addQuestion(question);
        });
    }
  }
})();
