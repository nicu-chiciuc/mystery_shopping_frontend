(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ShopperFormController', ShopperFormController);

  /** @ngInject */
  function ShopperFormController ( $log, $filter, $state, $mdToast, msUtils, models, shopper, moment ) {
    $log.debug('Entered ShopperFormController');
    var vm = this;

    vm.shopper = shopper;

    vm.msUtils = msUtils;

    vm.isNewShopper = !vm.shopper.id;
    vm.selected = [];
    vm.selectedRows = [];
    vm.tableOptions = {
      autoSelect: false,
      largeEditDialog: true,
      rowSelection: false
    };

    vm.saveShopper = saveShopper;

    activate();
    function activate() {
      vm.passwordRequired = vm.isNewShopper;
      if ( !vm.isNewShopper ) {
        vm.shopper.birth_date = new Date(vm.shopper.date_of_birth);
      }
    }

    function saveShopper ( shopper, isValid ) {

      if ( isValid ) {
        shopper.date_of_birth = moment(shopper.birth_date).format('YYYY-MM-DD');

        if ( vm.isNewShopper ) {
          shopper = models.restangularizeElement(null, shopper, 'shoppers');
          shopper.post().then(saveShopperSuccessFn, saveShopperErrorFn);
        } else {
          shopper.put().then(saveShopperSuccessFn, saveShopperErrorFn);
        }
      }

      function saveShopperSuccessFn ( response ) {
        vm.passwordRequired = false;
        response.birth_date = new Date(response.date_of_birth);
        vm.isNewShopper = false;
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
      function saveShopperErrorFn ( error ) {
        var translationKey = '';
        var usernameExists = false;
        var usernameExistsErrorMessage = 'A user with that username already exists.';
        // TODO add translation for toast
        if ( error.data.user && error.data.user.username ) {
          usernameExists = _.find(error.data.user.username, function (errorMessage) {
            return errorMessage === usernameExistsErrorMessage;
          });
          if ( usernameExists === usernameExistsErrorMessage ) {
            translationKey = 'VALIDATION_MESSAGE.USER.USERNAME_EXISTS';
          }
        }
        $mdToast.show(
          $mdToast.simple()
            .textContent($filter('translate')(translationKey))
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
