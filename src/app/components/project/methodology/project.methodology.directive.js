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
        questionnaireTemplates: '=',
        saveProjectMethod: '&'
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
      vm.project.research_methodology = vm.project.research_methodology || {};
      vm.project.research_methodology.scripts = vm.project.research_methodology.scripts || [];
      vm.project.research_methodology.questionnaires = vm.project.research_methodology.questionnaires || [];
      vm.project.research_methodology.project_id = vm.project.id;

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
