/* global moment:false */
(function() {
  'use strict';

  var urls = {
    API_URL: 'http://localhost:8000/api/v1/',
    DOMAIN_URL: 'http://localhost:8000/',
    STORAGE_COOKIE_DOMAIN: ''
  };

  var localUrls = {
    API_URL: 'http://192.168.0.102:8000/api/v1/',
    DOMAIN_URL: 'http://192.168.0.102:8000/',
    STORAGE_COOKIE_DOMAIN: ''
  };


  var productionUrls = {
    API_URL: 'http://api.dapi.solutions/api/v1/',
    DOMAIN_URL: 'http://api.dapi.solutions/',
    STORAGE_COOKIE_DOMAIN: ''
  };

  var amazonProductionUrls = {
    API_URL: 'http://mysteryshopping-prod.eu-west-1.elasticbeanstalk.com/api/v1/',
    DOMAIN_URL: 'http://mysteryshopping-prod.eu-west-1.elasticbeanstalk.com/',
    STORAGE_COOKIE_DOMAIN: ''
  };

  var contentTypesProduction = {
    department: 25,
    entity: 26,
    section: 27,
    tenantproductmanager: 14,
    tenantprojectmanager: 15,
    tenantconsultant: 16,
    clientprojectmanager: 17,
    clientmanager: 18,
    clientemployee: 19,
    shopper: 20,
    collector: 21
  };

  var contentTypesDevelopment = {
    department: 24,
    entity: 25,
    section: 26,
    tenantproductmanager: 14,
    tenantprojectmanager: 15,
    tenantconsultant: 16,
    clientprojectmanager: 17,
    clientmanager: 18,
    clientemployee: 19,
    shopper: 20
  };

  angular
    .module('spark')
    .constant('moment', moment)
    .constant('urls', productionUrls)
    .constant('contentTypes', contentTypesProduction);

})();
