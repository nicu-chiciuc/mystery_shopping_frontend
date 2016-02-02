/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ProjectModel', ProjectModel);

  /** @ngInject */
  function ProjectModel ( CompanyModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var project = this;

      project.state = getProjectState(project);

      angular.extend(project.company_repr, CompanyModel);
      project.company_repr.initialize();
    }

    function getProjectState ( project ) {
      if ( project.shoppers.length > 0 ) {
        return 4;
      } else if ( project.places_to_assess.length > 0 && project.people_to_assess.length > 0 ) {
        return 3;
      } else if ( project.questionnaires.length > 0 && project.scripts.length > 0 ) {
        return 2;
      } else {
        return 1;
      }
    }
  }
})();
