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
        project: '='
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

    }
  }

})();
