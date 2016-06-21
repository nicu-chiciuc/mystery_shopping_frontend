(function() {
  'use strict';

  angular
    .module('spark')
    .factory('DashboardTemplate', DashboardTemplate);

  /** @ngInject */
  function DashboardTemplate(AbstractAccountModel, contentTypes) {
    var Model = {
      initialize: initialize
    };

    return Model;

    function initialize () {

    }
  }
})();
