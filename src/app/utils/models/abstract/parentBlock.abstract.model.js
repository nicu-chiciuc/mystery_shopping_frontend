/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('AbstractParentBlockModel', AbstractParentBlockModel);

  /** @ngInject */
  function AbstractParentBlockModel () {
    var Model = {
      initializeAbstract: initializeAbstract,
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


    function initializeAbstract ( childBlocksProp, questionsProp ) {
      childBlocksKey = childBlocksProp;
      questionsPropKey = questionsProp;
      this.updateAvailableWeight();
    }

    function setWeight ( weight ) {
      var block = this;
      block.previousWeight = block.weight;
      block.weight = weight;

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

      // Take the block's weight and set it as available weight for child blocks.
      var availableWeight = block.weight;

      _.forEach(block[childBlocksKey], function (childBlock) {
        availableWeight -= childBlock.newWeight ? childBlock.newWeight : (childBlock.weight ? childBlock.weight : 0);
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
        childBlock.setWeight(childBlock.weight * block.weight / block.previousWeight);
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
