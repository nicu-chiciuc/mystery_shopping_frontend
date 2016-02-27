/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TemplateQuestionnaireQuestionModel', TemplateQuestionnaireQuestionModel);

  /** @ngInject */
  function TemplateQuestionnaireQuestionModel ( msUtils ) {
    var Model = {
      initialize: initialize,
      addChoice: addChoice,
      removeChoice: removeChoice,
      updateQuestionType: updateQuestionType,
      updateMaxScore: updateMaxScore,
      setParentBlock: setParentBlock,
      preProcess: preProcess,
      postProcess: postProcess,
      setWeight: setWeight,
      setInitialWeight: setInitialWeight,
      resetInitialWeight: resetInitialWeight,
      cleanUpdateSiblingsIdentifiers: cleanUpdateSiblingsIdentifiers,
      gatherUpdateDataOfSiblings: gatherUpdateDataOfSiblings,
      recomputeChoiceWeights: recomputeChoiceWeights,
      backupInitialQuestion: backupInitialQuestion,
      restoreInitialQuestion: restoreInitialQuestion
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


    function initialize ( parentBlock ) {
      var question = this;

      question.parentBlock = parentBlock;

      question.answer_choices = question.answer_choices || [];
      question.weight = parseFloat(question.weight);
      question.weightToDisplay = question.parentBlock.weightToDisplay * question.weight / 100;

      question.updateQuestionType();
      question.preProcess();
    }

    function setWeight ( weight ) {
      var question = this;
      question.previousWeight = question.weight;
      question.weight = weight;

      question.previousWeightToDisplay = question.weightToDisplay;
      question.weightToDisplay = msUtils.number.strip(weight / 100 * question.parentBlock.weightToDisplay);

      question.question_action = 'update';
    }

    function setInitialWeight () {
      var question = this;
      question.initialWeight = question.weight;
    }

    function resetInitialWeight () {
      var question = this;
      question.setWeight(question.initialWeight);
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

      question.isSingleChoiceQuestion = question.type === 's';
      question.isMultipleChoiceQuestion = question.type === 'm';
      question.isChoiceQuestion = question.type === 's' || question.type === 'm';
      question.isTextQuestion = question.type === 't';
      question.isDateQuestion = question.type === 'd';

      if ( question.isTextQuestion || question.isDateQuestion ) {
        question.weightIsEditable = false;
        if ( question.template_question_choices ) {
          question.temporary_question_choices = question.template_question_choices;
          question.template_question_choices = undefined;
        }
      } else {
        question.weightIsEditable = true;
        if ( question.temporary_question_choices ) {
          question.template_question_choices = question.temporary_question_choices;
        }
      }

      question.updateMaxScore();
    }

    function setParentBlock ( block ) {
      var question = this;
      question.parentBlock = block;
    }

    function gatherUpdateDataOfSiblings () {
      var question = this;
      var siblings = _.filter(question.parentBlock.template_questions, function (templateQuestion) {
        return templateQuestion.id !== question.id && templateQuestion.question_action === 'update';
      });

      question.siblings = [];
      _.forEach(siblings, function (siblingQuestion) {
        question.siblings.push({
          question_id: siblingQuestion.id,
          question_changes: {
            weight: siblingQuestion.weight
          }
        });
      });
    }

    function cleanUpdateSiblingsIdentifiers () {
      var question = this;
      _.forEach(question.parentBlock.template_questions, function (blockQuestion) {
        blockQuestion.question_action = undefined;
      });
      question.siblings.length = 0;
    }

    function postProcess () {
      var question = this;
      question.gatherUpdateDataOfSiblings();
      question.parentBlock = null;
      question.weight = parseFloat(question.weight.toFixed(2));
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
      if ( angular.isDefined(question.template_question_choices) ) {
        delete question.template_question_choices;
      }
    }

    function postProcessDateQuestion ( question ) {
      if ( angular.isDefined(question.template_question_choices) ) {
        delete question.template_question_choices;
      }
    }

    function preProcess () {
      var question = this;

      question.weightToDisplay = question.parentBlock.weightToDisplay * question.weight / 100;
      preProcessManager[question.type](question);
    }

    function preProcessSingleChoiceQuestion ( question ) {
      _.forEach(question.template_question_choices, function (choice) {
        choice.score = parseFloat(choice.score);
        choice.weight = parseFloat(choice.weight);
      });
      question.weightIsEditable = true;
    }

    function preProcessMultipleChoiceQuestion ( question ) {
      preProcessSingleChoiceQuestion(question);
    }

    function preProcessTextQuestion ( question ) {
      question.weightIsEditable = false;
    }

    function preProcessDateQuestion ( question ) {
      question.weightIsEditable = false;
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
        question.max_score = _.map(_.maxBy(question.template_question_choices, 'score'), 'score')[0] || 0;
      } else if ( question.type === 'm' ) {
        _.forEach(question.template_question_choices, function (choice) {
          question.max_score += (choice.score > 0 ? choice.score : 0);
        });
      }
    }

    function backupInitialQuestion () {
      var question = this;
      question.initial_type = question.type;
      question.initial_question_choices = _.cloneDeep(question.template_question_choices);
      question.initial_weight = question.weight;
      question.initial_max_score = question.max_score;
      question.initial_question_body = question.question_body;
    }

    function restoreInitialQuestion () {
      var question = this;
      question.type = question.initial_type;
      question.template_question_choices = question.initial_question_choices;
      question.weight = question.initial_weight;
      question.max_score = question.initial_max_score;
      question.question_body = question.initial_question_body;
      question.updateQuestionType(question.type);
    }

  }
})();
