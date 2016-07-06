(function() {
  'use strict';

  angular
    .module('spark')
    .controller('GridPanelDashboardController', GridPanelDashboardController);

  /** @ngInject */
  function GridPanelDashboardController ( $log, models, project, evaluations, $mdDialog, $mdMedia, currentDashboard, currentUser, ClassificationManager ) {
    $log.debug('Entered GridPanelDashboardController');
    var vm = this;

    activate();

    vm.currentUserName = currentUser.user.first_name + " " + currentUser.user.last_name;
    vm.currentDate = new Date();

    vm.addingNewComment = false;

    vm.isNewDashboard = currentDashboard === null;
    vm.currentDashboard = currentDashboard || {title: 'Default name'};

    vm.project = project;
    vm.addWidget = addWidget;
    vm.saveDashboard = saveDashboard;
    vm.addNewComment = addNewComment;
    vm.deleteWidget = deleteWidget;
    vm.triggerResize = triggerResize;
    vm.showWidgetSettingsDialog = showWidgetSettingsDialog;
    vm.showDashboardSettingsDialog = showDashboardSettingsDialog;

    vm.widgets = [];

    if (!vm.isNewDashboard) {
      var rawWidgets = JSON.parse(currentDashboard.widgets);
      rawWidgets.forEach(function (rawWidget) {
        var widget = addWidget(rawWidget);

        if (widget.graphType == 'places,templates') {
          ClassificationManager.setWidgetData(widget, 'places', 'templates', evaluations);
        }
        else {
          ClassificationManager.setWidgetData(widget, 'templates', 'places', evaluations);
        }

        vm.triggerResize(widget);
      });
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

    function showWidgetSettingsDialog (event, widget) {
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
          dashboard: vm,
          evaluations: evaluations
        }
      })
        .then(function(question) {
          console.log('in then mate');
          // block.addQuestion(question);
        });
    }

    function showDashboardSettingsDialog (event) {
      var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;
      $mdDialog.show({
        controller: 'GridPanelSettingsController as vm',
        templateUrl: 'app/gridpanel/gridpanel_settings/gridpanel-settings.html',
        parent: angular.element(document.body),
        targetEvent: event,
        escapeToClose: false,
        fullscreen: useFullScreen,
        locals: {
          dashboard: vm.currentDashboard
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
          var rawWidget = _.pick(widget, ['position', 'title', 'categoryTypes', 'comments', 'currentCommentIndex']);
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
        categoryTypes: rawWidget.categoryTypes || {

        },

        graphType: rawWidget.graphType || 'places,templates'
      };

      newWidget.position.actualWidget = newWidget;

      vm.widgets.push(newWidget);

      ClassificationManager.updateCategoryTypesOfWidget(newWidget, evaluations);

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
