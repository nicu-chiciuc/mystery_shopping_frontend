(function() {
  'use strict';

  angular
    .module('spark')
    .controller('QuestionnaireFillInController', QuestionnaireFillInController);

  /** @ngInject */
  function QuestionnaireFillInController ( $log, questionnaireTemplate ) {
    $log.debug('Entered QuestionnaireFillInController');
    var vm = this;

    vm.questionnaire = questionnaireTemplate;

    vm.questionCheckboxListOptions = {
      labelProp: 'text',
      valueProp: 'id'
    };


    activate();

    function activate() {
    }

  }
})();
