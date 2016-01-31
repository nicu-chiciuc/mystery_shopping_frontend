(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msQuestionnaireGenericQuestion', msQuestionnaireGenericQuestion);

  /** @ngInject */
  function msQuestionnaireGenericQuestion () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/questionnaire_generic_question/questionnaire-generic-question.html',
      scope: {
        question: '='
      },
      controller: QuestionnaireGenericQuestionController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function QuestionnaireGenericQuestionController ( $scope, $compile ) {
      var vm = this;

    }
  }

})();
