(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelWidgetSettingsController', GridPanelWidgetSettingsController);

  /** @ngInject */
  function GridPanelWidgetSettingsController($log, $scope, $mdDialog, widget, dashboard, evaluations, ClassificationManager) {
    $log.debug('Entered GridPanelDashboardController');
    var vm = this;

    vm.widget = widget;
    vm.oldWidgetTitle = widget.title;
    vm.cancel = cancel;
    vm.save = save;
    vm.categoryTypeClick = categoryTypeClick;
    vm.wrappedCategoryTypes = {};

    resetPlacesAndTemplateCheckboxes();

    function resetPlacesAndTemplateCheckboxes() {
      ClassificationManager.recalculateAvailableForWidget(evaluations, widget);

      ['places', 'templates', 'waves'].forEach(function (category) {
        vm.wrappedCategoryTypes[category] = createWrappedCategoryTypes (category);
      });

      function createWrappedCategoryTypes (category) {
        var rawCategoryTypes = ClassificationManager.getCategoryTypesByEvaluations(category, evaluations);
        return _.map( rawCategoryTypes, function (categoryType) {
          return {
            type: categoryType,
            checked: !! _.find(widget.checked[category], categoryType),
            available: !! _.find(widget.available[category], categoryType)
          }
        });
      }
    }

    function categoryTypeClick (category, wrappedCategoryType) {
      if (wrappedCategoryType.available) {

        var index = _.findIndex(widget.checked[category], wrappedCategoryType.type);

        if (index === -1) {
          widget.checked[category].push(wrappedCategoryType.type)
        }
        else {
          widget.checked[category].splice(index, 1);
        }

        resetPlacesAndTemplateCheckboxes();
      }
    }


    function save () {
      if (vm.widget.graphType == 'placesKey') {
      ClassificationManager.setWidgetDataWithKeyPlaces(evaluations, widget);
      }
      else {
      ClassificationManager.setWidgetDataWithKeyTemplates(evaluations, widget);
      }
      $mdDialog.hide();
    }

    function cancel () {
      vm.widget.title = vm.oldWidgetTitle;
      $mdDialog.cancel();
    }
  }

})();
