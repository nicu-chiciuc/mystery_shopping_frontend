/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TemplateQuestionnaireQuestionModel', TemplateQuestionnaireQuestionModel);

  /** @ngInject */
  function TemplateQuestionnaireQuestionModel () {
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

    var preProcessManager = {
      s: preProcessSingleChoiceQuestion,
      m: preProcessMultipleChoiceQuestion,
      t: preProcessTextQuestion,
      d: preProcessDateQuestion
    };

    var choicesDelimiter = ' || ';
    var choiceBodyWeightDelimiter = ' [::] ';

    return Model;


    function initialize () {
      var question = this;

      question.typeIdentifier = question.type[0];
      question.isChoiceQuestion = question.typeIdentifier === 's' || question.typeIdentifier === 'm';
      question.isTextQuestion = question.typeIdentifier === 't';
      question.isDateQuestion = question.typeIdentifier === 'd';

      preProcessManager[question.typeIdentifier](question);
    }

    function postProcess () {
      var question = this;
      postProcessManager[question.typeIdentifier](question);
    }

    function postProcessSingleChoiceQuestion ( question ) {
      question.type = question.typeIdentifier;

      question.type += question.choices.map(function (choice) {
        return [choice.body, choiceBodyWeightDelimiter, choice.weight].join('');
      }).join(choicesDelimiter);
    }

    function postProcessMultipleChoiceQuestion ( question ) {
      postProcessSingleChoiceQuestion(question);
    }

    function postProcessTextQuestion ( question ) {

    }

    function postProcessDateQuestion ( question ) {

    }

    function preProcessSingleChoiceQuestion ( question ) {
      question.choices = question.type.substring(1).split(choicesDelimiter);
      question.choices = question.choices.map(function (choice) {
        var bodyWeightPair = choice.split(choiceBodyWeightDelimiter);
        return {
          body: bodyWeightPair[0],
          weight: bodyWeightPair[1]
        };
      });
    }

    function preProcessMultipleChoiceQuestion ( question ) {
      preProcessSingleChoiceQuestion(question);
    }

    function preProcessTextQuestion ( question ) {
    }

    function preProcessDateQuestion ( question ) {
    }

  }
})();
