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
        targetLists: '='
      },
      controller: RecursiveCheckboxListController,
      controllerAs: 'vm',
      bindToController: true,
      compile: function (element) { return RecursionHelper.compile(element); }
    };

    return directive;

    /** @ngInject */
    function RecursiveCheckboxListController ( $log, $scope ) {
      $log.debug('Entered RecursiveCheckboxListController');
      var vm = this;

      // Create a shortcut for vm.checkboxListOptions in template.
      $scope.rclo = vm.recursiveCheckboxListOptions;

      $scope.currentItem = vm.recursiveCheckboxItem;

      $scope.rclo.children = $scope.rclo.children || [];

      // Checkbox actions definition
      vm.checkboxToggle = checkboxToggle;
      vm.checkboxState = checkboxState;

      function checkboxToggle ( item, itemOptions ) {
        var value = itemOptions.valueProp ? item[itemOptions.valueProp] : item;
        if ( itemOptions.includeInList ) {
          toggleItemInList(item, itemOptions);
        }
        var idx = list.indexOf(value);
        if (idx > -1) list.splice(idx, 1);
        else
          list.push(value);
      }

      function checkboxState (item, list, itemKey) {
        var value = itemKey ? item[itemKey] : item;
        //return list.indexOf(value) > -1;
      }

      function toggleItemInList ( item, itemOptions ) {
        if ( itemOptions.includeInList ) {
          toggleItemInList(item);
        }
      }

    }
  }

})();
