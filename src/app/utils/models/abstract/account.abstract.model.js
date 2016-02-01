/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('AbstractAccountModel', AbstractAccountModel);

  /** @ngInject */
  function AbstractAccountModel () {
    var Model = {
      initializeAbstract: initializeAbstract
    };

    return Model;


    function initializeAbstract () {
      var account = this;

      computeFullName(account);
    }

    function computeFullName ( account ) {
      account.fullName = account.first_name + ' ' + account.last_name;
    }

  }
})();
