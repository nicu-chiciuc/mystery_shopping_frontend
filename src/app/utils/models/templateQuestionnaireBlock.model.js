/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TemplateQuestionnaireBlockModel', TemplateQuestionnaireBlockModel);

  /** @ngInject */
  function TemplateQuestionnaireBlockModel ( TemplateQuestionnaireQuestionModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var block = this;

      _.forEach(block.template_blocks, function (childBlock) {
        angular.extend(childBlock, Model);
        childBlock.initialize();
      });

      _.forEach(block.template_block_questions, function ( question ) {
        angular.extend(question, TemplateQuestionnaireQuestionModel);
        question.initialize();
      });
    }
  }
})();
