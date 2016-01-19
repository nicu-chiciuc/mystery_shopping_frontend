/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ProjectManagerModel', ProjectManagerModel);

  /** @ngInject */
  function ProjectManagerModel () {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var projectManager = this;

      projectManager.displayName = projectManager.name;
    }
  }
})();
