(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TemplateQuestionnaireModel', TemplateQuestionnaireModel);

  /** @ngInject */
  function TemplateQuestionnaireModel ( AbstractQuestionnaireModel, AbstractParentBlockModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var questionnaire = this;

      // Child blocks property name
      questionnaire.childBlocksProp = 'template_blocks';

      // Child questions property name
      questionnaire.childQuestionsProp = 'template_questions';

      // Question choices property name
      questionnaire.questionChoicesProp = 'template_question_choices';

      angular.extend(questionnaire, AbstractParentBlockModel);
      questionnaire.initializeAbstract(questionnaire.childBlocksProp, questionnaire.childQuestionsProp, true);

      angular.extend(questionnaire, AbstractQuestionnaireModel);
      questionnaire.initializeAbstractQuestionnaire();
    }
  }
})();
