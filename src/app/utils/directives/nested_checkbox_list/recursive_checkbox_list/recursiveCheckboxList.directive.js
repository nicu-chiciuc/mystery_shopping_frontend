/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msRecursiveCheckboxList', msRecursiveCheckboxList);

  /** @ngInject */
  function msRecursiveCheckboxList ( RecursionHelper ) {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/nested_checkbox_list/recursive_checkbox_list/recursive-checkbox-list.html',
      scope: {
        recursiveCheckboxItem: '=',
        recursiveCheckboxListOptions: '=',
        project: '='
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

      vm.getCheckboxLabel = getCheckboxLabel;
      vm.checkboxItemValue = checkboxItemValue;


      function checkboxToggle ( project, item, itemOptions, itemValue ) {
        var selectedObj = _.find(project.listOfSpecificType[itemOptions.type], function (listItem) {
          var selectionCondition = true;
          _.forOwn(itemValue, function (value, key) {
            if ( value !== listItem[key] ) {
              selectionCondition = false;
            }
          });
          return selectionCondition;
        });

        toggleItem(project, item, itemOptions, itemValue, !selectedObj);
      }

      function checkboxState ( project, item, itemOptions, itemValue ) {
        return _.find(project.listOfSpecificType[itemOptions.type], function (listItem) {
          var selectionCondition = true;
          _.forOwn(itemValue, function (value, key) {
            if ( value !== listItem[key] ) {
              selectionCondition = false;
            }
          });
          return selectionCondition;
        });
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
       * @param {Object} project The Project object that contains all the target lists
       *     that items in the nested checkbox list should go.
       * @param {Object} item The item that has been clicked on in the nested checkbox list.
       * @param {Object} itemOptions The options for the given item.
       * @param {Object} itemValue The value that should be inserted into the target list.
       * @param {boolean} isSelectAction The type of action that should be executed with the
       *     current and child items. If it is true, then new items should be added to the
       *     target list and existing items in the list shouldn't be removed, otherwise,
       *     if false, items that are not in the list are not added and those that are in
       *     the target list are removed.
       */
      function toggleItem (project, item, itemOptions, itemValue, isSelectAction) {

        // Find out which is the clicked object.
        var selectedObj = _.find(project.listOfSpecificType[itemOptions.type], function (listItem) {

          // Because list of places and people is more detailed when it is returned from
          // the server (it contains more info besides type and id), the selection condition
          // resides in checking whether the keys from itemValue (which are [place|person]_type
          // and [place|person]_id) have the same values with the same keys in the list of
          // items that are already selected.
          var selectionCondition = true;
          _.forOwn(itemValue, function (value, key) {

            // In case at least one item is found that has the same keys not equal, this means
            // that the current item in the _.find loop is different than the itemValue.
            if ( value !== listItem[key] ) {
              selectionCondition = false;
            }
          });
          return selectionCondition;
        });

        // If the item is not selected AND the action to execute is to select child items, do this.
        if ( !selectedObj && isSelectAction ) {

          // If item is not already selected and the action is to select items,
          // add it to the corresponding target list.
          project.listOfSpecificType[itemOptions.type].push(itemValue);

        // In case that the item is already selected and the action is to deselect, do this.
        } else if ( selectedObj && !isSelectAction ) {

          // If the item is already selected and the action is to not select items,
          // remove the item from the corresponding target list.
          _.remove(project.listOfSpecificType[itemOptions.type], function (targetListItem) {
            var selectionCondition = true;
            _.forOwn(itemValue, function (value, key) {
              if ( value !== targetListItem[key] ) {
                selectionCondition = false;
              }
            });
            return selectionCondition;
          });

        }

        // After dealing with the current item, the function calls itself for each
        // of item's children items.
        _.forEach(itemOptions.children, function (childOption) {
          _.forEach(item[childOption.itemsProp], function (childItem) {
            var childItemValue = checkboxItemValue(childItem, childOption.itemValueProp(childItem));
            toggleItem(project, childItem, childOption, childItemValue, isSelectAction);
          });
        });
      }

      function checkboxItemValue ( item, valueProp ) {
        if ( angular.isFunction(valueProp) ) {
          return valueProp(item);
        } else {
          return valueProp;
        }
      }

      function getCheckboxLabel ( element, labelProp ) {
        var returnValue = element,
          labels = _.filter(labelProp.split('.'), function (prop) {
            return prop !== '';
          });

        _.forEach(labels, function (label) {
          returnValue = returnValue[label];
        });

        return returnValue;
      }
    }
  }

})();
