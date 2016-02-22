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
      updateQuestionWeights: updateQuestionWeights
    };

    return Model;


    function initialize ( childBlocksProp, childQuestionsProp ) {
      var block = this;

      angular.extend(block, AbstractQuestionnaireBlockModel);
      block.initializeAbstract(childBlocksProp, childQuestionsProp);

      _.forEach(block[childBlocksProp], function (childBlock) {
        angular.extend(childBlock, Model);
        childBlock.initialize();
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


  }
})();
