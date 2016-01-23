(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msNestedCheckboxList', msNestedCheckboxList);

  /** @ngInject */
  function msNestedCheckboxList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/nested_checkbox_list/nested-checkbox-list.html',
      scope: {
        nestedCheckboxListItems: '=',
        nestedCheckboxListOptions: '=',
        targetList: '='
      },
      controller: NestedCheckboxListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NestedCheckboxListController ( $log, $scope ) {
      $log.debug('Entered NestedCheckboxListController');
      var vm = this;

      // Create a shortcut for vm.checkboxListOptions in template.
      $scope.nclo = vm.nestedCheckboxListOptions;

      $scope.nclo.children = $scope.nclo.children || [];

      // Checkbox actions definition
      vm.checkboxListToggle = checkboxListToggle;
      vm.checkboxListState = checkboxListState;

      function checkboxListToggle ( item, list, itemKey ) {
        var value = itemKey ? item[itemKey] : item;
        var idx = list.indexOf(value);
        if (idx > -1) list.splice(idx, 1);
        else
          list.push(value);
      }

      function checkboxListState (item, list, itemKey) {
        var value = itemKey ? item[itemKey] : item;
        return list.indexOf(value) > -1;
      }

    }
  }

})();
