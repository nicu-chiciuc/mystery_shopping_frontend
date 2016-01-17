(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ProjectFormController', ProjectFormController);

  /** @ngInject */
  function ProjectFormController ( $log, $filter, project, clients, projectManagers, projectWorkers, questionnaireTemplates, scripts ) {
    $log.debug('Entered ProjectFormController');
    $log.debug('Project object equals to:');
    $log.debug(project);
    var vm = this;

    vm.submit = function () {};
    vm.checkboxListToggle = checkboxListToggle;
    vm.checkboxListState = checkboxListState;

    vm.project = project;
    vm.project.consultants = vm.project.consultants || [];

    vm.projectInitialFields = [
      {
        key: 'client',
        type: 'select',
        templateOptions: {
          label: $filter('translate')('PROJECT.CLIENT'),
          labelProp: 'name',
          valueProp: 'id',
          options: clients
          //placeholder: $filter('translate')('COMPANY.PLACEHOLDER.INDUSTRY')
        }
      },
      {
        type: "datepicker",
        key: 'period_start',
        templateOptions: {
          placeholder: $filter('translate')('PROJECT.PLACEHOLDER.START_DATE'),
          label: $filter('translate')('PROJECT.START_DATE')
        }
      },
      {
        type: "datepicker",
        key: 'period_end',
        templateOptions: {
          placeholder: $filter('translate')('PROJECT.PLACEHOLDER.END_DATE'),
          label: $filter('translate')('PROJECT.END_DATE')
        }
      },
      {
        key: 'project_manager',
        type: 'select',
        templateOptions: {
          label: $filter('translate')('PROJECT.PROJECT_MANAGER'),
          labelProp: 'name',
          valueProp: 'id',
          options: projectManagers
        }
      },
      {
        key: "consultants",
        type: "checkbox-list",
        templateOptions: {
          label: $filter('translate')('PROJECT.CONSULTANTS'),
          labelProp: 'name',
          valueProp: 'id',
          options: projectWorkers,
          selectedStateFn: vm.checkboxListState,
          clickActionFn: vm.checkboxListToggle
        }
      }
    ];

    vm.projectMethodologyFields = [
      {
        key: 'number_of_evaluations',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: $filter('translate')('PROJECT.METHODOLOGY.NUMBER_OF_EVALUATIONS'),
          placeholder: $filter('translate')('PROJECT.PLACEHOLDER.METHODOLOGY.NUMBER_OF_EVALUATIONS')
        }
      },
      {
        key: 'questionnaires',
        type: 'select',
        templateOptions: {
          label: $filter('translate')('PROJECT.METHODOLOGY.QUESTIONNAIRES'),
          labelProp: 'name',
          valueProp: 'id',
          options: questionnaireTemplates
        }
      },
      {
        key: 'scripts',
        type: 'select',
        templateOptions: {
          label: $filter('translate')('PROJECT.METHODOLOGY.SCRIPTS'),
          labelProp: 'name',
          valueProp: 'id',
          options: scripts
        }
      }
    ];

    activate();

    function activate() {
    }

    function checkboxListToggle ( item, list ) {
      console.log(item);
      console.log(list);
      var idx = list.indexOf(item);
      if (idx > -1) list.splice(idx, 1);
      else list.push(item);
    }

    function checkboxListState (item, list) {
      console.log(item);
      console.log(list);
      return list.indexOf(item) > -1;
    }
  }
})();
