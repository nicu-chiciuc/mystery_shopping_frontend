(function() {
  'use strict';

  angular
    .module('spark')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController ( $log ) {
    $log.debug('Entered MainController');
    var vm = this;


    activate();

    function activate() {
      //$log.debug('Activating companies.new state');
      //$state.go('projects.create');
    }

  }
})();
