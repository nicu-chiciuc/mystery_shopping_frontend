/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('QuestionnaireModel', QuestionnaireModel);

  /** @ngInject */
  function QuestionnaireModel () {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var questionnaire = this;
    }
  }
})();
