/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ProjectManagerModel', ProjectManagerModel);

  /** @ngInject */
  function ProjectManagerModel ( AbstractAccountModel ) {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var projectManager = this;

      angular.extend(projectManager.user, AbstractAccountModel);
      projectManager.user.initializeAbstract();
    }
  }
})();
