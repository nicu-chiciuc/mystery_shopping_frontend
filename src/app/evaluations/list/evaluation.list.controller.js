(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationListController', EvaluationListController);

  /** @ngInject */
  function EvaluationListController ( $log, evaluations, evaluationPlanning, user ) {
    $log.debug('Entered EvaluationListController');
    var vm = this;

    vm.user = user;
    vm.existingEvaluations = evaluations;
    vm.evaluationPlanning = evaluationPlanning;

    activate();

    function activate() {
      vm.evaluationPlanning.setPlannedEvaluations(vm.existingEvaluations);
    }
  }
})();
