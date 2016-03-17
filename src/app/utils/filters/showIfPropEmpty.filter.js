/* global _:false */
(function() {
  'use strict';

  angular
    .module('spark')
    .filter('showIfPropEmpty', showIfPropEmpty);

  /** @ngInject */
  function showIfPropEmpty() {

    function filter( list, prop ) {
      var result = [];
      if ( angular.isUndefined(prop) ) {
        return list;
      } else if ( !_.isArray(list) ) {
        return list;
      } else {
        _.forEach(list, function (elem) {
          if ( _.isNull(elem[prop]) ) {
            result.push(elem);
          }
        });
        return result;
      }
    }

    return filter;
  }

})();
