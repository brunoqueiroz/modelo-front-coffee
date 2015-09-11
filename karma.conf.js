'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    return wiredep(wiredepOptions).js
        .concat([
            path.join(conf.paths.tmp, '/serve/app/**/*.module.js'),
            path.join(conf.paths.tmp, '/serve/app/**/*.js'),
            path.join(conf.paths.src, '/**/*.spec.js'),
            path.join(conf.paths.src, '/**/*.mock.js'),
            path.join(conf.paths.src, '/**/*.html')
        ]);
}

module.exports = function(config) {

    var configuration = {
        files: listFiles(),

        singleRun: true,

        autoWatch: false,

        frameworks: ['jasmine', 'angular-filesort'],

        angularFilesort: {
            whitelist: [path.join(conf.paths.tmp, '/**/!(*.html|*.spec|*.mock).js')]
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/',
            moduleName: 'templates'
        },

        browsers: ['Chrome'],

        // reporters: ['progress', 'coverage','junit'],
        reporters: ['progress', 'coverage'],


        plugins: [
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-angular-filesort',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-coverage'
        ],

        preprocessors: {
            'src/**/*.html': ['ng-html2js'],
            '.tmp/serve/{app,components/!(guideline)}/**/*.js' : ['coverage']
        },
        // Output coverage file
        coverageReporter: {
            dir: 'coverage',
            reporters: [
                // reporters not supporting the `file` property
                {
                    type: 'html',
                    subdir: 'report-html'
                },
                //{ type: 'lcov', subdir: 'report-lcov' },
                // reporters supporting the `file` property, use `subdir` to directly
                // output them in the `dir` directory
                //{ type: 'cobertura', subdir: '.', file: 'cobertura.txt' },
                {
                    type: 'lcovonly',
                    subdir: '.',
                    file: 'report-lcov.lcov'
                },
                //{ type: 'teamcity', subdir: '.', file: 'teamcity.txt' },
                //{ type: 'text', subdir: '.', file: 'text.txt' },
                //{ type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
            ]
        }



    };
    // This block is needed to execute Chrome on Travis
    // If you ever plan to use Chrome and Travis, you can keep it
    // If not, you can safely remove it
    // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
    if (configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
        configuration.customLaunchers = {
            'chrome-travis-ci': {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        };
        configuration.browsers = ['chrome-travis-ci'];
    }

    config.set(configuration);
};