(function () {
  'use strict'

  angular
    .module('spark')
    .directive('testD3', testD3);

  function testD3 () {
    var directive = {
      templateUrl: 'app/gridpanel/test_d3/test-d3.html',
      scope: {
        data: '=',
        sup: '@'
      },

      controller: TestD3Controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function TestD3Controller ($scope) {
      var vm = this;

      vm.showData = function () {
        // console.log($scope);
        console.log(vm.data);
      };


    }
  }
})();
