/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('AbstractEvaluationModel', AbstractEvaluationModel);

  /** @ngInject */
  function AbstractEvaluationModel ( contentTypes, ShopperModel, CompanyEmployeeModel, CompanyManagerModel ) {
    var Model = {
      initializeAbstractEvaluation: initializeAbstract
    };

    return Model;


    function initializeAbstract () {
      function initializeOneObject ( obj ) {
        obj.subjectOfEvaluation = getSubjectOfEvaluation(obj);

        angular.extend(obj.shopper_repr, ShopperModel);
        obj.shopper_repr.initialize();
      }

      var evaluation = this;

      // In case the return value from a POST request is an array (as it can be on the plann
      // evaluations page), initialize each element of the array independently.
      if (_.isArray(evaluation) ) {
        _.forEach(evaluation, function (singleEvaluation) {
          initializeOneObject(singleEvaluation);
        });

      // Otherwise, initialize the object.
      } else {
        initializeOneObject(evaluation);
      }

    }

    function getSubjectOfEvaluation ( evaluation ) {
      var subjectOfEvaluation = {};
      if ( evaluation.employee_id ) {
        if ( evaluation.employee_type === contentTypes.clientemployee ) {
          angular.extend(evaluation.employee_repr, CompanyEmployeeModel);
          evaluation.employee_repr.initialize();
        } else if ( evaluation.employee_type === contentTypes.clientmanager ) {
          angular.extend(evaluation.employee_repr, CompanyManagerModel);
          evaluation.employee_repr.initialize();
        }
        subjectOfEvaluation = evaluation.employee_repr;
        subjectOfEvaluation.displayName = subjectOfEvaluation.fullName;
        subjectOfEvaluation.icon = 'person';
      } else if ( evaluation.section ) {
        subjectOfEvaluation = evaluation.section_repr;
        subjectOfEvaluation.displayName = subjectOfEvaluation.name;
        subjectOfEvaluation.icon = 'domain';
      } else {
        subjectOfEvaluation = evaluation.entity_repr;
        subjectOfEvaluation.displayName = subjectOfEvaluation.name;
        subjectOfEvaluation.icon = 'domain';
      }

      return subjectOfEvaluation;
    }

  }
})();
