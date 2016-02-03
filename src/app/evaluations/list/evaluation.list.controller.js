(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationListController', EvaluationListController);

  /** @ngInject */
  function EvaluationListController ( $log, evaluations ) {
    $log.debug('Entered EvaluationListController');
    var vm = this;

    vm.evaluations = evaluations;

    activate();

    function activate() {
    }
  }
})();
