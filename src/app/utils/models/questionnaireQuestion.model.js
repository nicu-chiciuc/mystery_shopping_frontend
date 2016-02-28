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
      preProcess: preProcess,
      postProcess: postProcess,
      updateQuestionType: updateQuestionType
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

    return Model;


    function initialize ( questionnaireStatus ) {
      var question = this;

      question.answer_choices = question.answer_choices || [];
      question.answeringDisabled = questionnaireStatus !== 'planned' && questionnaireStatus !== 'draft';
      question.question_choices = _.sortBy(question.question_choices, 'order');

      if ( question.id ) {
        question.question_id = question.id;
      }

      question.updateQuestionType();
      question.preProcess();
    }

    function postProcess () {
      var question = this;
      postProcessManager[question.type](question);
    }

    function postProcessSingleChoiceQuestion ( question ) {
    }

    function postProcessMultipleChoiceQuestion ( question ) {
      postProcessSingleChoiceQuestion(question);
    }

    function postProcessTextQuestion ( question ) {

    }

    function postProcessDateQuestion ( question ) {

    }

    function preProcess () {
      var question = this;
      preProcessManager[question.type](question);
    }

    function preProcessSingleChoiceQuestion ( question ) {
    }

    function preProcessMultipleChoiceQuestion ( question ) {
    }

    function preProcessTextQuestion ( question ) {
    }

    function preProcessDateQuestion ( question ) {
      question.answer = new Date(question.answer);
    }

    function updateQuestionType ( type ) {
      var question = this;

      if ( angular.isDefined(type) ) {
        question.type = type;
      }

      question.isSingleChoiceQuestion = question.type === 's';
      question.isMultipleChoiceQuestion = question.type === 'm';
      question.isChoiceQuestion = question.type === 's' || question.type === 'm';
      question.isTextQuestion = question.type === 't';
      question.isDateQuestion = question.type === 'd';
    }


  }
})();
