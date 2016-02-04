(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ProjectListController', ProjectListController);

  /** @ngInject */
  function ProjectListController ( $log, $filter, projects ) {
    $log.debug('Entered ProjectListController');
    var vm = this;

    vm.projects = projects;

    activate();

    function activate() {
    }

  }
})();
