module.exports = function(config) {
    "use strict";

    config.set({
        basePath: "..",
        frameworks: ["jasmine"],
        browsers: ["PhantomJS"],
        preprocessors: { "src/better-details-polyfill.js": "coverage" },
        files: [
            "bower_components/es5-shim/es5-shim.js",
            "bower_components/better-dom/dist/better-dom.js",
            "bower_components/better-dom/dist/better-dom.js",
            "src/*.js",
            "test/spec/*.spec.js"
        ]
    });
};
