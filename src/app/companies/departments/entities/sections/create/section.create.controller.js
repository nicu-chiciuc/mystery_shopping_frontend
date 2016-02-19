(function() {
  'use strict';

  angular
    .module('spark')
    .controller('SectionCreateController', SectionCreateController);

  /** @ngInject */
  function SectionCreateController ( $log, $state, msUtils, models, user, company, department, entity, section ) {
    $log.debug('Entered SectionCreateController');
    var vm = this;

    vm.company = company;
    vm.department = department;
    vm.entity = entity;
    vm.section = section;

    vm.msUtils = msUtils;

    vm.isNewSection = !vm.section.id;

    vm.saveSection = saveSection;

    activate();

    function activate() {
      vm.section.tenant = user.tenantId;
      vm.section.entity = vm.entity.id;
    }

    function saveSection ( section, isValid ) {
      if ( isValid ) {
        section = models.restangularizeElement(null, section, 'sections');
        if ( vm.isNewSection ) {
          section.post().then(saveDepartmentSuccessFn, saveDepartmentErrorFn);
        } else {
          section.put().then(saveDepartmentSuccessFn, saveDepartmentErrorFn);
        }
      }

      function saveDepartmentSuccessFn ( response ) {
        if ( vm.isNewSection ) {
          vm.entity.addSection(response);
          vm.section.id = response.id;
        }
        goToSectionDetailViewState()
      }
      function saveDepartmentErrorFn () {
        // TODO deal with the error
      }
    }

    function goToSectionDetailViewState () {
      var sectionDetailViewState = $state.current.name.replace(/(create|detail\.edit)/g, 'detail.view');
      $state.go(sectionDetailViewState, {sectionId: vm.section.id, entityId: vm.section.entity, departmentId: vm.department.id});
    }

  }
})();
