/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('AbstractParentBlockModel', AbstractParentBlockModel);

  /** @ngInject */
  function AbstractParentBlockModel ( msUtils ) {
    var Model = {
      parentBlockIsQuestionnaire: false,
      initializeAbstract: initializeAbstract,
      addChildBlock: addChildBlock,
      setWeight: setWeight,
      updateAvailableWeight: updateAvailableWeight,
      computeAvailableWeight: computeAvailableWeight,
      setAvailableWeight: setAvailableWeight,
      removeExceededWeightsTooltips: removeExceededWeightsTooltips,
      setInitialWeights: setInitialWeights,
      resetInitialWeights: resetInitialWeights,
      updateChildWeights: updateChildWeights,
      processBeforeSave: processBeforeSave
    };

    var childBlocksKey = '';
    var questionsPropKey = '';

    return Model;


    function initializeAbstract ( childBlocksProp, questionsProp, isQuestionnaire ) {
      childBlocksKey = childBlocksProp;
      questionsPropKey = questionsProp;
      this.parentBlockIsQuestionnaire = isQuestionnaire ? true : false;
      this.updateAvailableWeight();
    }

    function addChildBlock ( childBlock ) {
      var block = this;

      // Because in the backend the tree representation of blocks is stored
      // using MPTT method and creation of a block at a specific position
      // requires some additional properties, set these additional properties
      // here. The properties are the action to be made, the target block
      // where to store the new block and the position. For more details
      // check django-mptt documentation.
      childBlock.block_action = 'create';
      childBlock.target_block = block.id;
      childBlock.position = 'last';

      // Parent block needed in backend for mptt tree representation. Set as
      // null in case it is the top most block (the first layer in the serializer)
      childBlock.parent_block = block.parentBlockIsQuestionnaire ? null : block.id;

      // Parent block needed in frontend for computation of available weight.
      childBlock.parentBlock = block;

      block[childBlocksKey].push(childBlock);
    }

    function setWeight ( weight ) {
      var block = this;
      block.previousWeight = block.weight;
      block.weight = weight;

      block.previousWeightToDisplay = block.weightToDisplay;
      block.weightToDisplay = msUtils.number.strip(weight / 100 * block.parentBlock.weightToDisplay);

      // Because in the backend the tree representation of blocks is stored
      // using MPTT method and because the change in one block affects its child
      // and sibling blocks, set some additional properties that will be used
      // in the process of updating blocks in the backend.
      block.block_action = 'update';
      block.block_id = block.id;

      block.updateChildWeights();
    }

    function updateAvailableWeight () {
      var block = this;
      block.setAvailableWeight(block.computeAvailableWeight());
    }

    function setAvailableWeight ( availableWeight ) {
      var block = this;
      block.availableWeight = availableWeight;
    }

    function computeAvailableWeight () {
      var block = this;

      // In case this is the questionnaire `parentBlock`, set its weight
      // as the weight to display (which by default is 100).
      block.weightToDisplay = block.parentBlockIsQuestionnaire
        ? block.weight
        : block.parentBlock.weightToDisplay * block.weight / 100;

      // Take the block's weight and set it as available weight for child blocks.
      var availableWeight = block.weightToDisplay;

      _.forEach(block[childBlocksKey], function (childBlock) {
        availableWeight -= childBlock.newWeightToDisplay ? childBlock.newWeightToDisplay : (childBlock.weightToDisplay ? childBlock.weightToDisplay : 0);
      });

      return availableWeight;
    }

    function removeExceededWeightsTooltips () {
      var block = this;

      _.forEach(block[childBlocksKey], function (childBlock) {
        childBlock.showTooltip = false;
      });
    }

    function setInitialWeights () {
      var block = this;

      _.forEach(block[childBlocksKey], function (childBlock) {
        childBlock.initialWeight = childBlock.weight;
        //childBlock.initialWeightToDisplay = childBlock.weightToDisplay;
      });
    }

    function resetInitialWeights () {
      var block = this;

      _.forEach(block[childBlocksKey], function (childBlock) {
        childBlock.setWeight(childBlock.initialWeight);
      });
    }

    function updateChildWeights () {
      var block = this;

      _.forEach(block[childBlocksKey], function (childBlock) {
        childBlock.setWeight(childBlock.weight);
      });
    }

    function processBeforeSave () {
      var block = this;

      _.forEach(block[questionsPropKey], function (question) {
        question.postProcess();
      })
    }

  }
})();
