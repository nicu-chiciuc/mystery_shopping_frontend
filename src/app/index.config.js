(function() {
  'use strict';

  angular
    .module('spark')
    .config(config);

  /** @ngInject */
  function config ( $httpProvider, $logProvider, toastrConfig, RestangularProvider, localStorageServiceProvider, $translateProvider ) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Tell translate to use messageFormatInterpolation
    $translateProvider.useSanitizeValueStrategy('escape');
    $translateProvider.useMessageFormatInterpolation();
    $translateProvider.preferredLanguage('en');

    // Local storage prefix
    localStorageServiceProvider.setPrefix('mysteryshopping');
    localStorageServiceProvider.setStorageCookie(1);
    localStorageServiceProvider.setStorageCookieDomain(urls.STORAGE_COOKIE_DOMAIN);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    // Set restangular options
    RestangularProvider.setBaseUrl(urls.API_URL);
    RestangularProvider.setRequestSuffix('/');

    // Send the HTTP-Header to Django on POST requests
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    $httpProvider.defaults.withCredentials = true;

    // Handle unauthenticated API requests
    var logsOutUserOn401 = ['$q', '$location', function ($q, $location) {
      var success = function (response) {
        return response;
      };

      var error = function (response) {
        if (response.status === 401) {
          // Redirect them back to login page.
          $location.path('/login');

          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      };

      return function (promise) {
        return promise.then(success, error);
      };
    }];

    $httpProvider.interceptors.push(logsOutUserOn401);
    $httpProvider.interceptors.push('AuthenticationInterceptor');

  }

})();
