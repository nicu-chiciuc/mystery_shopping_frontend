/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('AbstractQuestionnaireModel', AbstractQuestionnaireModel);

  /** @ngInject */
  function AbstractQuestionnaireModel () {
    var Model = {
      initializeAbstract: initializeAbstract,
      convertFlatToNestedStructure: convertFlatToNestedStructure
    };

    return Model;


    function initializeAbstract () {
      var questionnaire = this;

      questionnaire.convertFlatToNestedStructure();
    }

    function convertFlatToNestedStructure () {
      var questionnaire = this;
    }

  }
})();
