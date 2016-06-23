(function() {
  'use strict';

  angular
    .module('spark')
    .factory('DashboardTemplate', DashboardTemplate);

  /** @ngInject */
  function DashboardTemplate(AbstractAccountModel, contentTypes) {
    var Model = {
      initialize: initialize,
      parseWidgets: parseWidgets,
      stringifyWidgets: stringifyWidgets,
      addWidget: addWidget
    };

    return Model;

    function initialize () {
      var dashboard = this;

      dashboard.parsedWidgets = [];
    }

    function parseWidgets () {

    }

    function stringifyWidgets () {

    }

    function addWidget (rawWidget) {
      var dashboard = this;
      rawWidget = rawWidget || {};

      var newWidget = {
        position: rawWidget.position || {
          sizeX: 1, sizeY: 1,
          row: 100, col: 0
        },
        data: [],
        api: {},

        comments: rawWidget.comments || [],
        currentCommentIndex: rawWidget.currentCommentIndex || 0,

        title: rawWidget.title || 'Default title',
        checked: rawWidget.checked || {
          places: [],
          templates: []
        },
        available: {},
        graphType: rawWidget.graphType || 'placesKey'
      };

      newWidget.position.actualWidget = newWidget;

      dashboard.parsedWidgets.push(newWidget);

      return newWidget;
    }
  }
})();
