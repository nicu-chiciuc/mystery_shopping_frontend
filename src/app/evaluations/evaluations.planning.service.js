(function() {
  'use strict';

  angular
    .module('spark')
    .factory('evaluationPlanning', evaluationPlanning);

  /** @ngInject */
  function evaluationPlanning ( $rootScope, $q, $state, managementFlow, models ) {
    var self;

    self = {
      plannedEvaluations: [],
      createPlannedEvaluations: createPlannedEvaluations,
      totalEvaluationNumber: totalEvaluationNumber,
      leftToPlanEvaluationNumber: leftToPlanEvaluationNumber,
      setPlannedEvaluations: setPlannedEvaluations,
      getPlannedEvaluations: getPlannedEvaluations,
      savePlannedEvaluations: savePlannedEvaluations,
      removeEvaluation: removeEvaluation
    };

    return self;


    function createPlannedEvaluations ( evaluations ) {
      evaluations = models.restangularizeCollection(managementFlow.getProject(), evaluations, 'evaluations');

      evaluations.post().then(savePlannedEvaluationsSuccessFn, savePlannedEvaluationsErrorFn);

      function savePlannedEvaluationsSuccessFn ( response ) {
        self.plannedEvaluations = self.plannedEvaluations.concat(response);
      }
      function savePlannedEvaluationsErrorFn ( error ) {
        // TODO deal with the error
        console.log(error);
      }
    }

    function totalEvaluationNumber () {
      return managementFlow.getProject().research_methodology.number_of_evaluations || '-';
    }

    function leftToPlanEvaluationNumber () {
      var totalEvaluationsNumber = totalEvaluationNumber();
      return totalEvaluationsNumber === '-'
        ? '-'
        : totalEvaluationsNumber - self.plannedEvaluations.length;
    }

    function setPlannedEvaluations ( evaluations ) {
      self.plannedEvaluations = evaluations;
    }

    function getPlannedEvaluations () {
      return self.plannedEvaluations;
    }

    function savePlannedEvaluations ( evaluations ) {
    }

    function removeEvaluation ( evaluation ) {
      evaluation.remove().then(deleteEvaluationSuccessFn, deleteEvaluationErrorFn);
      function deleteEvaluationSuccessFn () {
        _.remove(self.plannedEvaluations, function (evltn) {
          return evltn.id === evaluation.id;
        });
      }
      function deleteEvaluationErrorFn () {
        // TODO deal with the error
      }
    }
  }

})();
