/* global moment:false */
(function() {
  'use strict';

  var urls = {
    API_URL: 'http://localhost:8000/api/v1/',
    DOMAIN_URL: 'http://localhost:8000/',
    STORAGE_COOKIE_DOMAIN: ''
  };

  angular
    .module('spark')
    .constant('moment', moment)
    .constant('urls', urls);

})();
