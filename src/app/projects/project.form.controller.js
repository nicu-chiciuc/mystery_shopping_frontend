(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ProjectFormController', ProjectFormController);

  /** @ngInject */
  function ProjectFormController ( $scope, $log, $filter, $state, models, project, companies, projectManagers, questionnaireTemplates, scripts, shoppers, tenantConsultants, user ) {
    $log.debug('Entered ProjectFormController');
    $log.debug('Project object equals to:');
    $log.debug(project);
    var vm = this;

    vm.companies = companies;
    vm.projectManagers = projectManagers;
    vm.tenantConsultants = tenantConsultants;
    vm.questionnaireTemplates = questionnaireTemplates;
    vm.scripts = scripts;
    vm.shoppers = shoppers;
    vm.user = user;

    vm.saveProject = saveProject;

    vm.project = project;

    activate();

    function activate() {
      if ( !vm.project.id ) {
        angular.extend(vm.project, models.manager.ProjectModel);
        vm.project.initialize()
      }
    }

    function saveProject ( project, formIsValid, nextState ) {
      if (formIsValid) {
        project = models.restangularizeElement(null, project, 'projects');
        project.post().then(saveProjectSuccessFn, saveProjectErrorFn);
      }

      function saveProjectSuccessFn () {
        $state.go(nextState);
      }
      function saveProjectErrorFn () {
        // TODO deal with the error
      }
    }

  }
})();
