(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msProjectMethodology', msProjectMethodology);

  /** @ngInject */
  function msProjectMethodology() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/methodology/project-methodology.html',
      scope: {
        project: '=',
        scripts: '=',
        questionnaireTemplates: '='
      },
      controller: ProjectMethodologyController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectMethodologyController ( $filter, $log ) {
      $log.debug('Entered ProjectMethodologyController');
      var vm = this;

      console.log(vm.project);
      console.log(vm.questionnaireTemplates);
      console.log(vm.scripts);
      // If it's a new project, it doesn't have any consultants list, so create one.
      vm.project.methodology = vm.project.methodology || {};
      vm.project.methodology.scripts = vm.project.methodology.scripts || [];
      vm.project.methodology.questionnaires = vm.project.methodology.questionnaires || [];
      vm.saveMethodology = function () {};

      vm.questionnaireTemplatesCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.METHODOLOGY.QUESTIONNAIRES'),
        labelProp: 'title',
        valueProp: 'id'
      };
      vm.scriptsCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.METHODOLOGY.SCRIPTS'),
        labelProp: 'title',
        valueProp: 'id'
      };
    }
  }

})();
