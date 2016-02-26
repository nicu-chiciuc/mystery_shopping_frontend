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
        user: '=',
        saveProjectMethod: '&'
      },
      controller: ProjectMethodologyController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectMethodologyController ( $filter, $log, msUtils ) {
      $log.debug('Entered ProjectMethodologyController');
      var vm = this;

      vm.msUtils = msUtils;

      vm.saveProject = saveProject;

      // If it's a new project, it doesn't have any consultants list, so create one.
      vm.project.research_methodology = vm.project.research_methodology || {};
      vm.project.research_methodology.tenant = vm.user.tenantId;
      vm.project.research_methodology.scripts = vm.project.research_methodology.scripts || [];
      vm.project.research_methodology.questionnaires = vm.project.research_methodology.questionnaires || [];
      vm.project.research_methodology.project_id = vm.project.id;

      vm.questionnaireTemplatesCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.METHODOLOGY.QUESTIONNAIRES'),
        labelProp: 'title',
        valueProp: 'id',
        showValidationMessages: false,
        validationMessageEntity: 'PROJECT.QUESTIONNAIRE'
      };
      vm.scriptsCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.METHODOLOGY.SCRIPTS'),
        labelProp: 'title',
        valueProp: 'id',
        showValidationMessages: false,
        validationMessageEntity: 'PROJECT.SCRIPT'
      };

      function saveProject ( project, form ) {
        var validQuestionnaires = !!project.research_methodology.questionnaires.length;
        var validScripts = !!project.research_methodology.scripts.length;

        vm.saveProjectMethod({project: project, isValid: form.$valid && validQuestionnaires && validScripts});
        vm.questionnaireTemplatesCheckboxListOptions.showValidationMessages = !validQuestionnaires;
        vm.scriptsCheckboxListOptions.showValidationMessages = !validScripts;
      }
    }
  }

})();
