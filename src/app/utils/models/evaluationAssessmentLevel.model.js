/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('EvaluationAssessmentLevelModel', EvaluationAssessmentLevelModel);

  /** @ngInject */
  function EvaluationAssessmentLevelModel ( TenantProjectManagerModel, TenantConsultantModel ) {
    var Model = {
      initialize: initialize,
      containsConsultant: containsConsultant
    };

    return Model;


    function initialize () {
      var assessmentLevel = this;

      if ( assessmentLevel.project_manager_repr ) {
        angular.extend(assessmentLevel.project_manager_repr, TenantProjectManagerModel);
        assessmentLevel.project_manager_repr.initialize();
      }

      _.forEach(assessmentLevel.consultants_repr, function (consultant) {
        angular.extend(consultant, TenantConsultantModel);
        consultant.initialize();
      });

    }

    function containsConsultant ( consultantId ) {
      var assessmentLevel = this;
      var containsConsultant = false;

      _.forEach(assessmentLevel.consultants_repr, function (consultant) {
        containsConsultant = containsConsultant || consultant.id === consultantId;
      });

      return containsConsultant;
    }
  }
})();
