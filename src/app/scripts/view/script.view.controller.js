(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ScriptViewController', ScriptViewController);

  /** @ngInject */
  function ScriptViewController ( $log, script ) {
    $log.debug('Entered ScriptViewController');
    var vm = this;

    vm.script = script;

    activate();

    function activate() {
    }
  }
})();
