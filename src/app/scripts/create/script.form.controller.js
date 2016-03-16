/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .controller('ScriptFormController', ScriptFormController);

  /** @ngInject */
  function ScriptFormController ( $log, $state, $mdToast, models, script ) {
    $log.debug('Entered ScriptFormController');
    var vm = this;

    vm.script = script;

    vm.saveScript = saveScript;

    activate();

    function activate() {
      vm.isNewScript = _.isEmpty(vm.script);
    }

    function saveScript ( script, isValid ) {

      if ( isValid ) {
        if ( vm.isNewScript ) {
          script = models.restangularizeElement(null, script, 'scripts');
          script.post().then(saveScriptSuccessFn, saveScriptErrorFn);
        } else {
          script.put().then(saveScriptSuccessFn, saveScriptErrorFn);
        }
      }

      function saveScriptSuccessFn ( response ) {
        vm.script = response;

        // TODO add translation for toast. Have different messages for CREATE/EDIT success
        $mdToast.show(
          $mdToast.simple()
            .textContent('Script successfully created.')
            .theme('success-toast')
            .hideDelay(3000)
        );
        goToScriptDetailViewState();
      }
      function saveScriptErrorFn () {
        // TODO add translation for toast
        $mdToast.show(
          $mdToast.simple()
            .textContent('Error! Please retry')
            .theme('fail-toast')
            .hideDelay(5000)
        );
      }
    }

    function goToScriptDetailViewState () {
      var scriptDetailViewState = $state.current.name.replace(/(create|detail\.edit)/g, 'detail.view');
      $state.go(scriptDetailViewState, {scriptId: vm.script.id});
    }
  }
})();
