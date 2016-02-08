(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationCreateController', EvaluationCreateController);

  /** @ngInject */
  function EvaluationCreateController ( $log, evaluations ) {
    $log.debug('Entered EvaluationCreateController');
    var vm = this;

    vm.evaluations = evaluations;

    activate();

    function activate() {
    }
  }
})();
