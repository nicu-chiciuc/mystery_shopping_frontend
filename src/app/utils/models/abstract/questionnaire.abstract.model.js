/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('AbstractQuestionnaireModel', AbstractQuestionnaireModel);

  /** @ngInject */
  function AbstractQuestionnaireModel ( TemplateQuestionnaireBlockModel ) {
    var Model = {
      initializeAbstractQuestionnaire: initializeAbstractQuestionnaire,
      convertFlatToNestedStructure: convertFlatToNestedStructure,
      postProcess: postProcess
    };

    return Model;


    function initializeAbstractQuestionnaire () {
      var questionnaire = this;

      // Set weight of questionnaire to 100 so that child blocks can compute
      // available weight based on this weight.
      questionnaire.weight = 100;

      questionnaire.convertFlatToNestedStructure();

      _.forEach(questionnaire[questionnaire.childBlocksProp], function (block) {
        angular.extend(block, TemplateQuestionnaireBlockModel);
        block.initialize();
      });
    }

    function convertFlatToNestedStructure () {
      var questionnaire = this;
      var parentBlocksPerTreeIdPerLevel = {};

      _.forEach(questionnaire[questionnaire.childBlocksProp], function ( block ) {

        block[questionnaire.childBlocksProp] = block[questionnaire.childBlocksProp] || [];

        if ( angular.isUndefined(parentBlocksPerTreeIdPerLevel[block.tree_id]) ) {
          parentBlocksPerTreeIdPerLevel[block.tree_id] = {};
        }

        if ( block.parent_block ) {
          parentBlocksPerTreeIdPerLevel[block.tree_id][block.level - 1][questionnaire.childBlocksProp].push(block);
        }

        parentBlocksPerTreeIdPerLevel[block.tree_id][block.level] = block;
      });

      _.remove(questionnaire[questionnaire.childBlocksProp], function (block) {
        return block.parent_block !== null;
      });
    }

    function postProcess () {
      var questionnaire = this;
      //var processedQuestionnaire = _.cloneDeep(questionnaire);

      questionnaire[questionnaire.childBlocksProp] = convertNestedToFlatStructure(questionnaire, questionnaire[questionnaire.childBlocksProp]);

      return questionnaire;
    }

    function convertNestedToFlatStructure ( questionnaire, blocks ) {
      var flattenedBlocks = [];

      _.forEach(blocks, function ( block ) {
        flattenQuestionnaireBlock(null, block, 0, questionnaire.childBlocksProp, flattenedBlocks);
      });

      return flattenedBlocks;
    }

    function flattenQuestionnaireBlock ( parentBlock, block, level, childBlocksProp, flattenedBlocksList ) {
      block.level = level;

      flattenedBlocksList.push(block);

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
      _.forEach(block[childBlocksProp], function ( childBlock ) {
        flattenQuestionnaireBlock(block, childBlock, level + 1, childBlocksProp, flattenedBlocksList);
      });

      // After dealing with child blocks, set rght key.
      // In case there is no latestPosition key, this means the block is a leaft, thus set lft++ as rght value.
      // In case there is latestPosition key, set the next value as rght value.
      block.rght = block.latestPosition ? block.latestPosition + 1 : block.lft + 1;

      // Update parentBlock with latest position of the current block after setting
      // the rght value so it can use it for next blocks in the tree.
      if ( parentBlock ) parentBlock.latestPosition = block.rght;

      block.processBeforeSave();

      delete block[childBlocksProp];
    }

  }
})();
