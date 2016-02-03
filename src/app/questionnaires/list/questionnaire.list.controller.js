(function() {
  'use strict';

  angular
    .module('spark')
    .controller('QuestionnaireListController', QuestionnaireListController);

  /** @ngInject */
  function QuestionnaireListController ( $log, questionnaires ) {
    $log.debug('Entered QuestionnaireListController');
    var vm = this;

    vm.questionnaires = questionnaires;
    console.log(questionnaires);

    activate();

    function activate() {
    }

  }
})();
