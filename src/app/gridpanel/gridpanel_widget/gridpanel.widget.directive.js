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
        timeData: '='
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

      $scope.$on('refresh-yourself', function () {
        vm.api.refreshWithTimeout(5);

      });

      $scope.$on('gridster-resized', function(sizes, gridster) {
        console.log('gridster-resized from widget');
      });

      vm.options = {
        chart: {
          type: 'multiBarChart',
          // height: 450,

          margin : {
            top: 20,
            right: 20,
            bottom: 20,
            left: 45
          },
          clipEdge: true,
          //staggerLabels: true,
          duration: 500,
          stacked: true,
          xAxis: {
            axisLabel: 'Time (ms)',
            showMaxMin: false,
            tickFormat: function(d){
              return d3.format(',f')(d);
            }
          },
          yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: -20,
            tickFormat: function(d){
              return d3.format(',.1f')(d);
            }
          }
        }
      };

      vm.api = {

      };

      console.log(vm);

      vm.data = [
        {
          key: 'Easiness',
          values: [
            {x: 1, y: 10},
            {x: 2, y: 20},
            {x: 3, y: 15},
            {x: 4, y: 12},
            {x: 5, y: 20},
          ]
        }
      ];

      /* Random Data Generator (took from nvd3.org) */
      function generateData() {
        return stream_layers(1,50+Math.random()*50,.1).map(function(data, i) {
          return {
            key: 'Stream' + i,
            values: data
          };
        });
      }

      /* Inspired by Lee Byron's test data generator. */
      function stream_layers(n, m, o) {
        if (arguments.length < 3) o = 0;
        function bump(a) {
          var x = 1 / (.1 + Math.random()),
            y = 2 * Math.random() - .5,
            z = 10 / (.1 + Math.random());
          for (var i = 0; i < m; i++) {
            var w = (i / m - y) * z;
            a[i] += x * Math.exp(-w * w);
          }
        }
        return d3.range(n).map(function() {
          var a = [], i;
          for (i = 0; i < m; i++) a[i] = o + o * Math.random();
          for (i = 0; i < 5; i++) bump(a);
          return a.map(stream_index);
        });
      }

      /* Another layer generator using gamma distributions. */
      function stream_waves(n, m) {
        return d3.range(n).map(function(i) {
          return d3.range(m).map(function(j) {
            var x = 20 * j / m - i / 3;
            return 2 * x * Math.exp(-.5 * x);
          }).map(stream_index);
        });
      }

      function stream_index(d, i) {
        return {x: i, y: Math.max(0, d)};
      }
    }
  }
})();
