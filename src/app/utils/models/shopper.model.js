(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ShopperModel', ShopperModel);

  /** @ngInject */
  function ShopperModel ( moment, AbstractAccountModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var shopper = this;

      shopper.age = moment().diff(shopper.date_of_birth, 'years');

      if ( shopper.user ) {
        angular.extend(shopper.user, AbstractAccountModel);
        shopper.user.initializeAbstract();
      }
    }
  }
})();
