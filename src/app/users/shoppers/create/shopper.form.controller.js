(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ShopperFormController', ShopperFormController);

  /** @ngInject */
  function ShopperFormController ( $log, $state, $mdToast, models, shopper ) {
    $log.debug('Entered ShopperFormController');
    var vm = this;

    vm.shopper = shopper;

    vm.saveShopper = saveShopper;

    activate();

    function activate() {
      vm.isNewShopper = _.isEmpty(vm.shopper);
    }

    function saveShopper ( shopper, isValid ) {

      if ( isValid ) {
        if ( vm.isNewShopper ) {
          shopper = models.restangularizeElement(null, shopper, 'shoppers');
          shopper.post().then(saveShopperSuccessFn, saveShopperErrorFn);
        } else {
          shopper.put().then(saveShopperSuccessFn, saveShopperErrorFn);
        }
      }

      function saveShopperSuccessFn ( response ) {
        vm.shopper = response;

        // TODO add translation for toast. Have different messages for CREATE/EDIT success
        $mdToast.show(
          $mdToast.simple()
            .textContent('Shopper successfully created.')
            .theme('success-toast')
            .hideDelay(3000)
        );
        goToShopperDetailViewState();
      }
      function saveShopperErrorFn () {
        // TODO add translation for toast
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error! Please retry')
            .theme('fail-toast')
            .hideDelay(5000)
        );
      }
    }

    function goToShopperDetailViewState () {
      var shopperDetailViewState = $state.current.name.replace(/(create|detail\.edit)/g, 'detail.view');
      $state.go(shopperDetailViewState, {shopperId: vm.shopper.id});
    }
  }
})();
