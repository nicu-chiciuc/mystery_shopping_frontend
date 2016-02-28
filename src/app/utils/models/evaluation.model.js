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

      evaluation.canBeSubmitted = evaluation.status === 'planned' || evaluation.status === 'draft';

      if ( evaluation.questionnaire ) {
        evaluation.questionnaire_repr = evaluation.questionnaire;
        angular.extend(evaluation.questionnaire_repr, QuestionnaireModel);
        evaluation.questionnaire_repr.initialize(evaluation.status);
      }
    }

  }
})();
