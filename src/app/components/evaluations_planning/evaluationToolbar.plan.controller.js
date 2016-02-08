(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationPlanToolbarController', EvaluationPlanToolbarController);

  /** @ngInject */
  function EvaluationPlanToolbarController ( $log, evaluations ) {
    $log.debug('Entered EvaluationPlanToolbarController');
    var vm = this;

    vm.evaluations = evaluations;

    activate();

    function activate() {
    }
  }
})();
