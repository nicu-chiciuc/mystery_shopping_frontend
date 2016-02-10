(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationToolbarController', EvaluationToolbarController);

  /** @ngInject */
  function EvaluationToolbarController ( $log, evaluations, evaluationPlanning ) {
    $log.debug('Entered EvaluationToolbarController');
    var vm = this;

    vm.evaluations = evaluations;
    vm.evaluationPlanning = evaluationPlanning;

    activate();

    function activate() {
    }
  }
})();
