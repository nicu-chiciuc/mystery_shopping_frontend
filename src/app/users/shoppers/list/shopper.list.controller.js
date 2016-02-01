(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ShopperListController', ShopperListController);

  /** @ngInject */
  function ShopperListController ( $log, shoppers ) {
    $log.debug('Entered ShopperListController');
    var vm = this;

    vm.shoppers = shoppers;

    activate();

    function activate() {
    }
  }
})();
