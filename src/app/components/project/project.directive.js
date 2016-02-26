(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msProject', msProject);

  /** @ngInject */
  function msProject () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/project.html',
      scope: {
        project: '=',
        companies: '=',
        projectManagers: '=',
        projectWorkers: '=',
        tenantConsultants: '=',
        questionnaireTemplates: '=',
        scripts: '=',
        shoppers: '=',
        user: '='
      },
      controller: ProjectController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectController ( $log, $state, moment, models, sideMenu, managementFlow ) {
      $log.debug('Entered msProjectController');
      var vm = this;

      vm.isNewProject = !vm.project.id;

      vm.saveProject = saveProject;

      function saveProject ( project, isValid ) {
        project.period_start = moment(project.start_date).format('YYYY-MM-DD');
        project.period_end = moment(project.end_date).format('YYYY-MM-DD');
        project.project_workers = project.project_workers_repr;
        if (isValid) {
          if ( vm.isNewProject ) {
            project.tenant = vm.user.tenantId;
            project = models.restangularizeElement(null, project, 'projects');
            if ( project.state === 0 )
              delete project['research_methodology'];
            project.post().then(saveProjectSuccessFn, saveProjectErrorFn);
          } else {
            project.put().then(saveProjectSuccessFn, saveProjectErrorFn);
          }
        }

        function saveProjectSuccessFn ( response ) {
          if ( vm.isNewProject ) {
            sideMenu.addProjectToProjectsList(response);
          }
          vm.project = response;

          managementFlow.updateProject(response);

          vm.isNewProject = false;

          if ( vm.project.state === 4 ) {
            goToProjectDetailViewState();
          }
        }
        function saveProjectErrorFn () {
          // TODO deal with the error
        }
      }

      function goToProjectDetailViewState () {
        var projectDetailViewState = $state.current.name.replace(/(create|detail\.edit)/g, 'detail.view');
        $state.go(projectDetailViewState, {projectId: vm.project.id});
      }

    }
  }

})();
