/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('TemplateQuestionnaireModel', TemplateQuestionnaireModel);

  /** @ngInject */
  function TemplateQuestionnaireModel ( TemplateQuestionnaireBlockModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var questionnaire = this;

      _.forEach(questionnaire.template_blocks, function (block) {
        angular.extend(block, TemplateQuestionnaireBlockModel);
        block.initialize();
      });
    }
  }
})();
