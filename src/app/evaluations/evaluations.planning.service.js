(function() {
  'use strict';

  angular
    .module('spark')
    .factory('evaluationPlanning', evaluationPlanning);

  /** @ngInject */
  function evaluationPlanning ( $rootScope, $q, $state, managementFlow ) {
    var self;
    var plannedEvaluations = [];

    self = {
      createPlannedEvaluations: createPlannedEvaluations,
      totalEvaluationNumber: totalEvaluationNumber,
      leftToPlanEvaluationNumber: leftToPlanEvaluationNumber
    };

    return self;


    function createPlannedEvaluations ( evaluations ) {
      plannedEvaluations = plannedEvaluations.concat(evaluations);
    }

    function totalEvaluationNumber () {
      return managementFlow.getProject().research_methodology.number_of_evaluations;
    }

    function leftToPlanEvaluationNumber () {
      return totalEvaluationNumber() - plannedEvaluations.length;
    }
  }

})();
