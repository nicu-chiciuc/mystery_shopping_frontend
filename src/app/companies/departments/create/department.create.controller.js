(function() {
  'use strict';

  angular
    .module('spark')
    .controller('DepartmentCreateController', DepartmentCreateController);

  /** @ngInject */
  function DepartmentCreateController ( $log, company ) {
    $log.debug('Entered DepartmentCreateController');
    var vm = this;


    activate();

    function activate() {
    }

  }
})();
