(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msNestedQuestionnaireBlock', msNestedQuestionnaireBlock);

  /** @ngInject */
  function msNestedQuestionnaireBlock ( RecursionHelper ) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/questionnaire/nested_block/nested-questionnaire-block.html',
      scope: {
        block: '=',
        questionnaire: '=',
        questionCheckboxListOptions: '='
      },
      compile: function (element) { return RecursionHelper.compile(element); }
    };

    return directive;
  }

})();
