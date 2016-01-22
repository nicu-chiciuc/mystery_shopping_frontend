(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ProjectController', ProjectController);

  /** @ngInject */
  function ProjectController ( $log, projects, companies, projectManagers, projectWorkers, questionnaireTemplates, scripts, shoppers, project ) {
    $log.debug('Entered ProjectController');
    var vm = this;

    vm.projects = projects;
    vm.companies = companies;
    vm.projectManagers = projectManagers;
    vm.projectWorkers = projectWorkers;
    vm.questionnaireTemplates = questionnaireTemplates;
    vm.scripts = scripts;
    vm.shoppers = shoppers;
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
