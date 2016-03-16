(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ShopperModel', ShopperModel);

  /** @ngInject */
  function ShopperModel ( AbstractAccountModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var shopper = this;

      if ( shopper.user ) {
        angular.extend(shopper.user, AbstractAccountModel);
        shopper.user.initializeAbstract();
      }
    }
  }
})();
