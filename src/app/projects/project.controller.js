(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ProjectController', ProjectController);

  /** @ngInject */
  function ProjectController ( $log ) {
    $log.debug('Entered ProjectController');
    var vm = this;

    vm.submit = function () {};

    activate();

    function activate() {
    }

  }
})();
