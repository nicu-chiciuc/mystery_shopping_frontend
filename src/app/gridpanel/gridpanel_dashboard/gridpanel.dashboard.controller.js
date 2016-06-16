(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelDashboardController', GridPanelDashboardController);

  /** @ngInject */
  function GridPanelDashboardController ( $log, $scope, project, evaluations, $mdDialog, $mdMedia ) {
    $log.debug('Entered GridPanelDashboardController');
    var vm = this;

    // var plainEvaluations  = _.map(evaluations,
    //   function (evaluation) {
    //     return evaluation.plain();
    //   });

    console.log(evaluations);


    activate();

    vm.project = project;
    vm.addWidget = addWidget;
    vm.deleteWidget = deleteWidget;
    vm.setInputDataForWidget = setInputDataForWidget;
    vm.setGraphTypeForWidget = setGraphTypeForWidget;
    vm.triggerResize = triggerResize;
    vm.showSettingsDialog = showSettingsDialog;

    vm.chartOptions = {
      chart: {
        type: 'multiBarChart',
        // height: 450,

        margin : {
          top: 0,
          right: 0,
          //
          bottom: 0,
          left: 20
        },
        // clipEdge: true,
        staggerLabels: true,
        duration: 500,
        stacked: true,
        xAxis: {
          axisLabel: 'Time (ms)',
          showMaxMin: false,
          // tickFormat: function(d){
          //   return d3.format(',f')(d);
          // }
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -20,
          // tickFormat: function(d){
          //   return d3.format(',.1f')(d);
          // }
        },
        x: function (d) {return d.label},
        y: function (d) {return d.value},
        showValue: true
      }
    };

    vm.widgets = [
      {
        position: { sizeX: 2, sizeY: 1, row: 0, col: 0 },
        data: [],
        title: "Informație",
        checked: {
          places: [],
          templates: []
        },
        available: {}
      }
    ];

    vm.widgets[0].data = [
      {
        key: 'Easiness',
        values: [
          {'label': 'Botanica', 'value': 10},
          {'label': 'Posta Veche', 'value': 20},
          {'label': 'Cahul', 'value': 15},
          {'label': 'Iepureni', 'value': 12},
          {'label': 'Iargara', 'value': 20},
        ]
      },
      {
        key: 'Usefulness',
        values: [
          {'label': 'Botanica', 'value': 6},
          {'label': 'Posta Veche', 'value': 7},
          {'label': 'Cahul', 'value': 2},
          {'label': 'Iepureni', 'value': 12},
          {'label': 'Iargara', 'value': 5},
        ]
      }
    ];

    vm.dataManager = (function (evaluations) {
      var byContentType = _.groupBy(evaluations, 'typeTranslationKey');

      function getLocations () {

        var ret = [];

        _.forOwn(byContentType, function (value, key) {
          value.forEach(function (tmp) {
            var ent;
            switch (key) {
              case 'CONTENT_TYPE.18':
              case 'CONTENT_TYPE.19':
                ent = tmp.employee_repr;
                break;

              case 'CONTENT_TYPE.25':
                ent = tmp.department_repr;
                break;

              case 'CONTENT_TYPE.26':
                ent = tmp.entity_repr;
                break;

              case 'CONTENT_TYPE.27':
                ent = tmp.section_repr;
                break;
            }

            ret.push({
              type: key,
              repr: ent
            });
          });
        });

        ret = _.uniqBy(ret, function (location) {
          return location.type + location.repr.id.toString();
        });

        return ret;
      }

      function getQuestionnaireByLocation (locations) {
        var questionnaireTemplates = getQuestionnaireTemplates();

        locations.forEach(function (location) {

        });
      }

      function getQuestionnaireTemplates () {
        var quesitonnaireTemplates = [];

        evaluations.forEach(function (evaluation) {
          quesitonnaireTemplates.push(evaluation.questionnaire_repr);
        });

        quesitonnaireTemplates = _.uniqBy(quesitonnaireTemplates, 'template');

        return quesitonnaireTemplates;
      }

      function getBlocks () {
        var questionnaireTemplates = getQuestionnaireTemplates();
        var allBlocks = [];

        questionnaireTemplates.forEach(getSubBlocksAndQuestions);

        function getSubBlocksAndQuestions (block) {

        }

      }

      function isEvaluationsOfPlace (evaluation, place) {
        if (evaluation.typeTranslationKey !== place.content_type) {
          return false;
        }

        switch (evaluation.typeTranslationKey) {
          case 'CONTENT_TYPE.18':
          case 'CONTENT_TYPE.19':
            return evaluation.employee_repr.id === place.id;

          case 'CONTENT_TYPE.25':
            return evaluation.department_repr.id === place.id;

          case 'CONTENT_TYPE.26':
            return evaluation.entity_repr.id === place.id;

          case 'CONTENT_TYPE.27':
            return evaluation.section_repr.id === place.id;

          default:
            return false;
        }
      }

      function isEvaluationOfTemplate (evaluation, template) {
        return evaluation.questionnaire_repr.template === template;
      }

      // place = {content_type, id}
      function getTemplateIdsByPlace (place) {
        var templateIds = [];

        evaluations.forEach(function (evaluation) {
          if (isEvaluationsOfPlace(evaluation, place)) {
            templateIds.push(evaluation.questionnaire_repr.template);
          }
        });

        return _.uniq(templateIds);
      }

      function getPlacesByTemplate (template) {
        var places = [];

        evaluations.forEach(function (evaluation) {
          if (isEvaluationOfTemplate(evaluation, template)){
            places.push( getPlaceOfEvaluation(evaluation) );
          }
        });


        return places;
      }

      function getPlaceOfEvaluation (evaluation) {
        var retId;
        var retRepr

        switch (evaluation.typeTranslationKey) {
          case 'CONTENT_TYPE.18':
          case 'CONTENT_TYPE.19':
            retId = evaluation.employee_repr.id;
            retRepr = evaluation.employee_repr;
            break;

          case 'CONTENT_TYPE.25':
            retId = evaluation.department_repr.id;
            retRepr = evaluation.department_repr;
            break;

          case 'CONTENT_TYPE.26':
            retId = evaluation.entity_repr.id;
            retRepr = evaluation.entity_repr;
            break;

          case 'CONTENT_TYPE.27':
            retId = evaluation.section_repr.id;
            retRepr = evaluation.section_repr;
            break;

          default:
            return null;
        }

        return {
          content_type: evaluation.typeTranslationKey,
          id: retId,
          repr: retRepr
        };
      }

      // For uniqueness comparison
      function placeMatcher (place) {
        return place.content_type + place.id.toString();
      }


      function getPlacesOfAllEvaluations () {
        return _.uniqBy(_.map(evaluations, getPlaceOfEvaluation), placeMatcher);
      }

      function getTemplateOfEvaluation (evaluation) {
        return evaluation.questionnaire_repr.template;
      }

      function getTemplatesOfAllEvaluations () {
        return _.uniq(_.map(evaluations, getTemplateOfEvaluation));
      }

      function getTemplateIdsByPlaceArray (places) {
        var templateIdsArrays = [];

        places.forEach(function (place) {
          var tmp = getTemplateIdsByPlace(place);
          if (tmp !== []) {
            templateIdsArrays.push(tmp);
          }
        });

        var templateIds = _.intersection.apply(_, templateIdsArrays);

        return templateIds;
      }

      function getPlacesByTemplateArray (templates) {
        var placesArrays = [];

        templates.forEach(function (template) {
          var tmp = getPlacesByTemplate(template);
          if (tmp !== []) {
            placesArrays.push(tmp);
          }
        });

        // cannot use simple union of objects
        placesArrays.push(placeMatcher)
        var uniqPlaces = _.intersectionBy.apply(_, placesArrays);

        return uniqPlaces;
      }

      function recalculateAvailableForWidget (widget) {
        var availableTemplates;
        var availablePlaces;

        if (widget.checked.places.length > 0) {
          availableTemplates = getTemplateIdsByPlaceArray(widget.checked.places);
        }
        else {
          availableTemplates = getTemplatesOfAllEvaluations();
        }

        if (widget.checked.templates.length > 0) {
          availablePlaces = getPlacesByTemplateArray(widget.checked.templates)
        }
        else {
          availablePlaces = getPlacesOfAllEvaluations();
        }

        widget.available.places = availablePlaces;
        widget.available.templates = availableTemplates;
      }

      function getFirstEvaluationByPlace (place) {
        return evaluations.find(function (evaluation) {
          return isEvaluationsOfPlace(evaluation, place);
        });
      }

      function getFirstEvaluationByTemplate (template) {
        return evaluations.find(function (evaluation) {
          return isEvaluationOfTemplate(evaluation, place);
        });
      }

      return {
        getLocations: getLocations,
        getQuestionnaireTemplates: getQuestionnaireTemplates,
        getQuestionnaireByLocation: getQuestionnaireByLocation,
        recalculateAvailableForWidget: recalculateAvailableForWidget,
        getTemplateIdsByPlace: getTemplateIdsByPlace,
        getPlaceOfEvaluation: getPlaceOfEvaluation,
        getPlacesOfAllEvaluations: getPlacesOfAllEvaluations,
        getTemplatesOfAllEvaluations: getTemplatesOfAllEvaluations,
        placeMatcher: placeMatcher,
        getFirstEvaluationByPlace: getFirstEvaluationByPlace,
        getFirstEvaluationByTemplate: getFirstEvaluationByTemplate

      };
    })(evaluations);

    vm.dataManager.recalculateAvailableForWidget(vm.widgets[0]);

    function showSettingsDialog (event, widget) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
      $mdDialog.show({
        controller: 'GridPanelWidgetSettingsController as vm',
        templateUrl: 'app/gridpanel/gridpanel_widgetsettings/gridpanel-widgetsettings.html',
        parent: angular.element(document.body),
        targetEvent: event,
        escapeToClose: false,
        fullscreen: useFullScreen,
        locals: {
          widget: widget,
          dashboard: vm
        }
      })
        .then(function(question) {
          console.log('in then mate');
          // block.addQuestion(question);
        });
    }

    function setInputDataForWidget (widget) {

    }

    function setGraphTypeForWidget (widget) {

    }

    function deleteWidget (widget) {
      _.remove(vm.widgets, widget);
    }

    function addWidget (title) {
      vm.widgets.push({
        position: {
          sizeX: 1, sizeY: 1,
          row: 100, col: 0
        },
        data: [],
        title: title
      });
    }

    function activate() {
      vm.gridsterOpts = {
        resizable: {

          stop: function (event, $element, widget) {

            vm.triggerResize(event, $element, widget);

          }
        }
      };

      triggerResize();
    }

    function triggerResize (event, $element, widget) {
      // It's important to set a timeout because the widgets will take a small time to adjust
      // and this is not taken into account by gridster which means that content inside will be
      // resized incorrectly
      setTimeout(function () {
        // $scope.$broadcast('refresh-yourself', {widget: widget, data: byEntities});
      }, 300);
    }

  }
})();
