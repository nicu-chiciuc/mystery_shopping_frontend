/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TemplateQuestionnaireBlockModel', TemplateQuestionnaireBlockModel);

  /** @ngInject */
  function TemplateQuestionnaireBlockModel ( TemplateQuestionnaireQuestionModel, AbstractParentBlockModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var block = this;

      angular.extend(block, AbstractParentBlockModel);
      block.initializeAbstract('template_blocks');

      _.forEach(block.template_blocks, function (childBlock) {
        angular.extend(childBlock, Model);
        childBlock.initialize();
      });

      _.forEach(block.template_questions, function ( question ) {
        angular.extend(question, TemplateQuestionnaireQuestionModel);
        question.initialize();
      });
    }
  }
})();
