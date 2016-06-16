(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msGridPanelWidget', msGridPanelWidget);

  /** @ngInject */
  function msGridPanelWidget() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/gridpanel/gridpanel_widget/gridpanel-widget.html',
      scope: {
        locationData: '=',
        blockData: '=',
        timeData: '=',
        data: '='
      },
      controller: GridPanelWidgetController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function GridPanelWidgetController ($scope) {
      var vm = this;

      console.log($scope);
      vm.project = $scope.$parent.project;

      console.log(d3);
      console.log($scope);

      $scope.$on('refresh-yourself', function (event, data) {
        console.log(data.data);



        vm.api.refresh();
      });

      vm.options = {
        chart: {
          type: 'multiBarChart',
          // height: 450,

          margin : {
            top: 30,
            right: 20,
            //
            bottom: 45,
            left: 45
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

      vm.api = {

      };

      console.log(vm);

      vm.data = [
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

    }
  }
})();
