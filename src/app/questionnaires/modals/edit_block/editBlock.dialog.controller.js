(function() {
  'use strict';

  angular
    .module('spark')
    .controller('EditBlockDialogController', EditBlockDialogController);

  /** @ngInject */
  function EditBlockDialogController ( $log, $scope, $mdDialog, $filter, block, parentBlock ) {
    $log.debug('Entered EditBlockDialogController');
    $log.debug(block);

    $scope.block = block;
    $scope.parentBlock = parentBlock;

    $scope.updateAvailableWeight = updateAvailableWeight;

    activate();

    function activate () {
      // Before changing any weight, save current weights so that on close of dialog
      // window without saving, there is a possibility to reset initial weights.
      $scope.parentBlock.setInitialWeights();

      $scope.availableWeight = $scope.parentBlock.availableWeight + $scope.block.weight;
      $scope.otherBlocks = _.filter($scope.parentBlock.template_blocks, function (templateBlock) {

        // Set newWeight to current weight in order to be able to first check availableWeight
        // and in case it is available, update weights
        templateBlock.newWeight = templateBlock.weight;

        return templateBlock.title !== block.title;
      });
    }

    function updateAvailableWeight ( block ) {
      var availableWeight = $scope.parentBlock.computeAvailableWeight();

      // On any action with weight inputs, remove all tooltips.
      $scope.parentBlock.removeExceededWeightsTooltips();

      if ( availableWeight >= 0 ) {
        $scope.parentBlock.setAvailableWeight(availableWeight);
        $scope.availableWeight = availableWeight + block.newWeight;
        block.setWeight(block.newWeight);
      } else {
        block.newWeight = block.weight;
        block.tooltip = $filter('translate')('QUESTIONNAIRE.AVAILABLE_WEIGHT_EXCEEDED', {ACCEPTABLE_WEIGHT: $scope.availableWeight});
        block.showTooltip = true;
      }
    }

    $scope.cancel = function() {
      $scope.parentBlock.resetInitialWeights();
      $mdDialog.cancel();
    };
    $scope.saveBlockChanges = function( block, isValid ) {
      if ( isValid ) {
        $mdDialog.hide(block);
      }
    };

  }
})();
