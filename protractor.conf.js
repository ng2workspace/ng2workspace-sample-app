// @AngularClass
require('ts-node/register');

var fs = require('fs');
var path = require('path');

var seleniumServerJar = path.join(
    'node_modules/protractor/selenium',
    fs.readdirSync('node_modules/protractor/selenium').filter(function(fname) {
      return fname.indexOf('selenium-server-standalone-') === 0;
    })[0]);

exports.config = {
  baseUrl: 'http://localhost:9999/',

  // use `npm run e2e`
  specs: [
    'src/**/**.e2e.ts',
    'src/**/*.e2e.ts'
  ],
  exclude: [],

  framework: 'jasmine',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
  },

  seleniumServerJar: seleniumServerJar,

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   *
   */
  useAllAngular2AppRoots: true
};