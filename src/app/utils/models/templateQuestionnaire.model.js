/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TemplateQuestionnaireModel', TemplateQuestionnaireModel);

  /** @ngInject */
  function TemplateQuestionnaireModel ( TemplateQuestionnaireBlockModel, AbstractParentBlockModel ) {
    var Model = {
      initialize: initialize,
      postProcess: postProcess
    };

    return Model;


    function initialize () {
      var questionnaire = this;

      // Set weight of questionnaire to 100 so that child blocks can compute
      // available weight based on this weight.
      questionnaire.weight = 100;

      angular.extend(questionnaire, AbstractParentBlockModel);
      questionnaire.initializeAbstract('template_blocks');

      _.forEach(questionnaire.template_blocks, function (block) {
        angular.extend(block, TemplateQuestionnaireBlockModel);
        block.initialize();
      });
    }

    function postProcess () {
      var questionnaire = this;
      var processedQuestionnaire = _.cloneDeep(questionnaire);

      processedQuestionnaire.template_blocks = flattenQuestionnaireBlocks(questionnaire.template_blocks);
      return processedQuestionnaire;
    }

    function flattenQuestionnaireBlocks ( blocks ) {
      var flattenedBlocks = [];

      _.forEach(blocks, function ( block ) {
        flattenQuestionnaireBlock(null, block, 0, flattenedBlocks);
      });

      return flattenedBlocks;
    }

    function flattenQuestionnaireBlock ( parentBlock, block, level, flattenedBlocksList ) {
      block.level = level;

      // If parent block doesn't exist, this means this is a top level block,
      // thus set lft = 1.
      // If parent block doesn't have latestPosition key, this means that it's
      // the first child block of parent bloc, so set lft to parents next value.
      // If parent block has latestPosition, this means that the latest child block
      // has this position on the rght, which means that the lft value should be ++'d.
      block.lft = parentBlock
        ? (parentBlock.latestPosition
          ? parentBlock.latestPosition + 1
          : parentBlock.lft + 1)
        : 1;

      // Dive recursively into child blocks.
      _.forEach(block.template_blocks, function ( childBlock ) {
        flattenQuestionnaireBlock(block, childBlock, level + 1, flattenedBlocksList);
      });

      // After dealing with child blocks, set rght key.
      // In case there is no latestPosition key, this means the block is a leaft, thus set lft++ as rght value.
      // In case there is latestPosition key, set the next value as rght value.
      block.rght = block.latestPosition ? block.latestPosition + 1 : block.lft + 1;

      // Update parentBlock with latest position of the current block after setting
      // the rght value so it can use it for next blocks in the tree.
      if ( parentBlock ) parentBlock.latestPosition = block.rght;

      flattenedBlocksList.push(block);

      delete block.template_blocks;
    }
  }
})();
