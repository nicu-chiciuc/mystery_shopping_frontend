/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('AbstractQuestionnaireBlockModel', AbstractQuestionnaireBlockModel);

  /** @ngInject */
  function AbstractQuestionnaireBlockModel ( AbstractParentBlockModel ) {
    var Model = {
      initializeAbstractBlock: initializeAbstractBlock
    };

    return Model;


    function initializeAbstractBlock ( childBlocksProp, childQuestionsProp ) {
      var block = this;

      block.childBlocksProp = childBlocksProp;
      block.childQuestionsProp = childQuestionsProp;

      block.weight = parseFloat(block.weight);

      angular.extend(block, AbstractParentBlockModel);
      block.initializeAbstract(childBlocksProp, childQuestionsProp);
    }
  }
})();
