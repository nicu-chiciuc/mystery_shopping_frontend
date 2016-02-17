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
        obj.typeTranslationKey = getSubjectOfEvaluationTranslationKey(obj);

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
        subjectOfEvaluation = evaluation.employee_repr;

        if ( evaluation.employee_type === contentTypes.clientemployee ) {
          angular.extend(evaluation.employee_repr, CompanyEmployeeModel);
          evaluation.employee_repr.initialize();
          subjectOfEvaluation.type = 'employee';
        } else if ( evaluation.employee_type === contentTypes.clientmanager ) {
          angular.extend(evaluation.employee_repr, CompanyManagerModel);
          evaluation.employee_repr.initialize();
          subjectOfEvaluation.type = 'manager';
        }
        subjectOfEvaluation.displayName = subjectOfEvaluation.fullName;
        subjectOfEvaluation.icon = 'person';
      } else if ( evaluation.section ) {
        subjectOfEvaluation = evaluation.section_repr;
        subjectOfEvaluation.displayName = subjectOfEvaluation.name;
        subjectOfEvaluation.icon = 'domain';
        subjectOfEvaluation.type = 'section';
      } else {
        subjectOfEvaluation = evaluation.entity_repr;
        subjectOfEvaluation.displayName = subjectOfEvaluation.name;
        subjectOfEvaluation.icon = 'domain';
        subjectOfEvaluation.type = 'entity';
      }

      return subjectOfEvaluation;
    }

    function getSubjectOfEvaluationTranslationKey ( evaluation ) {
      switch ( evaluation.subjectOfEvaluation.type ) {
        case 'employee': return 'CONTENT_TYPE.' + contentTypes.clientemployee;
        case 'manager': return 'CONTENT_TYPE.' + contentTypes.clientmanager;
        case 'section': return 'CONTENT_TYPE.' + contentTypes.section;
        case 'entity': return 'CONTENT_TYPE.' + contentTypes.entity;
      }
    }

  }
})();
