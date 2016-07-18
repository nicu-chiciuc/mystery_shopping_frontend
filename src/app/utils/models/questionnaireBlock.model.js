/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('QuestionnaireBlockModel', QuestionnaireBlockModel);

  /** @ngInject */
  function QuestionnaireBlockModel ( QuestionnaireQuestionModel, AbstractQuestionnaireBlockModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize ( childBlocksProp, childQuestionsProp, questionnaire ) {
      var block = this;

      angular.extend(block, AbstractQuestionnaireBlockModel);
      block.initializeAbstractBlock(childBlocksProp, childQuestionsProp);

      _.forEach(block[childBlocksProp], function (childBlock) {
        angular.extend(childBlock, Model);
        childBlock.initialize(childBlocksProp, childQuestionsProp, questionnaire);
      });

      _.forEach(block[childQuestionsProp], function ( question ) {
        angular.extend(question, QuestionnaireQuestionModel);
        question.initialize(questionnaire.status);
      });
    }
  }
})();
