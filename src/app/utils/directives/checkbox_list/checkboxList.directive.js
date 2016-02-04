(function() {
  'use strict';

  angular
    .module('spark')
    .directive('msCheckboxList', msCheckboxList);

  /** @ngInject */
  function msCheckboxList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/utils/directives/checkbox_list/checkbox-list.html',
      scope: {
        checkboxListElements: '=',
        checkboxListOptions: '=',
        targetList: '='
      },
      controller: CheckboxListController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function CheckboxListController ( $scope ) {
      var vm = this;

      // Create a shortcut for vm.checkboxListOptions in template.
      $scope.clo = vm.checkboxListOptions;

      // Checkbox actions definition
      vm.checkboxListToggle = checkboxListToggle;
      vm.checkboxListState = checkboxListState;
      vm.getCheckboxLabel = getCheckboxLabel;
      vm.checkboxItemValue = checkboxItemValue;

      function checkboxListToggle ( item, list, itemKey ) {
        var value, itemExists;
        if ( angular.isObject(itemKey) ) {
          value = itemKey;
          itemExists = _.find(list, function (listItem) {
            return angular.equals(value, listItem);
          });
          if ( itemExists ) _.remove(list, function (listItem) { return angular.equals(itemExists, listItem); })
          else list.push(value);

        } else {
          value = itemKey ? item[itemKey] : item;
          var idx = list.indexOf(value);
          if (idx > -1) list.splice(idx, 1);
          else
            list.push(value);
        }
      }

      function checkboxListState (item, list, itemKey) {
        var value;
        if ( angular.isObject(itemKey) ) {
          value = itemKey;
          return _.find(list, function (listItem) {
            return angular.equals(value, listItem);
          });
        } else {
          value = itemKey ? item[itemKey] : item;
          return list.indexOf(value) > -1;
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

      function checkboxItemValue ( item, valueProp ) {
        if ( typeof valueProp === 'function' ) {
          return valueProp(item);
        } else {
          return item[valueProp];
        }
      }

    }
  }

})();
