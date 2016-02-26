(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msProjectBasicInfo', msProjectBasicInfo);

  /** @ngInject */
  function msProjectBasicInfo() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/basic_info/project-basic-info.html',
      scope: {
        project: '=',
        companies: '=',
        projectManagers: '=',
        tenantConsultants: "=",
        saveProjectMethod: '&'
      },
      controller: ProjectBasicInfoController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectBasicInfoController ( $filter, $log, msUtils, managementFlow ) {
      $log.debug('Entered ProjectBasicInfoController');
      var vm = this;

      vm.msUtils = msUtils;

      vm.project.project_workers_repr = vm.project.project_workers_repr || [];
      vm.project.company = managementFlow.getCompany().id;

      vm.saveProject = saveProject;

      vm.consultantsCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.CONSULTANTS'),
        labelProp: 'user.fullName',
        valueProp: 'id',
        showValidationMessages: false,
        validationMessageEntity: 'COMPANY.CONSULTANT'
      };

      function saveProject ( project, form ) {
        var validConsultants = !!project.consultants.length;

        vm.saveProjectMethod({project: project, isValid: form.$valid && validConsultants});
        vm.consultantsCheckboxListOptions.showValidationMessages = !validConsultants;
      }
    }
  }

})();
