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

    vm.submit = function () {};

    activate();

    function activate() {
    }

  }
})();
