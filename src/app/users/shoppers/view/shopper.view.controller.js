(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ShopperViewController', ShopperViewController);

  /** @ngInject */
  function ShopperViewController ( $log, shopper ) {
    $log.debug('Entered ShopperViewController');
    var vm = this;

    vm.shopper = shopper;

    activate();

    function activate() {
    }
  }
})();
