(function() {
  'use strict';

  angular
    .module('spark')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
