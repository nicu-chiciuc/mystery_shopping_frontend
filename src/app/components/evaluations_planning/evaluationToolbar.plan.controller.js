(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EvaluationPlanToolbarController', EvaluationPlanToolbarController);

  /** @ngInject */
  function EvaluationPlanToolbarController ( $log, contentTypes, msUtils, company, evaluations, project, evaluationPlanning ) {
    $log.debug('Entered EvaluationPlanToolbarController');
    var vm = this;

    vm.evaluations = evaluations;
    vm.project = project;
    vm.evaluationPlanning = evaluationPlanning;
    vm.msUtils = msUtils;

    vm.evaluationSkeleton = {};

    vm.createEvaluations = createEvaluations;

    activate();

    function activate() {
    }

    function createEvaluations ( evaluationSkeleton, isValid) {
      var evaluationsToCreate = [];
      var itemToAssess = evaluationSkeleton.itemToAssess;

      evaluationSkeleton.project = vm.project.id;
      evaluationSkeleton.questionnaire_script = evaluationSkeleton.questionnaire_script_repr.id;
      evaluationSkeleton.questionnaire_template = evaluationSkeleton.questionnaire_template_repr.id;
      evaluationSkeleton.shopper = evaluationSkeleton.shopper_repr.id;

      if ( isValid ) {
        if ( itemToAssessIsAPlace(itemToAssess) ) {
          if ( itemToAssess.place_type === contentTypes.entity ) {
            setEntityOnEvaluation(itemToAssess.place_id, evaluationSkeleton);
          } else if ( itemToAssess.place_type === contentTypes.section ) {
            setEntityOnEvaluation(itemToAssess.entity, evaluationSkeleton);
            setSectionOnEvaluation(itemToAssess.place_id, evaluationSkeleton);
          }
        } else {
          evaluationSkeleton.employee_id = itemToAssess.person_id;
          evaluationSkeleton.employee_type = itemToAssess.person_type;
          evaluationSkeleton.employee_repr = itemToAssess.person_repr;

          // The itemToAssess is a manager.
          if ( itemToAssess.person_type === contentTypes.clientmanager ) {
            if ( itemToAssess.person_repr.place_type === contentTypes.section ) {
              setEntityBasedOnSection(itemToAssess.person_repr.place_id, evaluationSkeleton);
              setSectionOnEvaluation(itemToAssess.person_repr.place_id, evaluationSkeleton);
            } else {
              setEntityOnEvaluation(itemToAssess.person_repr.place_id, evaluationSkeleton);
            }

          // The itemToAssess is an employee
          } else {
            setEntityOnEvaluation(itemToAssess.person_repr.entity, evaluationSkeleton);
            if ( itemToAssess.person_repr.section ) {
              setSectionOnEvaluation(itemToAssess.person_repr.section, evaluationSkeleton);
            }
          }
        }

        for ( var i = 0; i < evaluationSkeleton.nrOfEvaluations; i++ ) {
          evaluationsToCreate.push(_.cloneDeep(evaluationSkeleton));
        }
        evaluationPlanning.createPlannedEvaluations(evaluationsToCreate);
      }
    }

    function itemToAssessIsAPlace ( item ) {
      return !!item.place_type;
    }

    function setEntityOnEvaluation ( entityId, evaluation ) {
      evaluation.entity_repr = company.getEntityRepr(entityId);
      evaluation.entity = entityId;
    }

    function setSectionOnEvaluation ( sectionId, evaluation ) {
      evaluation.section_repr = evaluation.entity_repr.getSection(sectionId);
      evaluation.section = sectionId;
    }

    function setEntityBasedOnSection ( sectionId, evaluation ) {
      evaluation.entity_repr = company.getEntityOfASection(sectionId);
      evaluation.entity = evaluation.entity_repr.id;
    }

  }
})();
