(function() {
  'use strict';

  angular
    .module('spark')
    .controller('Project1Controller', ProjectFormController);

  /** @ngInject */
  function ProjectFormController ( $scope, $log, $filter, $state, models, projects ) {
    $log.debug('Entered ProjectMethodologyFormController');
    $log.debug('Project object equals to:');
    var vm = this;

    vm.projects = projects;

    vm.saveProject = saveProject;
    vm.checkboxListToggle = checkboxListToggle;
    vm.checkboxListState = checkboxListState;

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
