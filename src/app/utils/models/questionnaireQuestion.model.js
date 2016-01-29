/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('QuestionnaireQuestionModel', QuestionnaireQuestionModel);

  /** @ngInject */
  function QuestionnaireQuestionModel () {
    var Model = {
      initialize: initialize,
      postProcess: postProcess
    };

    var postProcessManager = {
      s: postProcessSingleChoiceQuestion,
      m: postProcessMultipleChoiceQuestion,
      t: postProcessTextQuestion,
      d: postProcessDateQuestion
    };

    var choicesDelimiter = ' || ';
    var choiceBodyWeightDelimiter = ' :: ';

    return Model;


    function initialize () {
      var question = this;

      question.typeIdentifier = question.type[0];
    }

    function postProcess () {
      var question = this;
      postProcessManager[question.typeIdentifier](question);
    }

    function postProcessSingleChoiceQuestion ( question ) {
      question.type = question.typeIdentifier;
      console.log(question);

      question.type += question.choices.map(function (choice) {
        return [choice.body, choiceBodyWeightDelimiter, choice.weight].join('');
      }).join(choicesDelimiter);

      console.log(question.type);
    }

    function postProcessMultipleChoiceQuestion ( question ) {

    }

    function postProcessTextQuestion ( question ) {

    }

    function postProcessDateQuestion ( question ) {

    }


  }
})();
