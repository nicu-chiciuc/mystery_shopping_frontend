(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msCheckboxList', msCheckboxList);

  /** @ngInject */
  function msCheckboxList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/checkbox_list/checkbox-list.html',
      scope: {
        checkboxListElements: '=',
        checkboxListOptions: '=',
        targetList: '='
      },
      controller: CheckboxListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CheckboxListController ( $scope ) {
      var vm = this;

      // Create a shortcut for vm.checkboxListOptions in template.
      $scope.clo = vm.checkboxListOptions;

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
