/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TemplateQuestionnaireBlockModel', TemplateQuestionnaireBlockModel);

  /** @ngInject */
  function TemplateQuestionnaireBlockModel ( TemplateQuestionnaireQuestionModel, AbstractQuestionnaireBlockModel ) {
    var Model = {
      initialize: initialize,
      addQuestion: addQuestion,
      updateQuestionWeights: updateQuestionWeights,
      gatherUpdateDataOfSiblings: gatherUpdateDataOfSiblings,
      prepareForSave: prepareForSave,
      setParentBlock: setParentBlock,
      updateChildQuestionsParentBlock: updateChildQuestionsParentBlock,
      removeQuestionExceededWeightsTooltips: removeQuestionExceededWeightsTooltips
    };

    return Model;


    function initialize ( childBlocksProp, childQuestionsProp, parentBlock ) {
      var block = this;

      if ( parentBlock ) {
        block.parentBlock = parentBlock;
      }

      // This holds the order number of the child questions.
      block.nextQuestionPositionNumber = block.template_questions.length + 1;

      angular.extend(block, AbstractQuestionnaireBlockModel);
      block.initializeAbstractBlock(childBlocksProp, childQuestionsProp);

      _.forEach(block[childBlocksProp], function (childBlock) {
        angular.extend(childBlock, Model);
        childBlock.initialize(childBlocksProp, childQuestionsProp, block);
      });

      _.forEach(block[childQuestionsProp], function ( question ) {
        angular.extend(question, TemplateQuestionnaireQuestionModel);
        question.initialize(block);
      });
    }

    function addQuestion ( question ) {
      var block = this;

      question.order = block.nextQuestionPositionNumber;
      block.nextQuestionPositionNumber += 1;

      block.template_questions.push(question);
      block.updateQuestionWeights();
    }

    function updateQuestionWeights () {
      var block = this;
      //var weightAverage = parseFloat((block.weight / block.template_questions.length).toFixed(2));

      //_.forEach(block.template_questions, function (question) {
      //  question.weight = weightAverage;
      //});
    }

    function gatherUpdateDataOfSiblings () {
      var block = this;
      var siblings = _.filter(block.parentBlock.template_blocks, function (templateBlock) {
        return templateBlock.id !== block.id && templateBlock.block_action === 'update';
      });

      block.siblings = [];
      _.forEach(siblings, function (siblingBlock) {
        block.siblings.push({
          block_id: siblingBlock.id,
          block_changes: {
            weight: siblingBlock.weight
          }
        });
      });
    }

    function prepareForSave () {
      var block = this;

      block.gatherUpdateDataOfSiblings();
      block.parentBlock = null;
      _.forEach(block.template_questions, function (question) {
        question.parentBlock = null;
      });
    }

    function removeQuestionExceededWeightsTooltips () {
      var block = this;

      _.forEach(block.template_questions, function (question) {
        question.showTooltip = false;
      });
    }

    function setParentBlock ( parentBlock ) {
      var block = this;
      block.parentBlock = parentBlock;
    }

    function updateChildQuestionsParentBlock () {
      var block = this;

      _.forEach(block.template_questions, function (question) {
        question.parentBlock = block;
      });
    }

  }
})();
