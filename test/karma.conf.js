module.exports = function(config) {
    "use strict";

    config.set({
        basePath: "..",
        singleRun: true,
        frameworks: ["jasmine"],
        browsers: ["PhantomJS"],
        files: [
            "bower_components/es5-shim/es5-shim.js",
            "bower_components/better-dom/dist/better-dom.js",
            "bower_components/better-dom/dist/better-dom.js",
            "build/*.js",
            "test/spec/*.spec.js"
        ]
    });
};
