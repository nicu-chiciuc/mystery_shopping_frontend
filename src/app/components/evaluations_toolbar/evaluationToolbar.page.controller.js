(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationToolbarController', EvaluationToolbarController);

  /** @ngInject */
  function EvaluationToolbarController ( $log, evaluations ) {
    $log.debug('Entered EvaluationToolbarController');
    var vm = this;

    vm.evaluations = evaluations;

    activate();

    function activate() {
    }
  }
})();
