/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ProjectModel', ProjectModel);

  /** @ngInject */
  function ProjectModel ( CompanyModel, TenantProjectManagerModel, TenantProductManagerModel, TenantConsultantModel, ResearchMethodologyModel, ShopperModel, EvaluationAssessmentLevelModel ) {
    var Model = {
      initialize: initialize
    };

    var projectManagerModels = {
      tenantprojectmanager: TenantProjectManagerModel,
      tenantproductmanager: TenantProductManagerModel
    };

    return Model;


    function initialize () {
      var project = this;

      project.displayName = project.period_start + ' - ' + project.period_end;

      project.consultants = project.consultants || [];
      project.consultants_repr = project.consultants_repr || [];
      project.evaluation_assessment_levels_repr = project.evaluation_assessment_levels_repr || [];

      project.research_methodology = project.research_methodology || {};
      angular.extend(project.research_methodology, ResearchMethodologyModel);
      project.research_methodology.initialize();

      // Create other properties that will serve as datepicker ngModel values
      // This is done because on save, DRF returns an error that the format of the
      // date is incorrect and should be YYYY-MM-DD. However, if period_start and
      // period_end dates are formatted to strings in the above format, datepicker
      // throws an error that ngModel should not be a string value.
      if ( project.period_start ) {
        project.start_date = new Date(project.period_start);
        project.end_date = new Date(project.period_end);
      }

      project.shoppers = project.shoppers || [];
      project.shoppers_repr = project.shoppers_repr || [];

      // For usage in recursive checkbox list on project create/update page for selecting
      // people and places to assess.
      project.listOfSpecificType = {};
      project.listOfSpecificType.place = project.research_methodology.places_to_assess_repr;
      project.listOfSpecificType.person = project.research_methodology.people_to_assess_repr;
      project.listOfSpecificType.ignored = [];

      if ( project.project_manager_repr ) {
        angular.extend(project.project_manager_repr, projectManagerModels[project.project_manager_repr.type]);
        project.project_manager_repr.initialize();
      }

      if ( project.company_repr ) {
        angular.extend(project.company_repr, CompanyModel);
        project.company_repr.initialize();
      }

      _.forEach(project.shoppers_repr, function (shopper) {
        angular.extend(shopper, ShopperModel);
        shopper.initialize();
      });

      _.forEach(project.consultants_repr, function (consultant) {
        angular.extend(consultant, TenantConsultantModel);
        consultant.initialize();
      });

      _.forEach(project.evaluation_assessment_levels_repr, function (assessmentLevel) {
        angular.extend(assessmentLevel, EvaluationAssessmentLevelModel);
        assessmentLevel.initialize();
      });

      // Filter out consultants that are already assigned to an assessment evaluation
      // level and assign those that are available to a list that will be used to
      // assign them to other evaluation levels.
      project.availableConsultants = _.filter(project.consultants_repr, function (consultant) {
        var consultantIsAssignedToALevel = false;
        _.forEach(project.evaluation_assessment_levels_repr, function (assessmentLevel) {
          consultantIsAssignedToALevel = consultantIsAssignedToALevel || assessmentLevel.containsConsultant(consultant.id);
        });
        return !consultantIsAssignedToALevel;
      });

      project.isFullyDefined = false;
      project.state = getProjectState(project);
    }

    function getProjectState ( project ) {
      if ( project.evaluation_assessment_levels_repr && project.evaluation_assessment_levels_repr.length > 0 ) {
        project.isFullyDefined = true;
        return 5;
      } else if ( project.shoppers && project.shoppers.length > 0 ) {
        return 4;
      } else if ( project.research_methodology.places_to_assess_repr.length > 0
        || project.research_methodology.people_to_assess_repr.length > 0 ) {
        return 3;
      } else if ( project.research_methodology.questionnaires.length > 0
        && project.research_methodology.scripts.length > 0 ) {
        return 2;
      } else if ( project.company_repr ) {
        return 1;
      } else {
        return 0;
      }
    }
  }
})();
