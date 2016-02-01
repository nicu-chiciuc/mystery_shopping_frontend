(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ScriptListController', ScriptListController);

  /** @ngInject */
  function ScriptListController ( $log, scripts ) {
    $log.debug('Entered ScriptListController');
    var vm = this;

    vm.scripts = scripts;

    activate();

    function activate() {
    }
  }
})();
