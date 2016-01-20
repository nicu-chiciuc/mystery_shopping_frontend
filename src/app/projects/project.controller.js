(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ProjectController', ProjectController);

  /** @ngInject */
  function ProjectController ( $log, projects, clients, projectManagers, projectWorkers, questionnaireTemplates, scripts, project ) {
    $log.debug('Entered ProjectController');
    var vm = this;

    vm.projects = projects;
    vm.clients = clients;
    vm.projectManagers = projectManagers;
    vm.projectWorkers = projectWorkers;
    vm.questionnaireTemplates = questionnaireTemplates;
    vm.scripts = scripts;
    vm.project = project;

    console.log(vm.projects);
    console.log(vm.clients);
    console.log(vm.projectManagers);
    console.log(vm.questionnaireTemplates);
    console.log(vm.scripts);

    vm.submit = function () {};

    activate();

    function activate() {
    }

  }
})();
