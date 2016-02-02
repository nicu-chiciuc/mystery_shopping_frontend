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
        shoppers: '='
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

      console.log(vm.project);
      console.log(vm.questionnaireTemplates);
      console.log(vm.scripts);
      // If it's a new project, it doesn't have any consultants list, so create one.
      vm.project.shoppers = vm.project.shoppers || [];

      vm.shoppersCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.SHOPPERS'),
        labelProp: 'fullName',
        valueProp: 'id'
      };
    }
  }

})();
