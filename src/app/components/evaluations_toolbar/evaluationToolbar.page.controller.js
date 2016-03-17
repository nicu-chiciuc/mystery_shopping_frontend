(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationToolbarController', EvaluationToolbarController);

  /** @ngInject */
  function EvaluationToolbarController ( $log, evaluations, evaluationPlanning, project ) {
    $log.debug('Entered EvaluationToolbarController');
    var vm = this;

    vm.evaluations = evaluations;
    vm.evaluationPlanning = evaluationPlanning;
    vm.project = project;

    activate();

    function activate() {
    }
  }
})();
