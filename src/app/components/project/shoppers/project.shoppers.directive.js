(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msProjectShoppers', msProjectShoppers);

  /** @ngInject */
  function msProjectShoppers() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/shoppers/project-shoppers.html',
      scope: {
        project: '=',
        shoppers: '=',
        saveProjectMethod: '&'
      },
      controller: ProjectShoppersController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectShoppersController ( $filter, $log ) {
      $log.debug('Entered ProjectShoppersController');
      var vm = this;

      vm.shoppersCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.SHOPPERS'),
        labelProp: 'user.fullName',
        valueProp: 'id'
      };
    }
  }

})();
