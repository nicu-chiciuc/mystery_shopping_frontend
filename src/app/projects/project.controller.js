(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ProjectController', ProjectController);

  /** @ngInject */
  function ProjectController ( $log, projects ) {
    $log.debug('Entered ProjectController');
    var vm = this;

    vm.projects = projects;

    vm.submit = function () {};

    activate();

    function activate() {
    }

  }
})();
