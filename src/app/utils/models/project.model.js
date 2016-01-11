/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ProjectModel', ProjectModel);

  /** @ngInject */
  function ProjectModel () {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var project = this;
    }
  }
})();
