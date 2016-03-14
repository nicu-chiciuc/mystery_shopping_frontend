(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EditBlockDialogController', EditBlockDialogController);

  /** @ngInject */
  function EditBlockDialogController ( $log, $scope, $mdDialog, $filter, $mdToast, msUtils, models, block, parentBlock, isNewBlock ) {
    $log.debug('Entered EditBlockDialogController');
    $log.debug(block);

    $scope.block = block;
    $scope.parentBlock = parentBlock;

    $scope.msUtils = msUtils;

    $scope.updateAvailableWeight = updateAvailableWeight;

    activate();

    function activate () {
      // Before changing any weight, save current weights so that on close of dialog
      // window without saving, there is a possibility to reset initial weights.
      $scope.parentBlock.setInitialWeights();

      $scope.parentBlock.updateAvailableWeight();

      $scope.availableWeight = $scope.parentBlock.availableWeight + $scope.block.weightToDisplay;
      $scope.otherBlocks = _.filter($scope.parentBlock.template_blocks, function (templateBlock) {

        // Set newWeight to current weight in order to be able to first check availableWeight
        // and in case it is available, update weights
        templateBlock.newWeight = templateBlock.weight;
        templateBlock.newWeightToDisplay = templateBlock.weightToDisplay;

        return templateBlock.title !== block.title;
      });

      if ( !$scope.block.weight ) {
        $scope.block.weight = 0;
        $scope.block.weightToDisplay = 0;
      }
    }

    function updateAvailableWeight ( block ) {
      block.newWeightToDisplay = _.isNumber(block.newWeightToDisplay) ? block.newWeightToDisplay : 0;
      var availableWeight = $scope.msUtils.number.strip($scope.parentBlock.computeAvailableWeight());

      // On any action with weight inputs, remove all tooltips.
      $scope.parentBlock.removeExceededWeightsTooltips();

      if ( availableWeight >= 0 ) {
        $scope.parentBlock.setAvailableWeight(availableWeight);
        $scope.availableWeight = availableWeight + block.newWeightToDisplay;
        block.newWeight = block.newWeightToDisplay / $scope.parentBlock.weightToDisplay * 100;
        block.setWeight(block.newWeight);
      } else {
        block.newWeightToDisplay = block.weightToDisplay;
        block.tooltip = $filter('translate')('QUESTIONNAIRE.AVAILABLE_WEIGHT_EXCEEDED', {ACCEPTABLE_WEIGHT: $scope.availableWeight});
        block.showTooltip = true;
      }
    }

    $scope.cancel = function() {
      if ( isNewBlock ) {
        _.remove($scope.parentBlock.template_blocks, function (templateBlock) {
          return angular.equals(templateBlock, block);
        });
      }
      $scope.parentBlock.resetInitialWeights();
      $mdDialog.cancel();
    };
    $scope.saveBlockChanges = function( block, isValid ) {
      if ( isValid ) {
        block = models.restangularizeElement(null, block, 'templateblocks');
        block.prepareForSave();
        block[block.id ? 'put' : 'post']().then(saveBlockSuccessFn, saveBlockErrorFn);
      }
      function saveBlockSuccessFn ( response ) {
        if ( !block.id ) {
          block.id = response.id;
        }
        block.weight = response.weight;
        block.setParentBlock($scope.parentBlock);
        block.updateChildQuestionsParentBlock();
        block.updateAvailableWeight();

        $mdToast.show(
          $mdToast.simple()
            .textContent($scope.msUtils.translation.genericSaveSuccessToast('QUESTIONNAIRE.BLOCK.HEADING'))
            .theme('success-toast')
            .hideDelay(3000)
        );

        $mdDialog.hide(block);
      }
      function saveBlockErrorFn () {
        $mdToast.show(
          $mdToast.simple()
            .textContent($scope.msUtils.translation.genericSaveErrorToast('QUESTIONNAIRE.BLOCK.HEADING'))
            .theme('fail-toast')
            .hideDelay(5000)
        );
      }
    };

  }
})();
