(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ProjectFormController', ProjectFormController);

  /** @ngInject */
  function ProjectFormController ( $scope, $log, $filter, $state, models, project, companies, projectManagers, projectWorkers, questionnaireTemplates, scripts, shoppers ) {
    $log.debug('Entered ProjectFormController');
    $log.debug('Project object equals to:');
    $log.debug(project);
    var vm = this;

    vm.companies = companies;
    vm.projectManagers = projectManagers;
    vm.projectWorkers = projectWorkers;
    vm.questionnaireTemplates = questionnaireTemplates;
    vm.scripts = scripts;
    vm.shoppers = shoppers;

    vm.saveProject = saveProject;
    vm.checkboxListToggle = checkboxListToggle;
    vm.checkboxListState = checkboxListState;

    vm.project = project;
    vm.project.consultants = vm.project.consultants || [];

    vm.projectInitialFields = [
      {
        key: 'client',
        type: 'select',
        className: 'md-block',
        templateOptions: {
          label: $filter('translate')('PROJECT.CLIENT'),
          labelProp: 'name',
          valueProp: 'id',
          options: companies,
          required: true,
          flexGtXs: ''
        },
        ngModelAttrs: {
          flexGtXs: {
            bound: 'ng-flex-gt-xs',
            attribute: 'flex-gt-xs'
          }
        }
      },
      {
        type: "datepicker",
        key: 'period_start',
        templateOptions: {
          placeholder: $filter('translate')('PROJECT.PLACEHOLDER.START_DATE'),
          label: $filter('translate')('PROJECT.START_DATE'),
          required: true
        }
      },
      {
        type: "datepicker",
        key: 'period_end',
        templateOptions: {
          placeholder: $filter('translate')('PROJECT.PLACEHOLDER.END_DATE'),
          label: $filter('translate')('PROJECT.END_DATE'),
          required: true
        }
      },
      {
        key: 'project_manager',
        type: 'select',
        templateOptions: {
          label: $filter('translate')('PROJECT.PROJECT_MANAGER'),
          labelProp: 'name',
          valueProp: 'id',
          options: projectManagers,
          required: true
        }
      },
      {
        key: "consultants",
        type: "checkbox-list",
        templateOptions: {
          legend: $filter('translate')('PROJECT.CONSULTANTS'),
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
      _.forEach()
    }

    function saveProject ( project, formIsValid, nextState ) {
      console.log($scope);
      if (formIsValid) {
        project = models.restangularizeElement(null, project, 'projects');
        project.post().then(saveProjectSuccessFn, saveProjectErrorFn);
      }

      function saveProjectSuccessFn () {
        $state.go(nextState);
      }
      function saveProjectErrorFn () {
        // TODO deal with the error
      }
    }

    function checkboxListToggle ( item, list, itemKey ) {
      //console.log(item);
      //console.log(list);
      //console.log(itemKey);
      var value = itemKey ? item[itemKey] : item;
      var idx = list.indexOf(value);
      if (idx > -1) list.splice(idx, 1);
      else
        list.push(value);
    }

    function checkboxListState (item, list, itemKey) {
      //console.log(item);
      //console.log(list);
      var value = itemKey ? item[itemKey] : item;
      return list.indexOf(value) > -1;
    }
  }
})();
