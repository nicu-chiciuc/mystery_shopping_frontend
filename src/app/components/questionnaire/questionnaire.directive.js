(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msQuestionnaire', msQuestionnaire);

  /** @ngInject */
  function msQuestionnaire() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/questionnaire/questionnaire.html',
      scope: {
        questionnaire: '=',
        questionCheckboxListOptions: '='
      }
    };

    return directive;
  }

})();
