'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var karma = require('karma');

function runTests(singleRun, done) {
    karma.server.start({
        configFile: path.join(__dirname, '/../karma.conf.js'),
        singleRun: singleRun,
        autoWatch: !singleRun
    }, function() {
        done();
    });
}

gulp.task('test', ['scripts'], function(done) {
    runTests(true, done);
});

gulp.task('test:auto', ['watch'], function(done) {
    runTests(false, done);
});

gulp.task('sonar', function() {
    if (!process.env.SONAR_JDBC_USERNAME ||
        !process.env.SONAR_JDBC_PASSWORD ||
        !process.env.SONAR_PASSWORD ||
        !process.env.SONAR_USERNAME ||
        !process.env.SONAR_JDBC_URL ||
        !process.env.BUILD_TAG) {
        return
    }
    var options = {
        sonar: {
            login: process.env.SONAR_USERNAME,
            password: process.env.SONAR_PASSWORD,
            host: {
                url: 'http://sonar.redspark.io'
            },
            jdbc: {
                url: process.env.SONAR_JDBC_URL,
                username: process.env.SONAR_JDBC_USERNAME,
                password: process.env.SONAR_JDBC_PASSWORD
            },
            projectKey: 'io.redspark:modelo-front-coffee',
            projectName: 'modelo-front-coffee',
            projectVersion: process.env.BUILD_TAG,
            // comma-delimited string of source directories 
            sources: 'src/components,src/app',
            exclusions: 'src/**/*.mock.js,src/**/*.spec.js,.tmp/components/datatables/**/*.js',
            language: 'js',
            sourceEncoding: 'UTF-8',
            javascript: {
                lcov: {
                    reportPath: 'coverage/report-lcov.lcov'
                }
            }
        }
    };

    // gulp source doesn't matter, all files are referenced in options object above 
    return gulp.src('thisFileDoesNotExist.js', {
            read: false
        })
        .pipe(sonar(options))
        .on('error', util.log);
});