(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelWidgetSettingsController', GridPanelWidgetSettingsController)

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
    vm.awesomeCallback = awesomeCallback;

    resetPlacesAndTemplateCheckboxes();


    function awesomeCallback (tree, node, state) {
      categoryTypeClick('templates', tree);
    }

    function resetPlacesAndTemplateCheckboxes() {
      ClassificationManager.recalculateAvailableForWidget(evaluations, widget);

      ['places', 'templates', 'waves'].forEach(function (category) {
        vm.wrappedCategoryTypes[category] = createWrappedCategoryTypes (category);
      });

      function createWrappedCategoryTypes (category) {
        var rawCategoryTypes = ClassificationManager.getCategoryTypesByEvaluations(category, evaluations);
        rawCategoryTypes.forEach(function (categoryType) {
          categoryType.selected = !! _.find(widget.selected[category], ClassificationManager.isEqualCategoryType(categoryType));
          categoryType.available = !! _.find(widget.available[category], ClassificationManager.isEqualCategoryType(categoryType));
        });

        return rawCategoryTypes;
      }
    }

    function categoryTypeClick (category, wrappedCategoryType) {
      if (wrappedCategoryType.available) {

        var index = _.findIndex(
          widget.selected[category],
          ClassificationManager.isEqualCategoryType(wrappedCategoryType)
        );

        if (index === -1) {
          widget.selected[category].push(wrappedCategoryType)
        }
        else {
          widget.selected[category].splice(index, 1);
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
