(function() {
  'use strict';

  angular
    .module('spark')
    .factory('evaluationPlanning', evaluationPlanning);

  /** @ngInject */
  function evaluationPlanning ( $rootScope, $q, $state, managementFlow ) {
    var self;

    self = {
      plannedEvaluations: [],
      createPlannedEvaluations: createPlannedEvaluations,
      totalEvaluationNumber: totalEvaluationNumber,
      leftToPlanEvaluationNumber: leftToPlanEvaluationNumber,
      setPlannedEvaluations: setPlannedEvaluations,
      getPlannedEvaluations: getPlannedEvaluations
    };

    return self;


    function createPlannedEvaluations ( evaluations ) {
      var evaluationsCopy = _.cloneDeep(evaluations);
      self.plannedEvaluations = self.plannedEvaluations.concat(evaluationsCopy);
    }

    function totalEvaluationNumber () {
      return managementFlow.getProject().research_methodology.number_of_evaluations;
    }

    function leftToPlanEvaluationNumber () {
      return totalEvaluationNumber() - self.plannedEvaluations.length;
    }

    function setPlannedEvaluations ( evaluations ) {
      self.plannedEvaluations = evaluations;
    }

    function getPlannedEvaluations () {
      return self.plannedEvaluations;
    }
  }

})();
