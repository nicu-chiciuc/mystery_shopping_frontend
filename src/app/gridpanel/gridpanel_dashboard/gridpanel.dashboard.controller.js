(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelDashboardController', GridPanelDashboardController);

  /** @ngInject */
  function GridPanelDashboardController ( $log, $scope, models, project, evaluations, $mdDialog, $mdMedia, currentDashboard, managementFlow, principal, currentUser ) {
    $log.debug('Entered GridPanelDashboardController');
    var vm = this;

    activate();

    vm.currentUserName = currentUser.user.first_name + " " + currentUser.user.last_name;
    vm.currentDate = new Date();

    vm.addingNewComment = false;

    vm.isNewDashboard = currentDashboard === null;
    vm.currentDashboard = currentDashboard || {};
    vm.project = project;
    vm.addWidget = addWidget;
    vm.saveDashboard = saveDashboard;
    vm.addNewComment = addNewComment;
    vm.deleteWidget = deleteWidget;
    vm.triggerResize = triggerResize;
    vm.showSettingsDialog = showSettingsDialog;

    vm.widgets = [];

    vm.dataManager = (function (evaluations) {
      var byContentType = _.groupBy(evaluations, 'typeTranslationKey');

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
        return evaluation.questionnaire_repr.template === template.id;
      }

      // place = {content_type, id}
      function getTemplatesByPlace (place) {
        var templates = [];

        evaluations.forEach(function (evaluation) {
          if (isEvaluationsOfPlace(evaluation, place)) {
            templates.push( getTemplateOfEvaluation(evaluation) );
          }
        });

        return templates;
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

      function getTemplateOfEvaluation (evaluation) {
        return {
          id: evaluation.questionnaire_repr.template,
          repr: evaluation.questionnaire_repr
        }
      }

      // For uniqueness comparison
      function placeMatcher (place) {
        return place.content_type + place.id.toString();
      }

      function templateMatcher (template) {
        return template.id;
      }


      function getPlacesOfAllEvaluations () {
        return _.uniqBy(_.map(evaluations, getPlaceOfEvaluation), placeMatcher);
      }

      function getTemplatesOfAllEvaluations () {
        return _.uniqBy(_.map(evaluations, getTemplateOfEvaluation), templateMatcher);
      }

      function getTemplatesByPlaceArray (places) {
        var templatesArrays = [];

        places.forEach(function (place) {
          var tmp = getTemplatesByPlace(place);
          if (tmp !== []) {
            templatesArrays.push(tmp);
          }
        });

        templatesArrays.push(templateMatcher);
        var templateIds = _.intersectionBy.apply(_, templatesArrays);

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

        placesArrays.push(placeMatcher)
        var uniqPlaces = _.intersectionBy.apply(_, placesArrays);

        return uniqPlaces;
      }

      function recalculateAvailableForWidget (widget) {
        var availableTemplates;
        var availablePlaces;

        if (widget.checked.places.length > 0) {
          availableTemplates = getTemplatesByPlaceArray(widget.checked.places);
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

      function getEvaluationsByPlace (place) {
        return _.filter(evaluations, function (evaluation) {
          return isEvaluationsOfPlace(evaluation, place);
        });
      }

      function getEvaluationsByPlaceAndTemplate (place, template) {
        return _.filter(evaluations, function (evaluation) {
          return isEvaluationsOfPlace(evaluation, place) &&
            isEvaluationOfTemplate(evaluation, template);
        })
      }

      function getAverageOfEvaluationArray (evaluationArr) {
        var sum = 0;
        var num = 0;

        if (evaluationArr.length < 1) {
          return -1;
        }

        evaluationArr.forEach(function (evaluation) {
          sum += evaluation.questionnaire_repr.score;
          num += 1;
        });

        return sum / num;
      }

      function setWidgetDataWithKeyPlaces (widget) {
        var newData = [];

        widget.checked.places.forEach(function (place) {
          var newObj = {
            key: place.repr.displayName,
            values: []
          };

          widget.checked.templates.forEach(function (template) {
            var averageValue = getAverageOfEvaluationArray(getEvaluationsByPlaceAndTemplate(place, template));

            newObj.values.push({
              label: template.repr.title,
              value: averageValue
            });
            console.log(averageValue);
          });

          newData.push(newObj);
        });

        widget.data = newData;
      }

      function setWidgetDataWithKeyTemplates (widget) {
        var newData = [];

        widget.checked.templates.forEach(function (template) {
          var newObj = {
            key: template.repr.title,
            values: []
          };

          widget.checked.places.forEach(function (place) {
            var averageValue = getAverageOfEvaluationArray(getEvaluationsByPlaceAndTemplate(place, template));

            newObj.values.push({
              label: place.repr.displayName,
              value: averageValue
            });

          });

          newData.push(newObj);
        });

        widget.data = newData;
      }

      return {
        recalculateAvailableForWidget: recalculateAvailableForWidget,
        getTemplatesByPlace: getTemplatesByPlace,
        getPlaceOfEvaluation: getPlaceOfEvaluation,
        getPlacesOfAllEvaluations: getPlacesOfAllEvaluations,
        getTemplatesOfAllEvaluations: getTemplatesOfAllEvaluations,
        placeMatcher: placeMatcher,
        getFirstEvaluationByPlace: getFirstEvaluationByPlace,
        getFirstEvaluationByTemplate: getFirstEvaluationByTemplate,
        setWidgetDataWithKeyPlaces: setWidgetDataWithKeyPlaces,
        setWidgetDataWithKeyTemplates: setWidgetDataWithKeyTemplates
      };
    })(evaluations);

    if (!vm.isNewDashboard) {
      var rawWidgets = JSON.parse(currentDashboard.widgets);
      rawWidgets.forEach(function (rawWidget) {
        var widget = addWidget(rawWidget);

        if (widget.graphType == 'placesKey') {
          vm.dataManager.setWidgetDataWithKeyPlaces(widget);
        }
        else {
          vm.dataManager.setWidgetDataWithKeyTemplates(widget);
        }

        vm.triggerResize(widget);
      });

      // console.log(widgets);
    }

    vm.chartOptions = {
      chart: {
        type: 'multiBarChart',
        // height: 450,

        margin : {
          top: 20,
          right: 20,
          //
          bottom: 45,
          left: 40
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

    //////////////////////////////////////////////////////////////////
      // This part is not yet finished
      var GeneralDataManager = (function () {
        function GeneralDataManager () {
          this.categories = {};
          // this.datas = [];
        }

        // GeneralDataManager.prototype.addDataArray = function (dataArray) {
        //   Array.prototype.push.apply(this.datas, dataArray);
        // }


        /**
         * @callback idGetter
         * @param {object} dataObject - A data object (usually a evaluation)
         * @returns {object} idObj    - An identifier for the category (the object should also contain a name)
         */

        /**
         * @param {string} categoryName - Name of new category
         * @param {idGetter} idGetterFromData
         */
        GeneralDataManager.prototype.addCategory = function (categoryName, idGetterFromData) {
          this.categories[categoryName] = {
            idGetter: idGetterFromData,

            foundTypes: []
          };
        };

        GeneralDataManager.prototype.findTypesOfCategory = function(categoryName, datas) {
          var self = this;
          var categNow = self.categories[categoryName];
          var typesNow = categNow.foundTypes;

          // Remove all elements
          typesNow.length = 0;

          datas.forEach(function (data) {
            // Find id of data by category
            var idNow = categNow.idGetter(data);

            // Search if such id was already found
            var temp = _.find(typesNow, function (type) {
              return _.isEqual(type.idObj, idNow)
            });

            // Creaty new entry if id wasn't found
            if (!temp) {
              temp = {
                idObj: idNow,
                datas: []
              };
              typesNow.push(temp);
            }

            // Add data entry to that ids types
            temp.datas.push(data);
          });
        };

        GeneralDataManager.prototype.isDataOfCategory = function(category, data, categoryTypeId) {
          return _.isEqual(self.categories[category].idGetter(data), categoryTypeId);
        };


        return GeneralDataManager;
      })();

      var generalData = new GeneralDataManager();

      // generalData.addDataArray(evaluations);

      generalData.addCategory(
        'places',
        function (evaluation) {
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
      );

      generalData.addCategory(
        'templates',
        function (evaluation) {
          return {
            id: evaluation.questionnaire_repr.template,
            name: evaluation.questionnaire_repr.title
          }
        }
      );

      generalData.findTypesOfCategory('places', evaluations);
      generalData.findTypesOfCategory('templates', evaluations);

    ///////////////////////////////////////////////////////////////////

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

    function deleteWidget (widget) {
      _.remove(vm.widgets, widget);
    }

    function saveDashboard () {

      models.restangularizeElement(null, vm.currentDashboard, 'dashboard/templates');

      var rawWidgets = _.map(vm.widgets,
        function (widget) {
          var rawWidget = _.pick(widget, ['position', 'title', 'checked', 'comments', 'currentCommentIndex']);
          rawWidget.position.actualWidget = undefined;
          return rawWidget;
        });

      vm.currentDashboard.widgets = JSON.stringify(rawWidgets);
      vm.currentDashboard.title = vm.currentDashboard.title || 'check it';
      vm.currentDashboard.project = project.id;
      vm.currentDashboard.tenant = 2;


      vm.currentDashboard[vm.isNewDashboard ? 'post' : 'put']().then(successFn, errorFn);

      function successFn (resp) {
        console.log('good', resp);
      }

      function errorFn (resp) {
        console.log('bad', resp);
      }
    }

    function addWidget (rawWidget) {
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

      vm.widgets.push(newWidget);

      return newWidget;
    }

    function activate() {
      vm.gridsterOpts = {
        columns: 8,
        minSizeX: 1,
        minSizeY: 1,
        resizable: {
          stop: function (event, $element, widgetPos) {
            vm.triggerResize(widgetPos.actualWidget);
          }
        }
      };
    }

    function setComment (widget, comment) {

    }

    function addNewComment (widget) {
      widget.comments.push({
        date: new Date(),
        author: vm.currentUserName,
        text: widget.newComment
      });

      widget.currentCommentIndex = widget.comments.length - 1;
      widget.newComment = '';
      widget.addingNewComment = false;

    }

    function triggerResize (widget) {
      // It's important to set a timeout because the widgets will take a small time to adjust
      // and this is not taken into account by gridster which means that content inside will be
      // resized incorrectly
      setTimeout(function () {
        widget.api.refresh();
      }, 300);
    }

  }
})();
