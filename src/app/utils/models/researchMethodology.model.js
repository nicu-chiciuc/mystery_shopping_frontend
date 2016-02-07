/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ResearchMethodologyModel', ResearchMethodologyModel);

  /** @ngInject */
  function ResearchMethodologyModel () {
    var Model = {
      initialize: initialize
    };

    return Model;


    function initialize () {
      var researchMethodology = this;

      researchMethodology.scripts = researchMethodology.scripts || [];
      researchMethodology.questionnaires = researchMethodology.questionnaires || [];
      researchMethodology.places_to_assess_repr = researchMethodology.places_to_assess_repr || [];
      researchMethodology.people_to_assess_repr = researchMethodology.people_to_assess_repr || [];
    }

  }
})();
