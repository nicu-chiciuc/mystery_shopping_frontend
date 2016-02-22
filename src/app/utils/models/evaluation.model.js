/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('EvaluationModel', EvaluationModel);

  /** @ngInject */
  function EvaluationModel ( AbstractEvaluationModel, QuestionnaireModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var evaluation = this;

      angular.extend(evaluation, AbstractEvaluationModel);
      evaluation.initializeAbstractEvaluation();

      if ( evaluation.questionnaire_repr ) {
        angular.extend(evaluation.questionnaire_repr, QuestionnaireModel);
        evaluation.questionnaire_repr.initialize();
      }
    }

  }
})();
