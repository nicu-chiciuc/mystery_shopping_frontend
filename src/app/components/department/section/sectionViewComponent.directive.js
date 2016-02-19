(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msSectionViewComponent', msSectionViewComponent);

  /** @ngInject */
  function msSectionViewComponent () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/department/section/section.html',
      scope: {
        section: '=',
        departmentId: '='
      },
      controller: SectionViewComponentController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SectionViewComponentController () {
      var vm = this;

    }
  }

})();
