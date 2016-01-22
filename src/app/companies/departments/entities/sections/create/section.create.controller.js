(function() {
  'use strict';

  angular
    .module('spark')
    .controller('SectionCreateController', SectionCreateController);

  /** @ngInject */
  function SectionCreateController ( $log, $state, models, user, company, department, entity ) {
    $log.debug('Entered SectionCreateController');
    var vm = this;

    console.log(company);
    vm.company = company;
    vm.department = department;
    vm.entity = entity;

    vm.saveSection = saveSection;

    activate();

    function activate() {
    }

    function saveSection ( section, isValid, nextState ) {
      section.tenant = user.tenantId;
      section.entity = entity.id;
      section = models.restangularizeElement(null, section, 'sections');
      if ( isValid ) {
        section.save().then(saveDepartmentSuccessFn, saveDepartmentErrorFn);
      }

      function saveDepartmentSuccessFn ( response ) {
        entity.addSection(response);
        $state.go(nextState, {sectionId: response.id});
      }
      function saveDepartmentErrorFn () {
        // TODO deal with the error
      }
    }

  }
})();
