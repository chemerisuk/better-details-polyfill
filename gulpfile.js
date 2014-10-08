var gulp = require("gulp");
var gulpif = require("gulp-if");
var gulpFilter = require("gulp-filter");
var es6transpiler = require("gulp-es6-transpiler");
var prefix = require("gulp-autoprefixer");
var concat = require("gulp-concat");
var rework = require("gulp-rework");
var css2js = require("rework-css2js");
var jshint = require("gulp-jshint");

var karma = require("karma").server;
var karmaConfig = require.resolve("./test/karma.conf");

gulp.task("lint", function() {
    return gulp.src(["src/*.js", "test/**/*.js", "*.js"])
        .pipe(jshint(".jshintrc"))
        .pipe(jshint.reporter("jshint-stylish"))
        .pipe(gulpif(process.env.TRAVIS_JOB_NUMBER, jshint.reporter("fail")));
});

gulp.task("compile", ["lint"], function() {
    var jsFilter = gulpFilter("*.js");
    var cssFilter = gulpFilter("*.css");

    return gulp.src(["src/*.js", "src/*.css"])
        .pipe(cssFilter)
        .pipe(prefix("last 2 versions", "android 2.3", "IE 8"))
        .pipe(rework(css2js("DOM.importStyles($1, $2)")))
        .pipe(cssFilter.restore())
        .pipe(jsFilter)
        .pipe(es6transpiler())
        .pipe(jsFilter.restore())
        .pipe(concat("better-details-polyfill.js"))
        .pipe(gulp.dest("build/"));
});

gulp.task("test", ["compile"], function(done) {
    var config = { configFile: karmaConfig };

    if (process.env.TRAVIS_JOB_NUMBER) {
        config = {
            configFile: karmaConfig,
            preprocessors: { "build/*.js": "coverage" },
            reporters: ["coverage", "dots", "coveralls"],
            coverageReporter: {
                type: "lcovonly",
                dir: "coverage/"
            }
        };
    }

    karma.start(config, done);
});

gulp.task("dev", ["compile"], function() {
    gulp.watch("src/**", ["compile"]);

    karma.start({
        configFile: karmaConfig,
        preprocessors: { "build/*.js": "coverage" },
        reporters: ["coverage", "progress"],
        background: true,
        singleRun: false
    });
});
