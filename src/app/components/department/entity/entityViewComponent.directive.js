(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msEntityViewComponent', msEntityViewComponent);

  /** @ngInject */
  function msEntityViewComponent () {
    var directive = {
      restrict: 'E',
      replace: true,
      templateUrl: 'app/components/department/entity/entity.html',
      scope: {
          entity: '='
      },
      controller: EntityViewComponentController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function EntityViewComponentController () {
      var vm = this;

    }
  }

})();
