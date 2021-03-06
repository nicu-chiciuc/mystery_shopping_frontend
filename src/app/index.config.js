(function() {
  'use strict';

  angular
    .module('spark')
    .config(config);

  /** @ngInject */
  function config ( $httpProvider, ivhTreeviewOptionsProvider, $logProvider, $mdDateLocaleProvider, toastrConfig, RestangularProvider, localStorageServiceProvider, $translateProvider, urls, $mdThemingProvider ) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Config the look of ivhTreeviewOptionsProvider
    ivhTreeviewOptionsProvider.set({
      defaultSelectedState: false,
      // validate: true,
      twistieCollapsedTpl: '<ng-md-icon icon="keyboard_arrow_right"></ng-md-icon>',
      twistieExpandedTpl: '<ng-md-icon icon="keyboard_arrow_down"></ng-md-icon>',
      twistieLeafTpl: '<span style="cursor: default;">&#8192;&#8192;&#8192;</span>'
    });

    // Config Angular Material date locale format
    //$mdDateLocaleProvider.formatDate = function(date) {
    //  return date ? moment(date).format('YYYY-MM-DD') : '';
    //};
    //$mdDateLocaleProvider.parseDate = function(dateString) {
    //  var m = moment(dateString, 'YYYY-MM-DD', true);
    //  return m.isValid() ? m.toDate() : new Date(NaN);
    //};

    // Configure angular-material theme
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('orange')
      .warnPalette('red');

    // Configure angular-material page toolbar theme
    $mdThemingProvider.theme('toolbar')
      .primaryPalette('grey', {
        'default': '50',
        'hue-1': '300',
        'hue-2': '600',
        'hue-3': '900'
      })
      .accentPalette('deep-orange')
      .warnPalette('red');

    $mdThemingProvider.theme('success-toast');
    $mdThemingProvider.theme('fail-toast');

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
