(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msProjectEvaluationLevels', msProjectEvaluationLevels);

  /** @ngInject */
  function msProjectEvaluationLevels () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/evaluation_levels/project-evaluation-levels.html',
      scope: {
        project: '=',
        tenantConsultants: "=",
        saveProjectMethod: '&'
      },
      controller: ProjectEvaluationLevelsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectEvaluationLevelsController ( $filter, $log, managementFlow ) {
      $log.debug('Entered ProjectEvaluationLevelsController');
      var vm = this;

      //vm.projectConsultants = _.filter(vm.tenantConsultants, function (consultant) {
      //  return vm.project.consultants.indexOf(consultant.id) > -1;
      //});

    }
  }

})();
