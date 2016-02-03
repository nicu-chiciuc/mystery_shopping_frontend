(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msQuestionnaireQuestionWrapper', msQuestionnaireQuestionWrapper);

  /** @ngInject */
  function msQuestionnaireQuestionWrapper () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/questionnaire/questions/question-wrapper.html',
      scope: {
        question: '=',
        questionnaire: '=',
        questionCheckboxListOptions: '='
      }
    };

    return directive;
  }

})();
