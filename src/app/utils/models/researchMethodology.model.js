/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .factory('ResearchMethodologyModel', ResearchMethodologyModel);

  /** @ngInject */
  function ResearchMethodologyModel ( contentTypes, EntityModel, SectionModel, CompanyEmployeeModel, CompanyManagerModel ) {
    var Model = {
      initialize: initialize
    };

    var modelContentTypeDispatcher = {};
    modelContentTypeDispatcher[contentTypes.clientemployee] = CompanyEmployeeModel;
    modelContentTypeDispatcher[contentTypes.clientmanager] = CompanyManagerModel;
    modelContentTypeDispatcher[contentTypes.entity] = EntityModel;
    modelContentTypeDispatcher[contentTypes.section] = SectionModel;

    return Model;


    function initialize () {
      var researchMethodology = this;

      researchMethodology.scripts = researchMethodology.scripts || [];
      researchMethodology.questionnaires = researchMethodology.questionnaires || [];
      researchMethodology.places_to_assess_repr = researchMethodology.places_to_assess_repr || [];
      researchMethodology.people_to_assess_repr = researchMethodology.people_to_assess_repr || [];

      _.forEach(researchMethodology.people_to_assess_repr, function (person) {
        angular.extend(person.person_repr, modelContentTypeDispatcher[person.person_type]);
        person.person_repr.initialize();
      })
    }

  }
})();
