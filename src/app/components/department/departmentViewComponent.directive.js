(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msDepartmentViewComponent', msDepartmentViewComponent);

  /** @ngInject */
  function msDepartmentViewComponent () {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/department/department.html',
      scope: {
          department: '='
      },
      controller: DepartmentViewComponentController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function DepartmentViewComponentController () {
      var vm = this;

    }
  }

})();
