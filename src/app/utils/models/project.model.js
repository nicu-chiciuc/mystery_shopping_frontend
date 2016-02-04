/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ProjectModel', ProjectModel);

  /** @ngInject */
  function ProjectModel ( CompanyModel, TenantProjectManagerModel, TenantProductManagerModel ) {
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

      // Create other properties that will serve as datepicker ngModel values
      // This is done because on save, DRF returns an error that the format of the
      // date is incorrect and should be YYYY-MM-DD. However, if period_start and
      // period_end dates are formatted to strings in the above format, datepicker
      // throws an error that ngModel should not be a string value.
      if ( project.period_start ) {
        project.start_date = new Date(project.period_start);
        project.end_date = new Date(project.period_end);
      }

      if ( project.project_manager_repr ) {
        angular.extend(project.project_manager_repr, projectManagerModels[project.project_manager_repr.type])
        project.project_manager_repr.initialize();
      }

      project.state = getProjectState(project);

      if ( project.company_repr ) {
        angular.extend(project.company_repr, CompanyModel);
        project.company_repr.initialize();
      }
    }

    function getProjectState ( project ) {
      if ( project.shoppers && project.shoppers.length > 0 ) {
        return 4;
      } else if ( (project.research_methodology && project.research_methodology.places_to_assess_repr && project.research_methodology.places_to_assess_repr.length > 0)
        || (project.research_methodology && project.research_methodology.people_to_assess_repr && project.research_methodology.people_to_assess_repr.length > 0) ) {
        return 3;
      } else if ( project.research_methodology && project.research_methodology.questionnaires && project.research_methodology.questionnaires.length > 0
        && project.research_methodology && project.research_methodology.scripts && project.research_methodology.scripts.length > 0 ) {
        return 2;
      } else if ( project.company_repr ) {
        return 1;
      } else {
        return 0;
      }
    }
  }
})();
