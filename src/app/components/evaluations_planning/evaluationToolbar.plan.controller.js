(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationPlanToolbarController', EvaluationPlanToolbarController);

  /** @ngInject */
  function EvaluationPlanToolbarController ( $log, evaluations, managementFlow, evaluationPlanning ) {
    $log.debug('Entered EvaluationPlanToolbarController');
    var vm = this;

    vm.evaluations = evaluations;
    vm.project = managementFlow.getProject();

    vm.evaluationSkeleton = {};

    vm.createEvaluations = createEvaluations;

    activate();

    function activate() {
    }

    function createEvaluations ( evaluationSkeleton, isValid) {
      if ( isValid ) {
        evaluationPlanning.createEvaluations(evaluationSkeleton);
      }
    }
  }
})();
