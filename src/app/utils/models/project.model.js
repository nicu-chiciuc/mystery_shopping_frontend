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

      angular.extend(project.company_repr, CompanyModel);
      project.company_repr.initialize();
    }
  }
})();
