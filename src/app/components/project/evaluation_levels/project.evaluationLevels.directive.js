/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msProjectEvaluationLevels', msProjectEvaluationLevels);

  /** @ngInject */
  function msProjectEvaluationLevels () {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/project/evaluation_levels/project-evaluation-levels.html',
      scope: {
        project: '=',
        tenantConsultants: "=",
        saveProjectMethod: '&'
      },
      controller: ProjectEvaluationLevelsController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function ProjectEvaluationLevelsController ( $scope, $log, dragulaService, models ) {
      $log.debug('Entered ProjectEvaluationLevelsController');
      var vm = this;

      vm.addAssessmentLevel = addAssessmentLevel;
      vm.toggleProjectManagerOnLevel = toggleProjectManagerOnLevel;
      vm.saveEvaluationAssessmentLevel = saveEvaluationAssessmentLevel;

      $scope.$on('evaluator-bag.drop-model', function () {
        _.forEach(vm.project.evaluation_assessment_levels_repr, function (assessmentLevel) {
          if ( assessmentLevel.consultants_repr.length !== assessmentLevel.consultants.length ) {
            assessmentLevel.showSaveLevelButton = true;
          }
          assessmentLevel.consultants = _.map(assessmentLevel.consultants_repr, 'id');
        });
        vm.project.hideAddAssessmentLevelButton = !allEvaluationLevelsAreSaved();
      });

      activate();

      function activate () {
        dragulaService.options($scope, 'evaluator-bag', {
          moves: function (el, container, handle) {
            return handle.className.indexOf('evaluator-empty-container') === -1;
          }
        });
      }

      function addAssessmentLevel () {
        var nrOfLevels = vm.project.evaluation_assessment_levels_repr.length;
        var newLevel = {
          project: vm.project.id,
          consultants: [],
          consultants_repr: [],
          level: nrOfLevels + 1,
          showSaveLevelButton: true
        };
        newLevel.previous_level = nrOfLevels > 0
          ? vm.project.evaluation_assessment_levels_repr[nrOfLevels-1].id
          : null;

        vm.project.evaluation_assessment_levels_repr.push(newLevel);
        vm.project.hideAddAssessmentLevelButton = true;
      }

      function toggleProjectManagerOnLevel ( levelObj ) {
        if ( levelObj.project_manager_repr ) {
          levelObj.project_manager_repr = undefined;
          levelObj.project_manager = null;
        } else {
          levelObj.project_manager_repr = vm.project.project_manager_repr;
          levelObj.project_manager = vm.project.project_manager;
        }
        levelObj.showSaveLevelButton = true;
        vm.project.hideAddAssessmentLevelButton = !allEvaluationLevelsAreSaved();
      }

      function saveEvaluationAssessmentLevel ( levelObj ) {
        levelObj = models.restangularizeElement(null, levelObj, 'evaluationassessmentlevels');
        if ( levelObj.id ) {
          levelObj.put().then(levelObjectSaveSuccessFn, levelObjectSaveErrorFn);
        } else {
          levelObj.post().then(levelObjectSaveSuccessFn, levelObjectSaveErrorFn);
        }
        function levelObjectSaveSuccessFn ( response ) {
          levelObj.id = response.id;
          levelObj.showSaveLevelButton = false;
          vm.project.hideAddAssessmentLevelButton = !allEvaluationLevelsAreSaved();
        }
        function levelObjectSaveErrorFn () {
          // TODO deal with the error
        }
      }

      function allEvaluationLevelsAreSaved () {
        var allLevelsAreSaved = true;
        _.forEach(vm.project.evaluation_assessment_levels_repr, function (assessmentLevel) {
          allLevelsAreSaved = allLevelsAreSaved && !assessmentLevel.showSaveLevelButton;
        });
        return allLevelsAreSaved;
      }
    }
  }

})();
