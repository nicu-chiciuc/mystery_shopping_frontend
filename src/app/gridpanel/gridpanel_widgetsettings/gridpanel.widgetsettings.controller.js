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

    resetPlacesAndTemplateCheckboxes();

    function resetPlacesAndTemplateCheckboxes() {
      ClassificationManager.recalculateAvailableForWidget(evaluations, widget);

      vm.wrappedCategoryTypes = {
        'places': createWrappedCategoryTypes('places'),
        'templates': createWrappedCategoryTypes('templates'),
        'waves': createWrappedCategoryTypes('waves')
      };

      function createWrappedCategoryTypes (category) {
        var rawCategoryTypes = ClassificationManager.getCategoryTypesByEvaluations(category, evaluations);
        return _.map( rawCategoryTypes, function (categoryType) {
          return {
            type: categoryType,
            checked: false,
            available: false
          }
        });
      }

      setAvailabilityAndCheckedStatusOfCategoryTypes('places');
      setAvailabilityAndCheckedStatusOfCategoryTypes('templates');
      setAvailabilityAndCheckedStatusOfCategoryTypes('waves');

      function setAvailabilityAndCheckedStatusOfCategoryTypes (category) {
        vm.wrappedCategoryTypes[category].forEach(function (wrappedCategoryType) {
          wrappedCategoryType.available = !! _.find(widget.available[category], wrappedCategoryType.type);
          wrappedCategoryType.checked   = !! _.find(widget.checked[category], wrappedCategoryType.type);
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
