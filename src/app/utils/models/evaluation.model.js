/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('EvaluationModel', EvaluationModel);

  /** @ngInject */
  function EvaluationModel ( AbstractEvaluationModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var evaluation = this;

      angular.extend(evaluation, AbstractEvaluationModel);
      evaluation.initializeAbstractEvaluation();
    }

  }
})();
