/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('AbstractEvaluationModel', AbstractEvaluationModel);

  /** @ngInject */
  function AbstractEvaluationModel ( contentTypes ) {
    var Model = {
      initializeAbstractEvaluation: initializeAbstract
    };

    return Model;


    function initializeAbstract () {
      var evaluation = this;

      evaluation.subjectOfEvaluation = getSubjectOfEvaluation(evaluation);
    }

    function getSubjectOfEvaluation ( evaluation ) {
      var subjectOfEvaluation = {};
      if ( evaluation.employee_id ) {
        subjectOfEvaluation = evaluation.employee_repr;
        subjectOfEvaluation.displayName = subjectOfEvaluation.fullName;
        subjectOfEvaluation.icon = 'person';
      } else if ( evaluation.section ) {
        subjectOfEvaluation = evaluation.section_repr;
        subjectOfEvaluation.displayName = subjectOfEvaluation.name;
        subjectOfEvaluation.icon = 'domain';
      } else {
        subjectOfEvaluation = evaluation.entity_repr;
        subjectOfEvaluation.displayName = subjectOfEvaluation.name;
        subjectOfEvaluation.icon = 'domain';
      }

      return subjectOfEvaluation;
    }

  }
})();
