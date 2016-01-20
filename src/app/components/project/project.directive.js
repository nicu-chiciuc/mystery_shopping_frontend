(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msProject', msProject);

  /** @ngInject */
  function msProject() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/project.html',
      scope: {
        project: '=',
        clients: '=',
        projectManagers: '=',
        projectWorkers: '=',
        questionnaireTemplates: '=',
        scripts: '='
      },
      controller: ProjectController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectController ( $log ) {
      $log.debug('Entered Project1Controller');
      var vm = this;

    }
  }

})();
