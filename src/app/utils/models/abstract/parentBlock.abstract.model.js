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
      updateAvailableWeight: updateAvailableWeight,
      computeAvailableWeight: computeAvailableWeight,
      setAvailableWeight: setAvailableWeight
    };

    var childBlocksKey = '';

    return Model;


    function initializeAbstract ( childBlocksProp ) {
      childBlocksKey = childBlocksProp;
      this.updateAvailableWeight();
    }

    function updateAvailableWeight () {
      var block = this;
      block.availableWeight = block.computeAvailableWeight();
    }

    function setAvailableWeight ( availableWeight ) {
      var block = this;
      block.availableWeight = availableWeight;
    }

    function computeAvailableWeight () {
      var block = this;
      var availableWeight = 100;
      _.forEach(block[childBlocksKey], function (childBlock) {
        availableWeight -= childBlock.weight;
      });

      return availableWeight;
    }

  }
})();
