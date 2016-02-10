(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ProjectController', ProjectController);

  /** @ngInject */
  function ProjectController ( $log, companies, projectManagers, questionnaireTemplates, scripts, shoppers, project ) {
    $log.debug('Entered ProjectController');
    var vm = this;

    vm.companies = companies;
    vm.projectManagers = projectManagers;
    vm.questionnaireTemplates = questionnaireTemplates;
    vm.scripts = scripts;
    vm.shoppers = shoppers;
    vm.project = project;

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
