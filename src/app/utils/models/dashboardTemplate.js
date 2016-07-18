(function() {
  'use strict';

  angular
    .module('spark')
    .factory('DashboardTemplate', DashboardTemplate);

  /** @ngInject */
  function DashboardTemplate(AbstractAccountModel, contentTypes) {
    var Model = {
      initialize: initialize,
      // parseWidgets: parseWidgets,
      // stringifyWidgets: stringifyWidgets,
      // addWidget: addWidget
    };

    return Model;

    function initialize () {
    }

    function parseWidgets () {

    }

    function stringifyWidgets () {

    }

    function addWidget (rawWidget) {

    }
  }
})();
