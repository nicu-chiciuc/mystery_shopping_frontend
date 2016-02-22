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


    function initialize () {
      var question = this;

      question.answer_choices = question.answer_choices || [];

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
    }

    function updateQuestionType ( type ) {
      var question = this;

      if ( angular.isDefined(type) ) {
        question.type = type;
      }

      question.isChoiceQuestion = question.type === 's' || question.type === 'm';
      question.isTextQuestion = question.type === 't';
      question.isDateQuestion = question.type === 'd';
    }


  }
})();
