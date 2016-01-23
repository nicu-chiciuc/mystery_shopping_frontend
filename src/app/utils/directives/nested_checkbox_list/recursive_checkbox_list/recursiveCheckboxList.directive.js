(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msRecursiveCheckboxList', msRecursiveCheckboxList);

  /** @ngInject */
  function msRecursiveCheckboxList ( RecursionHelper ) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/nested_checkbox_list/recursive_checkbox_list/recursive-checkbox-list.html',
      scope: {
        recursiveCheckboxItem: '=',
        recursiveCheckboxListOptions: '=',
        targetList: '='
      },
      link: link,
      controller: RecursiveCheckboxListController,
      controllerAs: 'vm',
      bindToController: true,
      compile: function (element) { return RecursionHelper.compile(element); }
    };

    return directive;

    function link (scope, element, attrs) {
      function getRecursiveDirectiveHtml ( child ) {
        return [
          '<div ng-repeat="childOptions in rclo.children">',
          '<ms-recursive-checkbox-list ng-repeat="item in currentItem[\'',
          child.itemsProp,
          '\']" ',
          'recursive-checkbox-item="item" ',
          'recursive-checkbox-list-options="childOptions" ',
          'target-list="vm.targetList">',
          '{{ currentItem }}',
          '</ms-recursive-checkbox-list>',
          '</div>'
        ].join('');
      }
      console.log(element);
      console.log(scope);
      if ( angular.isArray(scope.rclo.children) ) {
        _.forEach(scope.rclo.children, function (child) {
          element.after(getRecursiveDirectiveHtml(child));
        });
        $compile(element.contents())(scope);
      }
    }

    /** @ngInject */
    function RecursiveCheckboxListController ( $log, $scope ) {
      $log.debug('Entered RecursiveCheckboxListController');
      var vm = this;

      // Create a shortcut for vm.checkboxListOptions in template.
      $scope.rclo = vm.recursiveCheckboxListOptions;

      $scope.currentItem = vm.recursiveCheckboxItem;

      $scope.rclo.children = $scope.rclo.children || [];

      // Checkbox actions definition
      vm.checkboxListToggle = checkboxListToggle;
      vm.checkboxListState = checkboxListState;

      function checkboxListToggle ( item, list, itemKey ) {
        //var value = itemKey ? item[itemKey] : item;
        //var idx = list.indexOf(value);
        //if (idx > -1) list.splice(idx, 1);
        //else
        //  list.push(value);
      }

      function checkboxListState (item, list, itemKey) {
        //var value = itemKey ? item[itemKey] : item;
        //return list.indexOf(value) > -1;
      }

    }
  }

})();
