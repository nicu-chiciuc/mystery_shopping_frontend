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
        title: "Informație"
      },
      {
        position: { sizeX: 2, sizeY: 2, row: 0, col: 2 },
        data: [],
        title: "Bucurie"
      },
      {
        position: { sizeX: 1, sizeY: 1, row: 0, col: 4 },
        data: [],
        title: "Bunăstare"
      },
      {
        position: { sizeX: 1, sizeY: 1, row: 0, col: 5 },
        data: [],
        title: "Amabilitate"
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

    vm.dataManager = (function () {
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

      return {
        getLocations: getLocations,
        getBlocks: getBlocks

      };
    })();

    console.log(vm.dataManager.getBlocks());

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
