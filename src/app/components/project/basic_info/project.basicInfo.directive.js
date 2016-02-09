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
    function ProjectBasicInfoController ( $filter, $log, managementFlow ) {
      $log.debug('Entered ProjectBasicInfoController');
      var vm = this;

      vm.project.project_workers_repr = vm.project.project_workers_repr || [];
      vm.project.company = managementFlow.getCompany().id;

      //vm.selectProjectManager = selectProjectManager;

      vm.consultantsCheckboxListOptions = {
        showLegend: true,
        legendTitle: $filter('translate')('PROJECT.CONSULTANTS'),
        labelProp: 'user.fullName',
        valueProp: 'id'
        //valueProp: function ( item ) {
        //  return {
        //    project_worker_id: item.id,
        //    project_worker_type: item.contentTypeId
        //  };
        //}
      };

      //function selectProjectManager ( project, projectManager ) {
      //  project.project_manager_id = projectManager.id;
      //  project.project_manager_type = projectManager.contentTypeId;
      //}
    }
  }

})();
