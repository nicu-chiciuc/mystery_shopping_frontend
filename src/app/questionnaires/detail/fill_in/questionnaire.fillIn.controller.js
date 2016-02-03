(function() {
  'use strict';

  angular
    .module('spark')
    .controller('QuestionnaireFillInController', QuestionnaireFillInController);

  /** @ngInject */
  function QuestionnaireFillInController ( $log, questionnaire ) {
    $log.debug('Entered QuestionnaireFillInController');
    var vm = this;

    vm.questionnaire = questionnaire;

    vm.questionCheckboxListOptions = {
      labelProp: 'text',
      valueProp: 'id'
    };


    activate();

    function activate() {
    }

  }
})();
