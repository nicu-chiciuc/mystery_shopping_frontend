(function() {
  'use strict';

  angular
    .module('spark')
    .controller('QuestionnaireTemplateCreateController', QuestionnaireTemplateCreateController);

  /** @ngInject */
  function QuestionnaireTemplateCreateController ( $log, $state, models, user, questionnaireTemplate ) {
    $log.debug('Entered QuestionnaireTemplateCreateController');
    $log.debug(user);
    var vm = this;

    vm.questionnaireTemplate = questionnaireTemplate;
    vm.questionnaireTemplate.template_blocks = vm.questionnaireTemplate.template_blocks || [];

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


    activate();

    function activate() {
    }

    function saveQuestionnaireTemplate ( questionnaireTemplate, isValid, nextState ) {
      questionnaireTemplate.tenant = user.tenantId;
    }
  }
})();
