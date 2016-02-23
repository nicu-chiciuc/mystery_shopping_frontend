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
      prepareForSave: prepareForSave
    };

    return Model;


    function initialize ( childBlocksProp, childQuestionsProp, parentBlock ) {
      var block = this;

      if ( parentBlock ) {
        block.parentBlock = parentBlock;
      }

      angular.extend(block, AbstractQuestionnaireBlockModel);
      block.initializeAbstractBlock(childBlocksProp, childQuestionsProp);

      _.forEach(block[childBlocksProp], function (childBlock) {
        angular.extend(childBlock, Model);
        childBlock.initialize(childBlocksProp, childQuestionsProp, parentBlock);
      });

      _.forEach(block[childQuestionsProp], function ( question ) {
        angular.extend(question, TemplateQuestionnaireQuestionModel);
        question.initialize();
      });
    }

    function addQuestion ( question ) {
      var block = this;

      block.template_questions.push(question);
      block.updateQuestionWeights();
    }

    function updateQuestionWeights () {
      var block = this;
      var weightAverage = parseFloat((block.weight / block.template_questions.length).toFixed(2));

      _.forEach(block.template_questions, function (question) {
        question.weight = weightAverage;
      });
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
    }

  }
})();
