/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('QuestionnaireModel', QuestionnaireModel);

  /** @ngInject */
  function QuestionnaireModel ( AbstractQuestionnaireModel, AbstractParentBlockModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var questionnaire = this;

      questionnaire.score = parseFloat(questionnaire.score);

      // Child blocks property name
      questionnaire.childBlocksProp = 'blocks';

      // Child questions property name
      questionnaire.childQuestionsProp = 'questions';

      // Question choices property name
      questionnaire.questionChoicesProp = 'question_choices';

      angular.extend(questionnaire, AbstractQuestionnaireModel);
      questionnaire.initializeAbstractQuestionnaire();

      angular.extend(questionnaire, AbstractParentBlockModel);
      questionnaire.initializeAbstract(questionnaire.childBlocksProp);
    }
  }
})();
