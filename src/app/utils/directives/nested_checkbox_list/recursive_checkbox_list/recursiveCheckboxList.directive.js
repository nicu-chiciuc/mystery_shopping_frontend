(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msRecursiveCheckboxList', msRecursiveCheckboxList);

  /** @ngInject */
  function msRecursiveCheckboxList ( RecursionHelper, contentTypes ) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/nested_checkbox_list/recursive_checkbox_list/recursive-checkbox-list.html',
      scope: {
        recursiveCheckboxItem: '=',
        recursiveCheckboxListOptions: '=',
        targetLists: '='
      },
      controller: RecursiveCheckboxListController,
      controllerAs: 'vm',
      bindToController: true,
      compile: function (element) { return RecursionHelper.compile(element); }
    };

    return directive;

    /** @ngInject */
    function RecursiveCheckboxListController ( $log, $scope ) {
      $log.debug('Entered RecursiveCheckboxListController');
      var vm = this;

      // Create a shortcut for vm.checkboxListOptions in template.
      $scope.rclo = vm.recursiveCheckboxListOptions;

      $scope.currentItem = vm.recursiveCheckboxItem;

      $scope.rclo.children = $scope.rclo.children || [];

      // Checkbox actions definition
      vm.checkboxToggle = checkboxToggle;
      vm.checkboxState = checkboxState;

      function getCheckboxListObjectForTargetList ( item, itemOptions ) {
        var obj = {};
        obj[itemOptions.type + '_type'] = contentTypes[itemOptions.contentType];
        obj[itemOptions.type + '_id'] = item.id;

        return obj;
      }

      function checkboxToggle ( targetLists, item, itemOptions ) {
        var obj = getCheckboxListObjectForTargetList(item, itemOptions);
        var selectedObj = _.find(targetLists[itemOptions.type], function (listObj) {
          return angular.equals(obj, listObj);
        });

        toggleItem(targetLists, item, itemOptions, !selectedObj);
      }

      function checkboxState ( targetLists, item, itemOptions ) {
        var obj = getCheckboxListObjectForTargetList(item, itemOptions);
        var selectedObj = _.find(targetLists[itemOptions.type], function (listObj) {
          return angular.equals(obj, listObj);
        });
        return !!selectedObj;
      }

      /**
       * @ngdoc method
       * @name toggleItem
       * @kind function
       *
       * @description
       * Checks whether an element is in the target list and based on the actions that
       * is passed to the function through the isSelectAction argument, either removes,
       * adds or does not touch the passed item.
       *
       * After dealing with the passed item, recursively call itself for each child
       * item that the current item contains.
       *
       * @param {Object} targetLists The object that contains all the target lists
       *     that items in the nested checkbox list should go.
       * @param {Object} item The item that has been clicked on in the nested checkbox list.
       * @param {Object} itemOptions The options for the given item.
       * @param {boolean} isSelectAction The type of action that should be executed with the
       *     current and child items. If it is true, then new items should be added to the
       *     target list and existing items in the list shouldn't be removed, otherwise,
       *     if false, items that are not in the list are not added and those that are in
       *     the target list are removed.
       */
      function toggleItem (targetLists, item, itemOptions, isSelectAction) {
        var obj = getCheckboxListObjectForTargetList(item, itemOptions);
        var selectedObj = _.find(targetLists[itemOptions.type], function (listObj) {
          return angular.equals(obj, listObj);
        });

        if ( !selectedObj && isSelectAction ) {

          // If item is not already selected and the action is to select items,
          // add it to the corresponding target list.
          targetLists[itemOptions.type].push(obj);

        } else if ( selectedObj && !isSelectAction ) {

          // If the item is already selected and the action is to not select items,
          // remove the item from the corresponding target list.
          _.remove(targetLists[itemOptions.type], function (targetListItem) {
            return angular.equals(targetListItem, obj);
          });

        }

        // After dealing with the current item, the function calls itself for each
        // of item's children items.
        _.forEach(itemOptions.children, function (childOption) {
          _.forEach(item[childOption.itemsProp], function (childItem) {
            toggleItem(targetLists, childItem, childOption, isSelectAction);
          });
        });
      }
    }
  }

})();
