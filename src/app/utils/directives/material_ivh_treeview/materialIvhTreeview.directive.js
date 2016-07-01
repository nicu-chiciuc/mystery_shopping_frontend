(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msMaterialIvhTreeview', msMaterialIvhTreeview)
    .directive('msCustomCheckbox', msCustomCheckbox);

  // Probably this wasn't the most elegant solution but I was to tired to think better
  var veryBadGlobal = {};

  function msCustomCheckbox(ivhTreeviewMgr) {
    return {
      restrict: 'AE',
      scope: {
        tree: '=',
        node: '=',
        currentVm: '='
      },
      template: '<md-checkbox ng-disabled="!tree.available" ng-checked="node.selected" md-indeterminate="node.__ivhTreeviewIndeterminate"></md-checkbox>',
      link: function (scope, element, attrs) {
        element.on('click', function () {
          if (scope.tree.available) {
            ivhTreeviewMgr.select(scope.tree, scope.node, !scope.node.selected);

            veryBadGlobal.onClick(scope.tree, scope.node, !scope.node.selected);
            scope.$apply();
          }
        });
      }
    };
  }

  /** @ngInject */
  function msMaterialIvhTreeview() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/material_ivh_treeview/material-ivh-treeview.html',
      scope: {
        tree: '=',
        nodeClick: '&'
      },
      controller: MaterialIvhTreeviewController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function MaterialIvhTreeviewController ($scope) {
      var vm = this;

      veryBadGlobal.onClick = function (tree, node, selected) {
        vm.nodeClick({
          root: tree,
          node: node,
          selected: selected
        });
      }
    }
  }
})();
