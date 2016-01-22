(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msProjectBasicInfo', msProjectBasicInfo);

  /** @ngInject */
  function msProjectBasicInfo() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/basic_info/project-basic-info.html',
      scope: {
        project: '=',
        companies: '=',
        projectManagers: '=',
        projectWorkers: '='
      },
      controller: ProjectBasicInfoController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectBasicInfoController ( $filter, $log ) {
      $log.debug('Entered ProjectBasicInfoController');
      var vm = this;

      // If it's a new project, it doesn't have any consultants list, so create one.
      vm.project.consultants = vm.project.consultants || [];

      vm.projectWorkersCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.CONSULTANTS'),
        labelProp: 'displayName',
        valueProp: 'id'
      };
    }
  }

})();
