/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('UserModel', UserModel);

  /** @ngInject */
  function UserModel() {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var user = this;
    }

  }
})();
