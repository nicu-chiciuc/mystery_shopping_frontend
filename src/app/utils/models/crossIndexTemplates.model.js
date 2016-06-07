(function() {
  'use strict';

  angular
    .module('spark')
    .factory('CrossIndexTemplates', CrossIndexTemplates);

  /** @ngInject */
  function CrossIndexTemplates(AbstractQuestionnaireModel, AbstractParentBlockModel) {
    var Model = {
      initialize: initialize
    };

    return Model;

    function initialize () {
      console.log('CrossIndexTemplates');
    }
  }
})();
