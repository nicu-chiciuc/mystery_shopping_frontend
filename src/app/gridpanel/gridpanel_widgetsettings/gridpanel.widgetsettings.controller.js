(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelWidgetSettingsController', GridPanelWidgetSettingsController);

  /** @ngInject */
  function GridPanelWidgetSettingsController($log, $scope, $mdDialog, widget, dashboard) {
    $log.debug('Entered GridPanelDashboardController');
    var vm = this;

    vm.widget = widget;
    vm.oldWidgetTitle = widget.title;
    vm.cancel = cancel;
    vm.save = save;
    vm.placeClick = placeClick;
    vm.templateClick = templateClick;
    vm.allPlaces = [];
    vm.allTemplates = [];

    resetPlacesAndTemplateCheckboxes();

    function resetPlacesAndTemplateCheckboxes() {
      dashboard.dataManager.recalculateAvailableForWidget(widget);

      vm.allPlaces = dashboard.dataManager.getPlacesOfAllEvaluations();
      vm.allTemplates = dashboard.dataManager.getTemplatesOfAllEvaluations();

      setAvailabilityOfPlaces();
      setAlreadyCheckedPlaces();
      setAvailabilityOfTemplates();
      setAlreadyCheckedTemplates();

      function setAvailabilityOfPlaces () {
        vm.allPlaces.forEach(function (place) {
          var index = _.findIndex(widget.available.places, function (availablePlace) {
            return (place.content_type === availablePlace.content_type) &&
              (place.id === availablePlace.id);
          });

          place.disabled = (index === -1);
        });
      }

      function setAlreadyCheckedPlaces () {
        vm.allPlaces.forEach(function (place) {
          var index = _.findIndex(widget.checked.places, function (availablePlace) {
            return (place.content_type === availablePlace.content_type) &&
              (place.id === availablePlace.id);
          });

          place.checked = (index !== -1);
        });
      }

      function setAvailabilityOfTemplates () {
        vm.allTemplates.forEach(function (template) {
          var index = _.findIndex(widget.available.templates, function (availableTemplate) {
            return template.id === availableTemplate.id;
          });

          template.disabled = (index === -1);
        });
      }

      function setAlreadyCheckedTemplates () {
        vm.allTemplates.forEach(function (template) {
          var index = _.findIndex(widget.checked.templates, function (availableTemplate) {
            return template.id === availableTemplate.id;
          });

          template.checked = (index !== -1);
        });
      }
    }

    function placeClick (place) {
      var index = _.findIndex(widget.checked.places, function (checkedPlace) {
        return (place.content_type === checkedPlace.content_type) &&
          (place.id === checkedPlace.id);
      });

      if (index === -1) {
        widget.checked.places.push({
          content_type: place.content_type,
          id: place.id,
          repr: place.repr
        })
      }
      else {
        widget.checked.places.splice(index, 1);
      }

      resetPlacesAndTemplateCheckboxes();
    }

    function templateClick (template) {
      var index = _.findIndex(widget.checked.templates, function (checkedTemplate) {
        return template.id === checkedTemplate.id;
      });

      if (index === -1) {
        widget.checked.templates.push({
          id: template.id,
          repr: template.repr
        });
      }
      else {
        widget.checked.templates.splice(index, 1);
      }

      resetPlacesAndTemplateCheckboxes();
    }

    function save () {
      if (vm.widget.graphType == 'placesKey') {
      dashboard.dataManager.setWidgetDataWithKeyPlaces(widget);
      }
      else {
      dashboard.dataManager.setWidgetDataWithKeyTemplates(widget);
      }
      $mdDialog.hide();
    }

    function cancel () {
      vm.widget.title = vm.oldWidgetTitle;
      $mdDialog.cancel();
    }
  }

})();
