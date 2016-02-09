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
      addChoice: addChoice,
      removeChoice: removeChoice,
      updateQuestionType: updateQuestionType,
      updateMaxScore: updateMaxScore,
      preProcess: preProcess,
      postProcess: postProcess,
      recomputeChoiceWeights: recomputeChoiceWeights
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

    function addChoice () {
      this.template_question_choices.push({});
      this.recomputeChoiceWeights();
    }

    function removeChoice ( index ) {
      this.template_question_choices.splice(index, 1);

      this.updateMaxScore();
    }

    function updateQuestionType ( type ) {
      var question = this;

      if ( angular.isDefined(type) ) {
        question.type = type;
      }

      question.isChoiceQuestion = question.type === 's' || question.type === 'm';
      question.isTextQuestion = question.type === 't';
      question.isDateQuestion = question.type === 'd';

      question.updateMaxScore();
    }

    function postProcess () {
      var question = this;
      postProcessManager[question.type](question);
    }

    function postProcessSingleChoiceQuestion ( question ) {
      _.forEach(question.template_question_choices, function (choice) {
        choice.weight = parseFloat(choice.weight.toFixed(2));
      });
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

    function recomputeChoiceWeights () {
      var question = this;
      var numberOfChoices = question.template_question_choices.length;

      _.forEach(question.template_question_choices, function (choice) {
        choice.weight = 1 / numberOfChoices;
      });
    }

    function updateMaxScore () {
      var question = this;
      question.max_score = 0;

      if ( question.type === 's' ) {
        question.max_score = _.max(question.template_question_choices, 'score').score || 0;
      } else if ( question.type === 'm' ) {
        _.forEach(question.template_question_choices, function (choice) {
          question.max_score += (choice.score > 0 ? choice.score : 0);
        });
      }
    }

  }
})();
