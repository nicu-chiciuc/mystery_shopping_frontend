/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ProjectWorkerModel', ProjectWorkerModel);

  /** @ngInject */
  function ProjectWorkerModel () {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var projectWorker = this;

      projectWorker.displayName = projectWorker.name;
    }
  }
})();
